// src/components/SearchBar.jsx
import React, { useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = [
    "Marvel",
    "Spider-Man",
    "Star Wars",
    "Batman",
    "Avengers",
    "Harry Potter",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsFocused(false);
    if (onSearch) {
      onSearch("");
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex items-center transition-all duration-300 ${
            isFocused ? "transform scale-105" : ""
          }`}
        >
          {/* Search Icon */}
          <Search
            className={`absolute left-4 w-5 h-5 transition-colors duration-200 ${
              isFocused ? "text-yellow-400" : "text-gray-400"
            }`}
          />

          {/* Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search movies, actors, directors..."
            className={`w-full bg-gray-800 text-white pl-12 pr-32 py-4 rounded-xl border-2 transition-all duration-200 placeholder:text-gray-500 ${
              isFocused
                ? "border-yellow-400 shadow-lg shadow-yellow-400/20"
                : "border-gray-700 hover:border-gray-600"
            }`}
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-24 text-gray-400 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 p-1.5 rounded-full"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            disabled={!query.trim()}
            className={`absolute right-2 px-5 py-2 rounded-lg font-semibold transition-all duration-200 ${
              query.trim()
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:scale-105 active:scale-95"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </div>
      </form>

      {/* Popular Searches / Suggestions */}
      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-4 z-50 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">Popular Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm transition-all duration-200 hover:scale-105 border border-gray-700 hover:border-yellow-400/50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
