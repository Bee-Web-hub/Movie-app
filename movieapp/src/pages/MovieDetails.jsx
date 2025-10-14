import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

  if (loading) return <p className="p-4 text-center">Loading movie details...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;
  if (!movie) return <p className="p-4 text-center">No movie found.</p>;

  return (
<div className="px-4 sm:px-6 lg:px-10 py-8 max-w-6xl mx-auto bg-white rounded-2xl shadow-md">

    <Link
        to="/"
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
      >
        ← Back
      </Link>

<div className="mt-8 flex flex-col md:flex-row items-start md:items-center lg:items-start gap-10">

        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
className="w-full sm:w-2/3 md:w-1/3 rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105"

/>

        <div className="flex-1">
<h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900 leading-tight">{movie.Title}</h2>
<hr className="border-gray-200 mb-4" />

          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Director:</span> {movie.Director}</p>
            <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
            <p><span className="font-semibold">Plot:</span> {movie.Plot}</p>
            <p className="mt-3">
              <span className="font-semibold">IMDb Rating:</span> ⭐ {movie.imdbRating}
            </p>
          </div>

          <div className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold mt-4">
            {movie.Genre}
          </div>
        </div>
      </div>
    </div>
  );
}
