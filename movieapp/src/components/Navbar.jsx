// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Heart, Home, Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LEFT SIDE - Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 font-bold text-2xl hover:text-yellow-300 transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg shadow-red-600/50 group-hover:shadow-red-600/70 transition-shadow" />
          MovieHub
        </Link>

        {/* CENTER - Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-gray-900 font-semibold"
                  : "hover:bg-gray-800 hover:text-yellow-300"
              }`
            }
          >
            <Home className="w-5 h-5" />
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-gray-900 font-semibold"
                  : "hover:bg-gray-800 hover:text-yellow-300"
              }`
            }
          >
            <Heart className="w-5 h-5" />
            Favorites
          </NavLink>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-yellow-400 text-2xl focus:outline-none hover:text-yellow-300 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-6 py-4 space-y-2">
            <NavLink
              to="/home"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-yellow-400 text-gray-900 font-semibold"
                    : "hover:bg-gray-700 hover:text-yellow-300"
                }`
              }
            >
              <Home className="w-5 h-5" />
              Home
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-yellow-400 text-gray-900 font-semibold"
                    : "hover:bg-gray-700 hover:text-yellow-300"
                }`
              }
            >
              <Heart className="w-5 h-5" />
              Favorites
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
