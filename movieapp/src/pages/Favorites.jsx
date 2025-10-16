import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const getFavorites = () => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const removeFavorite = (imdbID) => {
    const updatedFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        ⭐ My Favorites
      </h1>

      {favorites.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="relative group">
              <MovieCard movie={movie} />

              {/* Remove button */}
              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center mt-10">
          No favorites yet. Add some from the movie list!
        </p>
      )}
    </div>
  );
}
