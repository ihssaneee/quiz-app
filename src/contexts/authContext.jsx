import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
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

    return(
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;