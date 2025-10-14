import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("Batman"); // default search

  const API_KEY = "dabce9ab"; // replace with your OMDB key

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const fetchMovies = async (query) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
     console.log(data.Search);

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

  return (
  <div className="px-4 sm:px-8 py-10 max-w-7xl mx-auto">
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
      🎬 Discover Your Favorite Movies
    </h1>

    <div className="max-w-xl mx-auto mb-10">
      <SearchBar onSearch={(term) => setSearchTerm(term)} />
    </div>

    {loading && <p className="text-center text-gray-600 mt-4">Loading movies...</p>}
    {error && <p className="text-center text-red-500 mt-4">{error}</p>}

    {!loading && !error && <MovieList movies={movies} />}

    {movies.length === 0 && !loading && !error && (
      <p className="text-center text-gray-500 mt-10">
        Try searching for a movie above 🎥
      </p>
    )}
  </div>
);
}
