import React from 'react';
import { NavLink } from 'react-router-dom';



const UserProfile = (props) => {
  return (
    <div className='user-profile p-4 my-5'>
      <div className='grid w-max place-items-center'>
      <NavLink className={"profile-pic-wrap rounded"} to="/profile" 
      onClick={props.toggleSidebar}> 
      <img className='profile-pic rounded' src="../../media/images/user-profile.png" alt="user profile" />
      </NavLink>

      <NavLink to="/profile" 
      onClick={props.toggleSidebar}> 
      <h3 className='text-center hover:underline'>FirstName LastName</h3>
      </NavLink>
      </div>
    </div>
  );
}

export default UserProfile;
