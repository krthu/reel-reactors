const PostercaruselItem = ({url}) => {
    const baseImageURL = 'https://image.tmdb.org/t/p/w500'

    return(
       
            <img className="poster-carusel-img" src={`${baseImageURL}${url}`} alt="" />
        
    )

}

export default PostercaruselItem;