# LibreFlash

Generate flashcards from open educational content like LibreTexts, optionally using your own notes — with AI assistance.

## Features

- Accepts open textbook links (e.g., from LibreTexts)
- Generates question-answer flashcards using an LLM
- Optional: add your own notes for context
- Verifies notes are non-proprietary before processing
- Saves flashcard decks to MongoDB with unique Deck IDs
- Lets you retrieve saved decks using the Deck ID
- Exports decks as `.apkg` files for Anki
- Fully responsive frontend (React + FastAPI backend)

## Technologies

- **Frontend:** React (TypeScript), React Router
- **Backend:** FastAPI
- **Database:** MongoDB (Atlas)
- **AI:** LLM-based flashcard generator (via `generate_flashcards`)
- **Export:** `genanki` for `.apkg` packaging

## Running Locally

1. **Install backend dependencies:**

   ```
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**

Create a .env file in backend/:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=libreflash
```

3. **Run the backend:**

```
uvicorn main:app --reload --port 8000
```

4. **Run the frontend:**

```
cd frontend/libreflash-frontend
npm install
npm run dev
```