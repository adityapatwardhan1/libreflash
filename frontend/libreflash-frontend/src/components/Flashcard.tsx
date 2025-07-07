// import { useState } from "react";

// interface FlashcardProps {
//   question: string;
//   answer: string;
// }

// export default function Flashcard({ question, answer }: FlashcardProps) {
//   const [showAnswer, setShowAnswer] = useState(false);

//   return (
//     <div className="card" onClick={() => setShowAnswer(!showAnswer)} role="button" tabIndex={0}>
//       <p><strong>Q:</strong> {question}</p>
//       {showAnswer && <p className="mt-2"><strong>A:</strong> {answer}</p>}
//     </div>
//   );
// }

// import { useState } from "react";
// import '../App.css';


// interface FlashcardProps {
//   question: string;
//   answer: string;
// }

// export default function Flashcard({ question, answer }: FlashcardProps) {
//   const [showAnswer, setShowAnswer] = useState(false);

//   return (
//     <div
//       onClick={() => setShowAnswer(!showAnswer)}
//       className="card"
//       style={{ minHeight: 100 }}
//     >
//       <p><strong>Q:</strong> {question}</p>
//       {showAnswer && (
//         <p className="mt-2 text-gray-700">
//           <strong>A:</strong> {answer}
//         </p>
//       )}
//     </div>
//   );
// }
// src/components/Flashcard.tsx
import { useState } from "react"
import type { ReactNode } from "react"
import "../App.css"

interface FlashcardProps {
  question: string | ReactNode;
  answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div
      onClick={() => setShowAnswer(!showAnswer)}
      className="card"
      style={{ minHeight: 100 }}
    >
      <p><strong>Q:</strong> {question}</p>
      {showAnswer && (
        <p className="mt-2 text-gray-700">
          <strong>A:</strong> {answer}
        </p>
      )}
    </div>
  );
}
