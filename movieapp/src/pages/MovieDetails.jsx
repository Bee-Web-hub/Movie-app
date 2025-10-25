// movieapp/src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Star, Calendar, Clock } from "lucide-react";
import {
  addToFavorites,
  removeFromFavorites,
  isFavorite,
} from "../utils/favorites";

const API_KEY = "dabce9ab";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setMovie(data);
          setIsFav(isFavorite(data.imdbID));
        } else {
          setError(data.Error);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details. Please try again.");
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!movie) return;

    if (isFav) {
      removeFromFavorites(movie.imdbID);
      setIsFav(false);
      showMessage("Removed from favorites");
    } else {
      // Create a simplified movie object for favorites
      const favoriteMovie = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
      };
      addToFavorites(favoriteMovie);
      setIsFav(true);
      showMessage("Added to favorites!");
    }
  };

  const showMessage = (message) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (loading) {
    return (
      <div className="p-8 text-center min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto"></div>
          <div className="h-96 bg-gray-800 rounded-xl mx-auto"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center min-h-screen flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 max-w-md">
          <p className="text-red-400 text-lg">{error}</p>
          <Link
            to="/home"
            className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="p-8 text-center min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">No movie found.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-10 py-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Notification Toast */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 right-4 bg-black/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-2"
        >
          <Heart className="w-5 h-5 fill-current text-red-500" />
          {showNotification}
        </motion.div>
      )}

      {/* Header with Back Button and Favorite */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-5 py-2.5 rounded-lg transition duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        <button
          onClick={handleToggleFavorite}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold md:text-lg text-xs transition-all duration-300 ${
            isFav
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFav ? "fill-current" : ""}`} />
          {isFav ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>

      {/* Movie Content */}
      <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="flex flex-col lg:flex-row gap-8 p-8">
          {/* Movie Poster */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl group">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                alt={movie.Title}
                className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x600?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          {/* Movie Details */}
          <motion.div
            className="lg:w-2/3 flex flex-col"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white leading-tight">
              {movie.Title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400">
              {movie.Year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.Year}</span>
                </div>
              )}
              {movie.Runtime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{movie.Runtime}</span>
                </div>
              )}
              {movie.imdbRating && movie.imdbRating !== "N/A" && (
                <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{movie.imdbRating}/10</span>
                </div>
              )}
            </div>

            {/* Genre Badges */}
            {movie.Genre && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.Genre.split(", ").map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <hr className="border-gray-800 mb-6" />

            {/* Plot */}
            {movie.Plot && movie.Plot !== "N/A" && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-yellow-400 mb-3">
                  Plot
                </h2>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>
            )}

            {/* Additional Details */}
            <div className="space-y-3 text-gray-300">
              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <span className="font-semibold text-yellow-400">
                    Director:{" "}
                  </span>
                  {movie.Director}
                </div>
              )}
              {movie.Actors && movie.Actors !== "N/A" && (
                <div>
                  <span className="font-semibold text-yellow-400">Cast: </span>
                  {movie.Actors}
                </div>
              )}
              {movie.Writer && movie.Writer !== "N/A" && (
                <div>
                  <span className="font-semibold text-yellow-400">
                    Writer:{" "}
                  </span>
                  {movie.Writer}
                </div>
              )}
              {movie.Language && movie.Language !== "N/A" && (
                <div>
                  <span className="font-semibold text-yellow-400">
                    Language:{" "}
                  </span>
                  {movie.Language}
                </div>
              )}
              {movie.Country && movie.Country !== "N/A" && (
                <div>
                  <span className="font-semibold text-yellow-400">
                    Country:{" "}
                  </span>
                  {movie.Country}
                </div>
              )}
              {movie.Awards && movie.Awards !== "N/A" && (
                <div>
                  <span className="font-semibold text-yellow-400">
                    Awards:{" "}
                  </span>
                  {movie.Awards}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
