// src/components/MovieList.jsx
import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) return <p>No movies found.</p>;

return (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
    {movies.map((movie) => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))}
  </div>
);
}