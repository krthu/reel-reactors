import axios from 'axios';
import { getTrailerID } from '../features/getTrailerID';


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
    const response = await apiClient.get(`/movie/${id}?append_to_response=videos,credits,recommendations`);
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

    const movieResults = response.data.results;

    // Now, for each movie, fetch the trailer
    const moviesWithTrailers = await Promise.all(
      movieResults.map(async (movie) => {
        try {
          const videosResponse = await apiClient.get(`/movie/${movie.id}/videos`);
          const trailerID = getTrailerID(videosResponse.data.results);
          return { ...movie, trailerID };
        } catch (error) {
          console.error(`Error fetching videos for movie ${movie.id}:`, error);
          return { ...movie, trailerID: null }; // In case fetching videos fails, set trailerID to null
        }
      })
    );

    return moviesWithTrailers;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};


function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
];


export const fetchAllDiscoverData = async () => {

  try {

      const data = { popular: await getMovies() };
      
      const promises = genres.map(async (genre) => {
        const genreData = await getMoviesWithGenres(genre.id);
        genreData.results = shuffleArray(genreData.results);
        data[genre.name] = genreData;

    });
    await Promise.all(promises);
    return data;

  }catch (error) {
    console.log('Error fetching discover data.')
  }
}

export default { getMovies, getGenres, getMovieDetails, getCast, getRecommendations, getMoviesWithGenres, getVideos, searchMovies };
