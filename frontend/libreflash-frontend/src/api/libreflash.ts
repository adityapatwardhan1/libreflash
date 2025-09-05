const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function generateFlashcards(data: { link: string; notes: string }) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/generate-flashcards/`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ ...data, user_confirmed: true }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}

export interface FlashcardResponse {
  deck_id: string;
  deck_name: string;
  cards: { question: string; answer: string }[];
}



