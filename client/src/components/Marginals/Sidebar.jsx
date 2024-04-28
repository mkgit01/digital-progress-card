import React, { useState } from 'react'
import UserProfile from './UserProfile'
import SidebarOptions from './SidebarOptions'

const Sidebar = () => {
  const [sidebarOn,setSidebarOn] = useState(false)
  const toggleSidebar= ()=>{
    setSidebarOn((lastState)=>!lastState)
  }
  return (
    <>
    <img title='menu' onClick={toggleSidebar} className='absolute top-0 left-0 p-2 cursor-pointer' width="64" height="64" src="https://img.icons8.com/laces/64/000000/menu.png" alt="menu"/>
    <section className={`sidebar ${sidebarOn?'open':''}`}>
        <img onClick={toggleSidebar} className='absolute top-0 right-0 cursor-pointer' width="48" height="48" src="https://img.icons8.com/sf-regular-filled/48/1A1A1A/x.png" alt="x"/>
        <UserProfile toggleSidebar={toggleSidebar}/>
        <SidebarOptions toggleSidebar={toggleSidebar}/>
    </section>
    </>
  )
}

export default Sidebar