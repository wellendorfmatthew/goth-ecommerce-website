import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Contexts/AuthContext';
import WISHLIST from './assets/magic-wand.png';
import PERSONAL_INFO from './assets/notes.png';
import ORDERS from './assets/orders.png';
import AVATAR from './assets/avatar-icon.png';
import PICKER from'./assets/picture-picker.png';
import { useCart } from './CartContext';

const Profile = () => {
    const navigate = useNavigate();
    const { profile, setProfile, signedIn, setSignedIn, auth, setAuth } = useAuth();
    const [error, setError] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [picture, setPicture] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [section, setSection] = useState(1);
    const { addToCart, cartTotal, mappedProducts } = useCart();
    const months = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 
        6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"}

    const changeSection = (sectionNum) => {
        if (sectionNum === 1) {
            setSection(1);
            return;
        }
        if (sectionNum === 2) {
            setSection(2);
            return;
        }
        if (sectionNum === 3) {
            setSection(3);
            return;
        }
    }

    const updatePassword = async(currentPassword, newPassword, confirmPassword) => {
        try {
            const update = await fetch("http://localhost:4015/user/update/password",{
                method: "PUT",
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                },
            })

            const response = await update.json();

            if (response.error) {
                throw Error(response.error)
            }

            console.log("updated password ", response)
            setPasswordError("Successfully updated password")
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            return response;
        } catch (error) {
            setPasswordError(error.message);
            return response.error;
        }
    }

    const updateEmail = async(newEmail) => {
        console.log("newemail", newEmail);
        try {
            const update = await fetch("http://localhost:4015/user/update/email",{
                method: "PUT",
                body: JSON.stringify({
                    newEmail: newEmail
                }),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                },
            })

            const response = await update.json();
            console.log(response);

            if (response.error) {
                throw Error(response.error)
            }

            console.log("updated email ", response.email)
            setNewEmail(response.email);
            setCurrentEmail(response.email);
            console.log("current email ", currentEmail);
            console.log("new email ", newEmail);
            setEmailError("Successfully updated email");

            return response.email;
        } catch (error) {
            setEmailError(error.message);
            return response.error;
        }
    }

    const handleProfilePicture = async (event) => { // Works!!
        const fileObject = event.target.files[0];
        console.log("fileobject ", fileObject);
        
        if (fileObject) {
            const reader = new FileReader(); // Allows for reading the contents of files
            
            reader.onload = (event) => { // Loads file when done reading 
                const imageData = event.target.result; // Gets the data url from the file
                console.log("imageData ", imageData);
                
                localStorage.removeItem("profilePicture");
                localStorage.setItem("profilePicture", imageData);
            };
            
            reader.readAsDataURL(fileObject); // This is what initiates the reading of selected file as a URL
        }
    };
    

    const updateInfo = async() => { // Don't need anymore
            try {
                const updatedEmail = await updateEmail(newEmail);
    
                if (updatedEmail !== updatedEmail.error) {
                    setNewEmail(updatedEmail);
                    console.log("email updated!")
                    console.log("new email ", newEmail)
                    setError("Successfully updated email");
                } else {
                    throw Error (updatedEmail.error)
                }
                const updatedPassword = await updatePassword(currentPassword, newPassword, confirmPassword);
    
                if (updatedPassword !== updatedPassword.error) {
                    console.log("password updated!")
                    setError("Password updated!")
                    return true;
                } else {
                    throw Error(updatedPassword.error)
                }
            } catch (error) {
                setError(error.message)
                return false;
            }
    }

    // const getWishList = async() => { // Works!
    //     try {
    //         const wishlist = await fetch(`http://localhost:4015/user/wishlist`, {
    //             credentials: 'include',
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Access-Control-Allow-Credentials": "true",
    //                 "Access-Control-Allow-Origin": "http://localhost:5173",
    //             },
    //         });

    //         const response = await wishlist.json();

    //         if (response.error) {
    //             throw Error(response.error)
    //         }

    //         console.log("wishlist ", response);
    //         console.log("first item ", response[0]);

    //         return response;
    //     } catch (error) {
    //         console.log(error.message);
    //         return false;
    //     }
    // }

    const deleteFromWishList = async (id) => {
        try {
            const wishlist = await fetch(`http://localhost:4015/user/wishlist/${id}`, {
                method: "DELETE",
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

            console.log("wishlist ", response);
            console.log("first item ", response[0]);

            const newWishList = profile.wishList.filter((item) => item._id !== id);
            setProfile({...profile, wishList: newWishList});
            console.log("new profile wishlist",  profile);

            return response;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    const getOrders = async() => { // Works!
        try {
            const orders = await fetch(`http://localhost:4015/user/orders`, {
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                },
            });

            const response = await orders.json();

            if (response.error) {
                throw Error(response.error)
            }

            console.log(response);
            console.log("orders ", response);
            return response;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    

    const updateProfilePicture = async(newPicture) => { // Probably don't need anymore since using localStorage for pictures
        try {
            const update = await fetch("http://localhost:4015/user/picture",{
                method: "PUT",
                body: JSON.stringify({
                    profilePicture: newPicture
                }),
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "http://localhost:5173",
                },
            })

            const response = await update.json();

            if (response.error) {
                throw Error(response.error)
            }

            console.log("updateProfilePicture ", response.picture);
            console.log("response profilePicture ", response.picture);

            const newProfilePicture = response.picture;
            return newProfilePicture;
        } catch (error) {
            setError(error.message);
            return response.error;
        }
    }

    const deleteProfilePicture = () => { // Probably don't actually need anymore
        localStorage.removeItem("profilePicture");
        console.log("deleteProfilePicture ", localStorage.getItem("profilePicture"));
        // try {
        //     const update = await fetch("http://localhost:4015/user/picture",{
        //         method: "DELETE",
        //     })

        //     const response = await update.json();

        //     if (response.error) {
        //         throw Error(response.error)
        //     }

        //     const deletedProfilePicture = response;
        //     setProfile({...profile, profilePicture : ""});
        //     return true;
        // } catch (error) {
        //     setError(error.message);
        //     return response.error;
        // }
    }

    const handleClick = (id) => { // When user clicks on a product navigates them to the specific clothing item's page
        navigate(`/clothes/${id}`);
    }

    useEffect(() => {
        const getProfile = async() => { // Works!
            try {
                const response = await fetch('http://localhost:4015/user/info', {
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Origin": "http://localhost:5173",
                    },
                });
                console.log("Response ", response)
                const profile = await response.json();
                console.log("Profile, ", profile)
                if (profile.error) {
                    console.log("error?")
                    throw new Error(profile.error);
                }
                console.log("profile profilePicture ", profile.profilePicture);
                const newProfile = { email: profile.email, profilePicture: profile.profilePicture, wishList: profile.wishList, orders: profile.orders };
                console.log(newProfile);
                setProfile(newProfile);
                console.log(profile);
                setSignedIn(true);
                setCurrentEmail(profile.email);
                setNewEmail(profile.email);
                // setPicture(localStorage.getItem("profilePicture"));
                return true;
            } catch (error) {
                setError(error.message);
                return false;
            }
        }
        getProfile();

    }, [])
    
    if (signedIn) {
        return (
            <>
                <Navbar />
                <div className='profile-section'>
                    <div className='profile-picture-section' onClick={() => {
                        const input = document.querySelector('input[type="file"]');
                        if (input) {
                            input.click();
                        }
                    }
                    }>
                        <input type="file" accept='image/*' onChange={handleProfilePicture} style={{display: 'none'}} />
                        <img src={localStorage.getItem("profilePicture") || AVATAR} alt="" className='profile-image' />
                        <img src={PICKER} alt="" className='profile-picker' />
                    </div>
                    <p className='profile-name'>{currentEmail}</p>
                    <div className='error-section'>{error}</div>
                    <div className='section-changer'>
                        <div className='section' onClick={() => changeSection(1)}>
                            <img src={PERSONAL_INFO} alt="" className='section-image' />
                            <p className='section-name'>Personal Info</p>
                        </div>
                        <div className='section' onClick={() => changeSection(2)}>
                            <img src={ORDERS} alt="" className='section-image' />
                            <p className='section-name'>My Orders</p>
                        </div>
                        <div className='section' onClick={() => changeSection(3)}>
                            <img src={WISHLIST} alt="" className='section-image' />
                            <p className='section-name'>Wishlist</p>
                        </div>
                    </div>
                    <div className='section-information'>
                        {section === 1 && (
                            <div className='personal-info-section'>
                                <div className='info-section'>
                                    <label htmlFor="email" className='info-label'>Email</label>
                                    <input type="text" name='email' className='info-input' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                </div>
                                <div className='update-button-section'>
                                    <button className='update-button' onClick={() => updateEmail(newEmail)}>Update Email</button>
                                    <div className='error-section'>{emailError}</div>
                                </div>
                                <div className='info-section'>
                                    <label htmlFor="current-password" className='info-label'>Current Password</label>
                                    <input type="text" name='current-password' className='info-input' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                </div>
                                <div className='info-section'>
                                    <label htmlFor="new-password" className='info-label'>New Password</label>
                                    <input type="text" name='new-password' className='info-input' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className='info-section'>
                                    <label htmlFor="confirm-password" className='info-label'>Confirm New Password</label>
                                    <input type="text" name='confirm-password' className='info-input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                <div className='update-button-section'>
                                    <button className='update-button' onClick={() => updatePassword(currentPassword, newPassword, confirmPassword)}>Update Password</button>
                                    <div className='error-section'>{passwordError}</div>
                                </div>
                            </div>
                        )}
                        {section === 2 && (
                            <div className='orders-section'>
                                {
                                    profile.orders.map((order) => {
                                        return (
                                            <>
                                                <div className='order-info-section'>
                                                    <div className='order-info'>
                                                        <p className='order-info-text'>Order Placed</p>
                                                        <p className='order-info-text'>{months[new Date(order.order[0].date).getMonth()] + " " + new Date(order.order[0].date).getDate() + " " + new Date(order.order[0].date).getFullYear()}</p>
                                                    </div>
                                                    <div className='order-info'>
                                                        <p className='order-info-text'>Total</p>
                                                        <p className='order-info-text'>${order.totalPrice}</p>
                                                    </div>
                                                    <div className='order-info'>
                                                        <p className='order-info-text'>Ship To</p>
                                                        <p className='order-info-text'>{currentEmail}</p>
                                                    </div>
                                                    <div className='order-info'>
                                                        <p className='order-info-text'>Order # {order._id}</p>
                                                        <p className='order-info-text order-details'>View Order Details</p>
                                                    </div>
                                                </div>
                                                <div className='order-products-section'>
                                                    {
                                                        order.order.map((product) => {
                                                            return (<div className='ordered-product-section'>
                                                                <img src={product.image} alt="" className='ordered-product-image' />
                                                                <div className='ordered-product-info'>
                                                                    <p>{product.name}</p>
                                                                    <p>${product.price}</p>
                                                                    <p>Quantity:{product.quantity}</p>
                                                                </div>
                                                                <button className='ordered-product-buy-again-button'>Buy Again</button>
                                                            </div>)
                                                        })
                                                    }
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )}
                        {section === 3 && (
                            <div className='wishlist-section'>
                                {
                                    profile.wishList.map((item) => {
                                        return (<div className='wishlist-item'>
                                                    <img src={item.item.image} className='wishlist-image' />
                                                    <div className='wishlist-info'>
                                                        <p className='wishlist-item-name' onClick={() => handleClick(item.item.id)}>{item.item.name}</p>
                                                        <p className='wishlist-item-price'>${item.item.price}</p>
                                                    </div>
                                                    <div className='wishlist-modify'>
                                                        <img src="/trashcan.png" alt="" className='wishlist-trash-can' onClick={() => deleteFromWishList(item._id)}/>
                                                    </div>
                                                </div>)
                                    })
                                }
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    } else {
        <p>You're not supposed to be here :/</p>
    }
}

export default Profile;