// src/utils/favorites.js

// Get all favorites from localStorage
export const getFavorites = () => {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
};

// Add a movie to favorites
export const addToFavorites = (movie) => {
  const favorites = getFavorites();
  const isAlreadyFavorite = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  if (!isAlreadyFavorite) {
    const updatedFavorites = [...favorites, movie];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return true;
  }

  return false;
};

// Remove a movie from favorites
export const removeFromFavorites = (imdbID) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.imdbID !== imdbID);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

// Check if a movie is in favorites
export const isFavorite = (imdbID) => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.imdbID === imdbID);
};
