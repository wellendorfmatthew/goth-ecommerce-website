import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { useParams } from 'react-router-dom'
import { useCart } from './CartContext'
import MAGIC_WAND from './assets/magic-wand.png';

const Sections = () => {
    const { id } = useParams(); // Allows to set an id to use for fetch request
    const [item, setItem] = useState({}); // Sets an object that will be used to store the clothing item
    const { addToCart, cartTotal } = useCart();

    useEffect(() => {
        const getItem = async () => {
            console.log(id);
            try {
              const response = await fetch(`${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/clothes/${id}`);
              console.log(response, "This is the response");
      
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
      
              const data = await response.json();
              setItem(data);
              console.log(data);
            } catch (error) {
              console.log("Couldn't get item", error);
            }
          }
        getItem();
    }, []); // Activates upon startup

    const addToWishList = async (name, price, image, id) => {
        const item = { name: name, id: id, image: image, price: price }
        try {
            const wishlist = await fetch(`${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/user/wishlist`, {
                method: "PUT",
                body: JSON.stringify({
                    item: item
                }),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                },
            });

            const response = await wishlist.json();

            if (response.error) {
                throw Error(response.error)
            }

            console.log("wishlist success ", response);
            return response;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    return (  
        <>
            <Navbar />
            <div className="item-container">
                <div className="items-section">
                    <div className="item-border">
                        <img src={item.image} alt="" className='sections-image'/>
                    </div>
                    <div className="item-info">
                        <h1 className='sections-header'>{item.name}</h1>
                        <p className='sections-price'>${item.price}</p>
                        <button className='add-to-wishlist-button' onClick={() => addToWishList(item.name, item.price, item.image, item._id)}><img src={MAGIC_WAND} alt="" className='wishlist-icon' /><p className='wishlist-text'>Add to Wishlist</p></button>
                        <button className='add-cart-button' onClick={() => addToCart(item, 1)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Sections;