import React, { useEffect } from "react";
import "./MovieHeader.css";
import RatingComponent from './RatingComponent'; // Import the RatingComponent
import Button from './Button'; // Import Button component for consistent usage
import { useDispatch } from "react-redux";
import { addItem } from "../features/shopppingCartSlice";
import { useState } from "react";
import TrailerEmbed from './TrailerEmbed';
import Overlay from './Overlay';
import { getTrailerID } from '../features/getTrailerID';
// Define default image paths
import DEFAULT_POSTER from '../assets/images/poster.png';
import DEFAULT_BACKDROP from '../assets/images/backdrop.png';
import FavoriteButton from './FavoriteButton';


const MovieHeader = ({ backdropUrl, movieTitle, movieOverview, releaseDate, genres, crew, posterUrl, rating, movie}) => {
  // State to manage the background image
  const [backgroundImage, setBackgroundImage] = React.useState(backdropUrl || DEFAULT_BACKDROP);
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);
  const [trailerID, setTrailerID] = useState(null);


  // Preload the backdrop image
  React.useEffect(() => {
    const img = new Image();
    img.src = backdropUrl;
    img.onload = () => setBackgroundImage(backdropUrl);
    img.onerror = () => setBackgroundImage(DEFAULT_BACKDROP);
  }, [backdropUrl]);

  const handleBuyPress = () => {
  

    dispatch(addItem({item: movie, price: getPrice(movie.release_date)}))
  }
  const closeOverlay = () => {
    setShowOverlay(false);
  }

  const handleTrailerPress = () => {
    setShowOverlay(true);
  }

  const getPrice = (releaseDate) => {
    console.log(movie);
    const yearNow = new Date().getFullYear();
    const releaseYear = new Date(releaseDate).getFullYear();;
    console.log(yearNow);
    console.log(releaseYear);
    const diff = yearNow - releaseYear;
    
    if (diff <= 3){
      return 149
    } else if (diff <= 5){
      return 99
    } else {
      return 49
    }

  }
  const price = getPrice(movie);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const trailerID = getTrailerID(movie.videos.results);
        setTrailerID(trailerID);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };
  
    if (movie && movie.videos) {
      fetchTrailer();
    }
  }, [movie]);
  

  useEffect(() => {
    setTrailerID(getTrailerID(movie.videos.results));
  },[movie])

  return (
    <header className="movie-header" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="movie-header-wrapper">
        <div className="movie-poster-container">
          <div className="movie-poster-container-img">
            <img
              src={posterUrl}
              alt={movieTitle}
              className="movie-poster"
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop in case default image also fails
                e.target.src = {DEFAULT_POSTER};
              }}
            />
            <h2 className="movie-price">{getPrice(movie.release_date)}:-</h2>
          </div>
          <div className="button-container">
            {trailerID && (
            <Button text="Watch Trailer" primary onPress={() => handleTrailerPress()} />
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
      <Overlay show={showOverlay} onClose={closeOverlay}>
        {trailerID && (
        <TrailerEmbed trailerID={trailerID}/>
        )}
    </Overlay>
    </header>
  );
};

export default MovieHeader;
