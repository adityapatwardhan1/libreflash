import { useState } from "react"
import Flashcard from "./Flashcard"

interface DeckProps {
  deckName: string
  cards: { question: string; answer: string }[]
}

export default function FlashcardDeck({ deckName, cards }: DeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevCard = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i))
  }

  const nextCard = () => {
    setCurrentIndex((i) => (i < cards.length - 1 ? i + 1 : i))
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">{deckName}</h2>
      <Flashcard question={currentCard.question} answer={currentCard.answer} />

      <div className="flex gap-4 mt-2">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Card {currentIndex + 1} of {cards.length}
      </p>
    </div>
  )
}
