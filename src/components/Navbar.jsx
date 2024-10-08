import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css';




const Navbar = ({ setCartVisible }) => {
    

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/movies">Filmer</Link>
                <Link to="/tvseries">TV-serier</Link>
                 <Link to="/mymovies">Mina Filmer</Link>
            </div>
            <div className="search-container">
                    <input type="text" placeholder="Sök..." />
            </div>
            <div className="logo-center">
                <img src="./pictures/reel-reactors-logga.png" alt="Reel Reactors Logo" />
            </div>
                <div className="nav-right">
                <button className="cart-button" onClick={() => setCartVisible(true)}>
                    <img src="/pictures/icons8-cart-64.png" alt="Cart icon" />
                    Visa varukorg
                </button>
                   
                </div>
        </nav>
    );
};

export default Navbar;
