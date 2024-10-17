
import './MovieCard.css';
import { baseImageURL } from '../api/baseURLs';
import FavoriteButton from './FavoriteButton';

const MovieCard = ({ movie, onPress, isSelected }) => {
  if (!movie) {
    console.error('Movie is undefined in PosterCaruselItem');
    return null;
  }

  return (
    <div className="movie-card-container" onClick={onPress}>
      <img
        className={`movie-card-img ${isSelected ? 'movie-card-selected' : ''}`}
        src={`${baseImageURL}${movie.poster_path}`}
        alt={movie.title}
      />
      <FavoriteButton movie={movie} />
    </div>
  );
};

export default MovieCard;
