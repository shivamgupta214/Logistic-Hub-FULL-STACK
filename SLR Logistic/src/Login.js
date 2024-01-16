import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import "./Login.css"

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [radioBtn, setRadioBtn] = useState('');
  const [userType, serUserType] = useState('');
  let isLoggedin = false;

  // const handleClick = (e) => {
  //   // Close the modal without submitting the order
  //   setRadioBtn(e.target.value)

  //   if (radioBtn === 'business'){
  //     console.log(userType)
  //     serUserType('business')
  //   } else {
  //     console.log(userType)
  //     serUserType('customer')
  //   }
  //  return userType 
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // let usertype = 'customer';
        // Make API call to register user
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, userType }),
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const responseData = await response.json();
        console.log(responseData.data.user);
        // Registration successful, redirect to the login page
        sessionStorage.setItem("usertype", responseData.data.user.usertype)
        sessionStorage.setItem("username", responseData.data.user.username)
        // setLoggedIn(true)
        isLoggedin = true;
        // localStorage.setItem('isloggedin', isLoggedin);
        // sessionStorage.setItem("isloggedin", isLoggedin)
        // console.log(sessionStorage.getItem("isloggedin"))
        window.location.href = '/';
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

      {/* <div class="radio-container">
             <div>
                <input 
                type="radio"  
                name="radioGroup"
                value="customer"
                onClick={handleClick}
                />
                <label for="radio1">Cutomer</label>
            </div>
            <div>
            <input type="radio" value='business' onClick={handleClick} name="radioGroup"/>
            <label for="radio2">Business</label>
        </div>
        </div> */}
      
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
          <select value={userType} onChange={(e) => serUserType(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="business">Business</option>
            {/* <option value="salesman">Salesman</option> */}
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
