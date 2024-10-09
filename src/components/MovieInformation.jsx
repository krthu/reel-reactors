import React, { useEffect, useState } from 'react';
import './MovieInformation.css';
import { getMovieDetails, getCast, getRecommendations } from '../api/api'; // Make sure getRecommendations is correctly imported
import { useParams } from 'react-router-dom';

const MovieInformation = ({ onBuy, onWatchTrailer }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const placeholderId = '533535'; // Placeholder ID
    const movieId = id || placeholderId;

    if (!movieId) {
      console.error("Movie ID is undefined");
      return;
    }

    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        const castData = await getCast(movieId);
        const recData = await getRecommendations(movieId);

        setMovie(movieData);
        setCast(castData.cast);
        setCrew(castData.crew);
        setRecommendations(recData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-information-container">
      <div className="movie-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-details">
          <h1>{movie.title} ({new Date(movie.release_date).getFullYear()})</h1>
          <p className="movie-info">[{movie.age_rating}] {movie.release_date} {movie.genres.map(genre => genre.name).join(', ')}</p>
          <h2>Översikt</h2>
          <p className="overview">{movie.overview}</p>
          <div className="crew-info">
            {crew.map((member) => (
              <p key={member.credit_id}><strong>{member.name}</strong> {member.job}</p>
            ))}
          </div>
          <div className="actions">
            <button onClick={onBuy} className="buy-button">Köp</button>
            <button onClick={onWatchTrailer} className="trailer-button">Se Trailer</button>
          </div>
          <p className="price">Pris: {movie.price ? movie.price : 'N/A'}:-</p>
        </div>
      </div>
      <div className="cast-section">
        <h2>Huvudrollsinnehavare</h2>
        <div className="cast-list">
          {cast.map((actor) => (
            <div key={actor.credit_id} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="cast-image"
              />
              <p className="cast-name">{actor.name}</p>
              <p className="character-name">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="cast-section">
        <h2>Rekommendationer</h2>
        <div className="cast-list">
          {recommendations.map((rec) => (
            <div key={rec.id} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w185${rec.poster_path}`}
                alt={rec.title}
                className="cast-image"
              />
              <p className="cast-title">{rec.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;
