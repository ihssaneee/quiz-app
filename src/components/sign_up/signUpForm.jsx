import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import google from '../../assets/google.png'
import { useAuth } from '../../contexts/authContext';


const SignUpForm = () => {
    const navigate=useNavigate()
    const {logInWithGoogle}= useAuth();
    const handleLogin=async()=>{
      try{
      await logInWithGoogle();
      navigate('/categories')
    }
    catch(error){
      const errorMessage=error?.message || "an unexpected error happened"
      console.error(errorMessage)
    }
    }
  return (
    <div className="flex flex-col font-poppins items-center justify-center p-8 pb-21 gap-9 mx-auto max-w-lg border border-neutral-300 m-9 shadow-md rounded-3xl">
      <div className="m-9">
        <h2 className="text-3xl font-medium">Sign up to Quiz Time</h2>
      </div>
      <div className=''>
        <button onClick={handleLogin} className="flex items-center justify-center gap-3 border w-90 cursor-pointer hover:border-gray-400 border-neutral-300 shadow-lg p-4  rounded-full"><img src={google} className='w-7 h-7' alt='google icon' /><span className='text-base font-medium '>Sign up with Google</span></button>
      </div>
      <div className='flex w-full items-center gap-3 px-10'>
        <div className='border-t flex-1 w-auto text-gray-300 ' /><span className='text-gray-500'>or</span><div className='border-t text-gray-300 flex-1 w-auto' />
      </div>
      <div className=''>
        <Link to="/signUp/email" className="flex items-center justify-center gap-3 border w-90 font-medium cursor-pointer hover:border-gray-400 border-neutral-300 shadow-lg p-4  rounded-full">Continue with email</Link>
      </div>
      <div className='pt-4 '>
        <span className='text-sm text-gray-600'>Already have an Account? <Link to="/signIn" className='underline text-gray-800'>Sign in</Link> </span>
      </div>
    </div>
  )
}

export default SignUpForm;