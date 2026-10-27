"""Demo-grade auth, stdlib only.

* Passwords: scrypt (n=2^14, r=8, p=1) with a 16-byte random salt.
* Sessions: random token stored in the `sessions` table, sent as an HttpOnly,
  SameSite=Lax cookie (`Secure` when the request arrived over https). 30 days.
* Login throttle: 5 failed attempts per IP per minute (in-memory).
* Every document route depends on `current_user`, so data is per-user.

What this is NOT: email verification, password reset, roles/admin, OAuth.
Tell users so — the web-builder summary template does.
"""

from __future__ import annotations

import hashlib
import hmac
import secrets
import time
import uuid
from collections import defaultdict, deque

from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel

from db import db, now

router = APIRouter(prefix="/api/auth")

COOKIE = "sid"
SESSION_TTL_S = 30 * 24 * 3600
MIN_PASSWORD = 8
_SCRYPT = dict(n=2**14, r=8, p=1, dklen=32)
_MAX_FAILS, _FAIL_WINDOW_S = 5, 60
_fails: dict[str, deque] = defaultdict(deque)


class Credentials(BaseModel):
    email: str
    password: str


class PasswordChange(BaseModel):
    current: str
    new: str


def _hash(password: str, salt: bytes) -> bytes:
    return hashlib.scrypt(password.encode("utf-8"), salt=salt, **_SCRYPT)


def _norm_email(raw: str) -> str:
    email = raw.strip().lower()
    if "@" not in email or len(email) > 254:
        raise HTTPException(400, "invalid email")
    return email


def _check_password(pw: str) -> None:
    if len(pw) < MIN_PASSWORD:
        raise HTTPException(400, f"password must be at least {MIN_PASSWORD} characters")


def create_user(conn, email: str, password: str) -> str:
    """Insert a user; returns its id. Caller handles the UNIQUE(email) case."""
    salt = secrets.token_bytes(16)
    uid = uuid.uuid4().hex
    conn.execute(
        "INSERT INTO users (id, email, pw_hash, salt, created) VALUES (?,?,?,?,?)",
        (uid, email, _hash(password, salt), salt, now()),
    )
    return uid


def _new_session(conn, user_id: str) -> str:
    token = secrets.token_urlsafe(32)
    t = now()
    conn.execute(
        "INSERT INTO sessions (token, user_id, created, expires) VALUES (?,?,?,?)",
        (token, user_id, t, t + SESSION_TTL_S),
    )
    return token


def _set_cookie(response: Response, request: Request, token: str) -> None:
    # Over https the cookie is SameSite=None + Secure so sign-in also works when
    # the app is shown inside the Orvis chat's preview iframe, which is a
    # different site from the app's own domain (a Lax cookie is silently dropped
    # there and every request after login comes back 401). Over plain http
    # (local dev on localhost) browsers reject SameSite=None, so fall back to Lax.
    https = request.headers.get("x-forwarded-proto", "").lower() == "https" or request.url.scheme == "https"
    response.set_cookie(
        COOKIE, token, httponly=True, samesite="none" if https else "lax", secure=https,
        max_age=SESSION_TTL_S, path="/",
    )


def login_external(conn, email: str, name: str, provider: str, picture: str = "") -> str:
    """Find-or-create the local user for an identity verified by Orvis (Google
    login). Linked by email; a brand-new user gets an unusable random password
    hash, so email/password login keeps working for everyone else."""
    email = _norm_email(email)
    row = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
    if row is not None:
        conn.execute(
            "UPDATE users SET name = COALESCE(NULLIF(?, ''), name), picture = COALESCE(NULLIF(?, ''), picture) WHERE id = ?",
            (name or "", picture or "", row["id"]),
        )
        return row["id"]
    salt = secrets.token_bytes(16)
    uid = uuid.uuid4().hex
    conn.execute(
        "INSERT INTO users (id, email, pw_hash, salt, created, name, provider, picture) VALUES (?,?,?,?,?,?,?,?)",
        (uid, email, _hash(secrets.token_urlsafe(32), salt), salt, now(), name or "", provider, picture or ""),
    )
    return uid


def start_session(conn, response: Response, request: Request, user_id: str) -> str:
    """Issue the session cookie for `user_id` (used after an external login)."""
    token = _new_session(conn, user_id)
    _set_cookie(response, request, token)
    return token


def _throttle(ip: str) -> None:
    q = _fails[ip]
    t = time.monotonic()
    while q and t - q[0] > _FAIL_WINDOW_S:
        q.popleft()
    if len(q) >= _MAX_FAILS:
        raise HTTPException(429, "too many attempts — wait a minute")


def current_user(request: Request) -> dict:
    """FastAPI dependency: the signed-in user or 401."""
    token = request.cookies.get(COOKIE)
    if not token:
        raise HTTPException(401, "not signed in")
    with db() as conn:
        row = conn.execute(
            "SELECT u.id, u.email, u.name, u.provider, u.picture, s.expires FROM sessions s "
            "JOIN users u ON u.id = s.user_id WHERE s.token = ?",
            (token,),
        ).fetchone()
        if row is None:
            raise HTTPException(401, "not signed in")
        if row["expires"] < now():
            conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
            raise HTTPException(401, "session expired")
    return {
        "id": row["id"], "email": row["email"], "name": row["name"] or "",
        "provider": row["provider"] or "password", "picture": row["picture"] or "",
    }


@router.post("/signup", status_code=201)
def signup(body: Credentials, request: Request, response: Response) -> dict:
    email = _norm_email(body.email)
    _check_password(body.password)
    with db() as conn:
        if conn.execute("SELECT 1 FROM users WHERE email = ?", (email,)).fetchone():
            raise HTTPException(409, "email already registered")
        uid = create_user(conn, email, body.password)
        token = _new_session(conn, uid)
    _set_cookie(response, request, token)
    return {"id": uid, "email": email}


@router.post("/login")
def login(body: Credentials, request: Request, response: Response) -> dict:
    ip = request.client.host if request.client else "?"
    _throttle(ip)
    email = _norm_email(body.email)
    with db() as conn:
        row = conn.execute("SELECT id, pw_hash, salt FROM users WHERE email = ?", (email,)).fetchone()
        ok = row is not None and hmac.compare_digest(_hash(body.password, row["salt"]), row["pw_hash"])
        if not ok:
            _fails[ip].append(time.monotonic())
            raise HTTPException(401, "wrong email or password")
        token = _new_session(conn, row["id"])
    _set_cookie(response, request, token)
    return {"id": row["id"], "email": email}


@router.post("/logout")
def logout(request: Request, response: Response) -> dict:
    token = request.cookies.get(COOKIE)
    if token:
        with db() as conn:
            conn.execute("DELETE FROM sessions WHERE token = ?", (token,))
    response.delete_cookie(COOKIE, path="/")
    return {"ok": True}


@router.get("/me")
def me(user: dict = Depends(current_user)) -> dict:
    return user


@router.post("/password")
def change_password(body: PasswordChange, request: Request, user: dict = Depends(current_user)) -> dict:
    _check_password(body.new)
    with db() as conn:
        row = conn.execute("SELECT pw_hash, salt FROM users WHERE id = ?", (user["id"],)).fetchone()
        if not hmac.compare_digest(_hash(body.current, row["salt"]), row["pw_hash"]):
            raise HTTPException(401, "current password is wrong")
        salt = secrets.token_bytes(16)
        conn.execute(
            "UPDATE users SET pw_hash = ?, salt = ? WHERE id = ?",
            (_hash(body.new, salt), salt, user["id"]),
        )
        # Sign out every other device; keep this session.
        conn.execute(
            "DELETE FROM sessions WHERE user_id = ? AND token != ?",
            (user["id"], request.cookies.get(COOKIE, "")),
        )
    return {"ok": True}
