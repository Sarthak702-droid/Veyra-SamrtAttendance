from typing import List, Optional
from datetime import datetime
from dataclasses import dataclass


@dataclass
class EmotionRecord:
    id: int
    student_id: int
    emotion: str
    timestamp: datetime
    confidence: float


EMOTION_STORE: List[EmotionRecord] = []
_emotion_id_counter = 1


class EmotionService:
    EMOTION_TYPES = [
        "happy",
        "sad",
        "angry",
        "fear",
        "surprise",
        "disgust",
        "neutral",
        "attentive",
        "sleepy",
        "confused",
        "distracted"
    ]

    @staticmethod
    def log_emotion(student_id: int, emotion: str, confidence: float = 0.85) -> EmotionRecord:
        global _emotion_id_counter
        
        if emotion not in EmotionService.EMOTION_TYPES:
            emotion = "neutral"
        
        record = EmotionRecord(
            id=_emotion_id_counter,
            student_id=student_id,
            emotion=emotion,
            timestamp=datetime.now(),
            confidence=confidence
        )
        
        EMOTION_STORE.append(record)
        _emotion_id_counter += 1
        
        emoji_map = {
            "happy": "😊",
            "sad": "😢",
            "angry": "😠",
            "fear": "😨",
            "surprise": "😲",
            "disgust": "🤢",
            "neutral": "😐",
            "attentive": "👀",
            "sleepy": "😴",
            "confused": "😕",
            "distracted": "🙄"
        }
        
        emoji = emoji_map.get(emotion, "😐")
        print(f"\n{'='*50}")
        print(f"😊 Emotion Detected")
        print(f"   Student ID: {student_id}")
        print(f"   Emotion: {emoji} {emotion}")
        print(f"   Confidence: {confidence * 100:.1f}%")
        print(f"   Time: {record.timestamp}")
        print(f"{'='*50}\n")
        
        return record

    @staticmethod
    def get_student_emotions(student_id: int, limit: int = 50) -> List[EmotionRecord]:
        return [
            record for record in EMOTION_STORE
            if record.student_id == student_id
        ][:limit]

    @staticmethod
    def get_all_emotions(limit: int = 100) -> List[EmotionRecord]:
        return EMOTION_STORE[:limit]

    @staticmethod
    def get_emotion_stats(student_id: int) -> dict:
        emotions = EmotionService.get_student_emotions(student_id)
        
        emotion_counts = {}
        for emotion in emotions:
            emotion_counts[emotion.emotion] = emotion_counts.get(emotion.emotion, 0) + 1
        
        total = len(emotions)
        
        engaged_emotions = ["happy", "attentive", "surprise"]
        disengaged_emotions = ["sleepy", "distracted", "sad"]
        
        engaged_count = sum(emotion_counts.get(e, 0) for e in engaged_emotions)
        disengaged_count = sum(emotion_counts.get(e, 0) for e in disengaged_emotions)
        
        return {
            "total_records": total,
            "by_type": emotion_counts,
            "most_common": max(emotion_counts, key=emotion_counts.get) if emotion_counts else None,
            "engagement_score": (engaged_count / total * 100) if total > 0 else 50
        }

    @staticmethod
    def delete_emotion(emotion_id: int) -> bool:
        global EMOTION_STORE
        for i, record in enumerate(EMOTION_STORE):
            if record.id == emotion_id:
                EMOTION_STORE.pop(i)
                return True
        return False


emotion_service = EmotionService()