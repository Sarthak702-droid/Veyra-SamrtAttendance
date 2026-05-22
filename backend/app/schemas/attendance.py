from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AttendanceMark(BaseModel):
    student_id: int
    confidence: float = 0.95
    image_path: Optional[str] = None


class AttendanceResponse(BaseModel):
    id: int
    student_id: int
    date: datetime
    status: str
    confidence: float
    image_path: Optional[str] = None

    class Config:
        from_attributes = True


class AttendanceStats(BaseModel):
    total_present: int
    total_absent: int
    attendance_percentage: float


class GestureLog(BaseModel):
    id: int
    student_id: int
    gesture: str
    timestamp: datetime
    confidence: float

    class Config:
        from_attributes = True


class EmotionLog(BaseModel):
    id: int
    student_id: int
    emotion: str
    timestamp: datetime
    confidence: float

    class Config:
        from_attributes = True