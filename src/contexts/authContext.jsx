import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { signInWithGoogle, logOut,signUpWithEmail ,signInWithEmail} from "../services/authService";

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
    const signOutUser=async()=>{
        try{
            await logOut();
            setUser(null);
        }
        catch(error){
            throw error;
        }
    }
    const signUpEmail=async (email,password,username) => {
        try{
            const currentUser=await signUpWithEmail(email,password,username)
            setUser(currentUser)
        }
        catch(error){
            throw error;
        }
    }
    const logInWithEmail=async(email,password)=>{
        try{
            const currentUser= await signInWithEmail(email,password);
            setUser(currentUser)
        }
        catch(error){
            throw error;
        }
    }

    return(
        <AuthContext.Provider value={{ user,logInWithGoogle,signOutUser,signUpEmail,logInWithEmail }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;