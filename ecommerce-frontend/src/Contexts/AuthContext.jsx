import { useState, createContext, useContext } from 'react';
import AVATAR from '../assets/avatar-icon.png';
import Cookies from 'js-cookie';
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [profile, setProfile] = useState({
        email : "",
        profilePicture: "",
        wishList: [],
        orders: []
    })

    const handleSignUp = async (email, password) => {
        try {
            const response = await fetch("http://localhost:4015/user/signup", {
                method: "POST",
                body: JSON.stringify({ // Make sure to use JSON.stringify since the email and password being passed in aren't in JSON format
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json();
            console.log("this is data ", data);

            if (!response.ok) { // The error object is in the bad response so grab the error from it
                throw new Error(data.error);
            }
            return true;

        } catch (error) {
            console.log(error)
            console.log(error.code)
            console.log(error.message)
            return error.message;
        }
    }

    const handleLogin = async (email, password) => {
        try {
            const response = await fetch("http://localhost:4015/user/login", {
                method: "POST",
                body: JSON.stringify({ // Make sure to use JSON.stringify since the email and password being passed in aren't in JSON format
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json(); 
            console.log("this is data ", data);

            if (!response.ok) { // The error object is in the bad response so grab the error from it
                throw new Error(data.error);
            }

            localStorage.setItem("email", email);
            console.log(localStorage.getItem("email"));
            localStorage.setItem("signedIn", "true");
            if (localStorage.getItem("signedIn") === "true") {
                setSignedIn(true);
            }
            console.log(localStorage.getItem("signedIn"));
            // setEmail(localStorage.getItem("email"));
            // console.log(email);
            return true;

        } catch (error) {
            console.log(error);
            console.log(error.code);
            console.log(error.message);
            return error.message;
        }
    }

    const handleUpdatingWishList = async(item) => {
        try {
            const update = await fetch("http://localhost:4015/user/wishlist",{
                method: "PUT",
                body: JSON.stringify({
                    item: item,
                    email: email,
                })
            })

            const response = await update.json();

            if (!response.ok) {
                throw Error(response.error)
            }

            const newWishList = profile.wishList.push(response);
            setProfile({...profile, wishList: [...profile.wishList, newWishList]});
        } catch (error) {
            return error.message
        }
    }

    const handleDeletingFromWishList = async(item) => {
        try {
            const update = await fetch(`http://localhost:4015/user/wishlist?email=${email}&item=${item}`, {
                method: "DELETE",
            })


            const response = await update.json();

            if (!response.ok) {
                throw Error(response.error)
            }

            const newWishList = profile.wishList.filter((item) => item._id !== response._id);
            setProfile({...profile, wishList: newWishList});
        } catch (error) {
            return error.message
        }
    }

    const addOrders = async(image, name, price) => {
        try {
            const update = await fetch("http://localhost:4015/user/orders",{
                method: "PUT",
                body: JSON.stringify({
                    image: image,
                    email: email,
                    name: name,
                    price: price
                })
            })

            const response = await update.json();

            if (!response.ok) {
                throw Error(response.error)
            }

            const newOrder = profile.orders.push(response);
            setProfile({...profile, orders: [...profile.orders, newOrder]});
        } catch (error) {
            return error.message
        }
    }

    return (  
        <AuthContext.Provider value={{ emailError, setEmailError, passwordError, setPasswordError, loginError, setLoginError, handleSignUp, handleLogin, signedIn, setSignedIn, profile, setProfile, email, setEmail }}>
            { children }
        </AuthContext.Provider>
    );
}

const useAuth = ()=> {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };