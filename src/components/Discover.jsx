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
    const [backdropUrl, setBackdropUrl] = useState("");
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const [popularCaruselItems, setPopularCaruselItems] = useState([]);

    // lyssna på URL-ändringar
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieIDFromURL = urlParams.get('jbv'); // hämta filmens ID från URL
        if (movieIDFromURL) {
            const foundMovie = ListData.results.find(movie => movie.id === parseInt(movieIDFromURL));
            if (foundMovie) {
                setSelectedMovie(foundMovie); // sätt vald film baserat på URL
                setShowOverlay(true); // visa overlay
            }
        }
    }, [window.location.search]); // kör varje gång URL:en uppdateras

    const handlePosterPress = (movie) => {
        setSelectedMovie(movie); // sätt vald film
        setShowOverlay(true); // visa overlay
        // uppdatera URL utan att ladda om sidan
        window.history.pushState({}, '', `?jbv=${movie.id}`);
    }

    const closeOverlay = () => {
        setShowOverlay(false); // stäng overlay
        setSelectedMovie(null); // nollställ vald film
        // återställ URL till standardvärdet
        window.history.pushState({}, '', window.location.pathname);
    }

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

    const fillHeader = () => {
        if (ListData === null) {
            return
        }
        if (ListData.results && ListData.results.length > 0) {
            const firstMovie = ListData.results[0];
            const baseImageUrl = 'https://image.tmdb.org/t/p/original';
            setBackdropUrl(`${baseImageUrl}${firstMovie.backdrop_path}`);
            setMovieTitle(firstMovie.title);
            setMovieOverview(firstMovie.overview);
        }
    };


    useEffect(() => {
        const getData = async () => {
            try {
                
                const movieData = await getMovies();
                setListData(movieData);
                fillHeader();
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        }
        getData();
        
    },[]);



    return (
        <>
            <div className="body-container">
                <div className="header-container">
                    <Navbar />
                    <Header backdropUrl={backdropUrl} movieTitle={movieTitle} movieOverview={movieOverview} />
                </div>

                <div className="movie-genre-container">
                    <div className="popular-movie-container">
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
                    </div>
                    <div className="popular-movie-container">
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
                    </div>
                    <div className="popular-movie-container">
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
                    </div>
                    <div className="popular-movie-container">
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
                    </div>
                    <div className="popular-movie-container">
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
                    </div>
                    <div className="popular-movie-container">
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
                    </div>
                </div>
            </div>
            {/* Overlay */}
            <Overlay show={showOverlay} onClose={closeOverlay} selectedMovie>
                {selectedMovie && (
                    <>
                        <img
                            src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                            alt={selectedMovie.title}
                            className="img"
                        />
                        <h2>{selectedMovie.title}</h2>
                        <p>{selectedMovie.overview}</p>
                        <button onClick={closeOverlay}>X</button>
                    </>
                )}
            </Overlay>


        </>
    );
}

export default Discover;
