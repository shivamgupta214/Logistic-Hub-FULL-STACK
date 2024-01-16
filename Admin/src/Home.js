import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; 
import { Link } from 'react-router-dom';


const Home = (props) => {
  console.log(props)
  const [trackingNumber, setTrackingNumber] = useState('');
  const [user, setUsername] = useState('');
  const [shippingInfo, setShippingInfo] = useState(false);
  const servicesSectionRef = useRef(null);
  let userhere = sessionStorage.getItem("username")
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    // if (userhere === null){

      try {
          console.log(trackingNumber)
        const response = await axios.post('http://localhost:8001/api/getShipment', {
          trackingNumber: trackingNumber,
        });
  
        console.log(response.data);
        setShippingInfo(response.data);
        setShowModal(true)
        // setShippingInfo(response.data); // Assuming response.data is the shipment info
      } catch (error) {
        console.error('Error retrieving shipment details:', error);
      }
  };

  const handleCancel = () => {
    // Close the modal without submitting the order
    setShowModal(false);
  };

  useEffect(() => {
    // Scroll to the services section when shippingInfo is available
    // if (shippingInfo && servicesSectionRef.current) {
    if(props.scrolling){
      servicesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
      
    // }
  }, []);


  const handleUserInfo = () => {
    // Close the modal without submitting the order

    window.location.href = `/UserProfile/${user}`;
    // window.location.href = '/UserProfile/' + encodeURIComponent(user);
    // console.log('/UserProfile/', user)

  };

  return (
    <div id="content" className="content-container">
      <div className="post">
        <div className="entry">
          <table className="bestseller-table">
            <tbody>
              <tr>
                <td>
                  <div className="shop-item">
                    <h3>Track your Shipment</h3>
                    <form onSubmit={handleSearch}>
                      {/* <label htmlFor="trackingNumber">Enter Tracking Number:</label> */}
                      <input
                        type="text"
                        id="trackingNumber"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter 10 digit tracking number"
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit number"
                        required
                      />
                      <button type="submit">Search</button>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="post">
        <div className="entry">
          <table className="bestseller-table">
            <tbody>
              <tr>
                <td>
                  <div className="shop-item">
                    <h3>Find User by User ID</h3>
                    <form onSubmit={handleUserInfo}>
                      
                      <input
                        type="text"
                        id="userID"
                        value={user}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=""
                        required
                      />
                      <Link to={`/UserProfile/${user}`}>
                      <button type="submit">Search</button>
                      </Link>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Display Shipment Details */}
      {/* {shippingInfo && (
        <div className="shipment-details">
          <h3>Shipment Details:</h3>
          <p>Tracking Number: {shippingInfo.trackingNumber}</p>
          <p>Where Going: {shippingInfo.whereGoing}</p>
          <p>What Item: {shippingInfo.whatItem}</p>
          <p>Shipping Date: {shippingInfo.shippingDate}</p>
        </div>
      )} */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
          <h3>Shipment Details:</h3>
          <p>Tracking Number: {shippingInfo.trackingNumber}</p>
          <p>Where Going: {shippingInfo.whereGoing}</p>
          <p>What Item: {shippingInfo.whatItem}</p>
          <p>Shipping Date: {shippingInfo.shippingDate}</p>
            <button onClick={handleCancel}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

