import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FlashcardDeck from "../components/FlashcardDeck";

export default function DeckIdPage() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(deck._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Failed to copy deck ID");
    }
  };

  const handleExport = async () => {
    const res = await fetch("http://localhost:8000/export-anki/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deck_name: deck.deck_name, cards: deck.cards }),
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${deck.deck_name.replace(/\s+/g, "_")}.apkg`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      alert("Failed to export to Anki");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!deck) return <p>Loading…</p>;

  return (
    <main className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">{deck.deck_name}</h1>
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "1rem" }}>
        Deck ID: <code>{deck._id}</code>
        <button onClick={handleCopy} className="button" style={{ marginLeft: "8px" }}>
          Copy Deck ID
        </button>
        {copied && <div style={{ fontSize: "12px", color: "green" }}>✅ Copied!</div>}
      </p>

      <FlashcardDeck deckName={deck.deck_name} cards={deck.cards} />

      <div className="mt-6 space-y-2">
        <button onClick={handleExport} className="button">
          Export to Anki
        </button>
        <button onClick={() => navigate("/")} className="button">
          ← Back to Home
        </button>
      </div>
    </main>
  );
}
