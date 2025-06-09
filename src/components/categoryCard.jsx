import React from "react";
import science from "/src/assets/categories/science.jpg";
import sports from "../assets/categories/sports.jpg";
import history from "../assets/categories/history.jpg";
import geography from "../assets/categories/geography.jpg";
import { Link } from "react-router-dom";
const CategoryCard = ({ name, description,id }) => {
  const imageSrc =
    name === "Science"
      ? science
      : name === "Sports"
      ? sports
      : name === "History"
      ? history
      : name === "Geography"
      ? geography
      : null;
  return (
    <div className=" w-md h-auto shadow bg-blue-500 rounded-2xl font-poppins pb-3">
      <img
        src={imageSrc}
        className="lg:h-54 lg:w-78 w-full h-auto object-cover p-1 rounded-2xl mx-auto "
        loading="lazy"
      />
      <div className="p-4 flex flex-col gap-3 ">
        <h3 className="text-2xl text-gray-100 font-bold">{name}</h3>
        <p className="text-[17px] text-gray-200 min-h-13 ">{description}</p>
        <div className="flex items-center justify-center mt-6">
        <Link to={`/quiz/${id}`} state={{name}} className=" text-center font-medium text-white bg-cyan-500 w-34 p-4 rounded-2xl mx-auto  hover:bg-cyan-400">
          Start Quiz
        </Link>
      </div>
      </div>
      
      
    </div>
  );
};

export default CategoryCard;
