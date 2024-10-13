import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';
import './Navbar.css';

const Navbar = () => {
  const [movies, setMovies] = useState([]); // State to store all movies
  const [searchQuery, setSearchQuery] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const totalPages = 20;
        const movieIds = new Set();
        const requests = [];
    
        for (let page = 1; page <= totalPages; page++) {
          requests.push(
            axios.get('https://api.themoviedb.org/3/movie/popular', {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN}`,
              },
              params: {
                page,
              },
            })
          );
        }
    
        const responses = await Promise.all(requests);
    
        const moviesData = [];
        responses.forEach(response => {
          response.data.results.forEach(movie => {
            if (!movieIds.has(movie.id)) {
              movieIds.add(movie.id);
              moviesData.push(movie);
            }
          });
        });
    
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchMovies();
  }, []);

  const filterAndSortMovies = (moviesList) => {
    if (!Array.isArray(moviesList)) {
      return [];
    }

    let filteredMovies = moviesList;
    if (searchQuery) {
      filteredMovies = moviesList
        .map((movie) => {
          let score = 0;
          const lowerQuery = searchQuery.toLowerCase();

          if (movie.title && movie.title.toLowerCase().includes(lowerQuery)) score += 1;
          if (movie.overview && movie.overview.toLowerCase().includes(lowerQuery)) score += 1;
          if (movie.release_date && movie.release_date.includes(lowerQuery)) score += 1;

          return { ...movie, score };
        })
        .filter((movie) => movie.score > 0)
        .sort((a, b) => b.score - a.score);

      // Remove duplicates from filteredMovies
      const uniqueMoviesMap = new Map();
      filteredMovies.forEach((movie) => {
        if (!uniqueMoviesMap.has(movie.id)) {
          uniqueMoviesMap.set(movie.id, movie);
        }
      });
      filteredMovies = Array.from(uniqueMoviesMap.values());
    }

    return filteredMovies;
  };

  const handleHome = () => {
    navigate('/');
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
    setSearchQuery('');
  };

  const handleMovieClick = (movie) => {
    setIsOverlayVisible(false);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="links">
          <Link to="/movies">Movies</Link>
          <Link to="/tvseries">TV-Shows</Link>
          <Link to="/mymovies">My Movies</Link>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
      <div className="logo-center">
        <img src="/pictures/reel-reactors-logga.png" alt="Reel Reactors Logo" className="logo" />
      </div>
      <div className="nav-right">
        <Link to="/" className="home-button" onClick={handleHome}>
          <img src="/pictures/icons8-home-64.png" alt="Home icon" />
        </Link>
        <Link to="/cart" className="cart-button">
          <img src="/pictures/icons8-cart-64.png" alt="Cart icon" />
        </Link>
      </div>

      {isOverlayVisible && searchQuery && (
        <SearchOverlay
          movies={filterAndSortMovies(movies)}
          onSelectMovie={handleMovieClick}
          onClose={handleCloseOverlay}
          searchQuery={searchQuery}
        />
      )}
    </nav>
  );
};

export default Navbar;
