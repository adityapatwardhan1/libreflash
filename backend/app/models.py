from pydantic import BaseModel

class FlashcardRequest(BaseModel):
    link: str
    notes: str = ""

class FlashcardResponse(BaseModel):
    deck_name: str
    cards: list[dict]  # or a proper Card model
