import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import './App.css'

const Products = () => {
    const stockArray = ["In Stock", "Out of Stock"];
    const productsArray = ["Tops", "Bottoms", "Accessories"];
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [items, setItems] = useState([]);
    const [stockFilter, setStockFilter] = useState(false);
    const [priceFilter, setPriceFilter] = useState(false);
    const [productFilter, setProductFilter] = useState(false);
    const [checkedStock, setCheckedStock] = useState(new Array(stockArray.length).fill(false)); // Fill an array of false values equivalent to the size of stockArray
    const [checkedProducts, setCheckedProducts] = useState(new Array(productsArray.length).fill(false)); // Fill an array of false values equivalent to the size of productsArray

    useEffect(() => {
        const getClothes = async () => {
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

    useEffect(() => {
        const getPrices = async () => {
            try {
                let url = "http://localhost:4015/clothes/getPrices";

                if (from !== "") {
                    url += `?from=${from}`;
                }

                if (to !== "") {
                    url += `&to=${to}`;
                }

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
          
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.log("Couldn't get prices", error);
            }
        };

        if (from !== "" && to !== "") {
            getPrices();
        } else {
            const getAllValues = async () => {
                try {
                    const response = await fetch("http://localhost:4015/clothes");
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

    const handleClick = () => {
        console.log('dis works les go');
    }

    const handleStockFilter = () => {
        setStockFilter(!stockFilter);
        console.log(stockFilter);
    }

    const handlePriceFilter = () => {
        setPriceFilter(!priceFilter);
        console.log(priceFilter);
    }

    const handleProductFilter = () => {
        setProductFilter(!productFilter);
        console.log(productFilter);
    }

    const handleInStock = async (position) => {
        const newCheckedStock = checkedStock.map((item, index) => {
            return index === position ? !item : item
        });

        setCheckedStock(newCheckedStock); // Use newCheckedStock instead of checkedStock to get the updated values
        
        try {
            let url = "http://localhost:4015/clothes/getFilterStock";

            //TODO: Update to ternary operators later
            if (newCheckedStock[0]) {
                url += "?inStock=true";
                console.log("in stock true");
            } else {
                url += "?inStock=false";
                console.log("in stock false");
            }

            if (newCheckedStock[1]) {
                url += "&outOfStock=true";
                console.log("out of stock true");
            } else {
                url += "&outOfStock=false";
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
        const newCheckedProduct = checkedProducts.map((item, index) => {
            return index === position ? !item : item
        });

        setCheckedProducts(newCheckedProduct); // Use newCheckedProduct instead of checkedProduct to get the updated values
        
        try {
            let url = "http://localhost:4015/clothes/getFilterClothes";

            //TODO: Update to ternary operators later
            if (newCheckedProduct[0]) {
                url += "?tops=true";
                console.log("tops true");
            } else {
                url += "?tops=false";
                console.log("tops false");
            }

            if (newCheckedProduct[1]) {
                url += "&bottoms=true";
                console.log("bottoms true");
            } else {
                url += "&bottoms=false";
                console.log("bottoms false");
            }

            if (newCheckedProduct[2]) {
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
                        return  <div className="clothes-item" key={index} onClick={handleClick}>
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