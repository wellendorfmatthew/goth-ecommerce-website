import React from 'react'

const Navbar = () => {
    return (  
        <>
            <div className="top-section">
                <div className="links">
                    <a href="/"><img className='logo' src='/gothgraphic.jpg' height={130} width={130} /></a>
                    <h2><a href="/products" id='product'>Products</a></h2>
                    <h2><a href="/about" id='contact'>About Us</a></h2>
                    <h2><a href="/contact" id='about'>Contact</a></h2>
                    <a href="/cart" id='cart'><img src="/coffin.png" width={50} height={50} /></a>
                    <h2><a href="/login" id='sign-in'>Sign In</a></h2>
                </div>
            </div>
            <div className="top-divider">
                <hr />
            </div>
      </>
    );
}
 
export default Navbar;