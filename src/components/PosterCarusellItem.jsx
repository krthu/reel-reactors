const PosterCarusellItem = ({url}) => {
    const baseImageURL = 'https://image.tmdb.org/t/p/w500'

    return(
        <div>
            <img src={`${baseImageURL}${url}`} alt="" />
        </div>
    )

}

export default PosterCarusellItem;