import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
    return (
        <div className="cart-item">
            <h4>{item.name}</h4>
            <p>Pris: {item.price}kr</p>
            <button onClick={() => removeFromCart(item)}>Radera vara</button>
        </div>
    );
};

export default CartItem;
