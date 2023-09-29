import React, { useState, useContext, createContext, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    // Create an initial object to assign the products from the database to a Stripe price id and quantity that will be used later for incrementing and decreasing
    const initialMappedProducts = 
        {
            "Gothic Baggy Cargo Pants": {price: "price_1NvUEqG2cUz60jVKozoZDfIC", quantity: 0},
            "Gothic High Waisted Jeans": {price: "price_1NvUGGG2cUz60jVKFRAffIYi", quantity: 0},
            "Quick Dry Cargo Shorts": {price: "price_1NvUHOG2cUz60jVKunqa9tC7", quantity: 0},
            "Gothic Sweatpants": {price: "price_1NvUI3G2cUz60jVKRKmiqlwF", quantity: 0},
            "Gothic Skirt": {price: "price_1NvUJQG2cUz60jVKChIrf9io", quantity: 0},
            "Gothic Hooded Top Long Sleeve": {price: "price_1NvUMzG2cUz60jVKEcwg8HjK", quantity: 0},
            "Gothic Knitted Sweater": {price: "price_1NvUrIG2cUz60jVKsO6T7VVo", quantity: 0},
            "Gothic T-Shirt Anime": {price: "price_1NvUsYG2cUz60jVKYciJGZR6", quantity: 0},
            "Gothic Crop Top Long Sleeve": {price: "price_1NvUuGG2cUz60jVKEzOrxxLN", quantity: 0},
            "White Hoodie": {price: "price_1NvUvWG2cUz60jVKo4D0eWe6", quantity: 0},
            "Spike Bracelet Choker": {price: "price_1NvUx7G2cUz60jVKHyYB83hM", quantity: 0},
            "Pink Heart Collar": {price: "price_1NvUxuG2cUz60jVKGXYz5NKA", quantity: 0},
            "Arm Warmers": {price: "price_1NvUyaG2cUz60jVK0LU3sc5r", quantity: 0},
            "Cross Necklace": {price: "price_1NvUzpG2cUz60jVKxn2OSfO5", quantity: 0},
            "Ghost Beanie": {price: "price_1NvV0WG2cUz60jVKCoFCrPkQ", quantity: 0}
        };

    const storedMappedProducts = JSON.parse(localStorage.getItem('mappedProducts')) || {}; //Store the mapped products in local storage
    const mergedMappedProducts = { // Merge the initial structure and updated structure of mapped products to keep or update any changes
        ...initialMappedProducts,
        ...storedMappedProducts
    };
    const [mappedProducts, setMappedProducts] = useState(mergedMappedProducts); // State variable to update the values of the merged mapped products

    const [cartList, setCartList] = useState(() => {
        const savedCartList = JSON.parse(localStorage.getItem('cartList')) || [];
        return savedCartList;
      });
    
    const [cartTotal, setCartTotal] = useState(() => {
        const savedCartTotal = parseInt(localStorage.getItem('cartTotal')) || 0;
        return savedCartTotal;
    });

    useEffect(() => {
        // Save cartList in local storage whenever it changes
        localStorage.setItem('cartList', JSON.stringify(cartList));
        localStorage.setItem('cartTotal', cartTotal.toString());
    }, [cartList, cartTotal]);

    useEffect(() => {
        localStorage.setItem('mappedProducts', JSON.stringify(mappedProducts));
        console.log('Mapped Products Updated:', mappedProducts);
    }, [mappedProducts]);

    const addToCart = (item, increase) => {
        setCartTotal((prev) => prev + 1);
        const updatedCartList = [item, ...cartList];
        setCartList(updatedCartList);
        console.log("item", item);
        console.log("item name", item.name);
        if (mappedProducts.hasOwnProperty(item.name)) {
            const addItem = mappedProducts[item.name];
            console.log(addItem);
            setMappedProducts({
                ...mappedProducts,
                [item.name] : {"price": addItem.price, "quantity": addItem.quantity + 1}
            });
            console.log("addtocart", mappedProducts[item.name]);
        }
    };

    const deleteFromCart = (item) => {
        setCartTotal(0);
        const updatedCartList = cartList.filter((cartItem) => cartItem !== item);
        setCartList(updatedCartList);
        const addItem = mappedProducts[item.name];
        setMappedProducts({
            ...mappedProducts,
            [item.name] : {"price": addItem.price, "quantity": 0}
        });
    };

    const handleIncrease = (item) => {
        setCartTotal((prev) => prev + 1);
        if (mappedProducts.hasOwnProperty(item.name)) {
            const addItem = mappedProducts[item.name];
            setMappedProducts({
                ...mappedProducts,
                [item.name] : {"price": addItem.price, "quantity": addItem.quantity + 1}
            });
        }
    };

    const handleDecrease = (item) => {
        if (mappedProducts.hasOwnProperty(item.name) && mappedProducts[item.name].quantity > 1) {
            setCartTotal((prev) => prev - 1);
            const addItem = mappedProducts[item.name];
            setMappedProducts({
                ...mappedProducts,
                [item.name] : {"price": addItem.price, "quantity": addItem.quantity - 1}
            });
        }
    };

    const handleCheckout = () => {
        const checkoutList = [];

        cartList.map((item) => {
            if (mappedProducts.hasOwnProperty(item.name)) {
                console.log(mappedProducts[item.name]);
                checkoutList.push(mappedProducts[item.name]);
            }
        })
        console.log('checkoutlist', checkoutList);
        return checkoutList;
    }

    // Log cartList whenever it changes
    useEffect(() => {
        console.log('Updated cartList:', cartList);
    }, [cartList]);

    useEffect(() => {
        localStorage.setItem('cartTotal', cartTotal.toString());
    }, [cartTotal]);
    
    return (  
        <CartContext.Provider value={{ cartTotal, addToCart, cartList, deleteFromCart, handleIncrease, handleDecrease, handleCheckout, mappedProducts, setCartTotal, setCartList, setMappedProducts, initialMappedProducts }}>
            { children }
        </CartContext.Provider>
    );
}

const useCart = ()=> {
    return useContext(CartContext);
}

export { CartProvider, useCart };