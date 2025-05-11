import React from "react";
import { Header } from "../components/Header";
export default function Home(){


    return(
        <div className="h-dvh flex flex-col bg-gray-50 font-poppins">
            <div className="">
                <Header />
             </div>   
                <div className="flex-1  flex flex-col items-center justify-center gap-6 mb-18">
                    <h1 className="font-bold lg:text-5xl text-4xl text-center mx-4 lg:mx-0 text-slate-800">Welcome To the Quiz!</h1>
                    <p className="text-gray-600">Test your knowledge in different categories.</p>
                    <button className="p-4 px-6 cursor-pointer hover:bg-blue-600 bg-blue-500 text-lg text-white rounded-2xl">Start Quiz</button>
                </div>
           
        </div>
    )
}