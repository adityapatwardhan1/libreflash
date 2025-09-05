# LibreFlash

Generate flashcards from open educational content like LibreTexts, optionally using your own notes, using open-source LLMs.

Live App: [LibreFlash on Vercel](https://libreflash.vercel.app/)

Backend API: Hosted on Render; serving REST endpoints to the frontend, with **automatic deployment on commit** for seamless updates

## Features

- Accepts open textbook links (e.g., from LibreTexts)
- Generates question-answer flashcards using an LLM
- Optional: add your own notes for context
- Verifies notes are aligned with textbook content before processing, reducing chance of proprietary material
- Saves flashcard decks to MongoDB Atlas with unique Deck IDs
- Lets you retrieve your previously created decks
- Exports decks as `.apkg` files for Anki
- Fully responsive frontend (React + FastAPI backend)

## Technologies

- **Frontend:** React (TypeScript), Vite
- **Backend:** FastAPI, JWT-based authentication, argon2-cffi for secure password hashing
- **Database:** MongoDB (Atlas)
- **AI:** OpenRouter API
- **Export:** `genanki` for `.apkg` packaging

## Running Locally

1. **Install backend dependencies:**

   ```
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**

Create a .env file in backend/:
```
OPENROUTER_API_KEY=
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=libreflash
SECRET_KEY=
```
SECRET_KEY is used for encoding JWT tokens.

Ensure that the list of IP addresses given network access to MongoDB includes your own IP address.

3. **Run the backend:**

```
cd app
uvicorn main:app --reload --port 8000
```

4. **Run the frontend:**

```
cd frontend/libreflash-frontend
npm install
npm run dev
```