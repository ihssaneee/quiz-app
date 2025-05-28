import { signInWithPopup } from "firebase/auth";
import {auth,provider} from './firebase.js'

export const signInWithGoogle= async()=>{
    try{
        const result= await  signInWithPopup(auth,provider);
        const user=result.user
        return user;
        

    }
    catch(error){
            throw error;
        }
}