import React from 'react';

const MyFavorites = ({ favorites }) => {
    return (
        <div>
            <h2>My Favorites</h2>
            {favorites.length > 0 ? (
                <ul>
                    {favorites.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No favorites yet!</p>
            )}
        </div>
    );
};

export default MyFavorites;
