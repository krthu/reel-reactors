import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import placeholder from "../features/placeholder";
import { useState, useEffect } from "react";
import Overlay from "./Overlay";
import api, { getMovies } from "../api/api";

const Discover = () => {
    //const ListData = placeholder.getMovieListPlaceholder();
    const [ListData, setListData] = useState(null);
    const [selectedMovieID, setSelectedMovieID] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [popularCaruselItems, setPopularCaruselItems] = useState([]);
    const [landingMovie, setLandingMovie] = useState(null);

    // lyssna på URL-ändringar
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieIDFromURL = urlParams.get('jbv'); // hämta filmens ID från URL
        if (movieIDFromURL && ListData) {
            const foundMovie = ListData.results.find(movie => movie.id === parseInt(movieIDFromURL));
            if (foundMovie) {
                setSelectedMovie(foundMovie); // sätt vald film baserat på URL
                setShowOverlay(true); // visa overlay
            }
        }
    }, [window.location.search, ListData]);

    const handlePosterPress = (movie) => {
        setSelectedMovie(movie); // sätt vald film
        setShowOverlay(true); // visa overlay
        // uppdatera URL utan att ladda om sidan
        window.history.pushState({}, '', `?jbv=${movie.id}`);
    };

    const closeOverlay = () => {
        setShowOverlay(false); // stäng overlay
        setSelectedMovie(null); // nollställ vald film
        // återställ URL till standardvärdet
        window.history.pushState({}, '', window.location.pathname);
    };

    const fillCarusell = () => {
        if (ListData === null) {
            return
        }
        const items = ListData.results.map((movie) => (
            <MovieCard
                url={movie.poster_path}
                key={movie.id}
                onPress={() => handlePosterPress(movie)} // skicka hela movie-objektet
                isSelected={movie.id === selectedMovieID}
            />
        ));
        setPopularCaruselItems(items); // uppdatera state med filmkorten
    }

    useEffect(() => {
        fillCarusell(); // körs bara när komponenten laddas första gången
    }, [ListData]); // lyssna på ListData om det ändras

    const fillHeader = (movieData) => {
        const firstMovie = movieData.results[0];
        setLandingMovie(firstMovie); // sätt första filmen som landningssidans film
    };


    useEffect(() => {
        const getData = async () => {
            try {

                const movieData = await getMovies();
                setListData(movieData);
                fillHeader(movieData);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }
        getData();

    }, []);



    return (
        <>
            <div className="body-container">
                <div className="header-container">
                    <Navbar />
                    {/* Landningssidans header */}
                    <Header movie={landingMovie} />
                </div>

                <div className="movie-genre-container">
                    <div className="popular-movie-container">
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
                    </div>
                    {/* Fler karuseller */}
                </div>
            </div>
            {/* Overlay */}
            <Overlay show={showOverlay} onClose={closeOverlay}>
                {selectedMovie && (
                    <Header movie={selectedMovie} isOverlay={true} onClose={closeOverlay} />
                )}
            </Overlay>


        </>
    );
}

export default Discover;
