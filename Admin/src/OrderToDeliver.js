import React, { useState, useEffect } from 'react';
import './ordertodeliver.css';
import axios from 'axios';

const OrderToDeliver = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const handleOrderClick = async(order) => {
    // setSelectedOrder(order);
    setDeliveryStatus(true);

      try {
          console.log(deliveryStatus)
        const response = await axios.post('http://localhost:8001/api/getLocalDelivery', {
          orderNumber: order.orderNumber,
          // deliveryStatus : true
        });
        console.log(response)
      }
        // console.log(response.data);
      catch (error) {
        console.error('Error retrieving shipment details:', error);
      }
      window.location.href = '/OrdersToDeliver';
  };

  // const handleClosePopup = () => {
  //   setSelectedOrder(null);
  // };

  // const handleDeliver = () => {
  //   alert(`Order ${selectedOrder.orderNumber} delivered!`);
  //   handleClosePopup();
  // };

  // const handleCancel = () => {
  //   alert(`Delivery for order ${selectedOrder.orderNumber} canceled.`);
  //   handleClosePopup();
  // };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/getAllLocalOrders');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const filteredData = data.filter((d) => d.deliveryStatus === false);
      setOrders(filteredData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders to Deliver</h2>
      <table>
        <thead>
          <tr>
            <th>Deliver To</th>
            <th>Order Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.packageTo}</td>
              <td>{order.orderNumber}</td>
              <td>
                <button
                  className="mark-as-delivered"
                  onClick={() => handleOrderClick(order)}
                >
                  Mark as Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {selectedOrder && (
        <div className="popup">
          <h3>Order Details</h3>
          <p>Customer: {selectedOrder.customer}</p>
          <p>Address: {selectedOrder.address}</p>
          <div>
            <button onClick={handleDeliver}>Deliver</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default OrderToDeliver;
