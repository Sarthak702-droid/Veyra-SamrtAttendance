from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    role: str


class UserCreate(UserBase):
    password: str
    department: Optional[str] = None
    enrollment_no: Optional[str] = None


class UserResponse(UserBase):
    id: int
    department: Optional[str] = None
    enrollment_no: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True