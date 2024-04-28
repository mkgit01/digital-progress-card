import React, { useState } from "react";
import UserProfile from "../Marginals/UserProfile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFloppyDisk, faPenToSquare, faRepeat, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
  const [address, setAddress] = useState("Puri, Odisha, India");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("21");
  const [about, setAbout] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget mattis ligula. Aliquam nec ligula non risus gravida imperdiet non vitae magna. Curabitur et eleifend dui. Suspendisse pulvinar est in semper volutpat. Pellentesque pellentesque consectetur eros et tristique. Quisque sodales nunc id sapien sodales pretium. In ut turpis vitae turpis.");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const MAX_WORDS = 50;

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
 
  const handleAboutChange = (e) => {
    const text = e.target.value;
    // Split the text by whitespace and filter out any empty strings
    const words = text.split(/\s+/).filter(Boolean);
    // Check if the number of words exceeds the maximum limit
    if (words.length <= MAX_WORDS) {
      setAbout(text);
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleSavePassword = () => {
    // Here you can add logic to save the new password to the backend or perform any other action
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    setOldPassword(""); // Reset the old password field after saving
    setNewPassword(""); // Reset the new password field after saving
    setIsChangingPassword(false); // Close the password change input fields
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you can add logic to save changes to the backend or perform any other action
  };

  return (
    <div className="profilePage p-4 h-screen flex flex-col sm:flex-row justify-center gap-4 items-center">

      {/*---------------------------------- Profile Block 1 -----------------------------------------*/}
      <div className="  shadow-lg rounded-lg h-auto sm:h-96 w-full sm:w-1/2 leading-7" >
        <div className="flex justify-center items-center">
          <UserProfile />
        </div>
        <div className=" flex justify-between m-4">
          <div>
            <p className="">
              <strong>Email:</strong> username@example.com
            </p>
            <p className="">
              <strong>Phone:</strong> +91 8453265342
            </p>
            {isChangingPassword ? (
              <>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  className="mt-2 px-2 py-1 border rounded ml-4"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  className="mt-2 px-2 py-1 border rounded ml-4"
                />
                <button
                  onClick={handleSavePassword}
                  className="btn rounded-md ml-4 mt-2"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
              </>
            ) : (
              <p className="">
              <strong>Password: </strong>
              <button
                onClick={handleChangePassword}
                className="text-blue-600"
              >Chnage Password 
              </button>
            </p>
            )}
            
          </div>
          <div className="mt-16 sm:mt-0">
            <button className="btn rounded-md ">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
            
          </div>
        </div>
      </div>
      {/*---------------------------------- Profile Block 2 Super Class ---------------------------------------*/}
      <div className=" shadow-lg rounded-lg sm:h-96 w-full sm:w-1/2 leading-7 " >
        {isEditing ? (
          <>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              className="mt-4 px-2 py-1 border rounded ml-4"
            />
            <select
              value={gender}
              onChange={handleGenderChange}
              className="mt-2 px-2 py-1 border rounded ml-4"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
              className="mt-2 px-2 py-1 border rounded ml-4"
            />
            <textarea
              type="text"
              value={about}
              onChange={handleAboutChange}
              className="px-2 py-1 border rounded m-4 h-40 w-96 hidden"
            />
            <button
              onClick={handleSave}
              className="btn m-4 rounded-md "
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </>
        ) : (
          <>
          {/*---------------------------------- Profile Block 2 Sub Class ---------------------------------------*/}
            <div className="m-4 flex   justify-between" >
              <div>
                <p className="mt-4">
                  <strong>Address:</strong> {address}
                </p>
                <p className="">
                  <strong>Sex:</strong> {gender}
                
                </p>
                <p className="">
                  <strong>Age:</strong> {age}
                </p>
                <p className=" hidden sm:block">
                  <strong>About:</strong> {about}
                </p>
              </div>
              <div className="right-0 mt-4 md:mt-0 relative">
                <button
                  onClick={handleEdit}
                  className=" btn rounded-md "
                >
                  <FontAwesomeIcon icon={faPenToSquare} />{" "}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
