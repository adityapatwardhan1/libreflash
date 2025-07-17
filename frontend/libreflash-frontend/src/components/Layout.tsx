// src/components/Layout.tsx
import { Outlet, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import './Layout.css';

export default function Layout() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo">LibreFlash</Link>
          <Link to="/my-decks" className="nav-link">My Decks</Link>
        </div>
        <div className="nav-right">
          <LogoutButton />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
