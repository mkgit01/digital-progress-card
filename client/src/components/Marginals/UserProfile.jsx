import React from 'react';
import { NavLink } from 'react-router-dom';



const UserProfile = (props) => {
  return (
    <div className='user-profile p-4 my-5'>
      <NavLink to="/profile" 
      className={({isActive})=>`${isActive ? "navActive" : ""}`}
      onClick={props.toggleSidebar}> 
      <div>
        <img className='m-auto rounded' src="../../media/images/user-profile.png" alt="user profile" />
        <h3 className='text-center hover:underline'>FirstName LastName</h3>
      </div>
      </NavLink>
    </div>
  );
}

export default UserProfile;
