import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/quiz.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext.jsx";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import default_user from "../assets/default_user.png"

export const Header = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isDropdwonToggled, setIsDropdownToggled] = useState(false);
  const dropDownRef = useRef(null);
  const { user ,signOutUser} = useAuth();
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const handleDropDownToggle = () => {
    setIsDropdownToggled(!isDropdwonToggled);
  };
  const userImage = user?.photoURL?photoURL:default_user;
  useEffect(() => {
    const handleBodyClick = (e) => {
      if (
        isDropdwonToggled &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      ) {
        setIsDropdownToggled(false);
      }
    };
    document.body.addEventListener("click", handleBodyClick);

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, [isDropdwonToggled]);
  
  
  return (
    <nav className="flex items-center justify-between font-poppins py-3 pr-3 fixed top-0  bg-[#fffffc] w-full">
      <Link to="/" className="px-8 flex items-center gap-3">
        <img src={logo} className="w-13 h-13 " />
        <span className="text-2xl font-bold text-gray-700">Quiz Time</span>
      </Link>
     
      {user ? 
       (<div
          className="flex gap-2 items-center relative cursor-pointer "
          ref={dropDownRef}
          onClick={handleDropDownToggle}
        >
          <div className="flex gap-2 items-center">
            <img
              src={userImage}
              alt="profile picture"
              className="w-10 h-10 rounded-full"
            />
            <p className="text-lg font-semibold text-gray-800  lg:block hidden ">
              {user?.displayName}
            </p>
            <KeyboardArrowDownIcon fontSize="large" className="text-gray-600" />
          </div>

          <div
            className={`absolute top-13 flex flex-col gap-3  right-0 py-6 rounded-2xl  border-neutral-100 border   shadow-lg lg:w-full bg-[#fffffc] ${
              isDropdwonToggled ? "block" : "hidden"
            } `}
          >
            <Link
              to=""
              className="text-lg flex gap-2 items-center px-6 py-2 text-gray-700 hover:bg-gray-50"
            >
              <SettingsOutlinedIcon
                fontSize="medium"
                className="text-gray-800"
              />
              Settings
            </Link>
            <button onClick={signOutUser} className="text-lg flex gap-2 items-center px-6 cursor-pointer hover:bg-gray-50 py-2 text-gray-700">
              <LogoutOutlinedIcon fontSize="medium" className="text-gray-800" />
              Log out
            </button>
          </div>
        </div>
      )  :<div className="">
          <div className="relative lg:hidden" onClick={handleToggle}>
            <MenuIcon fontSize="large" className="" />
          </div>
          <ul
            className={` ${
              isToggled
                ? "flex flex-col absolute right-0 top-16 shadow-lg  bg-[#fffcfc] w-full"
                : "hidden"
            } lg:flex-row lg:flex justify-end gap-4 p-4 font-medium  `}
          >
            <li className="">
              <Link
                to="/signIn"
                className={` ${
                  isToggled
                    ? "bg-[#fffcfc] text-black"
                    : "bg-blue-500 text-white "
                } p-3  cursor-pointer  rounded-2xl w-24 hover:bg-blue-600`}
              >
                Log In
              </Link>
            </li>

            <li className="">
              <Link
                to="/signUp"
                className="p-3 rounded-2xl hover:underline w-24 cursor-pointer"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      }
    </nav>
  );
};
