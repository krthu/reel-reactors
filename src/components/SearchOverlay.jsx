import React from 'react';
import './SearchOverlay.css';
import FavoriteButton from './FavoriteButton';

const SearchOverlay = ({ movies, onSelectMovie, onClose, searchQuery }) => {
  return (
    <div className="search-overlay">
      <button className="close-button" onClick={onClose}>Close</button>
      <div className="search-results">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card-container">
              <img
                className="movie-card-img"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                onClick={() => onSelectMovie(movie)}
              />
              <FavoriteButton movie={movie} />

              <div className="search-details">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                {/* {movie.trailerID && (
                  <Button text="Watch Trailer" primary={false} onPress={() => window.open(`https://www.youtube.com/watch?v=${movie.trailerID}`, '_blank')} />
                )} */}
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
