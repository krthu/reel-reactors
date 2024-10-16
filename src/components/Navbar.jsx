import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';
import './Navbar.css';
import { searchMovies } from '../api/api';  // Import the searchMovies function
import logo from '../assets/images/reel-reactors-logga.png';
import cartIcon from '../assets/images/icons8-cart-64.png';

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
        <img src={logo} alt="Reel Reactors Logo" className="logo" />
      </div>


      <div className="nav-right">
       <div className="profile-container">
         <div className="profile-icon">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24" className="icon">
           <circle cx="12" cy="12" r="10" stroke="none" fill="white" />
          <path d="M12 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4z" fill="#0c5797" />
     </svg>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 24 24" className="icon-chevron">
      <path d="M7 10l5 5 5-5z"/>
    </svg>
  </div>
                <Link to="/cart" className="cart-button">
                    <img src={cartIcon} alt="Cart icon" className="cart-icon" />
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

      {/* {isLoading && <div className="loading">Loading...</div>} kommenterar bort då den flyttar loggan osv*/} 
    </nav>
  );
};

export default Navbar;

// This update improves the search capability by querying the entire movie database directly instead of relying on preloaded movies.
