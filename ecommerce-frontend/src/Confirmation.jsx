import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Confirmation = () => {
    const navigate = useNavigate();
    const { cartTotal, setCartTotal, setCartList, cartList, setMappedProducts, mappedProducts, initialMappedProducts} = useCart();

    useEffect(() => {
        const timeout = setTimeout(() => { // Sets a delay for how long the confirmation message is shown
           navigate('/'); // Navigate to the home page and delete all the data from cartTotal, cartList, and mappedProducts
           setCartTotal(0);
           setCartList([]);
           setMappedProducts(initialMappedProducts);
        }, 1500);

        return () => clearTimeout(timeout);
    }, navigate);

    return (  
        <div className="confirmation-section">
            <img src="/black-checkmark.png" alt="" width={300} height={300}/>
            <h1 className='payment-text'>Payment Sent!</h1>
        </div>
    );
}
 
export default Confirmation;