import React from 'react';
import CartItem from './CartItem';
import './ShoppingCart.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ShoppingCart = () => {

    const navigate = useNavigate();

    const shoppingCart = useSelector((state) => state.shoppingCart);
    console.log("Shopping Cart Items:",shoppingCart);

   {/*} const handleIncrease = () => {
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
        
    }; */}
    //Behöver en ny funktion för det det här som loopar igenom vår shopping cart och tar count * price för alla  
    // const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const totalPrice = shoppingCart.reduce((total, cartItem) => {
        return total + (cartItem.price * cartItem.count);
    }, 0);

    const handleProceedToOrder = () => {
        navigate('/order', { state: { cart: shoppingCart, totalPrice } });
        console.log("Proceeding to Order with:", shoppingCart);
    };

    return (
        <div className="shopping-cart">
          <div className="cart-header">
      
            <div className="header-item">Produkt</div>
            <div className="header-item">Pris</div>
            <div className="header-item">Antal</div>
            <div className="header-item">Total</div>
          
        </div>
                {shoppingCart.length > 0 ? (
                    shoppingCart.map(cartItem => (
                        <CartItem key={cartItem.item.id} cartItem={cartItem}/>
                        
                    ))
                ) : (
                    <p>Din kundvagn är tom.</p>
                )}
                {/* Flyttade in det här i din cartItem  */}

               {/* <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ marginRight: '10px' }}></span>
                <div style={{ display: 'flex', alignItems: 'center' }}> */}
                    {/* <button onClick={handleDecrease}>-</button> */}
                    {/* <span style={{ margin: '0 5px' }}> */}
                        {/* {shoppingCart.find(item => item.id === mockProduct.id)?.quantity || 0} */}

                    {/* </span> */}
                    {/* <button onClick={handleIncrease}>+</button> */}
                    {/* <button onClick={handleAddToCart}>+</button> */}
                {/* </div>
            </div> */}
            
            <div className="cart-footer">
            <h3 className="total-price">Totalpris: {totalPrice.toFixed(2) || 0}kr</h3>
            <button onClick={handleProceedToOrder}>
    Gå till Orderdetaljer
</button>
        </div>
        </div>
    );
};

export default ShoppingCart;

