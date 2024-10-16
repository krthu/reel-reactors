import React from 'react';
import './SearchOverlay.css';
import FavoriteButton from './FavoriteButton';
import DEFAULT_POSTER from '../assets/images/poster.png';
import DEFAULT_BACKDROP from '../assets/images/backdrop.png';

const SearchOverlay = ({ movies, onSelectMovie, onClose, searchQuery }) => {
  return (
    <div className="search-overlay">
      <button className="close-button" onClick={onClose}>Close</button>
      <div className="search-results">
        {movies.length > 0 ? (
          movies
          .filter(movie => movie.poster_path)
          .map((movie) => (
            <div key={movie.id} className="movie-card-container">
              <img
                className="movie-card-img"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => onSelectMovie(movie)
                }
              />
              <FavoriteButton movie={movie} />
            </div>
          ))
        ) : (
          <div className="no-results-message">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
