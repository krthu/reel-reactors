import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const FavoriteButton = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = storedFavorites.some((favMovie) => favMovie.id === movie.id);
    setIsFav(isFavorite);

    // Update isFav when favorites change elsewhere
    const handleFavoritesUpdated = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isFavorite = updatedFavorites.some((favMovie) => favMovie.id === movie.id);
      setIsFav(isFavorite);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, [movie]);

  const toggleFavorite = (e) => {
    e.stopPropagation();    // Prevent the click event from bubbling up to the parent element
    let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (storedFavorites.some((favMovie) => favMovie.id === movie.id)) {
      storedFavorites = storedFavorites.filter((favMovie) => favMovie.id !== movie.id);
      setIsFav(false);
    } else {
      storedFavorites.push(movie);
      setIsFav(true);
    }

    localStorage.setItem('favorites', JSON.stringify(storedFavorites));

    const event = new Event('favoritesUpdated');
    window.dispatchEvent(event);
  };

  return (
    <div className="favorite-icon" onClick={toggleFavorite}>
      <FaHeart color={isFav ? '#ff6666' : 'gray'} />
    </div>
  );
};

export default FavoriteButton;
