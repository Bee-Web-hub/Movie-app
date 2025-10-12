import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = "YOUR_OMDB_API_KEY"; // replace with your key

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

  if (loading) return <p className="p-4 text-center">Loading movie details...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!movie) return <p className="p-4 text-center">No movie found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to Home
      </Link>

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded-lg shadow"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-3">{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mt-3"><strong>Plot:</strong> {movie.Plot}</p>
          <p className="mt-3"><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}
