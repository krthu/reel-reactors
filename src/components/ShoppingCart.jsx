import React from 'react';
import CartItem from './CartItem';
import './ShoppingCart.css';


const ShoppingCart = ({ cart, removeFromCart, addToCart}) => {
    const mockProduct = {
        id: 'mock-product',
        name: 'Mock Produkt',
        price: 10,
    };

    const existingItem = cart.find(item => item.id === mockProduct.id);

    const handleIncrease = () => {
        if (existingItem) {
            addToCart({ ...existingItem, quantity: existingItem.quantity + 1 });
        } else {
            addToCart({ ...mockProduct, quantity: 1 }); 
        }
    };

    const handleDecrease = () => {
            if (existingItem.quantity > 1) {
                addToCart({ ...existingItem, quantity: existingItem.quantity - 1 });
            } else {
                removeFromCart(mockProduct);
            }
        
    };

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="shopping-cart">
            <h2>Din Varukorg</h2>
                {cart.length > 0 ? (
                    cart.map(item => (
                        <CartItem key={item.id} item={item} removeFromCart={removeFromCart}/>
                    ))
                ) : (
                    <p>Din kundvagn är tom.</p>
                )}
               <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ marginRight: '10px' }}></span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button onClick={handleDecrease}>-</button>
                    <span style={{ margin: '0 5px' }}>
                        {cart.find(item => item.id === mockProduct.id)?.quantity || 0}
                    </span>
                    <button onClick={handleIncrease}>+</button>
                </div>
            </div>
            <h3>Totalpris: {totalPrice.toFixed(2) || 0}kr</h3>
        </div>
    );
};

export default ShoppingCart;
