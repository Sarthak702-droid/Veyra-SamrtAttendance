from typing import Optional, List
from datetime import datetime


class UserService:
    @staticmethod
    def get_user_by_id(user_id: str) -> Optional[dict]:
        from app.services.auth_service import USER_STORE
        for user in USER_STORE.values():
            if str(user.get("id")) == str(user_id):
                return user
        return None

    @staticmethod
    def get_user_by_phone(phone: str) -> Optional[dict]:
        from app.services.auth_service import USER_STORE
        return USER_STORE.get(phone)

    @staticmethod
    def get_all_users() -> List[dict]:
        from app.services.auth_service import USER_STORE
        return list(USER_STORE.values())

    @staticmethod
    def update_user(user_id: str, updates: dict) -> Optional[dict]:
        from app.services.auth_service import USER_STORE
        for user in USER_STORE.values():
            if str(user.get("id")) == str(user_id):
                user.update(updates)
                return user
        return None

    @staticmethod
    def delete_user(user_id: str) -> bool:
        from app.services.auth_service import USER_STORE
        for phone, user in list(USER_STORE.items()):
            if str(user.get("id")) == str(user_id):
                del USER_STORE[phone]
                return True
        return False


user_service = UserService()