import React from 'react'
import logo from "../assets/quiz.png"
export const Header = () => {
  return (
    
   <div className='fixed top-0 bg-[#fffcfc] w-full '>
     <nav className='flex  justify-between font-poppins '>
      <div className='px-8 flex items-center gap-3'>
        <img src={logo} className='w-13 h-13 text-' />
        <span className='text-2xl font-bold text-gray-700'>Quiz Time</span>
      </div>
        <div className=''>
          <ul className=' flex justify-end gap-4 p-4 font-medium'>
            <li className=''><button className='p-3 bg-blue-500  cursor-pointer text-white rounded-2xl w-24 hover:bg-blue-600'>Log In</button></li>
          
            <li className=''><button className='p-3 rounded-2xl hover:underline w-24 cursor-pointer'>Sign up</button></li>
        </ul>
        </div>
    </nav>
   </div>
  )
}
