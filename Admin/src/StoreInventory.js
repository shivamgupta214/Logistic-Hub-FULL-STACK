
import React, { useState } from 'react';
import './storeinventory.css';
import axios from 'axios';

const StoreInventory = ({ onClose }) => {
  const [shippingLocation, setShippingLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [numberofItems, setNumberofItems] = useState('');
  const [radioBtn, setRadioBtn] = useState('');
  const [pricing, setPrice] = useState('');

  const generateUniqueNumber = () => {
    return Math.floor(10000 + Math.random() * 900000); // Generates a random 10-digit number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(numberofItems, radioBtn)
    console.log('Handle submit called!');
    // Handle the form submission logic here
    console.log('Shipping Location:', shippingLocation);
    console.log('Package Details:', packageDetails);

    if (radioBtn == 'box'){
       let price =  numberofItems * 20;
       setPrice(price)
    }else{
        setPrice(numberofItems * 40)
    }



    // Show the modal with the shipping cost
    setShowModal(true);
  };

  const handleConfirm = async () => {
    // Here you can add logic to calculate the shipping cost
    // and proceed with the shipment
    try {

      const shippingCost = '$'+10; // Replace with your actual calculation

      setShowModal(false);
      const uniqueNumber = generateUniqueNumber();
      console.log('Generated Unique Number:', uniqueNumber);
      // Send data to the server
      await axios.post('http://localhost:8001/api/localPackage', {
        packageFrom: shippingLocation,
        packageTo: packageDetails,
        orderNumber: uniqueNumber,
        date: new Date(),
        shippingCost: shippingCost,
      });

      // Display success message
      alert('Your order has been submitted successfully!');
      onClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error (display a message, etc.)
    }
  };

  const handleClick = (e) => {
    // Close the modal without submitting the order
    setRadioBtn(e.target.value)
   let pricing =  numberofItems * 20;
   return pricing 
  };
 const handleChange = (e) => {
    setNumberofItems(e.target.value)
 }

  const handleCancel = () => {
    // Close the modal without submitting the order
    setShowModal(false);
  };

  return (
    <div>
      <h2>Store your Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shippingLocation">From</label>
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
          <label htmlFor="packageDetails">Where</label>
          <input
            id="packageDetails"
            value={packageDetails}
            onChange={(e) => setPackageDetails(e.target.value)}
            placeholder="Enter package details"
            required
          />
        </div>
        <div>
          <label htmlFor="shippingLocation">From</label>
          <input
            type="text"
            id="shippingLocation"
            value={shippingLocation}
            onChange={(e) => setShippingLocation(e.target.value)}
            placeholder="Enter shipping address"
            required
          />
        </div>
        <div class="radio-container">
             <div>
                <input 
                type="radio" 
                id="standardShipping" 
                name="radioGroup"
                value="box"
                onClick={handleClick}
                />
                <label for="radio1">By Boxes</label>
            </div>
            <div>
            <label for="radio2">By Area</label>
            <input type="radio" id="radio2" value='area' onClick={handleClick} name="radioGroup"/>
            
        </div>
        <input type='text'onChange={handleChange}></input>
            {/* <!-- Add more radio button divs as needed --> */}
        </div>
        <div>
          <button type="submit">Ship Package</button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Shipping Cost</h2>
            <p>Estimated Shipping Cost: ${pricing}</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInventory;
