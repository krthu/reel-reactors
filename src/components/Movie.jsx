import { useParams } from "react-router-dom"

const Movie = () => {
    const params = useParams();

    
    const id = params.id

    return(
        <div>
            Movie {id}
        </div>
    )
}

export default Movie;