import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const API_KEY = "dabce9ab";

  useEffect(() => {
    fetchMovies(searchTerm, page);
  }, [searchTerm, page]);

  const fetchMovies = async (query, pageNum = 1) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${pageNum}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch {
      setError("Failed to fetch movies. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);
  const handleNext = () => page < totalPages && setPage(page + 1);
  const handlePrev = () => page > 1 && setPage(page - 1);

  return (
    <div className="pt-24 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-4">
          Welcome to MovieHub 🍿
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Stream, discover, and save your favorite movies — all in one place.
        </p>
      </motion.section>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mb-10"
      >
        <SearchBar
          onSearch={(term) => {
            setSearchTerm(term);
            setPage(1);
          }}
        />
      </motion.div>

      {loading && (
        <p className="text-center text-gray-400 mt-4">Loading movies...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {!loading && !error && <MovieList movies={movies} />}

      {!loading && totalResults > 10 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-600 transition"
          >
            ← Previous
          </button>

          <span className="text-gray-300">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

