import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, addItem, decrease } from '../features/shopppingCartSlice';
import { baseImageURL } from '../api/baseURLs';
import './ShoppingCart.css'; // Svi stilovi su sada u ShoppingCart.css

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const handleDeletePress = () => {
        dispatch(removeItem(cartItem.item));
    };
    const handleIncrease = () => {
        dispatch(addItem(cartItem.item));
    };
    const handleDecrease = () => {
        dispatch(decrease(cartItem.item));
    };

    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <img src={`${baseImageURL}${cartItem.item.poster_path}`} alt="Produktbild" />
                <div className="cart-item-details">
                    <h4>{cartItem.item.title}</h4>
                    <p>2024 <span>Engelska</span></p>
                    <p>Genre: Komedi</p>
                    <button className="delete-button" onClick={handleDeletePress}>Radera vara</button>
                </div>
            </div>

            <div className="cart-item-price">
                <p>{cartItem.price} kr</p>
            </div>

            <div className="cart-item-count">
                <button onClick={handleDecrease}>-</button>
                <span>{cartItem.count}</span>
                <button onClick={handleIncrease}>+</button>
            </div>

            <div className="cart-item-total">
                <p>{(cartItem.count * cartItem.price).toFixed(2)} kr</p>
            </div>
        </div>
    );
};

export default CartItem;
