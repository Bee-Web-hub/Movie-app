import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    e.preventDefault();
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/movie/${movie.imdbID}`}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-yellow-100/40 transition duration-300 flex flex-col relative"
      >
        <div className="h-72 w-full bg-gray-200 flex items-center justify-center relative">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
            className="h-full w-full object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 text-2xl ${
              isFavorite
                ? "text-yellow-400 drop-shadow-lg"
                : "text-gray-300 hover:text-yellow-400"
            } transition`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate hover:text-yellow-500 transition">
            {movie.Title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{movie.Year}</p>
        </div>
      </Link>
    </motion.div>
  );
}
