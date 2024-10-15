import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { useNavigate } from 'react-router-dom';
import { getMovieDetails, fetchAllDiscoverData } from "../api/api";

const Discover = ({ movieData, setMovieData }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [landingMovie, setLandingMovie] = useState(null);
    const navigate = useNavigate();

    // Listen for URL changes
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieIDFromURL = urlParams.get('jbv'); // Get movie ID from URL

        if (movieIDFromURL && !selectedMovie) {
            const getMovie = async () => {
                try {
                    const movie = await getMovieDetails(parseInt(movieIDFromURL));
                    setSelectedMovie(movie);
                    setShowOverlay(true);
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };
            getMovie();
        }
    }, [window.location.search, selectedMovie]);

    // funktionen som navigerar till filmsidan
    const handleMoreInfoClick = (movie) => {
        navigate(`/movie/${movie.id}`);
    };

    const handlePosterPress = (movie) => {
        const isMobile = window.innerWidth <= 768; // kolla om det är en mobil enhet

        if (isMobile) {
            handleMoreInfoClick(movie); // navigera direkt till filmsidan om det är mobil
        } else {
            // overlay om det inte är mobil
            setSelectedMovie(movie);
            setShowOverlay(true);
            window.history.pushState({}, '', `?jbv=${movie.id}`);
        }
    };

    const closeOverlay = () => {
        setShowOverlay(false); // Close overlay
        setSelectedMovie(null); // Reset selected movie
        // Reset URL to default
        window.history.pushState({}, '', window.location.pathname);
    };

    const fillHeader = (movieData) => {
        const randomIndex = Math.floor(Math.random() * movieData.results.length);
        const firstMovie = movieData.results[randomIndex];
        setLandingMovie(firstMovie); // Set first movie for landing page header
    };

    // Ensure fillHeader is called whenever movieData changes
    useEffect(() => {
        if (movieData.popular && movieData.popular.results.length > 0) {
            fillHeader(movieData.popular);
        }
    }, [movieData]);

    // Handle back navigation to re-render or refetch data
    useEffect(() => {
        const handlePopState = () => {
            if (!landingMovie && movieData.popular) {
                fillHeader(movieData.popular);
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [landingMovie, movieData]);

    useEffect(() => {
      
            const fetchAllData = async () => {
                try {
                    const data = await fetchAllDiscoverData();
                    fillHeader(data.popular);
                    setMovieData(data);
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };
            if (Object.keys(movieData).length === 0) {
            fetchAllData();
            } else {
                fillHeader(movieData.popular)
        }
    }, [movieData]);

    const renderCarusels = () => {
        if (!movieData || Object.keys(movieData).length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <>
            {/* Render all movies from movie data into a array of movie cards*/}
            {Object.entries(movieData).map(([genre, data]) => {
                // Remove items without a poster or a backdrop
                const movieCards = data.results
                    .filter((movie) => movie.poster_path && movie.backdrop_path)
                    .map((movie) => (
                        //Create a card per movie
                        <MovieCard
                            url={movie.poster_path}
                            key={movie.id}
                            onPress={() => handlePosterPress(movie)}
                            isSelected={selectedMovie !== null && movie.id === selectedMovie.id}
                        />
                    ));

                return (
                    //For each genre return a whole Carusel with the movieCards in
                    <div key={genre} className="popular-movie-container">
                        <Carusel items={movieCards} title={genre} />
                    </div>
                );
            })}
        </>
        );
    };

    return (
    <>
        <div className="body-container">
            <div className="header-container">
                <Navbar />
                {landingMovie ? (
                    <Header movie={landingMovie} />
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="movie-genre-container">{renderCarusels()}</div>
        </div>
        {/* Overlay */}
        <Overlay show={showOverlay} onClose={closeOverlay}>
            {selectedMovie && (
                <Header movie={selectedMovie} isOverlay={true} onClose={closeOverlay} />
            )}
        </Overlay>
    </>
);

};

export default Discover;
