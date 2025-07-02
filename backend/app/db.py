from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("MONGODB_DB", "libreflash")]

def add_flashcard_deck(deck_name: str, cards: list, link: str, notes: str):
    db.decks.insert_one({
        "deck_name": deck_name,
        "cards": cards,
        "link": link,
        "notes": notes
    })