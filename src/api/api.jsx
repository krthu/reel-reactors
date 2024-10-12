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

export const getMoviesWithGenres = async (genres, page=1, isMovie = true) => {
  const baseURL = isMovie ? '/discover/movie' : '/discover/tv';
  console.log(baseURL);
  const genreURL = `&with_genres=${genres}`;
  const pageURL = `&page=${page}`;
  try {
    const response = await apiClient.get(`${baseURL}?language=en-US${genreURL}${pageURL}&include_adult=false`)
    return response.data
  } catch (error){
    console.error('Error fetching movies with genres:', error);
    throw error;
  }
}

// export const getMoviesWithGenres = async (genres, page=1) => {
//   const genreURL = `&with_genres=${genres}`;
//   const pageURL = `&page=${page}`;
//   try {
//     const response = await apiClient.get(`/discover/movie?language=en-US${genreURL}${pageURL}&include_adult=false`)
//     return response.data
//   } catch {
//     console.error('Error fetching movies with genres:', error);
//     throw error;
//   }
// }

export const getTvShow = async () => {
  try {
    const response = await apiClient.get(`/tv/popular?language=en-US&page=${page}`);
    return response.data; // Axios automatically parses the JSON
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getTvShowDetails = async (id) => {
  try {
    const response = await apiClient.get(`/tv/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchDataForDiscover = async (isMovieData) => {
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Slumpmässigt index mellan 0 och i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Byter plats på elementet vid index i med elementet vid index j
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
  { id: 10751, name: "Family" }
];

const tvGenres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" }
];



  // Get Popular data and add to data
  const data = {
     // popular: await getMovies()
      popular: isMovieData ? await getMovies() : await getTvShow()

  };
  //Loop through all genres and get the data and save
  const genresToDownload = isMovieData ? genres : tvGenres

  const promises = genresToDownload.map(async (genre) => {
     // const genreData = await getMoviesWithGenres(genre.id);
      const genreData = isMovieData ? await getMoviesWithGenres(genre.id) : await getMoviesWithGenres(genre.id, 1, isMovieData);

      genreData.results = shuffleArray(genreData.results)
      data[genre.name] = genreData;

  });
  // Wait for all fetches to resolve
  await Promise.all(promises);
  return data

}


export default { getMovies, getGenres, getMovieDetails, 
                  getCast, getRecommendations, getMoviesWithGenres, 
                  fetchDataForDiscover ,getTvShow };
