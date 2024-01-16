// import React, { useState } from 'react';
// import './shipping.css';
// import axios from 'axios';

// const SendLocally = ({onClose}) => {
//   const [shippingLocation, setShippingLocation] = useState('');
//   const [packageDetails, setPackageDetails] = useState('');

//   const generateUniqueNumber = () => {
//     return Math.floor(10000 + Math.random() * 900000); // Generates a random 10-digit number
//   };

// //   const [formData, setFormData] = useState({
// //     // userId: '',
// //     whereGoing: shippingLocation,
// //     whatItem: packageDetails,
// //     shippingDate: new Date(),
// //   });

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();


//     // Handle the form submission logic here
//     console.log('Shipping Location:', shippingLocation);
//     console.log('Package Details:', packageDetails);

//     // Generate a unique 10-digit number
//     const uniqueNumber = generateUniqueNumber();
//     console.log('Generated Unique Number:', uniqueNumber);

//     try {
//         await axios.post('http://localhost:8001/api/localPackage', {
//             packageFrom: shippingLocation,
//             packageTo: packageDetails,
//             orderNumber:  uniqueNumber,
//             Date: new Date(),
            
//         //   ...formData,
//         });
//         alert("Your Order has been created our delivery guy will contact you shortly:", uniqueNumber);
  
//         onClose(); // Close the form after successful submission
//       } catch (error) {
//         console.error('Error submitting review:', error);
//         // Handle error (display a message, etc.)
//       }

//     // shippingLocation = ''
//     // packageDetails = ''

//     // You can add further logic to send data to the server, update state, etc.
//   };

//   return (
//     <div>
//       <h2>Ship Package</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="shippingLocation">From</label>
//           <input
//             type="text"
//             id="shippingLocation"
//             value={shippingLocation}
//             onChange={(e) => setShippingLocation(e.target.value)}
//             placeholder="Enter shipping address"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="packageDetails">Where</label>
//           <input
//             id="packageDetails"
//             value={packageDetails}
//             onChange={(e) => setPackageDetails(e.target.value)}
//             placeholder="Enter package details"
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Ship Package</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SendLocally;


import React, { useState } from 'react';
import './sendlocally.css';
import axios from 'axios';

const SendLocally = ({ onClose }) => {
  const [shippingLocation, setShippingLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(true);
  };

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

  const handleCancel = () => {
    // Close the modal without submitting the order
    setShowModal(false);
  };

  return (
    <div>
      <h2>Ship Package</h2>
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
          <button type="submit">Ship Package</button>
        </div>
      </form>

      {/* Modal */}
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


