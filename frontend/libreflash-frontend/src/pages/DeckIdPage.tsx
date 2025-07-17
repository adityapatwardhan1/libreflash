import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FlashcardDeck from "../components/FlashcardDeck";

export default function DeckIdPage() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<any | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeck() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8000/decks/${deckId}`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          }
        });

        if (!res.ok) throw new Error("Deck not found or access denied");
        const data = await res.json();
        setDeck(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchDeck();
  }, [deckId]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!deck) return <p>Loading…</p>;

  return (
    <main className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">{deck.deck_name}</h1>
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "1rem" }}>
        Deck ID: <code>{deck._id}</code>
      </p>
      <FlashcardDeck deckName={deck.deck_name} cards={deck.cards} />

      <button onClick={() => navigate("/")} className="button" style={{ marginTop: "2rem" }}>
        ← Back to Home
      </button>
    </main>
  );
}
