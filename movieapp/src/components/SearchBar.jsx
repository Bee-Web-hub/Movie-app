// src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center mb-8"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full max-w-lg p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition duration-200"
      >
        Search
      </button>
    </form>
  );
}
