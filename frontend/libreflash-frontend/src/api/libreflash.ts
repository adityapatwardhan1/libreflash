/// libreflash-frontend/src/

// src/api/libreflash.ts
export async function generateFlashcards(data: {
  link: string;
  notes: string;
}): Promise<FlashcardResponse> {
  const res = await fetch("http://localhost:8000/generate-flashcards/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, user_confirmed: true })
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}

export interface FlashcardResponse {
  deck_name: string;
  cards: { question: string; answer: string }[];
}
