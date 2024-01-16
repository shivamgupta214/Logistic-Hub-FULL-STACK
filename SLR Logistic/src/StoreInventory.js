
import React, { useState, useEffect} from 'react';
import './storeinventory.css';
import axios from 'axios';

const StoreInventory = ({ onClose }) => {
  const [shippingLocation, setShippingLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [numberofItems, setNumberofItems] = useState('');
  const [radioBtn, setRadioBtn] = useState('');
  const [pricing, setPrice] = useState('');
  const [isloggedIn, setLogin] = useState('');

  const generateUniqueNumber = () => {
    return Math.floor(100 + Math.random() * 90000); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(numberofItems, radioBtn)
    console.log('Handle submit called!');
    // Handle the form submission logic here
    console.log('Shipping Location:', shippingLocation);
    console.log('Package Details:', packageDetails);

    if (radioBtn === 'box'){
       let price =  numberofItems * 20;
       setPrice(price)
    }else{
        setPrice(numberofItems * 40)
    }

    setShowModal(true);
  };

  const handleConfirm = async () => {
 
    try {

      // let ut = sessionStorage.getItem("usertype",)
      let un = sessionStorage.getItem("username",)
      setShowModal(false);
      const uniqueNumber = generateUniqueNumber();
      console.log('Generated Unique Number:', uniqueNumber);
      // Send data to the server
      await axios.post('http://localhost:8000/api/storeInventory', {
        username: un,
        whatItem: shippingLocation,
        location: packageDetails,
        orderNumber: uniqueNumber,
        date: new Date(),
        totalCost: pricing,
        numberofItems: numberofItems,
        typeofStorage: radioBtn 
      });

  
      alert('Your order has been submitted successfully!');
      onClose(); 
    } catch (error) {
      console.error('Error submitting order:', error);

    }
  };

      


  const handleClick = (e) => {
  
    setRadioBtn(e.target.value)
    
    let pricing = ''
    if (radioBtn === 'box'){
        pricing =  numberofItems * 20;
    } else {
        pricing = numberofItems * 40;
    }
   return pricing 
  };
 const handleChange = (e) => {
    setNumberofItems(e.target.value)
 }

  const handleCancel = () => {

    setShowModal(false);
  };

  return (
    <div>
      <h2>Store your Inventory</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shippingLocation">What you need to store?</label>
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
          <label htmlFor="packageDetails">Select a the location</label>
          <select
            id="packageDetails"
            value={packageDetails}
            onChange={(e) => setPackageDetails(e.target.value)}
            placeholder="Enter package details"
            required
          >

            <option value="West Monroe">West Monroe</option>
            <option value="West Lawrence">West Lawrencce</option>
            <option value="18th street">18th street</option>
            <option value="35th street">35 street</option>
            <option value="87th street">87th street</option>
          </select>
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

        </div>
        <div>
          <button type="submit">Book</button>
        </div>
      </form>


      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cost</h2>
            <p>Total Cost: ${pricing}</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreInventory;
