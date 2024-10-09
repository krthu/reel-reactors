import Carusel from "./Carusel";
import Navbar from "./Navbar";
import Header from "./Header";
import MovieCard from "./MovieCard";
import placeholder from "../features/placeholder";
import { useState } from "react";

const Discover = () => {
    const ListData = placeholder.getMovieListPlaceholder();
    const [selectedMovieID, setSelectedMovieID] = useState('');
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

    return (
      <div className="body-container">
          <div className="header-container"> {/* Ny container för headern */}
              <Navbar />
              <Header />
          </div>
  
          <div className="movie-genre-container">
              <div className="popular-movie-container">
                  <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
              </div>
              {/* Lägg till fler genrer här, fylla på dynamiskt? */}
          </div>
      </div>
  );
  
}

export default Discover;
