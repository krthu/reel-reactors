import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';
import './Navbar.css';
import { searchMovies } from '../api/api';  // Import the searchMovies function

const Navbar = () => {
  const [movies, setMovies] = useState([]); // State to store all movies
  const [searchQuery, setSearchQuery] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchedMovies = async () => {
        setIsLoading(true);
        try {
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchSearchedMovies();
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
    setSearchQuery('');
    setMovies([]); // Clear movie results when search is cleared
  };

  const handleMovieClick = (movie) => {
    setIsOverlayVisible(false);
    navigate(`/movie/${movie.id}`);
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="links">
          <Link to="/">Movies</Link>
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
                <Link to="/cart" className="cart-button">
                    <img src="/pictures/icons8-cart-64.png" alt="Cart icon" className="cart-icon" />
                </Link>
            </div>

      {isOverlayVisible && searchQuery && (
        <SearchOverlay
          movies={movies}
          onSelectMovie={handleMovieClick}
          onClose={handleCloseOverlay}
          searchQuery={searchQuery}
        />
      )}

      {isLoading && <div className="loading">Loading...</div>}
    </nav>
  );
};

export default Navbar;

// This update improves the search capability by querying the entire movie database directly instead of relying on preloaded movies.
