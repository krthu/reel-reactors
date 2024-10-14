import React from 'react';
import './SearchOverlay.css';

const SearchOverlay = ({ movies, onSelectMovie, onClose, searchQuery }) => {
  return (
    <div className="search-overlay">
      <button className="close-button" onClick={onClose}>Close</button>
      <div className="search-results">
        {movies.length > 0 ? (
          movies.map(movie => (
            <div key={movie.id} className="search-result-item" onClick={() => onSelectMovie(movie)}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/path/to/placeholder.jpg'}
                alt={movie.title}
                className="search-thumbnail"
              />
              <div className="search-details">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
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
