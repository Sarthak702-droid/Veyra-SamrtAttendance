from typing import List, Optional
from datetime import datetime, date
from dataclasses import dataclass


@dataclass
class AttendanceRecord:
    id: int
    student_id: int
    date: datetime
    status: str
    confidence: float
    image_path: Optional[str] = None


ATTENDANCE_STORE: List[AttendanceRecord] = []
_attendance_id_counter = 1


class AttendanceService:
    @staticmethod
    def mark_attendance(student_id: int, confidence: float = 0.95, 
                       image_path: Optional[str] = None) -> AttendanceRecord:
        global _attendance_id_counter
        
        today = date.today()
        existing = AttendanceService.get_attendance_by_date(student_id, today)
        
        if existing:
            return existing
        
        record = AttendanceRecord(
            id=_attendance_id_counter,
            student_id=student_id,
            date=datetime.now(),
            status="present",
            confidence=confidence,
            image_path=image_path
        )
        
        ATTENDANCE_STORE.append(record)
        _attendance_id_counter += 1
        
        print(f"\n{'='*50}")
        print(f"✅ Attendance Marked")
        print(f"   Student ID: {student_id}")
        print(f"   Confidence: {confidence * 100:.1f}%")
        print(f"   Time: {record.date}")
        print(f"{'='*50}\n")
        
        return record

    @staticmethod
    def get_attendance_by_date(student_id: int, attendance_date: date) -> Optional[AttendanceRecord]:
        for record in ATTENDANCE_STORE:
            if record.student_id == student_id and record.date.date() == attendance_date:
                return record
        return None

    @staticmethod
    def get_student_attendance(student_id: int, limit: int = 30) -> List[AttendanceRecord]:
        return [
            record for record in ATTENDANCE_STORE
            if record.student_id == student_id
        ][:limit]

    @staticmethod
    def get_all_attendance(limit: int = 100) -> List[AttendanceRecord]:
        return ATTENDANCE_STORE[:limit]

    @staticmethod
    def get_attendance_stats(student_id: int) -> dict:
        student_records = AttendanceService.get_student_attendance(student_id)
        total = len(student_records)
        present = len([r for r in student_records if r.status == "present"])
        
        return {
            "total_classes": total,
            "present": present,
            "absent": total - present,
            "attendance_percentage": (present / total * 100) if total > 0 else 0
        }

    @staticmethod
    def delete_attendance(attendance_id: int) -> bool:
        global ATTENDANCE_STORE
        for i, record in enumerate(ATTENDANCE_STORE):
            if record.id == attendance_id:
                ATTENDANCE_STORE.pop(i)
                return True
        return False


attendance_service = AttendanceService()