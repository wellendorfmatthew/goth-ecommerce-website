import React, { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { useParams } from 'react-router-dom'
import { useCart } from './CartContext'

const Sections = () => {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const { addToCart, cartTotal } = useCart();

    useEffect(() => {
        const getItem = async () => {
            console.log(id);
            try {
              const response = await fetch(`http://localhost:4015/clothes/${id}`);
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
    }, []);

    return (  
        <>
            <Navbar />
            <div className="item-container">
                <div className="items-section">
                    <div className="item-border">
                        <img src={item.image} alt="" width={560} height={600}/>
                    </div>
                    <div className="item-info">
                        <h1 className='sections-header'>{item.name}</h1>
                        <p className='sections-price'>${item.price}</p>
                        <button className='add-cart-button' onClick={() => addToCart(item, 1)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Sections;