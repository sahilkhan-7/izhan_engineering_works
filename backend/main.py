from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import get_settings
from app.database import Base, SessionLocal, engine
from app.routes import admin, public
from seed import seed_database


settings = get_settings()
use_supabase_storage = bool(settings.supabase_url and settings.supabase_service_key)


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Best-effort convenience for local/dev: ensure tables exist and seed if empty.
    # In production (Vercel) the database is initialised once via `python seed_db.py`,
    # because serverless lifespan execution is not guaranteed — so failures here are
    # swallowed rather than crashing the app.
    try:
        Base.metadata.create_all(bind=engine)
        with SessionLocal() as db:
            seed_database(db)
    except Exception:  # noqa: BLE001 - never block startup on seeding
        pass
    yield


app = FastAPI(
    title="Izhan Engineering Works API",
    version="1.0.0",
    description="Content, product, project, lead, and administration API.",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Local-disk uploads only when Supabase Storage isn't configured. Vercel's filesystem
# is read-only, so we must not create/mount a local directory there.
if not use_supabase_storage:
    upload_dir = settings.upload_dir
    upload_dir.mkdir(parents=True, exist_ok=True)
    app.mount("/uploads", StaticFiles(directory=upload_dir), name="uploads")

app.include_router(public.router, prefix="/api", tags=["Public"])
app.include_router(admin.router, prefix="/api", tags=["Admin"])


@app.get("/")
def root():
    return {"name": "Izhan Engineering Works API", "docs": "/docs"}
