import React, { useState } from 'react';
import './Cardinformation.css';


const CardInformation = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    let validationErrors = {};

    if (!cardNumber) validationErrors.cardNumber = 'Kortnummer krävs';
    if (!expiryDate) validationErrors.expiryDate = 'Utgångsdatum krävs';
    if (!cvv) validationErrors.cvv = 'CVV krävs';
    if (!nameOnCard) validationErrors.nameOnCard = 'Namn på kortet krävs';

    // Om det finns fel, sätt dem i state så att de visas
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Om inga fel finns, rensa formuläret och visa ingen popup
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setNameOnCard('');

      // Nollställ felmeddelanden
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-info-form">
     

      <div className="form-group">
        <label htmlFor="cardNumber">Cardnumber</label>
        <input 
          type="text" 
          id="cardNumber"
          value={cardNumber} 
          onChange={(e) => setCardNumber(e.target.value)} 
          className={errors.cardNumber ? 'error-input' : ''}
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="expiryDate">Expiration date</label>
          <input 
            type="text" 
            id="expiryDate"
            value={expiryDate} 
            onChange={(e) => setExpiryDate(e.target.value)} 
            className={errors.expiryDate ? 'error-input' : ''}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <p className="error-text">{errors.expiryDate}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input 
            type="text" 
            id="cvv"
            value={cvv} 
            onChange={(e) => setCvv(e.target.value)} 
            className={errors.cvv ? 'error-input' : ''}
            placeholder="123"
          />
          {errors.cvv && <p className="error-text">{errors.cvv}</p>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="nameOnCard">Name on card</label>
        <input 
          type="text" 
          id="nameOnCard"
          value={nameOnCard} 
          onChange={(e) => setNameOnCard(e.target.value)} 
          className={errors.nameOnCard ? 'error-input' : ''}
        />
        {errors.nameOnCard && <p className="error-text">{errors.nameOnCard}</p>}
      </div>

      <button type="submit" className="submit-btn">Betala</button>
    </form>
  );
};

export default CardInformation;