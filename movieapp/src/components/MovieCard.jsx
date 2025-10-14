// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 block"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {movie.Title}
        </h3>
        <p className="text-gray-500">{movie.Year}</p>
      </div>
    </Link>
  );
}
