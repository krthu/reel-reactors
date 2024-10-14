export const getTrailerID = (videos) => {

    if(!videos){
      return
    }
    const trailers = videos.filter(video => 
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