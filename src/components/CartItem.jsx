import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
    return (
        <div className="cart-item">
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
    );
};

export default CartItem;
