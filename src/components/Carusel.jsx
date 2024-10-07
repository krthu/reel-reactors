import { useState } from "react";
import './Carusel.css'

const Carusel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleItems = 1;

    const itemCount = items.length;

    const handleButtonPress = (e) => {
        const contentContainer = e.target.closest(".carusel-container");
        const content = contentContainer.querySelector(".carusel-content");

        const sliderIndex = parseInt(getComputedStyle(content).getPropertyValue("--slider-index"))
        const itemsPerScreen = parseInt(getComputedStyle(content).getPropertyValue("--items-per-screen"))
        const isRightButton = e.target.classList.contains("carusel-button-right");

        if (isRightButton) {

            if (sliderIndex === itemCount/itemsPerScreen -1){
                content.style.setProperty("--slider-index",  0)
            } else{
                
                content.style.setProperty("--slider-index", sliderIndex + 1)
            }

        } else {
            if (sliderIndex === 0){
                content.style.setProperty("--slider-index",  itemCount/itemsPerScreen -1)
            } else{
                
                content.style.setProperty("--slider-index", sliderIndex - 1)
            }
        }


        console.log(sliderIndex)

    };

    const handleNext = () => {
        const newIndex = currentIndex === itemCount - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };



    return (

        <div className="carusel-container">

            <button onClick={handleButtonPress} className="carusel-button carusel-button-left">
            <span className="material-symbols-outlined">
                    chevron_left
                </span>
            </button>
            <div className="carusel-content">

                {items}

            </div>

            <button onClick={handleButtonPress} className="carusel-button carusel-button-right">
                <span className="material-symbols-outlined">
                    chevron_right
                </span>
            </button>
        </div>
    )
}

export default Carusel;