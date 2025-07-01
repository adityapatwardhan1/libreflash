// import { Routes, Route } from "react-router-dom"
// import HomePage from "./pages/HomePage"
// import DeckPage from "./pages/DeckPage"

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/deck" element={<DeckPage />} />
//     </Routes>
//   )
// }

// export default App;


// src/App.tsx
// import { Routes, Route } from "react-router-dom"
// import HomePage from "./pages/HomePage"
// import DeckPage from "./pages/DeckPage"

// import './App.css'

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/deck" element={<DeckPage />} />
//     </Routes>
//   )
// }


// import { useState } from 'react'
// import { Routes, Route } from "react-router-dom"
// import HomePage from "./pages/HomePage"
// import DeckPage from "./pages/DeckPage"

// import './App.css'

// import Form from "./components/Form";
// import FlashcardDeck from "./components/FlashcardDeck";

// function App() {
//   const [cards, setCards] = useState<{ question: string; answer: string }[] | null>(null);
//   const [deckName, setDeckName] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   return (
//     <main className="max-w-2xl mx-auto p-4 text-center">
//       <h1 className="text-2xl font-bold mb-6">LibreFlash</h1>

//       <div className="space-y-12">  {/* Add space between form and cards */}
//         <Form
//           onSubmitSuccess={(data) => {
//             setCards(data.cards);
//             setDeckName(data.deck_name);
//             setError("");
//           }}
//           onError={(msg) => setError(msg)}
//         />
        
//         {error && <p className="text-red-600 mt-4">{error}</p>}
        
//         {cards && <FlashcardDeck deckName={deckName} cards={cards} />}
//       </div>
//     </main>

//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DeckPage from "./pages/DeckPage";
import './App.css';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/deck" element={<DeckPage />} />
    </Routes>
  );
}
