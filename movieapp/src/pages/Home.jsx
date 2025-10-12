import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("Batman"); // default search

  const API_KEY = "YOUR_OMDB_API_KEY"; // replace with your OMDB key

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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Discover Your Favorite Movies 🎬
      </h1>

      <SearchBar onSearch={(term) => setSearchTerm(term)} />

      {loading && <p className="text-center mt-4">Loading movies...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}
