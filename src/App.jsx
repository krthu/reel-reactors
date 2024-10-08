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







  return (
    <>  

  

    </>
  )
}

export default App
