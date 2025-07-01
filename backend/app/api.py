from fastapi import APIRouter, HTTPException
from models import FlashcardRequest, FlashcardResponse
from libretexts import fetch_clean_text
from flashcard_gen import generate_flashcards
import logging

router = APIRouter()
logger = logging.getLogger("uvicorn.error")  # Use Uvicorn's logger

@router.post("/generate-flashcards", response_model=FlashcardResponse)
def generate(request: FlashcardRequest):
    try:
        page_text = fetch_clean_text(request.link)
        flashcards = generate_flashcards(page_text, request.notes)
        return flashcards
    except Exception as e:
        logger.error(f"Internal error: {e}", exc_info=True)  # Logs stacktrace
        raise HTTPException(status_code=500, detail=str(e))
