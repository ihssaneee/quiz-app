import React, { useState } from 'react'
import logo from "../assets/quiz.png"
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
export const Header = () => {
  const [isToggled,setIsToggled]= useState(false);
  const handleToggle=()=>{
    setIsToggled(!isToggled);
  }
  return (
    
   
     <nav className='flex items-center justify-between font-poppins py-3 pr-3 fixed top-0  bg-[#fffcfc] w-full'>
      <Link to="/" className='px-8 flex items-center gap-3'>
        <img src={logo} className='w-13 h-13 text-' />
        <span className='text-2xl font-bold text-gray-700'>Quiz Time</span>
      </Link>
      <div>
     
      </div>
        <div className=''>
           <div className='relative lg:hidden' onClick={handleToggle}>
              <MenuIcon fontSize='large' className='' />
          </div>
          <ul className={` ${isToggled?"flex flex-col absolute right-0 top-16 shadow-lg  bg-[#fffcfc] w-full":"hidden"} lg:flex-row lg:flex justify-end gap-4 p-4 font-medium  `}>
            <li className=''><Link className={` ${isToggled? "bg-[#fffcfc] text-black":'bg-blue-500 text-white '} p-3  cursor-pointer  rounded-2xl w-24 hover:bg-blue-600`}>Log In</Link></li>
          
            <li className=''><Link to="/signUp" className='p-3 rounded-2xl hover:underline w-24 cursor-pointer'>Sign up</Link></li>
        </ul>

        </div>
    </nav>
   
  )
}
