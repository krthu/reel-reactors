import Carusel from "./Carusel";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import placeholder from "../features/placeholder";
import { useEffect, useState } from "react";
import api from "../api/api";

const Discover = () => {
   // const ListData = placeholder.getMovieListPlaceholder();
    const [data, setData] = useState(null);
    
    // All this is needed for one slider.... perhaps rethink this.
    const [selectedMovieID, setSelectedMovieID] = useState('');
    const popularCaruselItems = [];

    useEffect(() => {
        getData()
    },[])

    const getData = async () =>{
        const json = await api.getMovies();

        setData(json);
    }



    const handlePosterPress = (id) => {
    
        setSelectedMovieID(id)
      }
      
      const fillCarusell = () => {
        if (data === null) {
            return
        }

        data.results.forEach((movie) => {
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