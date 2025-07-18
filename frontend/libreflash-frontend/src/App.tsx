import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DeckPage from "./pages/DeckPage";
import DeckIdPage from "./pages/DeckIdPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyDecksPage from "./pages/MyDecksPage";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

import './App.css';

export default function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        {/* Protected Layout Route */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/deck"
          element={
            <PrivateRoute>
              <DeckPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/deck/:deckId"
          element={
            <PrivateRoute>
              <DeckIdPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-decks"
          element={
            <PrivateRoute>
              <MyDecksPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
  );
}
