import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import './App.css'
import { useCart } from './CartContext';

const Products = () => {
    const { cartTotal } = useCart();
    const navigate = useNavigate();
    const stockArray = ["In Stock", "Out of Stock"];
    const productsArray = ["Tops", "Bottoms", "Accessories"];
    const [from, setFrom] = useState(''); // Sets the minimum price value to filter from
    const [to, setTo] = useState(''); // Sets the maximum price value to filter to
    const [items, setItems] = useState([]); // Sets the clothing items that will appear on the screen
    const [stockFilter, setStockFilter] = useState(false); // 
    const [priceFilter, setPriceFilter] = useState(false);
    const [productFilter, setProductFilter] = useState(false);
    const [checkedStock, setCheckedStock] = useState(new Array(stockArray.length).fill(false)); // Fill an array of false values equivalent to the size of stockArray
    const [checkedProducts, setCheckedProducts] = useState(new Array(productsArray.length).fill(false)); // Fill an array of false values equivalent to the size of productsArray

    useEffect(() => {
        const getClothes = async () => {
            try {
              const response = await fetch(`${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/clothes`); // Fetches all the clothes on startup
              console.log(response, "This is the response");
      
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
      
              const data = await response.json();
              setItems(data); // Initially sets all the items to the screen to every clothing item in the database
              console.log(data);
            } catch (error) {
              console.log("Couldn't get posts", error);
            }
          }
        getClothes();
    }, []);

    useEffect(() => {
        const getPrices = async () => {
            try {
                let url = `${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/clothes/getPrices`;

                if (from !== "") { // Set a minimum value if there exists one
                    url += `?from=${from}`;
                }

                if (to !== "") { // Set a maximum value if there exists one
                    url += `&to=${to}`;
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
          
                const data = await response.json();
                setItems(data); // Set items to those that correspond the minimum and maximum values queried for
            } catch (error) {
                console.log("Couldn't get prices", error);
            }
        };

        if (from !== "" && to !== "") { // Only call getPrices if there is a minimum and maximum value
            getPrices();
        } else { // Just retrieve all clothes if there is not minimum and maximum value
            const getAllValues = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/clothes`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
              
                    const data = await response.json();
                    setItems(data);
                } catch (error) {
                    console.log("Couldn't get items", error);
                }
            }
            getAllValues();
        }
    }, [from, to]);

    const handleClick = (id) => { // Upon click navigate to a clothing item's specific page
        navigate(`/clothes/${id}`);
    }

    const handleStockFilter = () => { // Sets the stock filter to on or off to display the options
        setStockFilter(!stockFilter);
        console.log(stockFilter);
    }

    const handlePriceFilter = () => { // Sets the price filter to on or off to display the options
        setPriceFilter(!priceFilter);
        console.log(priceFilter);
    }

    const handleProductFilter = () => { // Sets the product filter to on or off to display the options
        setProductFilter(!productFilter);
        console.log(productFilter);
    }

    const handleInStock = async (position) => {
        const newCheckedStock = checkedStock.map((item, index) => { // Checks which stock option got selected
            return index === position ? !item : item
        });

        setCheckedStock(newCheckedStock); // Use newCheckedStock instead of checkedStock to get the updated values
        
        try {
            let url = `${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/clothes/getFilterStock`;

            //TODO: Update to ternary operators later
            if (newCheckedStock[0]) { // Sets the stock filter to filter by those that are in stock
                url += "?inStock=true";
                console.log("in stock true");
            } else {
                url += "?inStock=false"; // Sets instock as false so filter won't select those in stock
                console.log("in stock false");
            }

            if (newCheckedStock[1]) { // Sets the stock filter to filter by those that are out of stock
                url += "&outOfStock=true";
                console.log("out of stock true");
            } else {
                url += "&outOfStock=false"; // Sets outofstock as false so won't select those out of stock
                console.log("out of stock false");
            }

            //setCheckedStock(newCheckedStock);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Network response not ok");
            }

            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.log("Couldn't get clothes", error);
        }
    }

    // TODO: Later on try to fix this so that handleProduct and handleInStock can work together
    const handleProduct = async (position) => {
        const newCheckedProduct = checkedProducts.map((item, index) => { // Checks which product options got selected
            return index === position ? !item : item
        });

        setCheckedProducts(newCheckedProduct); // Use newCheckedProduct instead of checkedProduct to get the updated values
        
        try {
            let url = `${import.meta.env.VITE_PRODUCTION_BACKEND || import.meta.env.VITE_LOCAL_BACKEND}/clothes/getFilterClothes`;

            //TODO: Update to ternary operators later
            if (newCheckedProduct[0]) { // Sets a query for tops if true unless false
                url += "?tops=true";
                console.log("tops true");
            } else {
                url += "?tops=false";
                console.log("tops false");
            }

            if (newCheckedProduct[1]) { // Sets a query for bottoms if true unless false
                url += "&bottoms=true";
                console.log("bottoms true");
            } else {
                url += "&bottoms=false";
                console.log("bottoms false");
            }

            if (newCheckedProduct[2]) { // Sets a query for accessories if true unless false
                url += "&accessories=true";
                console.log("accessories true");
            } else {
                url += "&accessories=false";
                console.log("accessories false");
            }

            //setCheckedStock(newCheckedStock);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Network response not ok");
            }

            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.log("Couldn't get clothes", error);
        }
    }

    return (  
        <>
            <Navbar/>
            <div className="products-layout">
                <div className="filter-section">
                    <h1>Filter</h1>
                    <hr className='filter-line' />
                    <button className='filter-button' onClick={handleStockFilter}>Availability<span className='down-arrow'></span></button>
                        {stockFilter && <div className='stock-section'>
                                            {stockArray.map((item, index) => {
                                                return  <div className="checkbox-container" key={index}>
                                                            <input type="checkbox" id='in-stock' onChange={() => handleInStock(index)} checked={checkedStock[index]} value={item}/>
                                                            <label htmlFor="in-stock" id='in-stock-label'>{item}</label><br />
                                                        </div>
                                            })}
                                        </div>}
                    <button className='filter-button' onClick={handlePriceFilter}>Price<span className='down-arrow'></span></button>
                        {priceFilter && <div className='price-section'>
                                            <div className="price-items">
                                                <label htmlFor="from" id='from-label'>$</label>
                                                <input type="text" id='from' placeholder='From' value={from} onChange={(e) => setFrom(e.target.value)}/>
                                                <input type="text" id='to' placeholder='To' value={to} onChange={(e) => setTo(e.target.value)}/>
                                            </div>
                                        </div>}
                    <button className='filter-button' onClick={handleProductFilter}>Product Type<span className='down-arrow'></span></button>
                        {productFilter && <div className='stock-section'>
                                            {productsArray.map((item, index) => {
                                                return <div className="checkbox-container" key={index}>
                                                    <input type="checkbox" id='tops' onChange={() => handleProduct(index)} checked={checkedProducts[index]} value={item}/>
                                                    <label htmlFor="in-stock">{item}</label><br />
                                                </div>
                                            })}
                                          </div>}
                </div>
                <div className="clothes-section">
                    {items.map((item, index) => {
                        return  <div className="clothes-item" key={index} onClick={() => handleClick(item._id)}>
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