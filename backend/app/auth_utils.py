from fastapi import Depends, HTTPException, Header
import jwt  # This is PyJWT
import os

SECRET_KEY = os.getenv("SECRET_KEY", "secret_key")
ALGORITHM = "HS256"

def get_current_user_id(authorization: str = Header(...)):
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise ValueError("Invalid scheme")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id") or payload.get("sub")  # fallback for legacy
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        return user_id
    except (ValueError, jwt.PyJWTError):
        raise HTTPException(status_code=401, detail="Invalid or missing token")
