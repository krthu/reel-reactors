import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { useState, useEffect } from "react";
import Overlay from "./Overlay";
import { getMovies, getMoviesWithGenres } from "../api/api";

const Discover = () => {
    //const ListData = placeholder.getMovieListPlaceholder();
    const [movieData, setMovieData] = useState({});
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

    const fillHeader = (movieData) => {
        //Write a random function for this 
        const firstMovie = movieData.results[0];
        const baseImageUrl = 'https://image.tmdb.org/t/p/original';
        setBackdropUrl(`${baseImageUrl}${firstMovie.backdrop_path}`);
        setMovieTitle(firstMovie.title);
        setMovieOverview(firstMovie.overview);

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
        
    },[]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Hämta data för alla genrer parallellt
                const data = await fetchMovieData();
                setMovieData(data); // Uppdatera state med all genre-data
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };
        
        fetchAllData();
    }, []);

    const genres = [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
        { id: 878, name: "Science Fiction" },
        { id: 27, name: "Horror" }
    ];

    const fetchMovieData = async () => {
     //   const data = {};
        // const res = await getMovies();
        // const res2 = await getMoviesWithGenres(28);
        // console.log(res);
        // console.log(res2);
        // data['Action'] = res;
        // setMovieData(data)




        const data = {};
        const promises = genres.map(async(genre) =>{
            // console.log(genre);
            const genreData = await getMoviesWithGenres(genre.id);
            // console.log(genreData);
            data[genre.name] = genreData;
            
        });
        await Promise.all(promises);
        // console.log(data)
        return data


        // for (const genre of genres){
        //     const genreData = await getMoviesWithGenres(genre.id);
            
        //     data[genre.name] = genreData

        // }
        // setMovieData(data);

    }

    const renderCarusels = () => {

        if (!movieData || Object.keys(movieData).length === 0) {
            return <div>Loading...</div>; // Visa laddningsmeddelande tills data är hämtad
        }

        return genres.map((genre) => {
            const movies = movieData[genre.name] || [];
            const movieCards = movies.results.map((movie) => {
               return( <MovieCard
                    url={movie.poster_path}
                    key={movie.id}
                    onPress={() => handlePosterPress(movie)}
                    isSelected={movie.id === selectedMovieID}
                />
               );
            });
            return (
                <div key={genre.id} className="popular-movie-container">
                    <Carusel items={movieCards} title={genre.name} />
                </div>
            )
        })

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

                    {/* <div className="popular-movie-container">
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
                        <Carusel items={popularCaruselItems} title={"Populära Filmer"} /> */}
                    {/* </div> */}
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
