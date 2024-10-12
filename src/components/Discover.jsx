import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { getMovies, getMoviesWithGenres, getMovieDetails, fetchDataForDiscover, getTvShow } from "../api/api";

const Discover = ({ movieData, setMovieData, isMovieData = true }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [landingMovie, setLandingMovie] = useState(null);

    // Lyssna på URL-ändringar
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieIDFromURL = urlParams.get('jbv'); // Hämta filmens ID från URL

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

    const handlePosterPress = (movie) => {
        setSelectedMovie(movie); // Sätt vald film
        setShowOverlay(true); // Visa overlay
        // Uppdatera URL utan att ladda om sidan
        window.history.pushState({}, '', `?jbv=${movie.id}`);
    };

    const closeOverlay = () => {
        setShowOverlay(false); // Stäng overlay
        setSelectedMovie(null); // Nollställ vald film
        // Återställ URL till standardvärdet
        window.history.pushState({}, '', window.location.pathname);
    };

    const fillHeader = (movieData) => {
        const randomIndex = Math.floor(Math.random() * movieData.results.length);
        const firstMovie = movieData.results[randomIndex];
        setLandingMovie(firstMovie); // Sätt första filmen som landningssidans film
    };



    useEffect(() => {
        console.log(movieData);

        const fetchAllData = async () => {
            try {
                // Hämta data för alla genrer parallellt
                const data = await fetchDataForDiscover(isMovieData);
                console.log('Data Fetched with alot of calls!')
                fillHeader(data.popular);
                setMovieData(data); // Uppdatera state med all genre-data
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }
        if (Object.keys(movieData).length === 0) {
            fetchAllData();
        } else {
            fillHeader(movieData.popular);
        }
    }, [movieData]);


    const renderCarusels = () => {
        if (!movieData || Object.keys(movieData).length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <>
                {/* Rendera alla genrer från movieData */}
                {Object.entries(movieData).map(([genre, data]) => {
                    // Filtrera bort filmer som inte har poster_path eller backdrop_path
                    const movieCards = data.results
                        .filter((movie) => movie.poster_path && movie.backdrop_path)
                        .map((movie) => (
                            <MovieCard
                                url={movie.poster_path}
                                key={movie.id}
                                onPress={() => handlePosterPress(movie)}
                                isSelected={selectedMovie !== null && movie.id === selectedMovie.id}
                            />
                        ));

                    return (
                        <div key={genre} className="popular-movie-container">
                            <Carusel items={movieCards} title={genre} />
                        </div>
                    );
                })}
            </>
        );
    }


    return (
        <>
            <div className="body-container">
                <div className="header-container">
                    <Navbar />
                    <Header movie={landingMovie} />
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
