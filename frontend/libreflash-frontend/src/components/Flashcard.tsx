import { useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="card" onClick={() => setShowAnswer(!showAnswer)} role="button" tabIndex={0}>
      <p><strong>Q:</strong> {question}</p>
      {showAnswer && <p className="mt-2"><strong>A:</strong> {answer}</p>}
    </div>
  );
}
