import React from 'react'
import { Header } from './Header'
const Layout = ({children}) => {
  return (
    <div>
        <Header />
        <main className='pt-20'>
            {children}
        </main>
    </div>
  )
}

export default Layout