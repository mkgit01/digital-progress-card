import React from 'react'

const UserProfile = () => {
  return (
    <div className='user-profile grid place-items-center p-4 my-5'>
        <a className='rounded' href="#"><img className='rounded' src="../../media/images/user-profile.png" alt="user profile" /></a>
        <a href="#"><h3 className='text-center hover:underline'>FirstName LastName</h3></a>
    </div>
  )
}

export default UserProfile