import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/images/reel-reactors-logga.png';
import cartIcon from '../assets/images/icons8-cart-64.png';


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="links">
                    <Link to="/movies">Movies</Link>
                    <Link to="/tvseries">TV-Shows</Link>
                    <Link to="/mymovies">My Movies</Link>
                    <Link to="/favorites">My Favorites</Link>
                </div>
                <div className="search-container">
                    <input type="text" placeholder="Sök..." />
                </div>
            </div>

            <div className="logo-center">
                <img src={logo} alt="Reel Reactors Logo" className="logo" />
            </div>

            <div className="nav-right">
                <Link to="/cart" className="cart-button">
                    <img src={cartIcon} alt="Cart icon" className="cart-icon" />
                </Link>
            </div>

        </nav>

    );
};

export default Navbar;