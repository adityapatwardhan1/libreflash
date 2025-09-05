import { useLocation, useNavigate } from "react-router-dom";
import FlashcardDeck from "../components/FlashcardDeck";
import { useEffect, useState } from "react";
import "../App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function DeckPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(data.deck_id);
			setCopied(true);
			setTimeout(() => setCopied(false), 1500); // Reset after 1.5 seconds
		} catch (err) {
			alert("Failed to copy deck ID");
		}
	};

	const data = location.state;

	useEffect(() => {
		if (!data) navigate("/");
	}, [data, navigate]);

	if (!data) return null;

	return (
		<main className="max-w-2xl mx-auto p-4 text-center">
			<h1 className="text-2xl font-bold mb-6">{data.deck_name}</h1>

			{data.deck_id && (
				<div
					style={{
						fontSize: "14px",
						color: "#555",
						marginBottom: "1rem",
					}}
				>
					Deck ID: <code>{data.deck_id}</code>
					<button
						onClick={handleCopy}
						className="button"
						style={{ marginBottom: "0.5rem" }}
					>
						Copy Deck ID
					</button>
					{copied && (
						<div style={{ fontSize: "12px", color: "green" }}>
							✅ Copied!
						</div>
					)}
				</div>
			)}

			<FlashcardDeck deckName={data.deck_name} cards={data.cards} />

			<button onClick={() => navigate(-1)} className="button">
				← Back
			</button>

			<button
				onClick={async () => {
					const res = await fetch(
						`${API_URL}/export-anki/`,
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								deck_name: data.deck_name,
								cards: data.cards,
							}),
						},
					);
					if (res.ok) {
						const blob = await res.blob();
						const url = window.URL.createObjectURL(blob);
						const a = document.createElement("a");
						a.href = url;
						a.download = `${data.deck_name.replace(/\s+/g, "_")}.apkg`;
						a.click();
						window.URL.revokeObjectURL(url);
					}
				}}
				className="button"
			>
				Export to Anki
			</button>
		</main>
	);
}
