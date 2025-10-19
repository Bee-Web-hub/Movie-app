// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LEFT SIDE - Logo */}
        <Link to="/home" className="font-bold text-2xl text-yellow-400">
          MovieHub
        </Link>

        {/* RIGHT SIDE (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-300 transition"
            }
          >
            Home
          </NavLink>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-yellow-400 text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN (Favorites Only) */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 pb-4 space-y-3">
          <Link
            to="/favorites"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-300"
          >
            Favorites
          </Link>
        </div>
      )}
    </nav>
  );
}
