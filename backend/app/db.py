from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId
from argon2 import PasswordHasher

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGODB_DB", "libreflash")]
ph = PasswordHasher()
users = db["users"]
users_col = db["users"]
decks_col = db["decks"]


def add_flashcard_deck(deck_name: str, cards: list, link: str, notes: str, owner_id: ObjectId = None, is_public: bool = False):
    result = db.decks.insert_one({
        "deck_name": deck_name,
        "cards": cards,
        "link": link,
        "notes": notes,
        "owner_id": owner_id,
        "is_public": is_public
    })
    return result.inserted_id


def get_deck_by_id(deck_id: str):
    return db.decks.find_one({"_id": ObjectId(deck_id)})


def create_user(username: str, password: str):
    # Hash password
    password_hash = ph.hash(password)
    # Check if user exists
    if users.find_one({"username": username}):
        raise ValueError("Username already exists")
    result = users.insert_one({"username": username, "password_hash": password_hash})
    return str(result.inserted_id)


def get_user_by_username(username: str):
    return users.find_one({"username": username})


def verify_password(stored_hash: str, provided_password: str) -> bool:
    try:
        ph.verify(stored_hash, provided_password)
        return True
    except:
        return False