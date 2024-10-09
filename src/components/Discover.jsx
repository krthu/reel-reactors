import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import placeholder from "../features/placeholder";
import { useState, useEffect } from "react";
import Overlay from "./Overlay";

const Discover = () => {
  const ListData = placeholder.getMovieListPlaceholder();
  const [selectedMovieID, setSelectedMovieID] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [backdropUrl, setBackdropUrl] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const [movieOverview, setMovieOverview] = useState("");
  const [popularCaruselItems, setPopularCaruselItems] = useState([]);

  // Lyssna på URL-ändringar
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieIDFromURL = urlParams.get('jbv'); // Hämta filmens ID från URL
    if (movieIDFromURL) {
      const foundMovie = ListData.results.find(movie => movie.id === parseInt(movieIDFromURL));
      if (foundMovie) {
        setSelectedMovie(foundMovie); // Sätt vald film baserat på URL
        setShowOverlay(true); // Visa overlay
      }
    }
  }, [window.location.search]); // Kör varje gång URL:en uppdateras

  const handlePosterPress = (movie) => {
    setSelectedMovie(movie); // Sätt vald film
    setShowOverlay(true); // Visa overlay
    // Uppdatera URL utan att ladda om sidan
    window.history.pushState({}, '', `?jbv=${movie.id}`);
  }

  const closeOverlay = () => {
    setShowOverlay(false); // Stäng overlay
    setSelectedMovie(null); // Nollställ vald film
    // Återställ URL till standardvärdet
    window.history.pushState({}, '', window.location.pathname);
  }

  const fillCarusell = () => {
    const items = ListData.results.map((movie) => (
      <MovieCard
        url={movie.poster_path}
        key={movie.id}
        onPress={() => handlePosterPress(movie)} // Skicka hela movie-objektet
        isSelected={movie.id === selectedMovieID}
      />
    ));
    setPopularCaruselItems(items); // Uppdatera state med filmkorten
  }

  useEffect(() => {
    fillCarusell(); // Körs bara när komponenten laddas första gången
  }, [ListData]); // Lyssna på ListData om det ändras

  const fillHeader = () => {
    if (ListData.results && ListData.results.length > 0) {
      const firstMovie = ListData.results[0];
      const baseImageUrl = 'https://image.tmdb.org/t/p/original';
      setBackdropUrl(`${baseImageUrl}${firstMovie.backdrop_path}`);
      setMovieTitle(firstMovie.title);
      setMovieOverview(firstMovie.overview);
    }
  };

  useEffect(() => {
    fillHeader();
  }, []);

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
        </div>
      </div>

      {/* Overlay */}
      <Overlay show={showOverlay} onClose={closeOverlay}>
        {selectedMovie && (
          <>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview}</p>
            <button onClick={closeOverlay}>Stäng</button>
          </>
        )}
      </Overlay>
    </>
  );
}

export default Discover;
