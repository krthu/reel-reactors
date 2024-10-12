import React from "react";
import "./MovieHeader.css";
import RatingComponent from './RatingComponent'; // Import the RatingComponent
import Button from './Button'; // Import Button component for consistent usage
import { useDispatch } from "react-redux";
import { addItem } from "../features/shopppingCartSlice";

// Define default image paths
const DEFAULT_POSTER = '/pictures/poster.png';
const DEFAULT_BACKDROP = '/pictures/backdrop.png';

const MovieHeader = ({ backdropUrl, movieTitle, movieOverview, releaseDate, genres, crew, posterUrl, rating, movie, handleWatchPress, trailerIsPresent }) => {
  // State to manage the background image
  const [backgroundImage, setBackgroundImage] = React.useState(backdropUrl || DEFAULT_BACKDROP);
  const dispatch = useDispatch();

  // Preload the backdrop image
  React.useEffect(() => {
    const img = new Image();
    img.src = backdropUrl;
    img.onload = () => setBackgroundImage(backdropUrl);
    img.onerror = () => setBackgroundImage(DEFAULT_BACKDROP);
  }, [backdropUrl]);

  const handleBuyPress = () => {
    console.log('Buy Clicked')

    dispatch(addItem({item: movie, price: 149}))
  }

  return (
    <header className="movie-header" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="movie-header-wrapper">
        <div className="movie-poster-container">
          <img
            src={posterUrl}
            alt={movieTitle}
            className="movie-poster"
            onError={(e) => {
              e.target.onerror = null; // Prevents infinite loop in case default image also fails
              e.target.src = DEFAULT_POSTER;
            }}
          />
          <div className="button-container">
            {trailerIsPresent != null && (
            <Button text="Watch Trailer" primary onPress={() => handleWatchPress()} />
            )}

            <Button text="Buy" icon="shopping_cart" onPress={() => handleBuyPress()} />
          </div>
        </div>
        <div className="movie-header-content">
          <h1>{movieTitle} ({new Date(releaseDate).getFullYear()})</h1>
          <RatingComponent rating={rating} />
          <p className="movie-info">
            {releaseDate} | {genres && genres.join(', ')}
          </p>
          <h2>Översikt</h2>
          <p className="movie-overview">{movieOverview}</p>
          <div className="crew-info">
            {crew && crew.slice(0, 4).map((member) => (
              <p key={member.credit_id}><strong>{member.name}</strong> {member.job}</p>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MovieHeader;
