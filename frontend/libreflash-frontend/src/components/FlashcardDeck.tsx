import Flashcard from "./Flashcard"
import { useState } from "react"
import "../App.css"

interface DeckProps {
  deckName: string
  cards: { question: string; answer: string }[]
}

export function formatClozeText(text: string) {
  const parts = [];
  let lastIndex = 0;

  const regex = /\{\{c\d+::(.*?)\}\}/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span key={match.index} style={{borderBottom: "1px solid black", padding: "0 4px"}}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}


export default function FlashcardDeck({ deckName, cards }: DeckProps) {
  const [index, setIndex] = useState(0)

  function prevCard() {
    setIndex((i) => (i > 0 ? i - 1 : i))
  }

  function nextCard() {
    setIndex((i) => (i < cards.length - 1 ? i + 1 : i))
  }

  const card = cards[index];
  const isCloze = /\{\{c\d+::.*?\}\}/.test(card.question);

  return (
    <div className="deck-container">
      <h2 className="deck-title">{deckName}</h2>

      <Flashcard
        question={isCloze ? formatClozeText(card.question) : card.question}
        answer={card.answer}
      />

      <div className="nav-buttons">
        <button onClick={prevCard} disabled={index === 0} className="nav-btn">← Prev</button>
        <span className="card-count">{index + 1} / {cards.length}</span>
        <button onClick={nextCard} disabled={index === cards.length - 1} className="nav-btn">Next →</button>
      </div>
    </div>
  )
}
