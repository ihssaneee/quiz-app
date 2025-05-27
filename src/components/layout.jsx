import React from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
const Layout = ({children}) => {
  return (
    <div>
        <Header />
        <main className='pt-20'>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout