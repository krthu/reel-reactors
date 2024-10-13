import React from "react";
import "./Header.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Overlay from "./Overlay";
import { useState } from "react";
import { useEffect } from "react";
import { getTrailerID } from "../features/getTrailerID";
import { getVideos } from "../api/api";
import TrailerEmbed from "./TrailerEmbed";

const Header = ({ movie, isOverlay, onClose }) => {

  const [showTrailerOverlay, setShowTrailerOverlay] = useState(false);
  const [trailerID, setTrailerID] = useState(null);
  const navigate = useNavigate();
  const handleWatchButtonPress = (id) => {

    navigate(`movie/${id}`);
  }

  const handleTrailerPress = () => {
    console.log('Trailer press!');
    setShowTrailerOverlay(true);
  }

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const videos = await getVideos(movie.id);
        //setTrailers(videos);
        setTrailerID(getTrailerID(videos));

      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }
    getTrailers();
  }, [])


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
        <div className={`button-container ${isOverlay ? 'overlay-button-container' : ''}`}>
          <Button icon="arrow_right" text="Watch" primary={true} onPress={() => handleWatchButtonPress(movie.id)} />
          {trailerID && (
            <Button text="Trailer" primary={false} onPress={() => handleTrailerPress()} />
          )}

        </div>
      </div>
      <Overlay show={showTrailerOverlay} onClose={() => setShowTrailerOverlay(false)}>
        <TrailerEmbed trailerID={trailerID} />
      </Overlay>
    </header>
  );
};

export default Header;
