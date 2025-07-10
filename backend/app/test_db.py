from db import add_flashcard_deck, get_all_decks, db

def test_add_flashcard_deck():
    sample_deck_name = "Test Deck"
    sample_cards = [
        {"question": "What is 2+3?", "answer": "5"},
        {"question": "What is the capital of France?", "answer": "Paris"}
    ]
    sample_link = "https://example.com/textbook"
    sample_notes = "Sample notes for testing."

    # Insert a test deck
    add_flashcard_deck(sample_deck_name, sample_cards, sample_link, sample_notes)
    print("Inserted test deck.")

    # Verify insertion
    result = db.decks.find_one({"deck_name": sample_deck_name})
    if result:
        print("Deck found in DB:", result)
    else:
        print("Deck not found.")

if __name__ == "__main__":
    test_add_flashcard_deck()
    print("Result from get_all_decks():", get_all_decks())