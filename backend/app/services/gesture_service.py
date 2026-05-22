from typing import List, Optional
from datetime import datetime
from dataclasses import dataclass


@dataclass
class GestureRecord:
    id: int
    student_id: int
    gesture: str
    timestamp: datetime
    confidence: float


GESTURE_STORE: List[GestureRecord] = []
_gesture_id_counter = 1


class GestureService:
    GESTURE_TYPES = {
        "thumbs_up": "👍",
        "raised_hand": "✋",
        "ok_sign": "👌",
        "peace_sign": "✌️",
        "fist": "✊"
    }

    @staticmethod
    def log_gesture(student_id: int, gesture: str, confidence: float = 0.90) -> GestureRecord:
        global _gesture_id_counter
        
        if gesture not in GestureService.GESTURE_TYPES:
            gesture = "unknown"
        
        record = GestureRecord(
            id=_gesture_id_counter,
            student_id=student_id,
            gesture=gesture,
            timestamp=datetime.now(),
            confidence=confidence
        )
        
        GESTURE_STORE.append(record)
        _gesture_id_counter += 1
        
        emoji = GestureService.GESTURE_TYPES.get(gesture, "❓")
        print(f"\n{'='*50}")
        print(f"👋 Gesture Detected")
        print(f"   Student ID: {student_id}")
        print(f"   Gesture: {emoji} {gesture}")
        print(f"   Confidence: {confidence * 100:.1f}%")
        print(f"   Time: {record.timestamp}")
        print(f"{'='*50}\n")
        
        return record

    @staticmethod
    def get_student_gestures(student_id: int, limit: int = 50) -> List[GestureRecord]:
        return [
            record for record in GESTURE_STORE
            if record.student_id == student_id
        ][:limit]

    @staticmethod
    def get_all_gestures(limit: int = 100) -> List[GestureRecord]:
        return GESTURE_STORE[:limit]

    @staticmethod
    def get_gesture_stats(student_id: int) -> dict:
        gestures = GestureService.get_student_gestures(student_id)
        
        gesture_counts = {}
        for gesture in gestures:
            gesture_counts[gesture.gesture] = gesture_counts.get(gesture.gesture, 0) + 1
        
        total = len(gestures)
        
        return {
            "total_gestures": total,
            "by_type": gesture_counts,
            "most_common": max(gesture_counts, key=gesture_counts.get) if gesture_counts else None
        }

    @staticmethod
    def delete_gesture(gesture_id: int) -> bool:
        global GESTURE_STORE
        for i, record in enumerate(GESTURE_STORE):
            if record.id == gesture_id:
                GESTURE_STORE.pop(i)
                return True
        return False


gesture_service = GestureService()