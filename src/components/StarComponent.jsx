import React, { useState } from 'react';
import './StarComponent.css';

const StarComponent = ({ movie, onStarClick }) => {
    const [isStarred, setIsStarred] = useState(false);

    const handleStarClick = () => {
        setIsStarred(!isStarred);
        onStarClick(movie);
    };

    return (
        <div className="star-container">
            <span
                className={`star ${isStarred ? 'starred' : ''}`}
                onClick={handleStarClick}
            >
                ★
            </span>
            <p>{movie.title}</p>
        </div>
    );
};

export default StarComponent;
