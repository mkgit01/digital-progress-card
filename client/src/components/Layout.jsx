import React, {useState} from 'react'
import Header from './Marginals/Header'
import Footer from './Marginals/Footer'
import {Outlet} from 'react-router-dom'
import '../styles/index.css'
import Login from './Auth/Login'

function Layout() {
  const [loggedIn, setLoggedIn] = useState(true)
  const setLogin= () =>{
    setLoggedIn((login)=>!login)
  }
  return (
    <>
    {loggedIn?
    <>
    <div className="full-page">
      <Header />
      <Outlet className="outlet"/>
        </div>
      <Footer />
      </>
      :
      <Login setLogin={setLogin}/>
      }
    </>
  )
}

export default Layout