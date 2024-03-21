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
import SEARCH_BAR from '../assets/black-search.png';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import 'axios';

const Navbar = () => {
    const { cartTotal } = useCart();
    const { email, setEmail, handleSignOut, getSession, auth, setAuth, signedIn, setSignedIn} = useAuth();
    const [dropdown, setDropdown] = useState(false);
    const [hamburger, setHamburger] = useState(false);
    const [items, setItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleDropdown = () => {
        setDropdown(!dropdown);
        document.body.style.overflowY = dropdown ? "auto" : "hidden";
    }

    const handleHamburger = () => {
        setHamburger(!hamburger);
        document.body.style.overflowY = hamburger ? "auto" : "hidden";
    }

    const signOut = async () => {
        const isSignOut = await handleSignOut();

        if (isSignOut === true) {
            setSignedIn(false);
            navigate("/");
            return;
        }
        return;
    }

    const handleClick = (id) => { // When user clicks on a product navigates them to the specific clothing item's page
        navigate(`/clothes/${id}`);
    }

    useEffect(() => {
        const closeMenuAnywhere = (e) => {
            const menu = document.querySelector(".hamburger-container");
            const avatar = document.querySelector(".avatar-container");

            if (menu) {
                if (!menu.contains(e.target)) {
                    setHamburger(false);
                    document.body.style.overflowY = "auto";
                }
            } else if (avatar) {
                if (!avatar.contains(e.target)) {
                    setDropdown(false)
                    document.body.style.overflowY = "auto";
                }
            }
        }

        document.body.addEventListener('click', closeMenuAnywhere);

        return () => {
          document.body.removeEventListener('click', closeMenuAnywhere);
        };
    })

    useEffect(() => {
        const retrieveSession = async () => {
            const session = await getSession();
            console.log("session ", session);
            if (session !== null) {
                setSignedIn(true);
                setAuth(session);
                console.log("auth ", auth);
            } else {
                setSignedIn(false);
            }
        }
        retrieveSession();
    }, [])

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
              console.log("clothes ", data);
            } catch (error) {
              console.log("Couldn't get posts", error);
            }
          }
        getClothes();
    }, []);

    useEffect(() => {
        console.log("search value ", search)
        const filterSearch = () => {

            const newSearchItems = search.length === 0 ? [] : items.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            })
            setSearchItems(newSearchItems);
            console.log("search items ", searchItems);
        }
        filterSearch();
        // const debouncedAddOrder = debounce(filterSearch, 1000); // Prevents filterSearch from being called multiple times

        // debouncedAddOrder();

        // return () => {
        //     debouncedAddOrder.cancel();
        // };
    }, [search])

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
                <div className='search-container'>
                    <div className='search-bar-container'>
                        <img src={SEARCH_BAR} alt="" className='search-icon' onClick={() => (document.querySelector(".search-input").focus())} />
                        <input type="text" className='search-input' value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    {
                        searchItems.length > 0 ? (
                            <div className='search-results-container'>
                                {
                                    searchItems.map((item, index) => {
                                        return (<div className='results-item' key={index} onClick={() => handleClick(item._id)}>
                                                    <img src={item.image} alt="" className='results-image' />
                                                     <p className='results-text'>{item.name}</p>
                                                </div>
                                        )
                                    })
                                }
                            </div>
                        ) : null
                    }
                </div>
                {
                    signedIn === true ? (
                    <div className='avatar-container' onClick={() => handleDropdown()}>
                        <img src={localStorage.getItem("profilePicture") || AVATAR} alt="" className='avatar-icon' />
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
                            <a href='/login' className='profile-row' onClick={() => signOut()}>
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
            <hr className='top-section-line' />
      </>
    );
}
 
export default Navbar;