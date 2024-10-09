import { defaultMethod } from "react-router-dom/dist/dom";

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Correct way to access env vars in Vite
const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const defaultOptions = {
  defaultMethod: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
};

const getMovies = async () => {
  const response = await fetch(`${apiUrl}/movie/popular`, defaultOptions);
  const data = await response.json();
  return data;
};

const getGenres = async () => {
  const response = await fetch(`${apiUrl}/genre/movie/list`, defaultOptions);
  const data = await response.json();
  return data;
};

const getMovieDetails = async (id) => {
  const response = await fetch(`${apiUrl}/movie/${id}`, defaultOptions);
  const data = await response.json();
  return data;
};

const getCast = async (id) => {
  const response = await fetch(`${apiUrl}/movie/${id}/credits`, defaultOptions);
  const data = await response.json();
  return data;
};
const getRecommendations = async (movieId) => {
  const response = await fetch(`${apiUrl}/movie/${movieId}/recommendations?api_key=${apiKey}`, defaultOptions);
  const data = await response.json();
  return data.results; 
};

export default { getMovies, getGenres, getMovieDetails, getCast,getRecommendations };
