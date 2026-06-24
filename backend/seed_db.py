"""One-time database initialiser.

Creates all tables and loads the demo content from
`Seed Data/data/site-content.json` into whatever database `DATABASE_URL` points
at. Run this once after pointing `.env` at your Supabase database:

    cd backend
    python seed_db.py

It is safe to re-run: seeding is skipped if content already exists.
"""

from app.database import Base, SessionLocal, engine
from seed import seed_database


def main() -> None:
    print(f"Connecting to: {engine.url.render_as_string(hide_password=True)}")
    print("Creating tables…")
    Base.metadata.create_all(bind=engine)
    print("Seeding content…")
    with SessionLocal() as db:
        seed_database(db)
    print("Done. Database is ready.")


if __name__ == "__main__":
    main()
