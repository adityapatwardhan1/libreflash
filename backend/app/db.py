from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGODB_DB", "libreflash")]

def add_flashcard_deck(deck_name: str, cards: list, link: str, notes: str):
    result = db.decks.insert_one({
        "deck_name": deck_name,
        "cards": cards,
        "link": link,
        "notes": notes
    })
    return result.inserted_id

def get_deck_by_id(deck_id: str):
    return db.decks.find_one({"_id": ObjectId(deck_id)})
