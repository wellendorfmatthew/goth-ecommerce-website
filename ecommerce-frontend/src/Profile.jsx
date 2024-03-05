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

const Profile = () => {
    const { profile, setProfile, signedIn } = useAuth();
    const [error, setError] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentEmail, setCurrentEmail] = useState(localStorage.getItem("email"));
    const [newEmail, setNewEmail] = useState("");
    const [picture, setPicture] = useState("");

    const updatePassword = async(currentPassword, newPassword, confirmPassword) => {
        try {
            const update = await fetch("http://localhost:4015/user/update/password",{
                method: "PUT",
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const response = await update.json();

            if (response.error) {
                throw Error(response.error)
            }

            console.log("updated password ", response)

            return response;
        } catch (error) {
            setError(error.message);
            return response.error;
        }
    }

    const updateEmail = async(email, newEmail) => {
        console.log("newemail", newEmail);
        try {
            const update = await fetch("http://localhost:4015/user/update/email",{
                method: "PUT",
                body: JSON.stringify({
                    email: email,
                    newEmail: newEmail
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const response = await update.json();
            console.log(response);

            if (response.error) {
                throw Error(response.error)
            }

            console.log("updated email ", response.email)

            return response.email;
        } catch (error) {
            setError(error.message);
            return response.error;
        }
    }

    const handleProfilePicture = async (event) => {
        const selectedFile = URL.createObjectURL(event.target.files[0]);
        console.log("setpicture ", selectedFile)
        console.log("picture type ", typeof selectedFile);
        if (selectedFile) {
          const newPicture = await updateProfilePicture(selectedFile)
          console.log("profilepictureupdate worked! ", newPicture);
          localStorage.setItem("profilePicture", newPicture); 
          setPicture(localStorage.getItem("profilePicture"))
        }
    }

    const updateInfo = async() => {
            try {
                const updatedEmail = await updateEmail(currentEmail, newEmail);
    
                if (updatedEmail !== updatedEmail.error) {
                    localStorage.removeItem("email");
                    localStorage.setItem("email", updatedEmail)
                    setCurrentEmail(localStorage.getItem("email"));
                    setNewEmail(updatedEmail);
                    console.log("email updated!")
                    console.log("current email ", currentEmail)
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

    const getWishList = async() => { // Works!
        try {
            const wishlist = await fetch(`http://localhost:4015/user/wishlist?email=${currentEmail}`);

            const response = await wishlist.json();

            if (response.error) {
                throw Error(response.error)
            }

            console.log("wishlist ", response);
            console.log("first item ", response[0]);

            return response;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }

    const getOrders = async() => { // Works!
        try {
            const orders = await fetch(`http://localhost:4015/user/orders?email=${currentEmail}`);

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

    const updateProfilePicture = async(newPicture) => {
        try {
            const update = await fetch("http://localhost:4015/user/picture",{
                method: "PUT",
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    profilePicture: newPicture
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const response = await update.json();

            if (response.error) {
                throw Error(response.error)
            }

            console.log("updateProfilePicture ", response);

            const newProfilePicture = response;
            return newProfilePicture;
        } catch (error) {
            setError(error.message);
            return response.error;
        }
    }

    const deleteProfilePicture = async() => {
        try {
            const update = await fetch("http://localhost:4015/user/picture",{
                method: "DELETE",
            })

            const response = await update.json();

            if (response.error) {
                throw Error(response.error)
            }

            const deletedProfilePicture = response;
            setProfile({...profile, profilePicture : ""});
            return true;
        } catch (error) {
            setError(error.message);
            return response.error;
        }
    }

    useEffect(() => {
        const getProfile = async() => { // Works!
            try {
                const profile = await fetch(`http://localhost:4015/user/info?email=${currentEmail}`);
                console.log("Profile Response ", profile)
                const response = await profile.json();
                console.log("Response, ", response)
                if (response.error) {
                    console.log("error?")
                    throw new Error(response.error);
                }

                localStorage.removeItem("email");
                localStorage.setItem("email", response.email);
                localStorage.removeItem("profilePicture");
                localStorage.setItem("profilePicture", response.profilePicture);
                console.log(localStorage.getItem("profilePicture"));
                setPicture(response.profilePicture)
                setNewEmail(response.email);
                setCurrentEmail(localStorage.getItem("email"));
                console.log("yo")
                const newProfile = { email: currentEmail, profilePicture: response.profilePicture, wishList: response.wishList, orders: response.orders };
                console.log(newProfile)
                setProfile(newProfile);
                console.log(profile);
                return true;
            } catch (error) {
                setError(error.message);
                return false;
            }
        }
        getProfile();

    }, [])
    
    if (localStorage.getItem("signedIn") === "true") {
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
                        <input type="file" onChange={handleProfilePicture} style={{display: 'none'}} />
                        <img src={picture || AVATAR} alt="" className='profile-image' />
                        <img src={PICKER} alt="" className='profile-picker' />
                    </div>
                    <p className='profile-name'>{localStorage.getItem("email")}</p>
                    <div className='section-changer'>
                        <div className='section'>
                            <img src={PERSONAL_INFO} alt="" className='section-image' />
                            <p className='section-name'>Personal Info</p>
                        </div>
                        <div className='section' onClick={() => getOrders()}>
                            <img src={ORDERS} alt="" className='section-image' />
                            <p className='section-name'>My Orders</p>
                        </div>
                        <div className='section' onClick={() => getWishList()}>
                            <img src={WISHLIST} alt="" className='section-image' />
                            <p className='section-name'>Wishlist</p>
                        </div>
                    </div>
                    <div className='section-information'>
                        <div className='personal-info-section'>
                            <div className='info-section'>
                                <label htmlFor="email" className='info-label'>Email</label>
                                <input type="text" name='email' className='info-input' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                                {console.log(newEmail)}
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
                                <button className='update-button' onClick={() => updateInfo()}>Update Info</button>
                                <div className='error-section'>{error}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        <p>You're not supposed to be here :/</p>
    }
}

export default Profile;