import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { debounce } from 'lodash';

const Confirmation = () => {
    const navigate = useNavigate();
    const { cartTotal, setCartTotal, setCartList, cartList, setMappedProducts, mappedProducts, initialMappedProducts} = useCart();

    useEffect(() => {
        const addOrder = async () => {
            const order = cartList.map((item) => {
                console.log("this is an individual item", item);
                return { name: item.name, image: item.image, price: item.price * mappedProducts[item.name].quantity, quantity: mappedProducts[item.name].quantity}
            })
            try {
                console.log("this is the order ", order)
                const response = await fetch(`${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/user/orders`, {
                    method: "PUT",
                    credentials: 'include',
                    body: JSON.stringify({
                        order: order
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "true",
                        // "Access-Control-Allow-Origin": `${import.meta.env.VITE_PRODUCTION_FRONTEND || import.meta.env.VITE_LOCAL_FRONTEND}`,
                    },
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error);
                }

                const data = await response.json();
                console.log("confirmation data ", data);
            } catch (error) {
                console.log(error);
            }
        }
        const debouncedAddOrder = debounce(addOrder, 1000); // Prevents addOrder from being called multiple times

        debouncedAddOrder();

        return () => {
            debouncedAddOrder.cancel();
        };
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => { // Sets a delay for how long the confirmation message is shown
           navigate('/'); // Navigate to the home page and delete all the data from cartTotal, cartList, and mappedProducts
           console.log(cartTotal);
           setCartTotal(0);
           console.log(cartList);
           setCartList([]);
           console.log(mappedProducts)
           setMappedProducts(initialMappedProducts);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (  
        <div className="confirmation-section">
            <img src="/black-checkmark.png" alt="" width={300} height={300}/>
            <h1 className='payment-text'>Payment Sent!</h1>
        </div>
    );
}
 
export default Confirmation;