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

    const isCartEmpty = shoppingCart.length === 0;


    return (
        <div className="shopping-cart-container">
            <div className="shopping-cart">
                <div className="cart-header">
                    <div className="header-item">Product</div>
                    <div className="header-count">Number</div>
                    <div className="header-price">Price</div>
                    <div className="header-empty"></div>
                </div>

                <div className="cart-items-container">
                    {shoppingCart.length > 0 ? (
                        shoppingCart.map(cartItem => (
                            <CartItem key={cartItem.item.id} cartItem={cartItem} />
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>

            <div className="cart-footer">
                <h3 className="total-price">Total price: {totalPrice.toFixed(2)}:-</h3>
                <div className="cart-buttons">
                    <button
                        className={`primary-button ${isCartEmpty ? 'disabled-button' : ''}`}
                        onClick={handleCheckout}
                        disabled={isCartEmpty}
                    >
                        Proceed to checkout
                    </button>
                    <button className="secondary-button" onClick={handleContinueShopping}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;