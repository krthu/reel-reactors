// SplashScreen.jsx
import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // After a few seconds, call onFinish to hide the splash screen
    }, 4000); // Set duration to 3 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img
        src="../reel-reactors/public/pictures/reel-reactors-logga.png"    // Replace with the correct image path '
        alt="Reel Reactors Logo"
        className="splash-logo"
      />
    </div>
  );
};

export default SplashScreen;
