import React from 'react';
import CartItem from './CartItem';
import './ShoppingCart.css';


const ShoppingCart = ({ cart, removeFromCart, addToCart}) => {
    console.log('Current cart:', cart);

    const mockProduct = {
        id: 'mock-product',
        name: 'Mock Produkt',
        price: 10,
        quantity: 1,
    };

    const handleIncrease = () => {
        const existingItem = cart.find(item => item.id === mockProduct.id);
        if (existingItem) {
            addToCart(existingItem);
        } else {
            addToCart({ ...mockProduct, quantity: 1 }); 
        }
    };

    const handleDecrease = () => {
        const existingItem = cart.find(item => item.id === mockProduct.id);
        if (existingItem && existingItem.quantity > 1) {
            removeFromCart(existingItem);
            addToCart({ ...existingItem, quantity: existingItem.quantity - 1 });
        } else if (existingItem) {
            removeFromCart(existingItem);
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
               <h3 style={{ display: 'flex', alignItems: 'center' }}>
                {mockProduct.name}
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    <button onClick={handleDecrease}>-</button>
                    <span style={{ margin: '0 5px' }}>
                        {cart.find(item => item.id === mockProduct.id)?.quantity || 0}
                    </span>
                    <button onClick={handleIncrease}>+</button>
                </div>
            </h3>
            <h3>Totalpris: ${totalPrice.toFixed(2) || 0}</h3>
        </div>
    );
};

export default ShoppingCart;
