import React, { useState, useEffect} from 'react';
import './userprofile.css';
import {useParams} from 'react-router-dom';

const UserProfile = () => {
  let {user} = useParams();
  console.log(user)
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
//   const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  let username = sessionStorage.getItem("username");  //this is from home
  let boolFromAllUsers = sessionStorage.getItem("allusers")
  let un = sessionStorage.getItem("userNamefromAllUsers"); //this is data from allusers files


  const getData= async () =>{
    try {
      let usernameHere = ''
        // Make API call to register user
        if (boolFromAllUsers){
         
            usernameHere = un
            console.log("From All USers", usernameHere)
        } else{
          usernameHere = username
        }
        const response = await fetch('http://localhost:8001/api/findUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user }),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const responseData = await response.json();
        console.log(responseData.data.user);
        setUsername(responseData.data.user.username)
        setPassword(responseData.data.user.password)
        setUsertype(responseData.data.user.usertype)
        setAddress(responseData.data.user.address)
        setZipCode(responseData.data.user.zipCode)
        setCity(responseData.data.user.city)
        setState(responseData.data.user.state)
        setCountry(responseData.data.user.country)
        // window.location.href = '/UserProfile';
      } catch (error) {
        console.error('Error logging user:', error.message);
        // setError('Error loggin user. Please try again.');
      }
  }
  


  const handleEditClick = () => {
    setIsEditing(true);

  };



  useEffect(() => {
    // Side effect logic goes here
    console.log('Component has rendered');
    getData()

    // Cleanup function (optional)
    return () => {
      console.log('Component will unmount or update');
      // Perform cleanup tasks (e.g., unsubscribe from subscriptions)
    };
  }, []); 

  const handleSaveClick = async() => {
    // Perform save logic (update user details, send to server, etc.)
    // For simplicity, we'll just switch back to non-editable mode


    try {
        // Make API call to register user
        let repassword = password
        
        const response = await fetch('http://localhost:8001/api/updateUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, password, repassword, usertype, address, zipCode, city, state, country}),
          
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
  
        // Registration successful, redirect to the login page
        // window.location.href = '/login';
      } catch (error) {
        console.error('Error registering user:', error.message);
      }

    setIsEditing(false);
  };


  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={userName}
          readOnly={true}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Usertype:</label>
        <input
          type="text"
          value={usertype}
          readOnly={!isEditing}
          onChange={(e) => setUsertype(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          value={password}
          readOnly={!isEditing}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          readOnly={!isEditing}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          readOnly={!isEditing}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          value={state}
          readOnly={!isEditing}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          value={zipCode}
          readOnly={!isEditing}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          readOnly={!isEditing}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default UserProfile;
