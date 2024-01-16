import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Orders.css'; // Import your CSS file for styling

const AllUsers = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/getAllUsers');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

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

export default AllUsers;
