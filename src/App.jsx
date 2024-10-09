import React from 'react';
import { useState } from 'react'
import Navbar from './components/Navbar';
import MoviePage from './components/MoviePage';
import TVSeriesPage from './components/TVSeriesPage';


import './App.css'

import placeholder from './features/placeholder'
import { Route, Routes } from 'react-router-dom';
import Discover from './components/Discover';
import Movie from './components/Movie';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './features/rootReducer';


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
      <div className='app-container'>
        <Routes>
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/tvseries" element={<TVSeriesPage />} />
          <Route path='/' element={<Discover />} />
          <Route path='/movie/:id' element={<Movie />} />
        </Routes>

      </div>

  

    
  )
}

export default App
