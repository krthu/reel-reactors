import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <div className="links">
                    <Link to="/">Movies</Link>
                    <Link to="/tvseries">TV-Shows</Link>
                    <Link to="/mymovies">My Movies</Link>
                </div>
                <div className="search-container">
                    <input type="text" placeholder="Sök..." />
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

        </nav>

    );
};

export default Navbar;