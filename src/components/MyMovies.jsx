import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/api';
import Navbar from './Navbar';
import './MyMovies.css';
import { useNavigate } from 'react-router-dom';
import RatingComponent from './RatingComponent';

const MyMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [purchasedMovies, setPurchasedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        // Placeholder logic to fetch popular movies as favorite movies
        const favorites = await getMovies('popular');
        setFavoriteMovies(favorites.results);

        // Placeholder logic to fetch top-rated movies as purchased movies
        const purchased = await getMovies('top_rated');
        setPurchasedMovies(purchased.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="my-movies">
      <Navbar />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <section className="movie-section">
            <h2>My Movies</h2>
            <div className="movies-list">
              {purchasedMovies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                  <RatingComponent rating={movie.vote_average} />
                </div>
              ))}
            </div>
          </section>

          <section className="movie-section">
            <h2>My Favorite Movies</h2>
            <div className="movies-list">
              {favoriteMovies.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                  <RatingComponent rating={movie.vote_average} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MyMovies;

// This component displays the user's purchased and favorite movies using placeholder lists.
// It fetches data from the API and displays each section with movie posters and titles.