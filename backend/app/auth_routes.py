from fastapi import APIRouter, HTTPException, Depends, Request, Response, status, Cookie, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from db import get_user_by_username, create_user
from authorize import *
import os
import jwt
import datetime

router = APIRouter()
security = HTTPBearer()

SESSION_COOKIE_NAME = "libreflash_session"
SESSION_COOKIE_SECURE = False  # Set to True with HTTPS
SESSION_SECRET = os.environ.get("SESSION_SECRET", "supersecret")
SECRET_KEY = os.getenv("SECRET_KEY", "secret_key")

class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/register")
async def register_user(req: RegisterRequest):
    if get_user_by_username(req.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    user_id = create_user(req.username, req.password)
    return {"user_id": str(user_id)}


@router.post("/login")
def login(user: UserLogin):
    db_user = get_user_by_username(user.username)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    if not verify_password(user.password, db_user.get("hashed_password") or db_user.get("password_hash")):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # Create JWT token valid for 24h
    payload = {
        "sub": str(db_user["_id"]),
        "username": db_user["username"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return {"token": token}

def get_current_user(token: HTTPAuthorizationCredentials = Security(security)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("sub")
        username = payload.get("username")
        if user_id is None or username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return {"user_id": user_id, "username": username}
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt 
from fastapi import Request
from typing import Optional

security = HTTPBearer(auto_error=False)  # Important!

def get_optional_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    if credentials is None:
        return None
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        return payload
    except Exception:
        return None
