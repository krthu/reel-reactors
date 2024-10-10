import React, { useState } from "react";
import './MoviePage.css';

const movies = [
    { id: 1, title: "Inception", year: 2010 },
    { id: 2, title: "The Dark Knight", year: 2008 },
    { id: 3, title: "Interstellar", year: 2014 }
];

const MoviePage = () => {
    const [starredMovies, setStarredMovies] = useState([]);

    const handleStarClick = (movieId) => {
        if (starredMovies.includes(movieId)) {
            setStarredMovies(starredMovies.filter(id => id !== movieId));
        } else {
            setStarredMovies([...starredMovies, movieId]);
        }
    };

    return (
        <div className="movie-page">
            <h1>List of all movies</h1>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.title} ({movie.year})
                        <span
                            className={`star ${starredMovies.includes(movie.id) ? 'starred' : ''}`}
                            onClick={() => handleStarClick(movie.id)}
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                        >★</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoviePage;
