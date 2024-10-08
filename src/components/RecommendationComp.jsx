import { useState, useEffect } from 'react';
import api from '../api/api'; 
import './RecommendationComp.css'; 

const RecommendationComp = ({ movieId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (movieId) {
        try {
          const recommendations = await api.getRecommendations(movieId);
          setRecommendedMovies(recommendations);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        }
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return (
    <div className="recommendation-section">
      <h3>Recommended Movies</h3>
      <div className="recommendation-grid">
        {recommendedMovies.length > 0 ? (
          recommendedMovies.map((movie) => (
            <div key={movie.id} className="recommendation-card">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="recommendation-poster"
              />
              <h4>{movie.title}</h4>
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationComp;
