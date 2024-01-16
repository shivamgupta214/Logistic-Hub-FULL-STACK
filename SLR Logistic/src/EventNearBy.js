import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Orders.css'; // Import your CSS file for styling


const YelpAPI = () => {
  const [orders, setOrders] = useState([]);
  const [center, setCenter] = useState({ lat: 41.84525, lng: -87.62725 });

  useEffect(() => {
    // fetchAllUsers();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: '7GJEyB6HoVCdTm1bnXHB8iWC-Tdi1NCNNoaGfEXV9mDUx-tDP4Ui6QlEIRMSu3VMH62nBo7Zyi04bMgOE1DL70nOkGmx3TrCel_aL6k3Httr-JJjgucWhe5Ja7ZjZXYx'
      }
    };
    
    console.log(options)
    fetch(`https://api.yelp.com/v3/businesses/search?location=chicago&sort_by=best_match&limit=20`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }, []);


  

  // const fetchAllUsers = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8001/api/getAllUsers');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setOrders(data);
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // };

  return (
    <div className="orders-container">
      <h1>User Profiles</h1>
      {orders.length > 0 ? (
        <table className="orders-table">
          <tbody>
            {orders.map((order) => (
              <tr key={order.username}>
                <td>
                  <Link to={`/UserProfile/${order.username}`}>
                    {order.username} : {order.usertype}
                    {sessionStorage.setItem("userNamefromAllUsers", order.username)}
                    {sessionStorage.setItem("allusers", true)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No customers.</h2>
      )}
    </div>
  );
};

export default YelpAPI;
