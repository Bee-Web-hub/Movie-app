import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col"
    >
      <div className="h-72 w-full bg-gray-200 flex items-center justify-center">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <h3 className="text-base font-semibold text-gray-800 truncate">
          {movie.Title}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{movie.Year}</p>
      </div>
    </Link>
  );
}
