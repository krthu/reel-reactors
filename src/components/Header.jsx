import React from "react";
import "./Header.css";

const Header = ({ backdropUrl, movieTitle, movieOverview }) => {
    return (
        <header className="header" style={{ backgroundImage: `url(${backdropUrl})` }}>
            <div className="header-content">
                <h1>{movieTitle}</h1>               
                <p>{movieOverview}</p>
            </div>
        </header>
    );
};

export default Header;
