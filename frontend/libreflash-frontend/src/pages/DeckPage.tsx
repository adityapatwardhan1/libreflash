// src/pages/DeckPage.tsx
import { useLocation, useNavigate } from "react-router-dom"
import FlashcardDeck from "../components/FlashcardDeck"

export default function DeckPage() {
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state) {
    // Redirect back to home if no deck data
    navigate("/")
    return null
  }

  const { deck_name, cards } = state

  return (
    <main className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-6">{deck_name}</h1>

      <div className="space-y-12">
        <FlashcardDeck deckName={deck_name} cards={cards} />

        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Generate Another Deck
        </button>
      </div>
    </main>
  )
}
