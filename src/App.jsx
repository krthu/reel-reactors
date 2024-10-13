import React, { useState } from 'react';
import Checkout from './components/CheckOut';
import MovieInformation from './components/MovieInformation';
import MoviePage from './components/MoviePage';
import MyMovies from './components/MyMovies';
import TVSeriesPage from './components/TVSeriesPage';

import './App.css';

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Discover from './components/Discover';
import ShoppingCart from './components/ShoppingCart';
import placeholder from './features/placeholder';


function App() {

  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [movieData, setMovieData] = useState({});
  // console.log(shoppingCart);


  const [cart, setCart] = useState([]);


  const addToCart = (movie) => {
    const existingItem = cart.find(item => item.id === movie.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === movie.id ? { ...existingItem, quantity: existingItem.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...movie, quantity: 1 }]);
    }
  };

  const removeFromCart = (movie) => {
    setCart(cart.filter(item => item.id !== movie.id));
  };



  const ListData = placeholder.getMovieListPlaceholder();

  const GenresData = placeholder.getGenresPlaceholder();
  const DetailedMovieData = placeholder.getDetaildMoviePlaceholder();
  const CastData = placeholder.getCastPlaceholder();

  // console.log(ListData);
  // console.log(GenresData);
  // console.log(DetailedMovieData);
  // console.log(CastData);







  return (
      <div className='app-container'>
        <Routes>
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/tvseries" element={<TVSeriesPage />} />
          <Route path="/mymovies" element={<MyMovies />} />
          <Route path='/' element={<Discover movieData={movieData} setMovieData={setMovieData}/>} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/cart' element={<ShoppingCart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} />} />
        </Routes>

      </div>

  

    
  )
}

export default App
