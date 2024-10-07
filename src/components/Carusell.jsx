import { useState } from "react";
import './Carusell.css'

const Carusell = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const itemCount = items.length;

    const handlePrevious = () => {
        currentIndex === 0 ? setCurrentIndex(itemCount -1) : setCurrentIndex(itemCount + 1);
    }

    const handleNext = () => {
        currentIndex === itemCount - 1 ? setCurrentIndex(0) : setCurrentIndex(itemCount +1);
    }



    return(
        
        <div className="carusell-container">
            <button onClick={handlePrevious}>
                Back
            </button>
            <div className="carusell-content">
                {items}
            </div>
            <button onClick={handleNext}>
                Next
            </button>
        </div>
    )
}

export default Carusell;