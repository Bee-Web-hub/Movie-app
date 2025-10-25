// movieapp/src/components/MovieList.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const HorizontalMovieList = ({ title, movies }) => {
  const scrollContainerRef = React.useRef(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-10 group">
      {/* Title */}
      {title && (
        <h2 className="text-2xl font-bold mb-4 px-4 sm:px-8 text-gray-900 flex items-center gap-2">
          {title}
          <span className="text-yellow-400 text-sm">({movies.length})</span>
        </h2>
      )}

      {/* Scrollable Container with Navigation Arrows */}
      <div className="relative px-4 sm:px-8">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 ml-2 hidden sm:block"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 mr-2 hidden sm:block"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Movie Cards Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex gap-4 pb-4">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="flex-shrink-0 w-48 sm:w-56 transition-transform duration-300 hover:scale-105"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalMovieList;
