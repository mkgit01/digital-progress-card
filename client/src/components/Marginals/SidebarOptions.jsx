import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarOptions = (props) => {
  return (
    <div className='side-bar-opt grid place-items-center'>
    <NavLink to="/" 
    className={({isActive})=>`${isActive ? "navActive" : ""}`}
    onClick={props.toggleSidebar}
    >
      <div className='p-3 text-center text-lg'>
        Home
        </div>
      </NavLink>

    <NavLink to="/task"
    className={({isActive})=>`${isActive ? "navActive" : ""}`}
    onClick={props.toggleSidebar}>
      <div className='p-3 text-center text-lg'>
        Tasks
      </div>
    </NavLink>

    <NavLink to="/rewards"
    className={({isActive})=>`${isActive ? "navActive" : ""}`}
    onClick={props.toggleSidebar}>
      <div className='p-3 text-center text-lg'>
        Rewards
      </div>
    </NavLink>

    <NavLink to="/settings"
    className={({isActive})=>`${isActive ? "navActive" : ""}`}
    onClick={props.toggleSidebar}>
      <div className='p-3 text-center text-lg'>
        Settings
      </div>
    </NavLink>
    
    <NavLink to="/logout"
    className={({isActive})=>`${isActive ? "navActive" : ""}`}
    onClick={props.toggleSidebar}>
      <div className='p-3 text-center text-lg'>
        Logout
      </div>
    </NavLink>
    
    </div>
  )
}

export default SidebarOptions