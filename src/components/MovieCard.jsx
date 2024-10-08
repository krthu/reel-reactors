import './MovieCard.css'

const PosterCaruselItem = ({ url, onPress, isSelected }) => {
    const baseImageURL = 'https://image.tmdb.org/t/p/w500'

    return (
        <div className={`movie-card-container`}>
            <img className={`movie-card-img  ${isSelected ? 'movie-card-selected' : ''}`} src={`${baseImageURL}${url}`} alt="" onClick={onPress} />
        </div>
    )

}

export default PosterCaruselItem;

