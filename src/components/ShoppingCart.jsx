import React from 'react';
import CartItem from './CartItem';
import './ShoppingCart.css';


const ShoppingCart = ({ cart, removeFromCart, toggleCart }) => {
    return (
        <div className="shopping-cart">
            <h2>Din Kundvagn</h2>
            {/*<div className="cart-items">*/}
                {cart.length > 0 ? (
                    cart.map(item => (
                        <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
                    ))
                ) : (
                    <p>Din kundvagn är tom.</p>
                )}
                <button onClick={toggleCart}>Stäng</button>
            </div>
        /*</div>*/
    );
};

export default ShoppingCart;
