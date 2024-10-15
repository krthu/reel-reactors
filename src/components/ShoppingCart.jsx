import React from 'react';
import CartItem from './CartItem';
import './ShoppingCart.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const shoppingCart = useSelector((state) => state.shoppingCart);
    console.log("Shopping Cart Items:", shoppingCart);

    const totalPrice = shoppingCart.reduce((total, cartItem) => {
        return total + (cartItem.price * cartItem.count);
    }, 0);

    const handleContinueShopping = () => {
        navigate(-1); 
    };

    const handleCheckout = () => {
        navigate('/checkout'); 
    };

    return (
        <div className="shopping-cart">
            <div className="cart-header">
                <div className="header-item">Produkt</div>
                <div className="header-item">Pris</div>
                <div className="header-item">Antal</div>
                <div className="header-item">Total</div>
            </div>
    
            {/* Lägg produkterna i en egen container för scroll */}
            <div className="cart-items-container">
                {shoppingCart.length > 0 ? (
                    shoppingCart.map(cartItem => (
                        <CartItem key={cartItem.item.id} cartItem={cartItem} />
                    ))
                ) : (
                    <p>Din kundvagn är tom.</p>
                )}
            </div>    
            
            <div className="cart-footer">
                <h3 className="total-price">Totalpris: {totalPrice.toFixed(2)}:-</h3>
                <div className="cart-buttons">
                    <button className="primary-button" onClick={handleCheckout}>
                        Betala
                    </button>
                    <button className="secondary-button" onClick={handleContinueShopping}>
                        Fortsätt handla
                    </button>
                </div>
            </div>
        </div>
    );
    
    
};

export default ShoppingCart;
