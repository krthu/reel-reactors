const PostercaruselItem = ({ url, onPress }) => {
    const baseImageURL = 'https://image.tmdb.org/t/p/w500'

    return (
        <div className="poster-carusel-img-container">
            <img className="poster-carusel-img" src={`${baseImageURL}${url}`} alt="" onClick={onPress} />
        </div>
    )

}

export default PostercaruselItem;