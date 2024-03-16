import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartList, deleteFromCart, handleDecrease, handleIncrease, handleCheckout, mappedProducts} = useCart();
  const checkout = async () => {
    const checkoutList = handleCheckout(); // Holds the returned checkout list from handleCheckout
    try {
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/checkout`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ checkoutList }) // Sets checklist as body so it can be retrieved in the server.js code
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    cartList.map((item, index) => { // Display what's in the cartList each time a change gets made
      console.log(item);
    })
  }, [cartList]);
  
  return (  
    <>
      <Navbar />
      {cartList && cartList.length > 0 ? (
        <div>
          <h1 className='cart-title'>Cart</h1>
          {cartList.map((item, index) => (
            <React.Fragment key={index}>
              <hr className='first-hr' />
              <div className="cart-item">
                <img src={item.image} alt="" width={280} height={300} className='cart-image' />
                <div className="cart-item-title-price">
                  <h1 className='cart-item-title'>{item.name}</h1>
                  <p className='cart-item-price'>${item.price}</p>
                </div>
                <div className="quantity-input">
                  <button className='minus-button' onClick={() => handleDecrease(item)}>-</button>
                  <input type="text" className='quantity-text' value={mappedProducts[item.name].quantity} readOnly/>
                  <button className='plus-button' onClick={() => handleIncrease(item)}>+</button>
                </div>
                <img src="/trashcan.png" alt="" className='trash-can' onClick={() => deleteFromCart(item)}/>
                <p className='item-total'>${mappedProducts[item.name].quantity * item.price}</p>
              </div>
              <hr className='second-hr' />
            </React.Fragment>
          ))}
          <div className="estimated-stuff">
            <span className='estimated-total-text'>Estimated Total:</span>
            <span className='estimated-total'>${cartList.reduce((total, item) => total + mappedProducts[item.name].quantity * item.price, 0).toFixed(2)}</span>
          </div>
          <button className='checkout-button' onClick={checkout}>Checkout</button>
        </div>
      ) : (
        <h1 className='cart-title'>Add items to the cart</h1>
      )}
    </>
  );
  
  }
  
  export default Cart;