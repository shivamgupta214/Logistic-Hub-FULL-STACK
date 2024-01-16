import React, { useState, useEffect} from 'react';
import './userprofile.css';
import {useParams} from 'react-router-dom';

const AddUser = () => {
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


  useEffect(() => {
    // Side effect logic goes here
    console.log('Component has rendered');
    // getData()
    setIsEditing(true);
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
        
        const response = await fetch('http://localhost:8001/api/addUser', {
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

    setIsEditing(true);
    setUsername('')
    setPassword('')
    setUsertype('')
    setAddress('')
    setZipCode('')
    setCity('')
    setState('')
    setCountry('')
  };


  return (
    <div>
      <h2>Add User</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={userName}
          readOnly={!isEditing}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Usertype:</label>
        <select
          type="text"
          value={usertype}
          readOnly={!isEditing}
          onChange={(e) => setUsertype(e.target.value)}
          required >
          <option value="customer">Customer</option>
            <option value="business">Buiness</option>
            <option value="warehouseAgent">Warehouse Agent</option>
            </select>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          value={password}
          readOnly={!isEditing}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          value={address}
          readOnly={!isEditing}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          readOnly={!isEditing}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          value={state}
          readOnly={!isEditing}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Zip Code:</label>
        <input
          type="text"
          value={zipCode}
          readOnly={!isEditing}
          onChange={(e) => setZipCode(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          readOnly={!isEditing}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </div>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        // <button onClick={handleEditClick}>Edit</button>
        ''
      )}
    </div>
  );
};

export default AddUser;