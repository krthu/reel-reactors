import React from "react";
import tmdbLogo from '../assets/images/tmdb-logo.svg'; // Justera sökvägen efter var din logotyp är placerad
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-left">
                {/* Använd SVG-logotypen som en vanlig bild */}
                <img src={tmdbLogo} alt="TMDB Logo" className="tmdb-logo" />
            </div> 
            
            <div className="footer-middle">
                <p className="contact-info">Contact us: info@grupp2.com</p>
                <p>&copy; 2024 ReelReactors. All rights reserved.</p>
                <p>
                    <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
                </p>
                <p>
                    This website/service uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
                </p>
            </div>
            
            <div className="footer-right"></div>
        </div>
    );
};

export default Footer;
