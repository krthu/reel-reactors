const apiUrl = 'https://www.themoviedb.org/';

const getMovies = async () => {
  const response = await fetch(`${apiUrl}/movie/popular`);
  const data = await response.json();
  return data;
}

const getGenres = async () => {
  const response = await fetch(`${apiUrl}/genre/movie/list`);
  const data = await response.json();
  return data;
}

const getMovieDetails = async (id) => {
  const response = await fetch(`${apiUrl}/movie/${id}`);
  const data = await response.json();
  return data;
}

const getCast = async (id) => {
  const response = await fetch(`${apiUrl}/movie/${id}/credits`);
  const data = await response.json();
  return data;
}

export default { getMovies, getGenres, getMovieDetails, getCast };

