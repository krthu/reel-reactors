import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CardInformation from './CardInformation';
import CartItem from "./CartItem";
import OrderDetails from "./OrderDetails";
import './CheckOut.css';



const Checkout = () => {

  const shoppingCart = useSelector((state) => state.shoppingCart);
  console.log(shoppingCart)

  const totalPrice = shoppingCart.reduce((total, cartItem) => {
    return total + (cartItem.price * cartItem.count);
  }, 0);

  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const navigate = useNavigate();

  const handleCompletePay = () => {
    setIsPaymentComplete(true);
  };

  const handleGoToMyMovies = () => {
    navigate('/mymovies');
  };

  return (
    <div className="checkout-container">
      <div className="order-details-section">
        <h3>Order details</h3>
        <div className="checkout-cart-items">
          {shoppingCart.length > 0 ? (
            shoppingCart.map(cartItem => (
              <CartItem key={cartItem.item.id} cartItem={cartItem} isOrderDetails={true} />
            ))
          ) : (
            <p>Din kundvagn är tom.</p>
          )}
        </div>
        <div className="checkout-order-details-spec">
          <p>Subtotal {totalPrice/1.25} </p>
          <p>VAT 25% {totalPrice*0.2}</p>
          <p>Total {totalPrice}</p>
        </div>
      </div>

      <div className="card-info-section">
        <CardInformation onCompletePay={handleCompletePay} />
      </div>

      {isPaymentComplete && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>🎉 The purchase is complete! The movie is now yours! 🎉</h3>
            <p>You can now watch the movie or continue shopping!</p>
            <button className="button secondary-button" onClick={handleGoToMyMovies}>
              <span className="button-text">Go to My movies</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;