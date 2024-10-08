import React from 'react';
import { useState } from 'react'
import Navbar from './components/Navbar';
import MoviePage from './components/MoviePage';
import TVSeriesPage from './components/TVSeriesPage';

import ShoppingCart from './components/Shoppingcart';

import './App.css'

import placeholder from './features/placeholder'
import { Route, Routes } from 'react-router-dom';
import Discover from './components/Discover';
import Movie from './components/Movie';


function App() {

  const [cart, setCart] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);

  const addToCart = (movie) => {
    setCart([...cart, movie]);
  };

  const removeFromCart = (movie) => {
    setCart(cart.filter(item => item.id !== movie.id));
  };

  const closeCart = () => {
    setCartVisible(false);
  };


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
  );
}

export default App;
