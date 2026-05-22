from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    PROJECT_NAME: str = "Verya"
    API_V1_STR: str = "/api"
    
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/verya"
    
    SECRET_KEY: str = "your-secret-key-change-in-production-verya-2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    
    OTP_EXPIRE_MINUTES: int = 5
    OTP_LENGTH: int = 6
    
    class Config:
        case_sensitive = True


settings = Settings()