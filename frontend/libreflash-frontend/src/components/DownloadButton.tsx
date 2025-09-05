import { useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function DownloadButton({ link, notes }: { link: string, notes: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/api/download-anki/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link, notes }),
      })

      if (!response.ok) throw new Error("Failed to download deck")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "deck.apkg"
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      alert("Download failed")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Downloading…" : "Download Anki Deck"}
    </button>
  )
}
