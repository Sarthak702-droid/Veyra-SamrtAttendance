import random
import string
from datetime import datetime, timedelta
from typing import Optional, Dict
from app.config import settings
from app.core.token import create_access_token
from app.core.security import verify_password, get_password_hash


OTP_STORE: Dict[str, dict] = {}
USER_STORE: Dict[str, dict] = {}

def _seed_demo_users():
    global USER_STORE
    USER_STORE = {
        "1111111111": {
            "id": "1", "name": "Student User", "phone": "1111111111",
            "password": get_password_hash("student123"),
            "role": "student", "email": "student@demo.com",
            "department": "Computer Science", "enrollment_no": "CS2024001",
        },
        "2222222222": {
            "id": "2", "name": "Teacher User", "phone": "2222222222",
            "password": get_password_hash("teacher123"),
            "role": "teacher", "email": "teacher@demo.com",
            "department": "Computer Science",
        },
        "9876543210": {
            "id": "3", "name": "Admin User", "phone": "9876543210",
            "password": get_password_hash("admin123"),
            "role": "admin", "email": "admin@verya.com",
        },
    }

_seed_demo_users()

_DEMO_ROLE_MAP = {
    "1111111111": "student",
    "2222222222": "teacher",
    "9876543210": "admin",
}

_DEMO_NAMES = {
    "1111111111": "Student User",
    "2222222222": "Teacher User",
    "9876543210": "Admin User",
}

_DEMO_EMAILS = {
    "1111111111": "student@demo.com",
    "2222222222": "teacher@demo.com",
    "9876543210": "admin@verya.com",
}


class AuthService:
    @staticmethod
    def generate_otp() -> str:
        return ''.join(random.choices(string.digits, k=settings.OTP_LENGTH))

    @staticmethod
    def send_otp(phone: str) -> dict:
        otp = AuthService.generate_otp()
        expires_at = datetime.utcnow() + timedelta(minutes=settings.OTP_EXPIRE_MINUTES)
        
        OTP_STORE[phone] = {"otp": otp, "expires_at": expires_at, "attempts": 0}
        
        print(f"\n{'='*50}")
        print(f"📱 OTP for {phone}")
        print(f"   OTP: {otp}")
        print(f"   Expires in: {settings.OTP_EXPIRE_MINUTES} minutes")
        print(f"{'='*50}\n")
        
        return {"message": "OTP sent successfully", "phone": phone, "otp": otp}

    @staticmethod
    def verify_otp(phone: str, otp: str) -> Optional[dict]:
        if phone not in OTP_STORE:
            return None
        
        stored = OTP_STORE[phone]
        
        if datetime.utcnow() > stored["expires_at"]:
            del OTP_STORE[phone]
            return None
        if stored["attempts"] >= 3:
            del OTP_STORE[phone]
            return None
        if stored["otp"] != otp:
            stored["attempts"] += 1
            return None
        
        del OTP_STORE[phone]
        
        user_data = USER_STORE.get(phone)
        if not user_data:
            role = _DEMO_ROLE_MAP.get(phone, "student")
            user_data = {
                "id": _DEMO_ROLE_MAP.get(phone, "student"),
                "name": _DEMO_NAMES.get(phone, "Demo User"),
                "phone": phone,
                "role": role,
                "email": _DEMO_EMAILS.get(phone, f"{phone}@demo.com"),
            }
            USER_STORE[phone] = user_data
        
        access_token = create_access_token(
            data={"sub": phone, "user_id": user_data["id"], "role": user_data["role"]}
        )
        
        safe_user = {k: v for k, v in user_data.items() if k != "password"}
        return {"access_token": access_token, "token_type": "bearer", "user": safe_user}

    @staticmethod
    def login_with_password(phone: str, password: str) -> Optional[dict]:
        user_data = USER_STORE.get(phone)
        
        if not user_data:
            if phone in _DEMO_ROLE_MAP and password in ["student123", "teacher123", "admin123"]:
                expected = {"1111111111": "student123", "2222222222": "teacher123", "9876543210": "admin123"}
                if password == expected.get(phone, ""):
                    user_data = {
                        "id": str(list(_DEMO_ROLE_MAP.keys()).index(phone) + 1),
                        "name": _DEMO_NAMES[phone],
                        "phone": phone,
                        "role": _DEMO_ROLE_MAP[phone],
                        "email": _DEMO_EMAILS[phone],
                    }
                    USER_STORE[phone] = user_data
            if not user_data:
                return None
        
        if "password" in user_data:
            if not verify_password(password, user_data["password"]):
                print(f"❌ Failed login attempt for {phone}: wrong password")
                return None
        
        access_token = create_access_token(
            data={"sub": phone, "user_id": user_data["id"], "role": user_data["role"]}
        )
        
        safe_user = {k: v for k, v in user_data.items() if k != "password"}
        return {"access_token": access_token, "token_type": "bearer", "user": safe_user}

    @staticmethod
    def register(name: str, email: str, phone: str, password: str, role: str = "student",
                 department: str = None, enrollment_no: str = None) -> dict:
        if phone in USER_STORE:
            return {"error": "User already exists"}
        
        user_data = {
            "id": str(len(USER_STORE) + 1),
            "name": name, "email": email, "phone": phone,
            "password": get_password_hash(password),
            "role": role, "department": department,
            "enrollment_no": enrollment_no, "created_at": datetime.utcnow()
        }
        
        USER_STORE[phone] = user_data
        
        print(f"\n{'='*50}")
        print(f"📝 New User Registered")
        print(f"   Name: {name}   Phone: {phone}   Role: {role}")
        print(f"{'='*50}\n")
        
        return {"message": "User registered successfully", "user_id": user_data["id"]}

    @staticmethod
    def get_user_by_phone(phone: str) -> Optional[dict]:
        return USER_STORE.get(phone)


auth_service = AuthService()