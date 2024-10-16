import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import Button from "./Button";
import Overlay from "./Overlay";
import TrailerEmbed from "./TrailerEmbed";
import { getTrailerID } from "../features/getTrailerID";
import { getVideos } from "../api/api";
import RatingComponent from "./RatingComponent"; // Importera RatingComponent

const Header = ({ movie, isOverlay, onClose }) => {
  const [showTrailerOverlay, setShowTrailerOverlay] = useState(false);
  const [trailerID, setTrailerID] = useState(null);
  const navigate = useNavigate();

  if (!movie) return null;

  // Navigera till mer information om filmen
  const handleMoreInfoClick = () => {
    if (isOverlay) {
      onClose();
    }
    navigate(`/movie/${movie.id}`);
  };

  // Visa trailer-overlay
  const handleTrailerPress = () => {
    setShowTrailerOverlay(true);
  };

  // Hämta trailers för filmen
  useEffect(() => {
    const getTrailers = async () => {
      try {
        const videos = await getVideos(movie.id);
        setTrailerID(getTrailerID(videos));
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    getTrailers();
  }, [movie.id]);

  return (
    <header className={`header ${isOverlay ? "overlay-header" : ""}`} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
      {isOverlay && (
        <button className="overlay-close-button" onClick={onClose}>
          Close
        </button>
      )}
      <div className="container-left">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>

        {/* Visa RatingComponent om det är en overlay */}
        {isOverlay && <RatingComponent rating={movie.vote_average} maxRating={10} />}

        <div className={`button-container ${isOverlay ? 'overlay-button-container' : ''}`}>
          <Button icon="arrow_right" text="Watch Now" primary={true} onPress={handleMoreInfoClick} />
          {trailerID && (
            <Button text="Trailer" primary={false} onPress={handleTrailerPress} />
          )}
        </div>
      </div>

      {/* Trailer Overlay */}
      <Overlay show={showTrailerOverlay} onClose={() => setShowTrailerOverlay(false)}>
        <TrailerEmbed trailerID={trailerID} />
      </Overlay>
    </header>
  );
};

export default Header;
