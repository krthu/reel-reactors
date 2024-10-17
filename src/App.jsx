import React, { useState } from 'react';
import Checkout from './components/CheckOut';
import MovieInformation from './components/MovieInformation';
// import MoviePage from './components/MoviePage';
import MyFavorites from "./components/MyFavorites";
import MyMovies from './components/MyMovies';
// import TVSeriesPage from './components/TVSeriesPage';

import './App.css';

import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Discover from './components/Discover';
import ShoppingCart from './components/ShoppingCart'
// import OrderDetails from './components/OrderDetails';
// import StarComponent from './components/StarComponent';
import placeholder from './features/placeholder';
import TVShows from './components/TVShows';



function App() {


  const [movieData, setMovieData] = useState({});

  const [favorites, setFavorites] = useState([]);

  const addFavorite = (movie) => {
      if (!favorites.find(fav => fav.id === movie.id)) {
          setFavorites([...favorites, movie]);
      }
  };



  return (
      <div className='app-container'>
        <Routes>
          {/* <Route path="/movies" element={<MoviePage />} /> */}
          <Route path="/tvseries" element={<TVShows />} />
          <Route path="/mymovies" element={<MyMovies />} />
          <Route path='/' element={<Discover movieData={movieData} setMovieData={setMovieData}/>} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/cart' element={<ShoppingCart />} />
          {/* <Route path='/order' element={<OrderDetails />}/> */}
          <Route path="/favorites" element={<MyFavorites favorites={favorites} />} />
          {/* <Route path="/movie/:id" element={<StarComponent onStarClick={addFavorite} />} /> */}
        </Routes>
      </div>

  

    
  )
}

export default App;
