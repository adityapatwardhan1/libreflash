import { useLocation, useNavigate } from "react-router-dom";
import FlashcardDeck from "../components/FlashcardDeck";
import { useEffect } from "react";
import '../App.css';

export default function DeckPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  useEffect(() => {
    if (!data) navigate("/");
  }, [data, navigate]);

  if (!data) return null;

  return (
    <main className="max-w-2xl mx-auto p-4 text-center">
      
      <h1 className="text-2xl font-bold mb-6">{data.deck_name}</h1>

      <FlashcardDeck deckName={data.deck_name} cards={data.cards} />
    
      <button
        onClick={() => navigate(-1)}
        className="button"
      >
        ← Back
      </button>

    </main>
  );
}
