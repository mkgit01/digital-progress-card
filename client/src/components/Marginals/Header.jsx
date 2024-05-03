import React from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'
import Sidebar2 from './Sidebar2'

const Header = () => {
  return (
    <>
    {/* <Sidebar /> */}
    <Sidebar2 />
    <div className='header logo-holder grid place-items-center h-16 mb-1'>
        <Link to="/">
        <img className='logo-img object-cover' src="/media/images/dpc-logo.png" alt="logo" />
        </Link>
    </div>
    </>
  )
}

export default Header