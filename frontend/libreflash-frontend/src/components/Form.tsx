// src/components/Form.tsx
import { useState } from "react"
import { generateFlashcards } from "../api/libreflash"
import "./Form.css"

interface Props {
  onSubmitSuccess: (cards: any) => void
  onError: (msg: string) => void
}

export default function Form({ onSubmitSuccess, onError }: Props) {
  const [link, setLink] = useState("")
  const [notes, setNotes] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!confirmed) return onError("You must confirm your notes are not proprietary.")
    try {
      setLoading(true)
      const response = await generateFlashcards({ link, notes })
      onSubmitSuccess(response)
    } catch (err: any) {
      onError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <main className="form-main">
        <form onSubmit={handleSubmit} className="form-content">
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
              />
              <span>I confirm my notes are not proprietary</span>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Generating…" : "Generate Flashcards"}
            </button>
          </div>
        </form>
      </main>

      <footer className="form-footer" />
    </div>
  )
}