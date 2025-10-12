import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="border rounded p-2 shadow hover:shadow-lg transition block"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="mt-2 font-bold text-lg">{movie.Title}</h3>
      <p className="text-gray-600">{movie.Year}</p>
    </Link>
  );
}
