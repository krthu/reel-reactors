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

export const getMovies = async (category = 'popular', params = {}) => {
  try {
    const response = await apiClient.get(`/movie/${category}`, { params });
    return response.data;
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
    const response = await apiClient.get(`/movie/${id}?append_to_response=videos`);
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

export const getMoviesWithGenres = async (genres, page = 1) => {
  const genreURL = `&with_genres=${genres}`;
  const pageURL = `&page=${page}`;
  try {
    const response = await apiClient.get(`/discover/movie?${genreURL}${pageURL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies with genres:', error);
    throw error;
  }
};

// Funktionen för att hämta trailers och videor
export const getVideos = async (id, isMovie = true) => {
  const format = isMovie ? 'movie' : 'tv';
  try {
    const response = await apiClient.get(`${format}/${id}/videos?language=en-US`);
    return response.data.results;
  } catch (error) {
    console.log('Error fetching videos');
    throw error;
  }
};

// Funktionen för att söka filmer
export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export default { getMovies, getGenres, getMovieDetails, getCast, getRecommendations, getMoviesWithGenres, getVideos, searchMovies };
