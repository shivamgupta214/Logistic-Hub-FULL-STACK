import React, { useState } from 'react';
import './Register.css';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [usertype, setUsertype] = useState('customer');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  // const [radioBtn, setRadioBtn] = useState('');
  // const [userType, serUserType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (password !== repassword) {
      setError('Passwords do not match!');
      return;
    }
      console.log(username, password, repassword, usertype, address, zipCode, city, state, country)
    try {
      // Make API call to register user
      const response = await fetch('http://localhost:8000/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, repassword, usertype, address, zipCode, city, state, country}),
        
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Registration successful, redirect to the login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error registering user:', error.message);
      setError('Error registering user. Please try again.');
    }
  };

  // const handleClick = (e) => {
  //   // Close the modal without submitting the order
  //   setRadioBtn(e.target.value);
  //   console.log(radioBtn);
  //   if (radioBtn === 'business'){
  //     serUserType('business')
  //   } else {
  //     console.log(userType)
  //     serUserType('customer')
  //   }
  //  return userType 
  // };

  return (
    <div className="registration-container">
      <h2 className="meta">Registration</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="form">
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
        <label>
          User Type:
          <select value={usertype} onChange={(e) => setUsertype(e.target.value)} >
            <option value="customer">Customer</option>
            <option value="business">Business</option>
            {/* <option value="retailer">Salesman</option> */}
          </select>
        </label>
        <br />
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
          Re-Password:
          <input type="password" value={repassword} onChange={(e) => setRepassword(e.target.value)} required />
        </label>
        <br />
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
        </label>
        <br />
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </label>
        <br />
        <label>
          State:
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
        </label>
        <br />
        <label>
          Country:
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </label>
        <br />
        <button type="submit" className="btnbuy">
          Create User
        </button>
      </form>
    </div>
  );
}

export default Registration;
