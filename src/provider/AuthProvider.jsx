import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";
export const AuthContext=createContext(null)

// Social Auth Providers
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
const [user,setUser]=useState(null)
const [loading,setLoading]=useState(true)

// Create User
const createUser=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
    }

// Update User Profile
const updateUserProfile=(name,photo)=>{
    return updateProfile(auth.currentUser, {
        displayName:name, 
        photoURL: photo,
      })
      
}
// Update Email
const updateEmail = (Email) => {
    updateEmail(auth.currentUser, {
        email:Email
    })
}


    // Sign In user
const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
}


// Log out user
const logOut=()=>{
    setLoading(true)
    return signOut(auth);
}

// Google Login
const googleLogin=()=>{
    return signInWithPopup(auth,googleProvider)
}
useEffect(()=>{
    const unSubscribe= onAuthStateChanged(auth,currentUser=>{
        const userEmail=currentUser?.email || user?.email;
        const loggedUser={email:userEmail};
        setUser(currentUser);
        console.log('current user',currentUser)
        setLoading(false)
        // If user exists then issue a token
        if(currentUser){
            
            axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser,{withCredentials:true})
            .then(res=>{
                console.log("Token response",res.data)
            })
        }
        else{
            axios.post(`${import.meta.env.VITE_API_URL}/logout`,loggedUser,{
                withCredentials:true,

            })
            .then(res=>{
                console.log(res.data);
            })
        }
    });
    return()=>{
        unSubscribe();
    }
},[])

const authInfo={
    user,
    setUser,
    loading,
    createUser,
    signIn,
    logOut,
    googleLogin,
    updateUserProfile,
    updateEmail
    
}

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

AuthProvider.propTypes={
    children:PropTypes.object
}

export default AuthProvider;