"""First-start seeding.

* Demo account from DEMO_EMAIL / DEMO_PASSWORD (default demo@example.com /
  demo1234) — created only when the users table is empty, so a real deployment
  that has signed people up never grows a demo login.
* If server/seed.json exists, its documents are inserted for the demo account:

    {"collections": {"transactions": [{"amount": 250, "note": "Books"}, ...]}}

  A collection is seeded only while it is empty for that user, so restarts
  don't duplicate rows. Documents without `id` get seed-1, seed-2, ...
"""

from __future__ import annotations

import json
import os
from pathlib import Path

from auth import create_user
from db import db, now

SEED_PATH = Path(os.environ.get("APP_SEED_PATH") or Path(__file__).resolve().parent / "seed.json")
DEMO_EMAIL = os.environ.get("DEMO_EMAIL", "demo@example.com")
DEMO_PASSWORD = os.environ.get("DEMO_PASSWORD", "demo1234")


def seed() -> dict:
    report: dict = {"demo_user_created": False, "collections_seeded": []}
    with db() as conn:
        row = conn.execute("SELECT id FROM users WHERE email = ?", (DEMO_EMAIL,)).fetchone()
        if row is not None:
            uid = row["id"]
        elif conn.execute("SELECT 1 FROM users LIMIT 1").fetchone() is None:
            uid = create_user(conn, DEMO_EMAIL, DEMO_PASSWORD)
            report["demo_user_created"] = True
        else:
            return report  # real users exist and no demo account — leave it that way

        if not SEED_PATH.exists():
            return report
        try:
            data = json.loads(SEED_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            report["seed_error"] = f"seed.json is not valid JSON: {exc}"
            return report

        for col, docs in (data.get("collections") or {}).items():
            if not isinstance(docs, list):
                continue
            if conn.execute(
                "SELECT 1 FROM docs WHERE owner = ? AND col = ? LIMIT 1", (uid, col)
            ).fetchone():
                continue
            t = now()
            for i, doc in enumerate(docs, start=1):
                if not isinstance(doc, dict):
                    continue
                doc = dict(doc)
                doc_id = str(doc.pop("id", "") or f"seed-{i}")
                for k in ("_created", "_updated"):
                    doc.pop(k, None)
                # Stagger timestamps by 1ms so `sort=created` returns seed order.
                ts = t + i / 1000.0
                conn.execute(
                    "INSERT OR IGNORE INTO docs (col, id, owner, body, created, updated) "
                    "VALUES (?,?,?,?,?,?)",
                    (col, doc_id, uid, json.dumps(doc, default=str), ts, ts),
                )
            report["collections_seeded"].append(col)
    return report
