import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateFlashcards } from "../api/libreflash";
import "../App.css";

interface Props {
	onError: (msg: string) => void;
	onSubmitSuccess: (data: any) => void;
}

export default function Form({ onSubmitSuccess, onError }: Props) {
	const [link, setLink] = useState("");
	const [notes, setNotes] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [loading, setLoading] = useState(false);
	const [searchId, setSearchId] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!confirmed) return onError("You must confirm your notes are not proprietary.");
		try {
		setLoading(true);
		const response = await generateFlashcards({ link, notes });
		onSubmitSuccess({ ...response, link, notes }); 
		} catch (err: any) {
		onError(err.message);
		} finally {
		setLoading(false);
		}
	}

	return (
		<div className="form-container">
			<main className="form-main">
				<div className="form-columns">
					<form onSubmit={handleSubmit} className="form-box">
						<div className="form-group">
							<label>Textbook Link</label>
							<input
							type="url"
							placeholder="Paste open textbook link (e.g. LibreTexts)"
							value={link}
							onChange={(e) => setLink(e.target.value)}
							required
							/>
						</div>

						<div className="form-group">
							<label>Your Notes (Optional)</label>
							<textarea
							placeholder="Optional: Your notes"
							value={notes}
							onChange={(e) => setNotes(e.target.value)}
							/>
						</div>

						<div className="form-group">
							<div className="form-checkbox">
							<input
								type="checkbox"
								checked={confirmed}
								onChange={(e) => setConfirmed(e.target.checked)}
								id="confirm-checkbox"
							/>
							<label htmlFor="confirm-checkbox">
								I confirm my notes (if any) are not proprietary
							</label>
							</div>
							<button type="submit" disabled={loading || !confirmed}>
							{loading ? "Generating…" : "Generate Flashcards"}
							</button>
						</div>
					</form>

					<form className="form-box">
						<div style={{ textAlign: "center" }}>
							<button
								onClick={() => navigate("/my-decks")}
								style={{
									padding: "0.5rem 0.5rem",
									fontSize: "1rem",
									border: "1px solid #ccc",
									borderRadius: "4px",
									backgroundColor: "#f0f0f0",
									cursor: "pointer",
								}}
							>
								📚 View My Decks
							</button>
						</div>
					</form>

					<form
					onSubmit={(e) => {
						e.preventDefault();
						if (searchId.trim()) window.location.href = `/deck/${searchId.trim()}`;
					}}
					className="form-box"
					>
						<div className="form-group">
							<label>🔍 Load a Saved Deck</label>
							<input
							type="text"
							placeholder="Enter Deck ID"
							value={searchId}
							onChange={(e) => setSearchId(e.target.value)}
							/>
							<button type="submit" disabled={!searchId.trim()}>Load Deck</button>
						</div>
					</form>

					

				</div>

				
			</main>
			<footer className="form-footer" />
		</div>
	);
}
