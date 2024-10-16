import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../api/api';
import './MyMovies.css';
import Navbar from './Navbar';
import RatingComponent from './RatingComponent';
import FavoriteButton from './FavoriteButton';

const MyMovies = () => {
  const [purchasedMovies, setPurchasedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  //const [boughtMovies, setBoughtMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    loadBoughtMovies();



    const handleFavoritesUpdated = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(updatedFavorites);
 
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };

  }, []);

  const loadBoughtMovies = () => {
    const boughtMoviesFromStorage = JSON.parse(localStorage.getItem('bought-movies')) || [];
    setPurchasedMovies(boughtMoviesFromStorage);
    console.log(boughtMoviesFromStorage);
    setIsLoading(false);
  }

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     setIsLoading(true);
  //     try {
  //       const purchased = await getMovies('top_rated');
  //       setPurchasedMovies(purchased.results);
  //     } catch (error) {
  //       console.error('Error fetching movies:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="my-movies">
      <Navbar />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {/* My Movies Section */}
          <section className="movie-section">
            <h2>My Movies</h2>
            <div className="movies-list">

              { purchasedMovies.length > 0 ? (
              purchasedMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="movie-card"
                  onClick={() => handleMovieClick(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="rating-overlay">
                    <RatingComponent rating={movie.vote_average} />
                  </div>
                  {/* Use FavoriteButton */}
                  <FavoriteButton movie={movie} />
                </div>
              ))) : (
                <p>No bought movies yet.</p>
              )}
            </div>
          </section>

          {/* My Favorites Section */}
          <section className="movie-section">
            <h2>My Favorites</h2>
            <div className="movies-list">
              {favorites.length > 0 ? (
                favorites.map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-card"
                    onClick={() => handleMovieClick(movie)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="rating-overlay">
                      <RatingComponent rating={movie.vote_average} />
                    </div>
                    {/* Use FavoriteButton */}
                    <FavoriteButton movie={movie} />
                  </div>
                ))
              ) : (
                <p>No favorite movies yet.</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MyMovies;
