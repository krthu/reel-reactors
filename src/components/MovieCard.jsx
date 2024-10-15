import './MovieCard.css'
import { baseImageURL } from '../api/baseURLs';
import FavoriteButton from './FavoriteButton';

const PosterCaruselItem = ({ url, onPress, isSelected }) => {

    const movie = {
        id: 1,
        title: 'Movie Title',
        poster_path: '/poster.jpg',
        vote_average: 7.5
    }

    return (
        <div className={`movie-card-container`}>
            <img className={`movie-card-img  ${isSelected ? 'movie-card-selected' : ''}`} src={`${baseImageURL}${url}`} alt="" onClick={onPress} />
            <FavoriteButton movie={movie} />
        </div>
    )

}

export default PosterCaruselItem;

