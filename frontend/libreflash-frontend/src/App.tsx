import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DeckPage from "./pages/DeckPage";
import DeckIdPage from "./pages/DeckIdPage";
import './App.css';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/deck" element={<DeckPage />} />
      <Route path="/deck/:deckId" element={<DeckIdPage />} />
    </Routes>
  );
}
