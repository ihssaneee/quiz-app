import React, { useState } from "react";

import google from "../../assets/google.png";

import { useForm } from "react-hook-form";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { BeatLoader } from "react-spinners";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { logInWithGoogle } = useAuth();
  const [password_visibility, setPasswordVisibility] = useState("password");
  const HandlePasswordVisibility = () => {
    setPasswordVisibility(
      password_visibility === "password" ? "text" : "password"
    );
  };
  const handleLogin = async () => {
    try {
      await logInWithGoogle();
      navigate("/categories");
    } catch (error) {
      const errorMessage = error?.message || "an unexpected error happened";
      console.error(errorMessage);
    }
  };
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const onSubmit=async(data)=>{
    setLoading(true)
  }
  const inputStyle =
    "border p-4  rounded-2xl border-neutral-300 focus:border-cyan-600  flex  items-center gap-3.5 px-5 focus:border-2 focus:ring-0 focus:outline-none";
  return (
    <div className="flex flex-col font-poppins items-center justify-center p-8 pb-16 gap-9 mx-auto max-w-lg lg:border border-neutral-300 m-9 lg:shadow-md rounded-3xl">
      <div className="m-9 my-6">
        <h2 className="text-3xl font-medium">Sign In to Quiz Time</h2>
      </div>
      <div className="">
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 border w-90 cursor-pointer hover:border-gray-400 border-neutral-300 shadow-lg p-4  rounded-full"
        >
          <img src={google} className="max-w-7 h-7" alt="google icon" />
          <span className="text-base font-medium ">Sign In with Google</span>
        </button>
      </div>
      <div className="flex w-full items-center gap-3 px-10">
        <div className="border-t flex-1 w-auto text-gray-300 " />
        <span className="text-gray-500">or sign in with email</span>
        <div className="border-t text-gray-300 flex-1 w-auto" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
        <div className="flex flex-col px-10 gap-1">
          <label htmlFor="email" className="text-gray-800 ">
            Email
          </label>
          <div className={inputStyle}>
            <EmailOutlinedIcon fontSize="medium" className="text-gray-500" />
            <input
              type="email"
              placeholder="enter your email"
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
        <div className='px-10  flex flex-col gap-1 '>
          <label htmlFor="password" className="text-gray-800">
            Password
          </label>
          <div className={` ${inputStyle} + justify-between `}>
            <div className="flex items-center gap-3 w-full">
              <HttpsOutlinedIcon fontSize="medium" className="text-gray-500" />
              <input
                type={password_visibility}
                name="password"
                placeholder="enter your password"
                className="focus:ring-0 focus:outline-none flex-1 w-full"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "username must be at least 6 characters",
                  },
                })}
              />
             
            </div>
             {password_visibility=='password'?<VisibilityOutlinedIcon fontSize="medium" className="cursor-pointer" onClick={HandlePasswordVisibility} />:<VisibilityOffOutlinedIcon fontSize="medium" className="cursor-pointer" onClick={HandlePasswordVisibility} />}
          </div>
           {errors.password && (
            <p className="text-red-500 text-base">{errors.password.message}</p>
          )}
        </div>
        <div className="mx-9 m-5 flex items-center  justify-center">
          <button className="p-2.5  text-lg w-full bg-cyan-600 text-white rounded-full cursor-pointer hover:bg-cyan-500">
            Sign in
          </button>
         
        </div>
      </form>
      <div className=" ">
        <span className="text-sm text-gray-600">
          Don't have an Account?{" "}
          <Link to="/signUp" className="underline text-gray-800">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignInForm;
