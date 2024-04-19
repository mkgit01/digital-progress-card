import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <Sidebar />
    <div className='header logo-holder grid place-items-center h-16 mb-1'>
        <Link to="/">
        <img className='logo-img' src="/media/images/logo.png" alt="logo" />
        </Link>
    </div>
    </>
  )
}

export default Header