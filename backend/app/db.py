from pymongo import MongoClient
from dotenv import load_dotenv
from bson import ObjectId
import os
from auth.hashing import hash_password

load_dotenv()
client = MongoClient(os.getenv("MONGODB_URI"))
print("connecting to mongo client")
db = client[os.getenv("MONGODB_DB", "libreflash")]
print("successfully connected to mongo client")
users_col = db["users"]

def create_user(username: str, password: str):
    if users_col.find_one({"username": username}):
        raise ValueError("Username already exists")
    return users_col.insert_one({
        "username": username,
        "hashed_password": hash_password(password)
    }).inserted_id

def get_user_by_username(username: str):
    print("in get_user_by_username")
    return users_col.find_one({"username": username})

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

def get_decks_by_owner_id(owner_id):
    decks = db.decks.find({ "owner_id": owner_id })
    return decks