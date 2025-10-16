import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Local Storage helpers
const getFavorites = () => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    const isFav = favorites.some((fav) => fav.imdbID === movie.imdbID);
    setIsFavorite(isFav);
  }, [movie]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // prevent Link navigation when clicking the button

    const favorites = getFavorites();
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    saveFavorites(updatedFavorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition duration-300 flex flex-col relative"
    >
      <div className="h-72 w-full bg-gray-200 flex items-center justify-center relative">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="h-full w-full object-cover"
        />

        {/* Favorite Button (top-right corner) */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 text-lg ${
            isFavorite ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
          } transition`}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "★" : "☆"}
        </button>
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
