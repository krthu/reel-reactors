import { useParams } from "react-router-dom"
import RecommendationComp from "./RecommendationComp";

const Movie = () => {
    const params = useParams();

    
    const id = params.id

    return(
        <div>
            <h1>Movie Details for {id}</h1>
            Movie {id}
            <RecommendationComp movieId={id} />
        </div>
    )
}

export default Movie;