import React, { useEffect, useState } from 'react';
import './MovieInformation.css';
import { getMovieDetails, getCast } from '../api/api';
import { useParams } from 'react-router-dom';
import MovieHeader from './MovieHeader';
import ActorCard from './ActorCard';
import RecommendationComp from './RecommendationComp';
import Navbar from './Navbar';
import Footer from "./Footer";

const MovieInformation = ({ onBuy, onWatchTrailer }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [showFooter] = useState(true); // Definiera showFooter, alltid true i detta fall

  useEffect(() => {
    const movieId = id;

    if (!movieId) {
      console.error("Movie ID is undefined");
      return;
    }

    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        
        setMovie(movieData);
        setCast(movieData.credits.cast);
        setCrew(movieData.credits.crew);

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
    <>
      <div className="movie-information-container">
        <Navbar />
        <MovieHeader 
          backdropUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          rating={movie.vote_average} // Pass the rating here
          movieTitle={movie.title}
          movieOverview={movie.overview}
          releaseDate={movie.release_date}
          genres={movie.genres.map(genre => genre.name)}
          crew={crew}
          movie={movie}
        />
        {/* Additional sections like CastList and RecommendationComp */}
        <ActorCard cast={cast} />
        <RecommendationComp recommendedMovies={movie.recommendations.results} />
      </div>

      {/* Footer */}
      {showFooter && <Footer className="footer-container" />}
    </>
  );
};

export default MovieInformation;
