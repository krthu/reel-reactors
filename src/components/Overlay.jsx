// Overlay.jsx
import React from 'react';
import './Overlay.css'; // Lägg till styling separat

const Overlay = ({ show, onClose, children }) => {
  if (!show) return null; // Rendera inte overlayn om show är falsk

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
        {children} {/* Visar allt som skickas som innehåll */}
      </div>
    </div>
  );
};

export default Overlay;
