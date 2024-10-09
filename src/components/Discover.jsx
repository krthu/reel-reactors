import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import placeholder from "../features/placeholder";
import { useState, useEffect } from "react";

const Discover = () => {
    const ListData = placeholder.getMovieListPlaceholder();
    const [selectedMovieID, setSelectedMovieID] = useState('');
    const [backdropUrl, setBackdropUrl] = useState(""); 
    const [movieTitle, setMovieTitle] = useState("");
    const [movieOverview, setMovieOverview] = useState("");
    const popularCaruselItems = []; 

    const handlePosterPress = (id) => {
        setSelectedMovieID(id);
    }

    const fillCarusell = () => {
        ListData.results.forEach((movie) => {
            popularCaruselItems.push(
                <MovieCard 
                    url={movie.poster_path} 
                    key={movie.id}
                    onPress={() => handlePosterPress(movie.id)}
                    isSelected={movie.id === selectedMovieID}
                />
            );
        });
    }
    fillCarusell();

    const fillHeader = () => {
      if (ListData.results && ListData.results.length > 0) {
          const firstMovie = ListData.results[0];
          const baseImageUrl = 'https://image.tmdb.org/t/p/original';
          setBackdropUrl(`${baseImageUrl}${firstMovie.backdrop_path}`);
          setMovieTitle(firstMovie.title);
          setMovieOverview(firstMovie.overview)
      }
  };
  useEffect(() => {
    fillHeader();
}, []);

return (
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
      </div>
  </div>
);
}

export default Discover;
