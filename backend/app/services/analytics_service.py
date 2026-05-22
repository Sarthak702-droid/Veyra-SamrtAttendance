from typing import Dict, List, Any
from datetime import datetime, timedelta


class AnalyticsService:
    @staticmethod
    def get_dashboard_summary() -> Dict[str, Any]:
        from app.services.attendance_service import ATTENDANCE_STORE
        from app.services.gesture_service import GESTURE_STORE
        from app.services.emotion_service import EMOTION_STORE
        
        total_attendance = len(ATTENDANCE_STORE)
        total_gestures = len(GESTURE_STORE)
        total_emotions = len(EMOTION_STORE)
        
        present_count = len([r for r in ATTENDANCE_STORE if r.status == "present"])
        attendance_rate = (present_count / total_attendance * 100) if total_attendance > 0 else 0
        
        return {
            "total_students_tracked": total_attendance,
            "total_gestures_detected": total_gestures,
            "total_emotion_records": total_emotions,
            "attendance_rate": round(attendance_rate, 2),
            "average_engagement": 85.5
        }

    @staticmethod
    def get_weekly_trends() -> List[Dict[str, Any]]:
        trends = []
        for i in range(7):
            date = datetime.now() - timedelta(days=6-i)
            trends.append({
                "date": date.strftime("%Y-%m-%d"),
                "day": date.strftime("%A"),
                "attendance": 85 + (i * 2) % 15,
                "engagement": 70 + (i * 3) % 25,
                "gestures": 20 + (i * 5) % 30
            })
        return trends

    @staticmethod
    def get_gesture_distribution() -> Dict[str, int]:
        from app.services.gesture_service import GESTURE_STORE
        
        distribution = {}
        for record in GESTURE_STORE:
            distribution[record.gesture] = distribution.get(record.gesture, 0) + 1
        
        return distribution

    @staticmethod
    def get_emotion_distribution() -> Dict[str, int]:
        from app.services.emotion_service import EMOTION_STORE
        
        distribution = {}
        for record in EMOTION_STORE:
            distribution[record.emotion] = distribution.get(record.emotion, 0) + 1
        
        return distribution

    @staticmethod
    def get_class_performance(class_id: int) -> Dict[str, Any]:
        return {
            "class_id": class_id,
            "average_attendance": 92.5,
            "engagement_score": 88.0,
            "top_gestures": {
                "thumbs_up": 45,
                "raised_hand": 30,
                "ok_sign": 25
            },
            "emotion_breakdown": {
                "attentive": 55,
                "happy": 25,
                "neutral": 15,
                "distracted": 5
            }
        }


analytics_service = AnalyticsService()