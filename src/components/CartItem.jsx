import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, addItem, decrease } from '../features/shopppingCartSlice';
import { baseImageURL } from '../api/baseURLs';
import './ShoppingCart.css';

const CartItem = ({ cartItem, isOrderDetails = false }) => {
    const dispatch = useDispatch();

    const handleDeletePress = () => {
        dispatch(removeItem(cartItem.item));
    };


    return (
        <div className='cart-item-title'>
            <h4>{cartItem.item.title}</h4>
            <div className="cart-item">
                <div className="cart-item-info">
                    <img src={`${baseImageURL}${cartItem.item.poster_path}`} alt="Produktbild" />
                    <div className="cart-item-details">
                        <p><span>{cartItem.item.original_language}</span></p>
                    </div>
                </div>

                <div className="cart-item-price">
                    <p>{cartItem.price}:-</p>
                </div>

                <div className="cart-item-count">
                <span>{cartItem.count}</span>

                </div>
                <div className="cart-item-total">
                    <p>{(cartItem.count * cartItem.price).toFixed(0)}:-</p>
                </div>

                <div className="cart-item-delete"> {/* Ny kolumn för radera-knappen */}
                    {isOrderDetails ? null :
                        <button className="delete-button" onClick={handleDeletePress}>
                            <i className="fas fa-trash-alt"></i> {/* Papperskorgsikonen */}
                        </button>
                    }
                </div>
            </div>
        </div>

    );
};

export default CartItem;
