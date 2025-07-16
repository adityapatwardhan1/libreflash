import os, datetime, jwt

SECRET_KEY = os.getenv("SECRET_KEY", "fallback_secret")
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: int = 24):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(hours=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
