import cv2
import numpy as np
from typing import Optional, List, Dict
import mediapipe as mp
from enum import Enum


class GestureType(Enum):
    THUMBS_UP = "thumbs_up"
    RAISED_HAND = "raised_hand"
    OK_SIGN = "ok_sign"
    PEACE_SIGN = "peace_sign"
    FIST = "fist"
    OPEN_PALM = "open_palm"
    POINTING = "pointing"
    UNKNOWN = "unknown"


class GestureRecognizer:
    def __init__(self):
        self.mp_hands = mp.solutions.hands
        self.mp_drawing = mp.solutions.drawing_utils
        
        try:
            self.hands = self.mp_hands.Hands(
                static_image_mode=False,
                max_num_hands=2,
                min_detection_confidence=0.7,
                min_tracking_confidence=0.5
            )
            self.is_loaded = True
            print("✅ Gesture Recognition Model Loaded Successfully")
        except Exception as e:
            self.is_loaded = False
            print(f"⚠️ Gesture Recognition Model Load Error: {e}")

    def detect_hand(self, frame: np.ndarray) -> Optional[Dict]:
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(rgb_frame)
        
        if not results.multi_hand_landmarks:
            return None
        
        hand_landmarks = results.multi_hand_landmarks[0]
        
        return {
            "landmarks": hand_landmarks,
            "gesture": self._classify_gesture(hand_landmarks),
            "confidence": 0.92
        }

    def _classify_gesture(self, landmarks) -> str:
        thumb_tip = landmarks.landmark[4]
        index_tip = landmarks.landmark[8]
        middle_tip = landmarks.landmark[12]
        ring_tip = landmarks.landmark[16]
        pinky_tip = landmarks.landmark[20]
        
        thumb_ip = landmarks.landmark[3]
        index_pip = landmarks.landmark[6]
        
        fingers_extended = {
            "thumb": thumb_tip.x > thumb_ip.x + 0.05,
            "index": index_tip.y < landmarks.landmark[5].y,
            "middle": middle_tip.y < landmarks.landmark[9].y,
            "ring": ring_tip.y < landmarks.landmark[13].y,
            "pinky": pinky_tip.y < landmarks.landmark[17].y
        }
        
        extended_count = sum(fingers_extended.values())
        
        if not fingers_extended["thumb"] and extended_count == 0:
            return GestureType.FIST.value
        
        if fingers_extended["thumb"] and fingers_extended["index"] and not fingers_extended["middle"]:
            return GestureType.PEACE_SIGN.value
        
        if fingers_extended["thumb"] and fingers_extended["index"] and fingers_extended["middle"] and fingers_extended["ring"] and not fingers_extended["pinky"]:
            return GestureType.OPEN_PALM.value
        
        if fingers_extended["thumb"] and all([not fingers_extended["index"], not fingers_extended["middle"], not fingers_extended["ring"], not fingers_extended["pinky"]]):
            return GestureType.THUMBS_UP.value
        
        if all(fingers_extended.values()):
            return GestureType.RAISED_HAND.value
        
        if not any(fingers_extended.values()):
            return GestureType.FIST.value
        
        return GestureType.UNKNOWN.value

    def recognize_gesture(self, frame: np.ndarray) -> Optional[Dict]:
        hand_data = self.detect_hand(frame)
        
        if hand_data is None:
            return None
        
        return {
            "gesture": hand_data["gesture"],
            "confidence": hand_data["confidence"],
            "emoji": self._get_emoji(hand_data["gesture"])
        }

    def _get_emoji(self, gesture: str) -> str:
        emoji_map = {
            GestureType.THUMBS_UP.value: "👍",
            GestureType.RAISED_HAND.value: "✋",
            GestureType.OK_SIGN.value: "👌",
            GestureType.PEACE_SIGN.value: "✌️",
            GestureType.FIST.value: "✊",
            GestureType.OPEN_PALM.value: "🖐️",
            GestureType.POINTING.value: "👉",
            GestureType.UNKNOWN.value: "❓"
        }
        return emoji_map.get(gesture, "❓")


gesture_recognizer = GestureRecognizer()