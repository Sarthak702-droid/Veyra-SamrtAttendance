from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.auth import (
    OTPSendRequest, OTPVerifyRequest, LoginRequest, RegisterRequest,
    TokenResponse, MessageResponse, OTPResponse
)
from app.schemas.attendance import AttendanceResponse, AttendanceStats
from app.schemas.user import UserResponse
from app.services import auth_service, user_service, attendance_service
from app.services import gesture_service, emotion_service, analytics_service
from app.api.deps import get_current_user

api_router = APIRouter()


@api_router.post("/auth/send-otp", response_model=OTPResponse)
async def send_otp(request: OTPSendRequest):
    result = auth_service.send_otp(request.phone)
    return OTPResponse(message=result["message"], otp=result["otp"], phone=result["phone"])


@api_router.post("/auth/verify-otp", response_model=TokenResponse)
async def verify_otp(request: OTPVerifyRequest):
    result = auth_service.verify_otp(request.phone, request.otp)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired OTP"
        )
    return result


@api_router.post("/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    result = auth_service.login_with_password(request.phone, request.password)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    return result


@api_router.post("/auth/register", response_model=MessageResponse)
async def register(request: RegisterRequest):
    result = auth_service.register(
        name=request.name,
        email=request.email,
        phone=request.phone,
        password=request.password,
        role=request.role,
        department=request.department,
        enrollment_no=request.enrollment_no
    )
    if "error" in result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result["error"]
        )
    return MessageResponse(message=result["message"])


@api_router.get("/users/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return current_user


@api_router.get("/attendance", response_model=list)
async def get_attendance(
    limit: int = 100,
    current_user: dict = Depends(get_current_user)
):
    return attendance_service.get_all_attendance(limit)


@api_router.post("/attendance/mark")
async def mark_attendance(
    student_id: int,
    confidence: float = 0.95,
    current_user: dict = Depends(get_current_user)
):
    result = attendance_service.mark_attendance(
        student_id=student_id,
        confidence=confidence
    )
    return result


@api_router.get("/attendance/stats/{student_id}", response_model=AttendanceStats)
async def get_attendance_stats(
    student_id: int,
    current_user: dict = Depends(get_current_user)
):
    stats = attendance_service.get_attendance_stats(student_id)
    return AttendanceStats(**stats)


@api_router.get("/gestures", response_model=list)
async def get_gestures(
    limit: int = 100,
    current_user: dict = Depends(get_current_user)
):
    return gesture_service.get_all_gestures(limit)


@api_router.post("/gestures/log")
async def log_gesture(
    student_id: int,
    gesture: str,
    confidence: float = 0.90,
    current_user: dict = Depends(get_current_user)
):
    result = gesture_service.log_gesture(
        student_id=student_id,
        gesture=gesture,
        confidence=confidence
    )
    return result


@api_router.get("/gestures/stats/{student_id}")
async def get_gesture_stats(
    student_id: int,
    current_user: dict = Depends(get_current_user)
):
    return gesture_service.get_gesture_stats(student_id)


@api_router.get("/emotions", response_model=list)
async def get_emotions(
    limit: int = 100,
    current_user: dict = Depends(get_current_user)
):
    return emotion_service.get_all_emotions(limit)


@api_router.post("/emotions/log")
async def log_emotion(
    student_id: int,
    emotion: str,
    confidence: float = 0.85,
    current_user: dict = Depends(get_current_user)
):
    result = emotion_service.log_emotion(
        student_id=student_id,
        emotion=emotion,
        confidence=confidence
    )
    return result


@api_router.get("/emotions/stats/{student_id}")
async def get_emotion_stats(
    student_id: int,
    current_user: dict = Depends(get_current_user)
):
    return emotion_service.get_emotion_stats(student_id)


@api_router.get("/analytics/summary")
async def get_analytics_summary(current_user: dict = Depends(get_current_user)):
    return analytics_service.get_dashboard_summary()


@api_router.get("/analytics/trends")
async def get_weekly_trends(current_user: dict = Depends(get_current_user)):
    return analytics_service.get_weekly_trends()


@api_router.get("/analytics/gestures/distribution")
async def get_gesture_distribution(current_user: dict = Depends(get_current_user)):
    return analytics_service.get_gesture_distribution()


@api_router.get("/analytics/emotions/distribution")
async def get_emotion_distribution(current_user: dict = Depends(get_current_user)):
    return analytics_service.get_emotion_distribution()


@api_router.get("/analytics/class/{class_id}")
async def get_class_performance(
    class_id: int,
    current_user: dict = Depends(get_current_user)
):
    return analytics_service.get_class_performance(class_id)