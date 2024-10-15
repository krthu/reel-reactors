import React, { useState, useEffect } from 'react';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };

    loadFavorites();

    const handleFavoritesUpdated = () => {
      loadFavorites();
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, []);

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet!</p>
      )}
    </div>
  );
};

export default MyFavorites;
