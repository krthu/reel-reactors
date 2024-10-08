import Carusel from "./Carusel";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import placeholder from "../features/placeholder";
import { useState } from "react";

const Discover = () => {


    const ListData = placeholder.getMovieListPlaceholder();
    // All this is needed for one slider.... perhaps rethink this.
    const [selectedMovieID, setSelectedMovieID] = useState('');
    const popularCaruselItems = []; 
    const handlePosterPress = (id) => {
    
        setSelectedMovieID(id)
      }
      
      const fillCarusell = () => {
        ListData.results.forEach((movie) => {
            popularCaruselItems.push(
          <MovieCard 
          url={movie.poster_path} 
          key={movie.id}
          onPress={() => handlePosterPress(movie.id) }
          isSelected={movie.id === selectedMovieID}
          />)
        })
      }
      fillCarusell();
      // To Here


    return(
        <div>
            <Navbar />
            {/* Header component */}

            <div className="grid-component?">
                <Carusel items={popularCaruselItems} title={"Populära Filmer"} />
            </div>
            
        </div>
    )
}

export default Discover;