import React from 'react';
import { useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { baseImageURL } from '../api/baseURLs';
import './OrderDetails.css';

const OrderDetails = () => {

    const shoppingCart = useSelector((state) => state.shoppingCart);

    const location = useLocation();

    const cart = shoppingCart;

    //const { cart = [], totalPrice = 0 } = location.state || {};

    console.log("Cart Items:", cart);
   // console.log("Total Price:", totalPrice);

    return (
        <div className="order-details">
             <label className="order-title">OrderDetails</label>
            <div className="order-items">
                {cart.length === 0 ? (
                    <p>Inga artiklar i beställningen.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.item.id} className="order-item">
                            <div className="cart-item img">
                            <img src={`${baseImageURL}${item.item.poster_path}`} alt={item.item.title} />
                            </div>
                            <div className="product-info">
                                <h4>{item.item.title}</h4>
                                <p>Antal: {item.count}</p>
                                <p>Enhetspris: {item.price.toFixed(2)} kr</p>
                                <p>Totalt: {(item.count * item.price).toFixed(2)} kr</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="form-group total-sum">
                {/* <h4>Totalsumma: {totalPrice.toFixed(2)} kr</h4> */}
            </div>
        </div>
    );
};

export default OrderDetails;

