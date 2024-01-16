import React, { useState } from 'react';
import './shipping.css';
import axios from 'axios';

const ShipPackage = ({onClose}) => {
  const [shippingLocation, setShippingLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');

  const generateUniqueNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000); // Generates a random 10-digit number
  };

//   const [formData, setFormData] = useState({
//     // userId: '',
//     whereGoing: shippingLocation,
//     whatItem: packageDetails,
//     shippingDate: new Date(),
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Handle the form submission logic here
    console.log('Shipping Location:', shippingLocation);
    console.log('Package Details:', packageDetails);

    // Generate a unique 10-digit number
    const uniqueNumber = generateUniqueNumber();
    console.log('Generated Unique Number:', uniqueNumber);

    try {
        await axios.post('http://localhost:8001/api/shipPackage', {
            userId: '',
            whereGoing: shippingLocation,
            whatItem: packageDetails,
            trackingNumber:  uniqueNumber,
            shippingDate: new Date(),
            
        //   ...formData,
        });
        alert("Your shipment is created with tracking number:", uniqueNumber);
  
        onClose(); // Close the form after successful submission
      } catch (error) {
        console.error('Error submitting review:', error);
        // Handle error (display a message, etc.)
      }

    // shippingLocation = ''
    // packageDetails = ''

    // You can add further logic to send data to the server, update state, etc.
  };

  return (
    <div>
      <h2>Ship Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shippingLocation">Where are you shipping?</label>
          <input
            type="text"
            id="shippingLocation"
            value={shippingLocation}
            onChange={(e) => setShippingLocation(e.target.value)}
            placeholder="Enter shipping address"
            required
          />
        </div>
        <div>
          <label htmlFor="packageDetails">What are you shipping?</label>
          <textarea
            id="packageDetails"
            value={packageDetails}
            onChange={(e) => setPackageDetails(e.target.value)}
            placeholder="Enter package details"
            required
          />
        </div>
        <div>
          <button type="submit">Ship Package</button>
        </div>
      </form>
    </div>
  );
};

export default ShipPackage;
