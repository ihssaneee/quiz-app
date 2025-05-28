import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { signInWithGoogle } from "../services/authService";
const AuthContext=createContext();

export const useAuth= ()=>{
    return useContext(AuthContext)
}
const AuthProvider=({children})=>{
    const [user,setUser]= useState(null)
    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth,setUser);

        return ()=>unsubscribe();
    },[])

    const logInWithGoogle= async()=>{
        try{
            const currentUser= await signInWithGoogle()
            setUser(currentUser);
            console.log('user signed up successfully with google')
        }
        catch(error){
            console.error('user could not sign up with google',error)
            throw error;
        }
    }

    return(
        <AuthContext.Provider value={{ user,logInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;