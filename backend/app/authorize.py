from argon2 import PasswordHasher
from pymongo.collection import Collection
from bson.objectid import ObjectId
from fastapi import HTTPException
import traceback
from db import users_col

ph = PasswordHasher()

def hash_password(password: str) -> str:
    to_return = ph.hash(password)
    print("hash_password will return:", to_return)
    return to_return

def verify_password(plain_password: str, hashed_password: str) -> bool:
    print("hashed_password =", hashed_password)
    try:
        return ph.verify(hashed_password, plain_password)
    except Exception as e:
        print("Exception in verify_password")
        traceback.print_exc()
        return False
    
def create_user(username: str, password: str) -> str:
    if users_col.find_one({"username": username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    hashed = hash_password(password)
    result = users_col.insert_one({"username": username, "hashed_password": hashed})
    return str(result.inserted_id)

def authenticate_user(username: str, password: str) -> str:
    print("in authenticate_user")
    user = users_col.find_one({"username": username})
    if not user or not verify_password(password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return str(user["_id"])

def get_user_by_id(user_id: str):
    return users_col.find_one({"_id": ObjectId(user_id)})