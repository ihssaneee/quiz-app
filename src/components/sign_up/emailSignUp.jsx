import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { BeatLoader } from "react-spinners";


const SignUp = () => {
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: "password",
    password_confirmation: "password",
  });
  const { signUpEmail } = useAuth();
  const HandlePasswordVisibility = (field) => {
   
    setPasswordVisibility(prev=>({
      ...prev,
      [field]:prev[field]==="password"?"text":'password'
    }))
  }
  const inputStyle =
    "border p-3  rounded-full border-neutral-300 focus:border-cyan-600  flex  items-center gap-3.5 px-5 focus:border-2 focus:ring-0 focus:outline-none";
  const divStyle = "flex flex-col mx-9 py-3 gap-1.5";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");
  const [loading,setLoading]= useState(false);
  const [error,setError]= useState(null)
  const navigate=useNavigate()
  const onSubmit= async(data)=>{
      setLoading(true);
     const {confirmPassword,...formDataToSend}=data
        try{
          await signUpEmail(formDataToSend.email,formDataToSend.password,formDataToSend.username);
          console.log('user signed up successfully with email ')

          setError(null)
          navigate('/categories')

        }
        catch(error){
          console.error('user could not sign up with email',error)
          const errorMessage= error?.code ||'an expected error happened'
          setError(errorMessage)
        }
        finally{
          setLoading(false)
          
        }
  }
  return (
    <div className="flex flex-col gap-2 mx-auto  rounded-2xl   font-poppins max-w-lg border-neutral-200 border my-2 shadow-lg  py-4">
      <div className="border-b text-center items-center gap-34 flex justify-start px-5 border-b-neutral-200 w-full py-4">
        <Link to='/signUp' className="border rounded-full flex items-center h-11 w-11 justify-center hover:border-neutral-600 cursor-pointer border-neutral-400">
          <ArrowBackIosIcon fontSize="small" className="text-gray-700" />
        </Link>
        <h1 className="text-4xl text-cyan-600  font-medium">Sign Up</h1>
        
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className={divStyle}>
          <label htmlFor="UserName" className="text-gray-800">
            Username
          </label>
          <div className={inputStyle}>
            <PersonOutlinedIcon fontSize="medium" className="text-gray-500" />
            <input
              type="text"
              name="username"
              placeholder="e.g. john_doe"
              className="focus:ring-0 flex-1 focus:outline-none"
              {...register("username", {
                required: "UserName is required",
                minLength: {
                  value: 3,
                  message: "username must be at least 3 characters",
                },
              })}
            />
          </div>

          {errors.username && (
            <p className="text-red-500 text-base">{errors.username.message}</p>
          )}
        </div>
        <div className={divStyle}>
          <label htmlFor="email" className="text-gray-800">
            Email
          </label>
          <div className={inputStyle}>
            <EmailOutlinedIcon fontSize="medium" className="text-gray-500" />
            <input
              type="email"
              placeholder="e.g. john@example.com"
              name="email"
              className="focus:ring-0 focus:outline-none flex-1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-base">{errors.email.message}</p>
          )}
        </div>
        <div className={divStyle}>
          <label htmlFor="password" className="text-gray-800">
            Password
          </label>
          <div className={` ${inputStyle} + justify-between `}>
            <div className="flex items-center gap-3 w-full">
              <HttpsOutlinedIcon fontSize="medium" className="text-gray-500" />
              <input
                type={passwordVisibility.password}
                name="password"
                placeholder="e.g. At least 6 characters"
                className="focus:ring-0 focus:outline-none flex-1"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "username must be at least 6 characters",
                  },
                })}
              />
            </div>
            {passwordVisibility.password === "password" ? (
              <VisibilityOutlinedIcon fontSize="medium" className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={()=>HandlePasswordVisibility('password')} />
            ) : (
              <VisibilityOffOutlinedIcon fontSize="medium" className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={()=>HandlePasswordVisibility('password')} />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-base">{errors.password.message}</p>
          )}
        </div>
        <div className={divStyle}>
          <label htmlFor="confirmPassword" className="text-gray-800">
            Confirm Password
          </label>
          <div className={` ${inputStyle} + justify-between ` }>
            <div className="flex items-center gap-3 w-full ">
              <HttpsOutlinedIcon fontSize="medium" className="text-gray-500" />
            <input
              type={passwordVisibility.password_confirmation}
              placeholder="Re-enter your password"
              name="confirmPassword"
              
              className="focus:ring-0 focus:outline-none flex-1 "
              {...register("confirmPassword", {
                required: "Please Confirm Your Password",
                validate: (value) =>
                  value === password || "passwords do not match",
              })}
            />
           
            </div>
             {passwordVisibility.password_confirmation === "password" ? (
              <VisibilityOutlinedIcon fontSize="medium" className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={()=>HandlePasswordVisibility('password_confirmation')} />
            ) : (
              <VisibilityOffOutlinedIcon fontSize="medium" className="text-gray-600 cursor-pointer hover:text-gray-800" onClick={()=>HandlePasswordVisibility('password_confirmation')} />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-base">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="mx-9 m-5 flex items-center  justify-center">
          <button className="p-2.5  text-lg w-full bg-cyan-600 text-white rounded-full cursor-pointer hover:bg-cyan-500">
            Sign up
          </button>
         
        </div>
         {
            loading?<div className="flex items-center justify-center "><BeatLoader size={15} color="#00B8DB" /></div>:error&&<span className="text-red-500 text-lg flex flex-wrap m-8" >{error}</span>
          }
         
      </form>
    </div>
  );
};

export default SignUp;
