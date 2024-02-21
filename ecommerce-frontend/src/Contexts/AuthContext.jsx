import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [profile, setProfile] = useState({
        user : "",
        profilePic: ""
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

            if (!response.ok) { // The error object is in the bad response so grab the error from it
                throw new Error(data.error);
            }
            setSignedIn(true);
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

            if (!response.ok) { // The error object is in the bad response so grab the error from it
                throw new Error(data.error);
            }

            setSignedIn(true);
            return true;

        } catch (error) {
            console.log(error);
            console.log(error.code);
            console.log(error.message);
            return error.message;
        }
    }

    return (  
        <AuthContext.Provider value={{ emailError, setEmailError, passwordError, setPasswordError, loginError, setLoginError, handleSignUp, handleLogin, signedIn, setSignedIn }}>
            { children }
        </AuthContext.Provider>
    );
}

const useAuth = ()=> {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };