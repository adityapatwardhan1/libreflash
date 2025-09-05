# Imports
from argon2 import PasswordHasher
from bson.objectid import ObjectId
from fastapi import HTTPException, Depends
from db import users_col
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt 
from typing import Optional
import os

# Global variables
ph = PasswordHasher()
SECRET_KEY = os.getenv("SECRET_KEY") or "your-fallback-secret"
ALGORITHM = "HS256"
security = HTTPBearer(auto_error=False)

def hash_password(password: str) -> str:
    return ph.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return ph.verify(hashed_password, plain_password)
    except Exception:
        return False

def authenticate_user(username: str, password: str) -> str:
    user = users_col.find_one({"username": username})
    if not user or not verify_password(password, user.get("hashed_password") or user.get("password_hash")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return str(user["_id"])

def get_user_by_id(user_id: str):
    return users_col.find_one({"_id": ObjectId(user_id)})

def get_optional_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[dict]:
    if credentials is None:
        return None
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception:
        return None
