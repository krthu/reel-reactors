import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { getMovies, getMoviesWithGenres, getMovieDetails } from "../api/api";

const Discover = ({movieData, setMovieData}) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [backdropUrl, setBackdropUrl] = useState("");
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");


    // lyssna på URL-ändringar
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieIDFromURL = urlParams.get('jbv'); // hämta filmens ID från URL
        
        if (selectedMovie && selectedMovie.id === parseInt(movieIDFromURL)){
            return
        }
        const getMovie = async () => {
            try {
                const movie = await getMovieDetails(parseInt(movieIDFromURL));
                setSelectedMovie(movie);
                setShowOverlay(true);


            } catch  {
                console.error('Error fetching movie data:', error);
            }
        }
        if (movieIDFromURL){
            getMovie();
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


    const fillHeader = (movieData) => {
        //Write a random function for this 
        const randomIndex = Math.floor(Math.random() * movieData.results.length);
        const firstMovie = movieData.results[randomIndex];
        const baseImageUrl = 'https://image.tmdb.org/t/p/original';
        setBackdropUrl(`${baseImageUrl}${firstMovie.backdrop_path}`);
        setMovieTitle(firstMovie.title);
        setMovieOverview(firstMovie.overview);

    };


    useEffect(() => {
        if(Object.keys(movieData).length === 0){
            const fetchAllData = async () => {
                try {
                    // Hämta data för alla genrer parallellt
                    const data = await fetchMovieData();
                    console.log('Data Fetched with alot of calls!')
                    fillHeader(data.popular);
                    setMovieData(data); // Uppdatera state med all genre-data
                } catch (error) {
                    console.error('Error fetching movie data:', error);
                }
            };

            fetchAllData();
        }
    }, []);

    const genres = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
    ];
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Slumpmässigt index mellan 0 och i
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Byter plats på elementet vid index i med elementet vid index j
        }
        return arr;
    }

    const fetchMovieData = async () => {
        // Get Popular data and add to data
        const data = {
            popular: await getMovies()

        };
        //Loop through all genres and get the data and save
        const promises = genres.map(async (genre) => {
            const genreData = await getMoviesWithGenres(genre.id);
            genreData.results = shuffleArray(genreData.results)
            data[genre.name] = genreData;

        });
        // Wait for all fetches to resolve
        await Promise.all(promises);
        return data

    }

    const renderCarusels = () => {

        if (!movieData || Object.keys(movieData).length === 0) {
            return <div>Loading...</div>;
        }

        const popularMovies = movieData.popular.results || [];

        const popularMovieCards = popularMovies.map((movie) => {
            return (<MovieCard
                url={movie.poster_path}
                key={movie.id}
                onPress={() => handlePosterPress(movie)}
                isSelected={selectedMovie !== null && movie.id === selectedMovie.id}
            />
            )
        })
        return (
            <>
                <div className="popular-movie-container">
                    <Carusel items={popularMovieCards} title={'Popular'} />
                </div>

                {genres.map((genre) => {
                    const movies = movieData[genre.name] || [];
                    const movieCards = movies.results.map((movie) => {
                        return (<MovieCard
                            url={movie.poster_path}
                            key={movie.id}
                            onPress={() => handlePosterPress(movie)}
                            isSelected={selectedMovie !== null && movie.id === selectedMovie.id}
                        />
                        );
                    });
                    return (
                        <div key={genre.id} className="popular-movie-container">
                            <Carusel items={movieCards} title={genre.name} />
                        </div>
                    )

                })}
            </>
        )
    }



    return (
        <>
            <div className="body-container">
                <div className="header-container">
                    <Navbar />
                    <Header backdropUrl={backdropUrl} movieTitle={movieTitle} movieOverview={movieOverview} />
                </div>

                <div className="movie-genre-container">

                    {renderCarusels()}

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
