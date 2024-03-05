import React, { useEffect, useState } from 'react'
import { useCart } from '../CartContext';
import { useAuth } from '../Contexts/AuthContext';
import AVATAR from '../assets/avatar-icon.png';
import HAMBURGER from '../assets/icons8-hamburger-menu-50.png';
import CONTACT from '../assets/email.png';
import PRODUCTS from '../assets/hood.png';
import ABOUT_US from '../assets/info.png';
import SIGN_IN from '../assets/logout.png';
import SIGN_OUT from '../assets/log-out.png';
import CART from '../assets/coffin.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { cartTotal } = useCart();
    const { signedIn, email, setEmail } = useAuth();
    const [dropdown, setDropdown] = useState(false);
    const [hamburger, setHamburger] = useState(false);
    const navigate = useNavigate();

    const handleDropdown = () => {
        setDropdown(!dropdown);
        document.body.style.overflowY = dropdown ? "auto" : "hidden";
    }

    const handleHamburger = () => {
        setHamburger(!hamburger);
        document.body.style.overflowY = hamburger ? "auto" : "hidden";
    }

    const handleSignOut = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("signedIn");
        navigate("/login");
    }

    useEffect(() => {
        const closeMenuAnywhere = (e) => {
            const menu = document.querySelector(".hamburger-container");
            if (menu) {
                if (!menu.contains(e.target)) {
                    setHamburger(false);
                    document.body.style.overflowY = "auto";
                }
            }
        }

        document.body.addEventListener('click', closeMenuAnywhere);

        return () => {
          document.body.removeEventListener('click', closeMenuAnywhere);
        };
    })

    return (  
        <>
            <div className="top-section">
                <a href="/"><img className='logo' src='/gothgraphic.jpg' height={130} width={130} /></a>
                {/*<div className="links">
                    <a href="/products" id='product'>Products</a>
                    <a href="/about" id='contact'>About Us</a>
                    <a href="/contact" id='about'>Contact</a>
                <div className='cart-container'>
                    <a href="/cart" id='cart'><img src="/coffin.png" width={50} height={50} /></a>
                    <span className='cart-text'>{cartTotal > 0 ? cartTotal : null}</span>
                </div>*/}
                {
                    localStorage.getItem("signedIn") === "true" ? (
                    <div className='avatar-container' onClick={() => handleDropdown()}>
                        <img src={AVATAR} alt="" className='avatar-icon' />
                        <div className={`dropdown-menu ${dropdown ? 'dropdown-menu-open' : 'dropdown-menu-closed'}`}>
                            <a href='/profile' className='profile-row'>
                                <img src={AVATAR} alt="" className='profile-pic' />
                                <p className='profile-text'>Profile</p>
                            </a>
                            <a href='/products' className='profile-row'>
                                <img src={PRODUCTS} alt="" className='profile-pic' />
                                <p className='profile-text'>Products</p>
                            </a>
                            <a href='/about' className='profile-row'>
                                <img src={ABOUT_US} alt="" className='profile-pic' />
                                <p className='profile-text'>About Us</p>
                            </a>
                            <a href='/contact' className='profile-row'>
                                <img src={CONTACT} alt="" className='profile-pic' />
                                <p className='profile-text'>Contact</p>
                            </a>
                            <a href='/cart' className='profile-row'>
                                <img src={CART} alt="" className='profile-pic' />
                                <p className='profile-text'>Cart</p>
                            </a>
                            <a href='/login' className='profile-row' onClick={() => handleSignOut()}>
                                <img src={SIGN_OUT} alt="" className='profile-pic' />
                                <p className='profile-text'>Sign Out</p>
                            </a>
                        </div>
                    </div>
                    ) : (
                        <div className='hamburger-container' onClick={() => handleHamburger()}>
                            <img src={HAMBURGER} alt="" className='hamburger-menu-icon' />
                            <div className={`hamburger-menu ${hamburger ? 'hamburger-menu-open' : 'hamburger-menu-closed'}`}>
                                {/*<a href='/profile' className='hamburger-row'>
                                    <img src={AVATAR} alt="" className='hamburger-pic' />
                                    <p className='hamburger-text'>Profile</p>
                                </a>*/}
                                <a href='/products' className='hamburger-row'>
                                    <img src={PRODUCTS} alt="" className='hamburger-pic' />
                                    <p className='hamburger-text'>Products</p>
                                </a>
                                <a href='/about' className='hamburger-row'>
                                    <img src={ABOUT_US} alt="" className='hamburger-pic' />
                                    <p className='hamburger-text'>About Us</p>
                                </a>
                                <a href='/contact' className='hamburger-row'>
                                    <img src={CONTACT} alt="" className='hamburger-pic' />
                                    <p className='hamburger-text'>Contact</p>
                                </a>
                                <a href='/cart' className='hamburger-row'>
                                    <img src={CART} alt="" className='hamburger-pic' />
                                    <p className='hamburger-text'>Cart</p>
                                </a>
                                <a href='/login' className='hamburger-row'>
                                    <img src={SIGN_IN} alt="" className='hamburger-pic' />
                                    <p className='hamburger-text'>Sign In</p>
                                </a>
                            </div>
                        </div>
                    )
                }
                </div>
                {/*<div className='hamburger-menu'></div>*/}
            {/*</div>*/}
      </>
    );
}
 
export default Navbar;