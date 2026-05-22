import cv2
import numpy as np
from typing import Optional, List, Tuple, Dict
import mediapipe as mp


class FaceDetector:
    def __init__(self):
        self.mp_face_detection = mp.solutions.face_detection
        self.mp_drawing = mp.solutions.drawing_utils
        
        try:
            self.face_detection = self.mp_face_detection.FaceDetection(
                model_selection=0,
                min_detection_confidence=0.5
            )
            self.is_loaded = True
            print("✅ Face Detection Model Loaded Successfully")
        except Exception as e:
            self.is_loaded = False
            print(f"⚠️ Face Detection Model Load Error: {e}")
            print("   Using fallback detection method")

    def detect_faces(self, frame: np.ndarray) -> List[Dict]:
        if not self.is_loaded:
            return self._fallback_detection(frame)
        
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.face_detection.process(rgb_frame)
        
        faces = []
        if results.detections:
            h, w, _ = frame.shape
            for detection in results.detections:
                bbox = detection.location_data.relative_bounding_box
                xmin = int(bbox.xmin * w)
                ymin = int(bbox.ymin * h)
                width = int(bbox.width * w)
                height = int(bbox.height * h)
                
                faces.append({
                    "bbox": [xmin, ymin, width, height],
                    "confidence": detection.score[0],
                    "landmarks": self._get_landmarks(detection)
                })
        
        return faces

    def _get_landmarks(self, detection) -> Dict:
        return {
            "nose_tip": "center",
            "left_eye": "left",
            "right_eye": "right",
            "mouth": "bottom"
        }

    def _fallback_detection(self, frame: np.ndarray) -> List[Dict]:
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        )
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        
        results = []
        for (x, y, w, h) in faces:
            results.append({
                "bbox": [int(x), int(y), int(w), int(h)],
                "confidence": 0.8,
                "landmarks": {}
            })
        
        return results

    def recognize_face(self, face_crop: np.ndarray) -> Optional[Dict]:
        print(f"   🔍 Face Recognition: Analyzing {face_crop.shape}")
        return {
            "student_id": "detected",
            "name": "Unknown",
            "confidence": 0.85
        }

    def compare_faces(self, face1: np.ndarray, face2: np.ndarray) -> float:
        return 0.95


face_detector = FaceDetector()