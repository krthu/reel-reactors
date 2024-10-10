// Overlay.jsx
import React from 'react';
import './Overlay.css'; 

const Overlay = ({ show, onClose, children }) => {
  if (!show) return null; 

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        {children} 
      </div>
    </div>
  );
};

export default Overlay;
