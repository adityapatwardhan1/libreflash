from pydantic import BaseModel
from typing import List, Dict

class FlashcardRequest(BaseModel):
    link: str
    notes: str = ""

class FlashcardResponse(BaseModel):
    deck_name: str
    cards: list[dict]  # or a proper Card model

class FlashcardExportRequest(BaseModel):
    deck_name: str
    cards: List[Dict[str, str]]