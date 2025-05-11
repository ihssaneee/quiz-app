import React from 'react'

export const Header = () => {
  return (
    
    <nav className=''>
        <ul className=' flex justify-end gap-4 p-4 font-medium'>
            <li className=''><button className='p-3 bg-blue-500  cursor-pointer text-white rounded-2xl w-24 hover:bg-blue-600'>Log In</button></li>
          
            <li className=''><button className='p-3 rounded-2xl hover:underline w-24 cursor-pointer'>Sign up</button></li>
        </ul>
    </nav>
  )
}
