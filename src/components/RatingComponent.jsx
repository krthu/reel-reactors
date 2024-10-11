import React from 'react';
import './RatingComponent.css';

const RatingComponent = ({ rating, maxRating = 10 }) => {
  const filledStars = Math.round((rating / maxRating) * 5);
  const emptyStars = 5 - filledStars;

  return (
    <div className="rating-container">
      
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className="star filled">★</span>
      ))}
      
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="star">☆</span>
      ))}
      
      <span className="rating-number">{rating.toFixed(1)} / {maxRating}</span>
    </div>
  );
};

export default RatingComponent;
