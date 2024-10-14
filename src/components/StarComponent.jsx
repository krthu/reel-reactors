import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StarComponent.css';

const StarComponent = ({ movie, onStarClick }) => {
    const [isStarred, setIsStarred] = useState(false);
    const navigate = useNavigate();

    const handleStarClick = () => {
        setIsStarred(!isStarred);
        onStarClick(movie);
        navigate('/favorites');
    };

    return (
        <div className="star-container">
            <span
                className={`star ${isStarred ? 'starred' : ''}`}
                onClick={handleStarClick}
            >★</span>
            <p>{movie.title}</p>
        </div>
    );
};

export default StarComponent;
