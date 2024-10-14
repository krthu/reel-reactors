import { useState } from "react";
import './Carusel.css'
import { useRef } from "react";
import { useEffect } from "react";

const Carusel = ({ items, title }) => {

    const caruselContentRef = useRef(null);

    const handlePreviousPress = () => {
        const caruselContent = caruselContentRef.current;
        const contentWidth = caruselContent.clientWidth;
        caruselContent.scrollBy({ left: -contentWidth, behavior: "smooth" });
    }

    const handleNextPress = (e) => {
        const caruselContent = caruselContentRef.current;
        const contentWidth = caruselContent.clientWidth;
        caruselContent.scrollBy({ left: contentWidth, behavior: "smooth" });
    }

    return (

        <div className="carusel-section">
            <h2 className="carusel-title">{title}</h2>
            <div className="carusel-container">

                <button onClick={handlePreviousPress} className="carusel-button carusel-button-left">
                    <span className="material-symbols-outlined carusel-chevron">
                        chevron_left
                    </span>
                </button>
                <div className="carusel-content" ref={caruselContentRef}>
                    {items}
                </div>

                <button onClick={handleNextPress} className="carusel-button carusel-button-right">
                    <span className="material-symbols-outlined carusel-chevron">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Carusel;


/*

How to use:

In parent component:

// Store all Components to show in carusel
  const posterCarusellItems = []; 

//Handle item pressed function
  const handlePosterPress = (id) => {
    console.log(id);
    setSelectedMovieID(id)
  }

  // State for highlighting a Item in the carusel
  const [selectedMovieID, setSelectedMovieID] = useState('');


  // Generate the list of Components to fill with

  //Change when api is ready
  const fillCurusell = () => {
    ListData.results.forEach((movie) => {
      posterCarusellItems.push(
      <PosterCarusellItem 
      url={movie.poster_path} 
      key={movie.id}
      onPress={() => handlePosterPress(movie.id) }
      isSelected={movie.id === selectedMovieID}
      />)
    })
  }
    Call the function
  fillCurusell();

        To acces the component where you whan it
      <Carusell items={posterCarusellItems} title={'Populära'}/>


*/