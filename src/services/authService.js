import { signInWithPopup ,signOut,createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword} from "firebase/auth";
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
export const logOut=async()=>{
    try{
        await signOut(auth)
        console.log('user signed out successfully')
    }
    catch(error){
        console.error('user could not log out',error);
        throw error
    }


}
export const signUpWithEmail=async (email,password,username) => {
    try{
        const result= await createUserWithEmailAndPassword(auth,email,password)

        await updateProfile(result.user,{displayName:username})
        console.log('user signed up with email')
        return result.user;

    }
    catch(error){
        console.error('user could not sign up with email',error);
        throw error
    }
    
}
export const signInWithEmail=async(email,password)=>{
    try{
        const result= await signInWithEmailAndPassword(email,password);
        console.log('user signed in successfully with email');
        return result.user
    }
    catch(error){
        console.error('user could not sign in with email',error);
        throw error
    }
}