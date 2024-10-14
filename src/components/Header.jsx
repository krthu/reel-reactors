import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import Button from "./Button";

const Header = ({ movie, isOverlay, onClose }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleMoreInfoClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the movie information page
  };

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
        {isOverlay ? (
          <div className="button-container overlay-button-container">
            <Button icon="arrow_right" text="Watch Now" primary={true} onPress={handleMoreInfoClick}/>
            <Button text="Trailer" primary={false} />
          </div>
        ) : (
          <div className="button-container">
            <Button icon="arrow_right" text="Watch Now" primary={true} onPress={handleMoreInfoClick}/>
            <Button text="Trailer" primary={false} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
