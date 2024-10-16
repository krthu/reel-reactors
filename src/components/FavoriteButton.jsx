// FavoriteButton.jsx
import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const FavoriteButton = ({ movie }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = storedFavorites.some((favMovie) => favMovie.id === movie.id);
    setIsFav(isFavorite);

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
    e.stopPropagation(); // Prevent parent click events
    let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (storedFavorites.some((favMovie) => favMovie.id === movie.id)) {
      // Remove from favorites
      storedFavorites = storedFavorites.filter((favMovie) => favMovie.id !== movie.id);
      setIsFav(false);
    } else {
      // Add to favorites
      storedFavorites.push(movie);
      setIsFav(true);
    }

    localStorage.setItem('favorites', JSON.stringify(storedFavorites));

    // Dispatch event to update other components
    const event = new Event('favoritesUpdated');
    window.dispatchEvent(event);
  };

  return (
    <div className="favorite-icon" onClick={toggleFavorite}>
      <FaHeart
        style={{
          fill: isFav ? '#ff6666' : 'black', // Fyllning med rött om det är favorit, annars ingen fyllning
          stroke: isFav ? 'none' : 'white', // Ingen kontur om det är favorit, annars vit kontur
          strokeWidth: '16px', // Tjocklek på konturen när det inte är favorit
          width: '24px', // Storleken på hjärtat
          height: '24px',
        }}
      />
    </div>
  );
  
  
};

export default FavoriteButton;
