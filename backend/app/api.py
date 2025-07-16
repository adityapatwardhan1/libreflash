from fastapi import APIRouter, HTTPException, Path, Depends, HTTPException
from fastapi.responses import FileResponse
from tempfile import NamedTemporaryFile
from models import FlashcardRequest, FlashcardResponse, FlashcardExportRequest
from libretexts import fetch_clean_text
from flashcard_gen import generate_flashcards
from note_checker import check_notes_consistency
from db import add_flashcard_deck, get_deck_by_id, get_decks_by_owner_id #, get_flashcard_deck_by_id 
import genanki
import logging
from auth_routes import get_current_user
from authorize import get_optional_user
from typing import Optional

router = APIRouter()
logger = logging.getLogger("uvicorn.error")

@router.post("/generate-flashcards", response_model=FlashcardResponse)
async def generate(request: FlashcardRequest, current_user=Depends(get_current_user)):
    try:
        page_text = fetch_clean_text(request.link)

        if request.notes.strip():
            consistent = check_notes_consistency(page_text, request.notes)
            if not consistent:
                raise HTTPException(status_code=400, detail="Your notes do not appear consistent with the textbook content.")

        flashcards = generate_flashcards(page_text, request.notes)

        # Save to MongoDB and capture the ID
        deck_id = add_flashcard_deck(
            deck_name=flashcards["deck_name"],
            cards=flashcards["cards"],
            link=request.link,
            notes=request.notes,
            owner_id=current_user["user_id"],
        )
        return {
            "deck_id": str(deck_id),
            "deck_name": flashcards["deck_name"],
            "cards": flashcards["cards"],
        }


    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def download_to_anki_apkg(deck_name: str, cards: list[dict], output_path: str):
    model_id = 1392738432
    deck_id = 2070027131

    model = genanki.Model(
        model_id,
        'LibreFlash Model',
        fields=[
            {'name': 'Question'},
            {'name': 'Answer'}
        ],
        templates=[
            {
                'name': 'Card 1',
                'qfmt': '{{Question}}',
                'afmt': '{{FrontSide}}<hr id="answer">{{Answer}}',
            },
        ],
    )

    deck = genanki.Deck(deck_id, deck_name)

    for card in cards:
        note = genanki.Note(
            model=model,
            fields=[card["question"], card["answer"]],
        )
        deck.add_note(note)

    genanki.Package(deck).write_to_file(output_path)

@router.post("/export-anki/")
def export_anki(data: FlashcardExportRequest):
    try:
        with NamedTemporaryFile(delete=False, suffix=".apkg") as tmpfile:
            download_to_anki_apkg(data.deck_name, data.cards, tmpfile.name)
            return FileResponse(
                tmpfile.name,
                filename=f"{data.deck_name.replace(' ', '_')}.apkg",
                media_type="application/octet-stream"
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    


@router.get("/decks/{deck_id}")
def get_deck(deck_id: str, current_user: Optional[dict] = Depends(get_optional_user)):
    deck = get_deck_by_id(deck_id)
    if not deck:
        raise HTTPException(status_code=404, detail="Deck not found")
    is_owner = current_user and str(deck.get("owner_id")) == (current_user.get("user_id") or current_user.get("sub"))
    is_public = deck.get("is_public", False)

    if not is_public and not is_owner:
        raise HTTPException(status_code=403, detail="Not authorized")

    deck["_id"] = str(deck["_id"])
    if deck.get("owner_id"):
        deck["owner_id"] = str(deck["owner_id"])

    return deck



@router.get("/my-decks")
def get_user_decks(current_user=Depends(get_current_user)):
    user_id = current_user["user_id"]
    decks = get_decks_by_owner_id(user_id)
    decks = [{ **deck, "_id": str(deck["_id"]) } for deck in decks]
    return decks
