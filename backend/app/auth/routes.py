from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import get_user_by_username, create_user
from .hashing import verify_password
from .jwt import create_access_token

router = APIRouter()

class AuthRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
def register_user(req: AuthRequest):
    if get_user_by_username(req.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    user_id = create_user(req.username, req.password)
    return {"user_id": str(user_id)}

@router.post("/login")
def login_user(req: AuthRequest):
    user = get_user_by_username(req.username)
    if not user or not verify_password(req.password, user.get("hashed_password") or user.get("password_hash")):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token({"user_id": str(user["_id"]), "username": user["username"]})
    return {"token": token}
