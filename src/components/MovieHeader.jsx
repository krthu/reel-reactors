import React from "react";
import "./MovieHeader.css";
import RatingComponent from './RatingComponent'; // Import the RatingComponent
import Button from './Button'; // Import Button component for consistent usage

const MovieHeader = ({ backdropUrl, movieTitle, movieOverview, releaseDate, genres, crew, posterUrl, rating }) => {
  return (
    <header className="movie-header" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="movie-header-wrapper">
        <div className="movie-poster-container">
          <img src={posterUrl} alt={movieTitle} className="movie-poster" />
          <div className="button-container">
            <Button text="Watch Trailer" primary onPress={() => console.log('Watch Trailer Clicked')} />
            <Button text="Buy" icon="shopping_cart" onPress={() => console.log('Buy Clicked')} />
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
