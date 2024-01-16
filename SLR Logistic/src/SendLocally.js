import React, { useState, useEffect} from 'react';
import './sendlocally.css';
import axios from 'axios';
import Maps from './Maps';

const SendLocally = ({ onClose }) => {
  const [shippingLocation, setShippingLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [showLoginModal, setloginModal] = useState(false);

  // let isloggedin = sessionStorage.getItem("isloggedin");

  let username = sessionStorage.getItem("isloggedin")

  const generateUniqueNumber = () => {
    return Math.floor(10000 + Math.random() * 900000); // Generates a random 10-digit number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Handle submit called!');
    // Handle the form submission logic here
    console.log('Shipping Location:', shippingLocation);
    console.log('Package Details:', packageDetails);

    // Generate a unique 10-digit number
    // const uniqueNumber = generateUniqueNumber();
    // console.log('Generated Unique Number:', uniqueNumber);

    // Show the modal with the shipping cost
    // if (isloggedin){
      setShowModal(true);
    // } else {
    //   setloginModal(true);
    // }
    
  };

  // const handleConfirmLogin = async () => {
  //   // Here you can add logic to calculate the shipping cost
  //   // and proceed with the shipment
  //   setloginModal(false);
  //   window.location.href = '/login';
  // };


  const handleConfirm = async () => {
    // Here you can add logic to calculate the shipping cost
    // and proceed with the shipment
    try {
      // Example: Calculate shipping cost based on distance, weight, etc.
      const shippingCost = '$'+10; // Replace with your actual calculation

      // Show the shipping cost in the alert
    //   alert(`Shipping Cost: $${shippingCost}`);

      // Close the modal and submit the order
      setShowModal(false);
      const uniqueNumber = generateUniqueNumber();
      console.log('Generated Unique Number:', uniqueNumber);
      // Send data to the server
      await axios.post('http://localhost:8000/api/localPackage', {
        username: username,
        packageFrom: shippingLocation,
        packageTo: packageDetails,
        orderNumber: uniqueNumber,
        date: new Date(),
        shippingCost: shippingCost,
        deliveryStatus: false
      });
      setShippingLocation('')
      setPackageDetails('')
      // Display success message
      alert('Your order has been submitted successfully!');
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error (display a message, etc.)
    }
  };

  const handleCancel = () => {
    // Close the modal without submitting the order
    setShowModal(false);
  };

  // useEffect(() => {
  //   // let ut = sessionStorage.getItem('isloggedin');
  //   // console.log(ut)
  //   // if (ut){
  //   //   window.location.href = '/login';
  //   }

  // }, []);

  return (
    <div>
      <h2>Send Locally</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shippingLocation">From</label>
          {/* <input
            type="text"
            id="shippingLocation"
            value={shippingLocation}
            onChange={(e) => setShippingLocation(e.target.value)}
            placeholder="Enter shipping address"
            required
          /> */}
          <Maps
            onPlaceChanged={(address) => setShippingLocation(address)}
            placeholder="Enter shipping from address"
          />


        </div>
        <div>
          <label htmlFor="packageDetails">To</label>
          {/* <input
            id="packageDetails"
            value={packageDetails}
            onChange={(e) => setPackageDetails(e.target.value)}
            placeholder="Enter package details"
            required
          /> */}
          <Maps
            onPlaceChanged={(address) => setPackageDetails(address)}
            placeholder="Enter shipping from address"
          />
        </div>
        <div>
          <button type="submit">Book</button>
        </div>
      </form>

      {/* Modal */}
      {/* {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login to Continue</h2>
            <button onClick={handleConfirmLogin}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )} */}


      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Shipping Cost</h2>
            <p>Estimated Shipping Cost: $10</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendLocally;


