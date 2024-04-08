import React from 'react'
import Sidebar from './Sidebar'

const Header = () => {
  return (
    <>
    <Sidebar />
    <div className='header logo-holder grid place-items-center h-16 mb-1'>
        <a href="#">
        <img className='logo-img' src="/media/images/logo.png" alt="logo" />
        </a>
    </div>
    </>
  )
}

export default Header