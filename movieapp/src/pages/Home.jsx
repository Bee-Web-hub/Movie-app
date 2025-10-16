import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("Batman"); // default search
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const API_KEY = "dabce9ab"; // your OMDB key

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
    } catch (err) {
      setError("Failed to fetch movies. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
        🎬 Discover Your Favorite Movies
      </h1>

      <div className="max-w-xl mx-auto mb-10">
        <SearchBar
          onSearch={(term) => {
            setSearchTerm(term);
            setPage(1); // reset to first page when searching
          }}
        />
      </div>

      {loading && (
        <p className="text-center text-gray-600 mt-4">Loading movies...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {!loading && !error && <MovieList movies={movies} />}

      {/* Pagination Controls */}
      {!loading && totalResults > 10 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
          >
            ← Previous
          </button>

          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
          >
            Next →
          </button>
        </div>
      )}

      {movies.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 mt-10">
          Try searching for a movie above 🎥
        </p>
      )}
    </div>
  );
}
