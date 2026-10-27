"""FastAPI entrypoint — one port serves /api/* and (after `pnpm build`) the SPA.

Dev:  `pnpm dev:all` runs Vite (public) + this server (127.0.0.1 only); Vite
      proxies /api here, so the browser sees a single origin and cookies flow.
Prod: `pnpm build && pnpm start` — this process serves dist/ and /api/*.

On startup: create tables, then seed the demo account (+ server/seed.json).
"""

from __future__ import annotations

import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

from orvis import load_env

load_env()  # server/.env (written by provision-service.py) before anything reads ORVIS_*

from auth import router as auth_router
from crud import router as crud_router
from db import init_db
from seed import seed
from services import include_enabled

_DIST = Path(__file__).resolve().parent.parent / "dist"


@asynccontextmanager
async def _lifespan(_app: FastAPI):
    init_db()
    print(f"[server] db ready; seed: {seed()}", flush=True)
    yield


app = FastAPI(title="app-server", lifespan=_lifespan, docs_url=None, redoc_url=None)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(auth_router)
app.include_router(crud_router)
# Platform services (AI chat, …): routers mount only for names in ORVIS_SERVICES.
include_enabled(app)

if (_DIST / "assets").is_dir():
    app.mount("/assets", StaticFiles(directory=_DIST / "assets"), name="assets")


@app.get("/{full_path:path}")
def spa_fallback(full_path: str):
    """Serve dist/index.html for any non-/api route so client-side routing works."""
    if full_path.startswith("api/"):
        return JSONResponse({"detail": "not found"}, status_code=404)
    candidate = _DIST / full_path
    if full_path and candidate.is_file():
        return FileResponse(candidate)
    index = _DIST / "index.html"
    if index.is_file():
        return FileResponse(index)
    return JSONResponse(
        {"detail": "frontend not built — run `pnpm build`, or use `pnpm dev:all` in development"},
        status_code=404,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=int(os.environ.get("BACKEND_PORT", "8000")), reload=True)
