from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy.pool import NullPool

from .config import get_settings


class Base(DeclarativeBase):
    pass


database_url = get_settings().database_url
is_sqlite = database_url.startswith("sqlite")

if is_sqlite:
    engine = create_engine(database_url, connect_args={"check_same_thread": False}, pool_pre_ping=True)
else:
    # On Vercel serverless each invocation is short-lived, so we don't pool in-process:
    # NullPool hands connection management to Supabase's transaction pooler (pgBouncer).
    # prepare_threshold=None disables psycopg3 prepared statements, which pgBouncer in
    # transaction mode does not support.
    engine = create_engine(
        database_url,
        poolclass=NullPool,
        connect_args={"prepare_threshold": None},
    )

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
