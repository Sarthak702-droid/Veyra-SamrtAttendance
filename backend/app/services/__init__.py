# Services package
from app.services.auth_service import auth_service, AuthService
from app.services.user_service import user_service, UserService
from app.services.attendance_service import attendance_service, AttendanceService
from app.services.gesture_service import gesture_service, GestureService
from app.services.emotion_service import emotion_service, EmotionService
from app.services.analytics_service import analytics_service, AnalyticsService

__all__ = [
    "auth_service", "AuthService",
    "user_service", "UserService",
    "attendance_service", "AttendanceService",
    "gesture_service", "GestureService",
    "emotion_service", "EmotionService",
    "analytics_service", "AnalyticsService"
]