import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, addItem, decrease } from '../features/shopppingCartSlice';
import { baseImageURL } from '../api/baseURLs';

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const handleDeletePress = () => {
        dispatch(removeItem(cartItem.item));
    }
    const handleIncrease = () => {
        dispatch(addItem(cartItem.item));
    }

    const handleDecrease = () => {
        dispatch(decrease(cartItem.item));
    }
    


    console.log(cartItem);
    return (
        <div className="cart-item">
            <img src={`${baseImageURL}${cartItem.item.poster_path}`} alt="" />
            <div className='cartItem-info'>
                <h4>{cartItem.item.title}</h4>
                <p>2024 <span className='cartItem-info-language'>Engelska</span></p>
                <p>Komedi, Hämtar senare</p>
            </div>
            <p className='cartItem-price'>Pris: {cartItem.price}kr</p>
            <div className='carItem-count-container'>
                <button onClick={handleDecrease}>-</button>
                <span>
                    {cartItem.count}
                </span>
                
                <button onClick={handleIncrease}>+</button>
            </div>
            <p>{cartItem.count * cartItem.price}:-</p>

            <button onClick={() => handleDeletePress()}>Radera vara</button>
          
        </div>
    );
};

export default CartItem;
