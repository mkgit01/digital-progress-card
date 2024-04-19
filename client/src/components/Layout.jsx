import React from 'react'
import Header from './Marginals/Header'
import Footer from './Marginals/Footer'
import {Outlet} from 'react-router-dom'
import '../styles/index.css'

function Layout() {
  return (
    <>
    <div className='full-page'>
      <Header />
      <Outlet />
        </div>
      <Footer />
    </>
  )
}

export default Layout