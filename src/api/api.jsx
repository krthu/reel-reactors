import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_TMDB_API_KEY; // Access Vite environment variables
const accessToken = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const getMovies = async () => {
  try {
    const response = await apiClient.get('/movie/popular');
    return response.data; // Axios automatically parses the JSON
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getGenres = async () => {
  try {
    const response = await apiClient.get('/genre/movie/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getCast = async (id) => {
  try {
    const response = await apiClient.get(`/movie/${id}/credits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cast:', error);
    throw error;
  }
};

export const getRecommendations = async (id) => {
  try {
    const response = await apiClient.get(`/movie/${id}/recommendations`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};

export const getMoviesWithGenres = async (genres, page=1) => {
  const genreURL = `&with_genres=${genres}`;
  const pageURL = `&page=${page}`;
  try {
    const response = await apiClient.get(`/discover/movie?language=en-US${genreURL}${pageURL}&include_adult=false`)
    return response.data
  } catch {
    console.error('Error fetching movies with genres:', error);
    throw error;
  }
}

export default { getMovies, getGenres, getMovieDetails, getCast, getRecommendations, getMoviesWithGenres };
