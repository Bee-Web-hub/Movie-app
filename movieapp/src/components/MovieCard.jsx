// src/components/MovieCard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../utils/favorites";

function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(movie.imdbID));
  }, [movie.imdbID]);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button

    if (isFav) {
      removeFromFavorites(movie.imdbID);
      setIsFav(false);
      showMessage("Removed from favorites");
    } else {
      addToFavorites(movie);
      setIsFav(true);
      showMessage("Added to favorites!");
    }
  };

  const showMessage = (message) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-[180px] sm:w-[200px] md:w-[220px] relative"
      whileHover={{ y: -5 }}
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="relative">
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.Title}
            className="w-full h-[270px] object-cover"
          />

          {/* Favorite Button */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
              isFav
                ? "bg-red-500 text-white scale-110"
                : "bg-black/50 text-white hover:bg-black/70"
            }`}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-all ${
                isFav ? "fill-current" : ""
              }`}
            />
          </button>
        </div>
      </Link>

      <div className="p-3 text-center text-gray-200">
        <h3 className="text-sm sm:text-base font-semibold truncate">
          {movie.Title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400">{movie.Year}</p>

        <div className="mt-2">
          <Link
            to={`/movie/${movie.imdbID}`}
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm px-3 py-1 rounded-full transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-20 whitespace-nowrap animate-[fadeIn_0.3s_ease-out]">
          {showNotification}
        </div>
      )}
    </motion.div>
  );
}

export default MovieCard;
