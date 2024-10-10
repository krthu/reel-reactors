import React from "react";
import "./Header.css";
import Button from "./Button"

const Header = ({ backdropUrl, movieTitle, movieOverview }) => {
    return (
        <header className="header" style={{ backgroundImage: `url(${backdropUrl})` }}>
            <div className="container-left">
                <h1>{movieTitle}</h1>
                <p>{movieOverview}</p>
                <div className="button-container">
                    <Button icon="arrow_right" text="Watch" primary={true} />
                    <Button text="Trailer" primary={false} />
                </div>
            </div>
            <div className="container-right">
                {/* Här kan du eventuellt lägga till dekorativa element eller lämna det tomt */}
            </div>
        </header>
    );
};

export default Header;


