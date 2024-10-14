import React from 'react';
import './ActorCard.css'; // Style for the cast list

const DEFAULT_POSTER = '/pictures/poster.png';

const ActorCard = ({ cast }) => {
  return (
    <div className="cast-section">
      <h2>Actors</h2>
      <div className="cast-list">
        {cast.map((actor) => (
          <div key={actor.credit_id} className="cast-card">
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt={actor.name}
              className="cast-image"
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop in case default image also fails
                e.target.src = DEFAULT_POSTER;
              }}
            />
            <p className="cast-name">{actor.name}</p>
            <p className="character-name">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorCard;
