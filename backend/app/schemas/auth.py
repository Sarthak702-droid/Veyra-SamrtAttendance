from pydantic import BaseModel, Field
from typing import Optional


class OTPSendRequest(BaseModel):
    phone: str = Field(..., min_length=10, max_length=10)


class OTPVerifyRequest(BaseModel):
    phone: str = Field(..., min_length=10, max_length=10)
    otp: str = Field(..., min_length=6, max_length=6)


class LoginRequest(BaseModel):
    phone: str = Field(..., min_length=10, max_length=10)
    password: str


class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    phone: str = Field(..., min_length=10, max_length=10)
    password: str = Field(..., min_length=6)
    role: str = Field(default="student", pattern="^(student|teacher|admin)$")
    department: Optional[str] = None
    enrollment_no: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


class OTPResponse(BaseModel):
    message: str
    otp: str
    phone: str


class MessageResponse(BaseModel):
    message: str