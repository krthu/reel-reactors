import { useState, useEffect } from 'react';
import api from '../api/api'; 
import './ActorCard.css'; 

const ActorCard = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await api.getCast(movieId); 
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast data:', error);
      }
    };

    if (movieId) {
      fetchCast();
    }
  }, [movieId]);

  return (
    <div className="actor-section">
      <h3>Cast</h3>
      <div className="actor-grid">
        {cast.length > 0 ? (
          cast.map((actor) => (
            <div key={actor.id} className="actor-card">
              <img
                src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                alt={actor.name}
                className="actor-photo"
              />
              <div className="actor-details">
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
    </div>
  );
};

export default ActorCard;
