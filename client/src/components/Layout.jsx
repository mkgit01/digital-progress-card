import React, {useState} from 'react'
import Header from './Marginals/Header'
import Footer from './Marginals/Footer'
import {Outlet} from 'react-router-dom'
import '../styles/index.css'
import Login from './Auth/Login'

function Layout() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
    {loggedIn?
    <>
    <div className='full-page'>
      <Header />
      <Outlet />
        </div>
      <Footer />
      </>
      :
      <Login />
      }
    </>
  )
}

export default Layout