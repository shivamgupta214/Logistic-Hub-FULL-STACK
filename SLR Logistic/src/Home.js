import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = (props) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingInfo, setShippingInfo] = useState(null);
  const servicesSectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const settings = {
    dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/getShipment', {
        trackingNumber: trackingNumber,
      });
      setShippingInfo(response.data);
      setShowModal(true)
      // setShippingInfo(true)
      console.log(response.data);
    } catch (error) {
      console.error('Error retrieving shipment details:', error);
    }
  };

  const handleCancel = () => {
    // Close the modal without submitting the order
    setShowModal(false);
  };

  useEffect(() => {
    if (props.scrolling) {
      servicesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.scrolling]);

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

      {/* Testimonial Section */}
      <Slider {...settings} className="testimonial-carousel">
  
          <div  className="testimonial-card">
            <h3>Ben</h3>
            <p>
              "Exceptional logistic and shipping hub website! Seamless navigation, user-friendly interface, and robust tracking system make it a top choice. 
              Efficient management of shipments, real-time updates, and a variety of services. The website's reliability and comprehensive features contribute to a streamlined shipping experience. 
              Highly recommended for businesses and individuals alike."
              </p>
          </div>
          
          <div  className="testimonial-card">
            <h3>Jhon</h3>
            <p>"Efficient logistics with real-time tracking and secure handling at our shipping hub ensure your packages reach their destination seamlessly. 
              Our advanced technology and dedicated team prioritize reliability, making us your trusted partner for swift and secure deliveries."
              </p>
          </div>
    
    
          <div  className="testimonial-card">
            <h3>Samuel</h3>
            <p>"Experience the pinnacle of logistics excellence at our shipping hub. From streamlined processing to timely dispatch, our application ensures your shipments are handled with precision and care. 
              Trust us for a seamless shipping experience, where reliability meets cutting-edge technology."</p>
          </div>
    
    
      </Slider>

      {/* Services Section */}
      <div ref={servicesSectionRef} className="services-section">

        <div className='service-3'>
        <h2>Our Services</h2>
        </div>
        <div className='service-c'>
        <Link to="/Shipping">
          <div className="service-card">
            <h3>How We Ship</h3>
            <p>Learn about our shipping process and methods.</p>
          </div>
        </Link>
        <Link to="/SendLocally">
          <div className="service-card">
            <h3>Send Package Locally</h3>
            <p>Explore our local package delivery services.</p>
          </div>
        </Link>
        <Link to="/StoreInventory">
          <div className="service-card">
            <h3>Store Your Inventory</h3>
            <p>Discover our inventory storage solutions.</p>
          </div>
        </Link>
        </div>
      </div>

      {/* Display Shipment Details */}
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

// {showModal && (
//   <div className="modal">
//     <div className="modal-content">
//       <h2>Shipping Cost</h2>
//       <p>Estimated Shipping Cost: $10</p>
//       <button onClick={handleConfirm}>Confirm</button>
//       <button onClick={handleCancel}>Cancel</button>
//     </div>
//   </div>
// )}
