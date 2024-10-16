// PosterCaruselItem.jsx
import './MovieCard.css';
import { baseImageURL } from '../api/baseURLs';
import FavoriteButton from './FavoriteButton';
import getPrice from '../features/getPrice';

const PosterCaruselItem = ({ movie, onPress, isSelected }) => {
  if (!movie) {
    console.error('Movie is undefined in PosterCaruselItem');
    return null;
  }

  return (
    <div className="movie-card-container" onClick={onPress}>
      <FavoriteButton movie={movie} /> {/* Placera FavoriteButton här */}
      <img
        className={`movie-card-img ${isSelected ? 'movie-card-selected' : ''}`}
        src={`${baseImageURL}${movie.poster_path}`}
        alt={movie.title}
      />
      <h2 className="movieCard-price">{getPrice(movie.release_date)}:-</h2>
    </div>
  );

};

export default PosterCaruselItem;
