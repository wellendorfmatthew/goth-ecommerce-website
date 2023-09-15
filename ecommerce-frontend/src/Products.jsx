import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './App.css'

const Products = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getClothes = async() => {
            try {
              const response = await fetch("http://localhost:4015/clothes");
              console.log(response, "This is the response");
      
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
      
              const data = await response.json();
              setItems(data);
              console.log(data);
            } catch (error) {
              console.log("Couldn't get posts", error);
            }
          }
        getClothes();
    }, []);

    return (  
        <>
            <Navbar/>
            <div className="products-layout">
                <div className="filter-section">
                    <h1>Filter</h1>
                    <hr className='filter-line' />
                    <button className='filter-button'>Availability<span className='down-arrow'></span></button>
                    <button className='filter-button'>Price<span className='down-arrow'></span></button>
                    <button className='filter-button'>Product Type<span className='down-arrow'></span></button>
                </div>
                <div className="clothes-section">
                    {items.map((item, index) => {
                        return  <div className="clothes-item" key={index}>
                                    <div className="img-border">
                                        <img className="gothpants" src={item.image} alt="" width="280" height="300" />
                                    </div>
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                </div>
                    })}
                </div>
            </div>
        </>
    );
}
 
export default Products;