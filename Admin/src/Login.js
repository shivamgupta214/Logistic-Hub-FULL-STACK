import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import "./Login.css"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make API call to register user
        const response = await fetch('http://localhost:8001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, usertype }),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const responseData = await response.json();
        console.log(responseData.data.user);
        // Registration successful, redirect to the login page
        let ut = responseData.data.user.username;
        console.log(ut)
        sessionStorage.setItem("usertype", responseData.data.user.usertype)
        sessionStorage.setItem("username", responseData.data.user.username)
        console.log("This is ut object ",ut)
        if (ut === 'deliveryagent'){
          window.location.href = '/OrdersToDeliver';
        }
        window.location.href = '/Home';
      } catch (error) {
        console.error('Error logging user:', error.message);
        setError('Error loggin user. Please try again.');
      }

    // Here you can add logic to authenticate user with a server or API
    // For simplicity, let's assume authentication is successful
    
  };

  return (
    <div class='login-container'>
      {/* {loggedIn && <Redirect to="/Home" />} */}

      <h2 className='meta'>Login</h2>
      
    <div className='entry'>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <label>
          User Type:
          <select value={usertype} onChange={(e) => setUsertype(e.target.value)}>
            <option value="deliveryagent">Delivery Agent</option>
            <option value="manager">Manager</option>
            <option value="warehouseAgent">Warehouse Agent</option>
          </select>
        </label>
        <br />
        <button type="submit">Login</button>
        {error && <h4 style={{ color: 'red' }}>Please check your username, password, and user type!</h4>}
        <h5 style={{textAlign:'center'}}>
        <strong>New User? <a href="/Register">Register here!</a></strong>
      </h5>
      </form>
      </div>
      
    </div>
  );
}

export default Login;
