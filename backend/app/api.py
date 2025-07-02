from fastapi import APIRouter, HTTPException
from models import FlashcardRequest, FlashcardResponse
from libretexts import fetch_clean_text
from flashcard_gen import generate_flashcards
from note_checker import check_notes_consistency
import logging


router = APIRouter()
logger = logging.getLogger("uvicorn.error")  # Use Uvicorn's logger

@router.post("/generate-flashcards", response_model=FlashcardResponse)
async def generate(request: FlashcardRequest):
    try:
        page_text = fetch_clean_text(request.link)
        
        # Check notes consistency first
        if request.notes.strip():
            consistent = check_notes_consistency(page_text, request.notes)
            if not consistent:
                raise HTTPException(status_code=400, detail="Your notes do not appear consistent with the textbook content.")
        
        flashcards = generate_flashcards(page_text, request.notes)
        # Save to DB or return...
        return flashcards

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# @router.post("/generate-flashcards", response_model=FlashcardResponse)
# def generate(request: FlashcardRequest):
#     try:
#         page_text = fetch_clean_text(request.link)
#         flashcards = generate_flashcards(page_text, request.notes)
#         return flashcards
#     except Exception as e:
#         logger.error(f"Internal error: {e}", exc_info=True)  # Logs stacktrace
#         raise HTTPException(status_code=500, detail=str(e))
