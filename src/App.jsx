import React from 'react';
import { useState } from 'react'
import Navbar from './components/Navbar';

import './App.css'

import placeholder from './features/placeholder'


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
