import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Deck {
	_id: string;
	deck_name: string;
	is_public: boolean;
}

export default function MyDecksPage() {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchDecks() {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setError("Unauthorized");
					return;
				}

				const res = await fetch("http://localhost:8000/my-decks", {
					headers: { Authorization: `Bearer ${token}` },
				});

				if (!res.ok) {
					const text = await res.text();
					throw new Error(text);
				}

				const data = await res.json();
				setDecks(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchDecks();
	}, []);

	if (loading) return <p>Loading your decks...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;
	if (decks.length === 0) return <p>No decks found. Create some!</p>;

	return (
		<main className="deck-container">
			<h1 className="deck-title">📚 Your Flashcard Decks</h1>
			<ul>
				{decks.map((deck) => (
					<li
						key={deck._id}
						style={{
							cursor: "pointer",
							marginBottom: "1rem",
							color: "#2563eb",
							textDecoration: "underline",
						}}
						onClick={() => navigate(`/deck/${deck._id}`)}
					>
						{deck.deck_name} {deck.is_public ? "🌐" : "🔒"}
					</li>
				))}
			</ul>
		</main>
	);
}
