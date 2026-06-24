from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    admin_email: str
    admin_password: str
    jwt_secret: str
    frontend_origins: str
    seed_data_path: str

    # Supabase Storage (used for image uploads in production). When unset, the
    # upload endpoint falls back to local disk so development works offline.
    supabase_url: str = ""
    supabase_service_key: str = ""
    supabase_bucket: str = "media"

    model_config = SettingsConfigDict(env_file=str(Path(__file__).resolve().parents[1] / ".env"), extra="ignore")

    @property
    def origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origins.split(",") if origin.strip()]

    @property
    def seed_path(self) -> Path:
        path = Path(self.seed_data_path)
        return path if path.is_absolute() else (Path(__file__).resolve().parents[1] / path).resolve()

    @property
    def upload_dir(self) -> Path:
        return (Path(__file__).resolve().parents[1] / "uploads").resolve()


@lru_cache
def get_settings() -> Settings:
    return Settings()
