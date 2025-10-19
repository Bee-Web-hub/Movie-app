import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_KEY = "dabce9ab"; // replace with your key

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (loading)
    return (
      <div className="p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
          <div className="h-96 bg-gray-200 rounded-xl mx-auto max-w-4xl"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );

  if (error)
    return <p className="p-4 text-center text-red-500">{error}</p>;

  if (!movie)
    return <p className="p-4 text-center">No movie found.</p>;

  return (
    <motion.div
      className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to="/"
        className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 hover:shadow-lg transition duration-300"
      >
        ← Back
      </Link>

      <div className="mt-10 flex flex-col md:flex-row items-start md:items-center lg:items-start gap-10">
        <motion.div
          className="relative w-full sm:w-2/3 md:w-1/3 rounded-xl overflow-hidden shadow-xl group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            {movie.Title}
          </h2>
          <hr className="border-gray-300 dark:border-gray-700 mb-4" />

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Director:
              </span>{" "}
              {movie.Director}
            </p>
            <p>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Actors:
              </span>{" "}
              {movie.Actors}
            </p>
            <p>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Plot:
              </span>{" "}
              {movie.Plot}
            </p>
            <p className="mt-3">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                IMDb Rating:
              </span>{" "}
              ⭐ {movie.imdbRating}
            </p>
          </div>

          <div className="inline-block bg-indigo-100 dark:bg-indigo-800/40 text-indigo-800 dark:text-indigo-300 px-3 py-1 rounded-full font-semibold mt-5 shadow-sm">
            {movie.Genre}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
