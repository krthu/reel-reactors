import './RecommendationComp.css'; 
import { useNavigate } from 'react-router-dom';

const RecommendationComp = ({ recommendedMovies }) => {

  const navigate = useNavigate();
  const moviePress = (id) => {
    navigate(`/movie/${id}`)
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }


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
                 onClick={() => moviePress(movie.id)}/>
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
