// movieapp/src/pages/Favorites.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { getFavorites } from "../utils/favorites";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-8 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          {/* <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
              My Favorites
            </h1>
          </div> */}
          <p className="text-gray-400 text-lg">
            {favorites.length > 0
              ? `You have ${favorites.length} favorite ${
                  favorites.length === 1 ? "movie" : "movies"
                }`
              : "Start adding movies to your favorites!"}
          </p>
        </motion.div>

        {/* Movies Grid */}
        {favorites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="bg-gray-900 rounded-2xl p-12 max-w-md mx-auto border border-gray-800">
              <Heart className="w-20 h-20 text-gray-700 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-300 mb-4">
                No Favorites Yet
              </h2>
              <p className="text-gray-500 mb-6">
                Start exploring movies and add them to your favorites by
                clicking the heart icon!
              </p>
              <a
                href="/home"
                className="inline-block bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
              >
                Browse Movies
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
