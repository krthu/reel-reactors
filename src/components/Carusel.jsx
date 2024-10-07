import { useState } from "react";
import './Carusel.css'
import { useRef } from "react";
import { useEffect } from "react";

const Carusel = ({ items }) => {
    // const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollAmount, setScrollAmount] = useState(0);

    const itemCount = items.length;

    const caruselContentRef = useRef(null);
    // const itemsPerScreen = 5;
    



    // useEffect(() => {
    //     if (caruselContentRef.current) {
    //         const content = caruselContentRef.current;
    //         // Calculate the amount to scroll per button press
    //         const newScrollAmount = content.clientWidth / itemsPerScreen;
    //         setScrollAmount(newScrollAmount);
    //     }
    // }, [itemsPerScreen])


    const handleButtonPress = (e) => {
        // const contentContainer = e.target.closest(".carusel-container");
         
        const caruselContent = caruselContentRef.current;
        const contentWidth = caruselContent.clientWidth;
     
        const isRightButton = e.target.classList.contains('carusel-button-right');
       // const scrollAmount = content.clientWidth / itemsPerScreen; // Scrolla samma bredd som ett item

        if (isRightButton) {
            caruselContent.scrollBy({ left: contentWidth, behavior: "smooth" });
            console.log(contentWidth);
        } else {
            caruselContent.scrollBy({ left: -contentWidth, behavior: "smooth" });
            console.log(-contentWidth);
        }
    };

    // const handleButtonPress = (e) => {
    //     const contentContainer = e.target.closest(".carusel-container");
    //     const content = contentContainer.querySelector(".carusel-content");

    //     const sliderIndex = parseInt(getComputedStyle(content).getPropertyValue("--slider-index"))
    //     const itemsPerScreen = parseInt(getComputedStyle(content).getPropertyValue("--items-per-screen"))
    //     const isRightButton = e.target.classList.contains("carusel-button-right");

    //     if (isRightButton) {

    //         if (sliderIndex === itemCount/itemsPerScreen -1){
    //             content.style.setProperty("--slider-index",  0)
    //         } else{
                
    //             content.style.setProperty("--slider-index", sliderIndex + 1)
    //         }

    //     } else {
    //         if (sliderIndex === 0){
    //             content.style.setProperty("--slider-index",  itemCount/itemsPerScreen -1)
    //         } else{
                
    //             content.style.setProperty("--slider-index", sliderIndex - 1)
    //         }
    //     }
    // };




    return (

        <div>
            <h3 className="carusel-title">Popuära filmer</h3>
            <div className="carusel-container">

                <button onClick={handleButtonPress} className="carusel-button carusel-button-left">
                <span className="material-symbols-outlined carusel-chevron">
                        chevron_left
                    </span>
                </button>
                <div className="carusel-content" ref={caruselContentRef}>


                        {items}
       

                </div>

                <button onClick={handleButtonPress} className="carusel-button carusel-button-right">
                    <span className="material-symbols-outlined carusel-chevron">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Carusel;