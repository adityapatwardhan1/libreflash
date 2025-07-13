from fastapi import APIRouter, HTTPException, Depends, Request, Response, status, Cookie, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
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
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

# @router.post("/register")
# def register(user: UserRegister):
#     try:
#         user_id = create_user(user.username, user.password)
#         return {"message": "User created", "user_id": user_id}
#     except ValueError as e:
#         raise HTTPException(status_code=400, detail=str(e))

class RegisterRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
async def register_user(req: RegisterRequest):
    print("in register_user")
    if get_user_by_username(req.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    user_id = create_user(req.username, req.password)
    return {"user_id": str(user_id)}


@router.post("/login")
def login(user: UserLogin):
    print("in login")
    db_user = get_user_by_username(user.username)
    print("got db_user")
    print("db_user =", db_user)
    if not db_user:
        print("not db_user")
        raise HTTPException(status_code=401, detail="Invalid username or password")
    if not verify_password(user.password, db_user["password_hash"]):
        print("password verification failed")
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # Create JWT token valid for 24h
    payload = {
        "sub": str(db_user["_id"]),
        "username": db_user["username"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    print("getting token")
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    print({"token": token})
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



# @router.post("/register")
# def register(user: RegisterRequest):
#     if get_user_by_username(user.username):
#         raise HTTPException(status_code=409, detail="Username already exists")

#     hashed = hash_password(user.password)
#     create_user(user.username, user.email, hashed)
#     return {"message": "User registered successfully"}

# @router.post("/login")
# def login(data: LoginRequest, response: Response):
#     user = get_user_by_username(data.username)
#     if not user or not verify_password(data.password, user["password"]):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     session_token = create_session_token(user["_id"], SESSION_SECRET)
#     response.set_cookie(
#         key=SESSION_COOKIE_NAME,
#         value=session_token,
#         httponly=True,
#         secure=SESSION_COOKIE_SECURE,
#         max_age=3600 * 24 * 7,  # 7 days
#         samesite="lax",
#         path="/"
#     )
#     return {"message": "Logged in successfully"}

# @router.post("/logout")
# def logout(response: Response):
#     response.delete_cookie(SESSION_COOKIE_NAME)
#     return {"message": "Logged out"}

# @router.get("/me")
# def get_current_user(session_token: str = Cookie(None)):
#     if not session_token:
#         raise HTTPException(status_code=401, detail="Not logged in")

#     user_id = verify_session_token(session_token, SESSION_SECRET)
#     if not user_id:
#         raise HTTPException(status_code=401, detail="Invalid session")

#     return {"user_id": user_id}
