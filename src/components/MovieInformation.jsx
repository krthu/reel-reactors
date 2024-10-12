import React, { useEffect, useState } from 'react';
import './MovieInformation.css';
import { getMovieDetails, getCast } from '../api/api';
import { useParams } from 'react-router-dom';
import MovieHeader from './MovieHeader';
import ActorCard from './ActorCard';
import RecommendationComp from './RecommendationComp';
import TrailerEmbed from './TrailerEmbed';
import Overlay from './Overlay';

const MovieInformation = ({ onBuy, onWatchTrailer }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const movieId = id;

    if (!movieId) {
      console.error("Movie ID is undefined");
      return;
    }

    const fetchMovieData = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        const castData = await getCast(movieId);

        setMovie(movieData);
        setCast(castData.cast);
        setCrew(castData.crew);
        console.log(movieData);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [id]);

  const closeOverlay = () => {
    setShowOverlay(false);
  }

  const getTrailerID = () => {
    console.log(movie.videos)
    const trailers = movie.videos.results.filter(video => 
      video.official === true &&
      video.site ==='YouTube' &&
      video.type ==='Trailer'
    )
    if (trailers.length !== 0) {
      return trailers[0].key
    } else {
      return null
    }
  } 

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="movie-information-container">
      <MovieHeader 
        backdropUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        rating={movie.vote_average} // Pass the rating here
        movieTitle={movie.title}
        movieOverview={movie.overview}
        releaseDate={movie.release_date}
        genres={movie.genres.map(genre => genre.name)}
        crew={crew}
        movie={movie}
        trailerIsPresent={getTrailerID()}
        handleWatchPress={() => setShowOverlay(true)}
      />
      {/* Additional sections like CastList and RecommendationComp */}
      <ActorCard cast={cast} />
      <RecommendationComp movieId={movie.id} />
    </div>
    <Overlay show={showOverlay} onClose={closeOverlay}>
        {movie && (
        <TrailerEmbed trailerID={getTrailerID()}/>
        )}

     {/* // <Header movie={selectedMovie} isOverlay={true} onClose={closeOverlay} /> */}
      
    </Overlay>
    </>
  );
};

export default MovieInformation;
