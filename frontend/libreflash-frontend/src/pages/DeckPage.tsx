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

      <button
        onClick={async () => {
          const res = await fetch("http://localhost:8000/export-anki/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              deck_name: data.deck_name,
              cards: data.cards,
            }),
          });
          if (res.ok) {
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "flashcards.apkg";
            a.click();
            window.URL.revokeObjectURL(url);
          } else {
            console.error("Failed to export deck:", await res.text());
            alert("Failed to export Anki deck.");
          }
        }}
        className="export-button"
      >
        Export to Anki
      </button>


    </main>
  );
}
