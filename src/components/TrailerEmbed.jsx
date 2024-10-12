import "./TrailerEmbed.css";
const TrailerEmbed = ({ trailerID }) => {
    return (
        <div className="trailer-container">
            <iframe
                className="trailer-window"
                src={`https://www.youtube.com/embed/${trailerID}`}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />

        </div>
    )
}

export default TrailerEmbed;