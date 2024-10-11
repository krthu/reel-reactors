import React, { useState } from 'react';
import './Cardinformation.css';



const CardInformation = ({onCompletePay}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
  
    let validationErrors = {};

    if (!cardNumber) validationErrors.cardNumber = 'Cardnumber is required';
    if (!expiryDate) validationErrors.expiryDate = 'Expirationdate is required';
    if (!cvv) validationErrors.cvv = 'CVV is required';
    if (!nameOnCard) validationErrors.nameOnCard = 'Name on card is required';

   
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
  
      setCardNumber('');
      setExpiryDate('');
      setCvv('');
      setNameOnCard('');
      setErrors({});
      onCompletePay();
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

      <button type="submit" className="button primary-button">
        <span className="button-text">Complete Pay</span>
      </button>
    </form>
  );
};

export default CardInformation;