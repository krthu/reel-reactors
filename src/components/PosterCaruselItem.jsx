import './PosterCaruselItem.css'

const PosterCaruselItem = ({ url, onPress, isSelected }) => {
    const baseImageURL = 'https://image.tmdb.org/t/p/w500'

    return (
        <div className={`poster-carusel-img-container`}>
            <img className={`poster-carusel-img  ${isSelected ? 'carusel-item-selected' : ''}`} src={`${baseImageURL}${url}`} alt="" onClick={onPress} />
        </div>
    )

}

export default PosterCaruselItem;

