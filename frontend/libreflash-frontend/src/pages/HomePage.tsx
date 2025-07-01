// src/pages/HomePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

export default function HomePage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <main className="max-w-2xl mx-auto p-4 text-center min-h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-6">LibreFlash</h1>
      <Form
        onError={(msg) => setError(msg)}
        onSubmitSuccess={(data) => {
          setError("");
          navigate("/deck", { state: data }); // navigate and pass flashcard data
        }}
      />
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </main>
  );
}
