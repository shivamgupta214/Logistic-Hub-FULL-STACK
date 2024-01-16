import React, { useState } from 'react';
import './shipping.css';
import axios from 'axios';
import Maps from './Maps.js';

const ShipPackage = ({ onClose }) => {
  const [shippingFrom, setShippingFrom] = useState('');
  const [shippingLocation, setShippingLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');

  const generateUniqueNumber = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uniqueNumber = generateUniqueNumber();

      await axios.post('http://localhost:8000/api/shipPackage', {
        username: sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '',
        usertype: sessionStorage.getItem('usertype') ? sessionStorage.getItem('usertype') : '',
        from: shippingFrom,
        whereGoing: shippingLocation,
        whatItem: packageDetails,
        trackingNumber: uniqueNumber,
        shippingDate: new Date(),
      });

      alert(`Your shipment is created with tracking number: ${uniqueNumber}`);
      onClose(); 
      setShippingFrom('')
      setShippingLocation('')
      setPackageDetails('')
    } catch (error) {
      console.error('Error submitting shipment:', error);
    }
  };

  return (
    <div>
      <h2>Ship Package</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shippingFrom">From</label>
          <Maps
            onPlaceChanged={(address) => setShippingFrom(address)}
            placeholder="Enter shipping from address"
          />
        </div>
        <div>
          <label htmlFor="shippingLocation">Where</label>
          <Maps
            onPlaceChanged={(address) => setShippingLocation(address)}
            placeholder="Enter shipping address"
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
