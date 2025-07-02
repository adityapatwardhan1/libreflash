from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from models import FlashcardRequest, FlashcardResponse
from libretexts import fetch_clean_text
from flashcard_gen import generate_flashcards
from note_checker import check_notes_consistency
import logging
from db import add_flashcard_deck 
import genanki


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
        
        add_flashcard_deck(
            deck_name=flashcards["deck_name"],
            cards=flashcards["cards"],
            link=request.link,
            notes=request.notes
        )

        return flashcards

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

import genanki

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


@router.post("/download-anki/")
def download_anki_flashcards(request: FlashcardRequest):
    try:
        page_text = fetch_clean_text(request.link)
        flashcards_data = generate_flashcards(page_text, request.notes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate flashcards: {e}")

    output_path = "/tmp/flashcards.apkg"
    download_to_anki_apkg(flashcards_data["deck_name"], flashcards_data["cards"], output_path)

    return FileResponse(
        output_path,
        filename=f'{flashcards_data["deck_name"].replace(" ", "_")}.apkg',
        media_type='application/vnd.apkg',
    )
