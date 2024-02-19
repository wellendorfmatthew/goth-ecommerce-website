import React, { useEffect, useState } from 'react'
import { useCart } from '../CartContext';

const Navbar = () => {
    const { cartTotal } = useCart();

    return (  
        <>
            <div className="top-section">
                <a href="/"><img className='logo' src='/gothgraphic.jpg' height={130} width={130} /></a>
                <div className="links">
                    <a href="/products" id='product'>Products</a>
                    <a href="/about" id='contact'>About Us</a>
                    <a href="/contact" id='about'>Contact</a>
                <div className='cart-container'>
                    <a href="/cart" id='cart'><img src="/coffin.png" width={50} height={50} /></a>
                    <span className='cart-text'>{cartTotal > 0 ? cartTotal : null}</span>
                </div>
                <a href="/login" id='sign-in'>Sign In</a>
                </div>
                {/*<div className='hamburger-menu'></div>*/}
            </div>
      </>
    );
}
 
export default Navbar;