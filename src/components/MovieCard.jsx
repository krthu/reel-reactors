// PosterCaruselItem.jsx
import './MovieCard.css';
import { baseImageURL } from '../api/baseURLs';
import FavoriteButton from './FavoriteButton';

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
    </div>
  );
};

export default PosterCaruselItem;
