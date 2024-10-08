const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const accessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const getMovies = async () => {
  const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`, defaultOptions);
  const data = await response.json();
  return data;
};

const getGenres = async () => {
  const response = await fetch(`${apiUrl}/genre/movie/list?api_key=${apiKey}`, defaultOptions);
  const data = await response.json();
  return data;
};

const getMovieDetails = async (id) => {
  const response = await fetch(`${apiUrl}/movie/${id}?api_key=${apiKey}`, defaultOptions);
  const data = await response.json();
  return data;
};

const getCast = async (id) => {
  const response = await fetch(`${apiUrl}/movie/${id}/credits?api_key=${apiKey}`, defaultOptions);
  const data = await response.json();
  return data;
};

export default { getMovies, getGenres, getMovieDetails, getCast };
