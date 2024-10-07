import { useState } from 'react'

import './App.css'

import placeholder from './features/placeholder'
import PosterCarusellItem from './components/PosterCaruselItem';
import Carusell from './components/Carusel';

function App() {
  const ListData = placeholder.getMovieListPlaceholder();

  const GenresData = placeholder.getGenresPlaceholder();
  const DetailedMovieData = placeholder.getDetaildMoviePlaceholder();
  const CastData = placeholder.getCastPlaceholder();

  console.log(ListData);
  console.log(GenresData);
  console.log(DetailedMovieData);
  console.log(CastData);

  const posterCarusellItems = [];

  const handlePosterPress = (id) => {
    console.log(id);
  }


//Change when api i ready
  const fillCurusell = () => {
    ListData.results.forEach((movie) => {
      posterCarusellItems.push(<PosterCarusellItem url={movie.poster_path} key={movie.id} onPress={() => handlePosterPress(movie.id)}/>)
    })
  }
  fillCurusell();
  return (
    <>  
      {/* <PosterCarusellItem url={'/1E5baAaEse26fej7uHcjOgEE2t2.jpg'} /> */}
      <Carusell items={posterCarusellItems}/>

    </>
  )
}

export default App
