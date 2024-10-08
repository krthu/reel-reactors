import React from "react";
//import '/.Navbar.css';


const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="nav-left">
                    <button>Filmer</button>
                    <button>TV-serier</button>
                    <button>Mina Filmer</button>
                </div>
                <div className="search-container">
                    <input type="text" placeholder="Sök..." />
                </div>
                <div className="logo-center">
                <img src="./pictures/reel-reactors-logga.png" alt="Reel Reactors Logo" />
                </div>
                <div className="nav-right">
                    <button>Cart icon</button>
                <div/>
                </div>
        </nav>
    );
};

export default Navbar;
