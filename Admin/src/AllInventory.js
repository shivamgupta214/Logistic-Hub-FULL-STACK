// import React, { useState, useEffect } from 'react';

// const AllInventory = () => {
//   const [orders, setOrders] = useState([

//     // Add more orders as needed
//   ]);

//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//   };

//   const handleClosePopup = () => {
//     setSelectedOrder(null);
//   };

//   const handleDeliver = () => {

//     alert(`Order ${selectedOrder.id} delivered!`);
//     handleClosePopup();
//   };

//   const handleCancel = () => {

//     alert(`Delivery for order ${selectedOrder.id} canceled.`);
//     handleClosePopup();
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch('http://localhost:8001/api/getAllInventoryOrders');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Ak',data);
//     //   const filteredData = data.filter((d) => d.deliveryStatus === false);

//       // data.map((d)=>{
//       //    return if(d.deliveryStatus == false){
//       //     d1.push(d)
//       //    }  
//       // })
//       // if (data[0].deliveryStatus){}
//       // else{
//       setOrders(data)
//       // }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   }

  


//   useEffect(()=>{
//     fetchOrders()
//   },
//   [])


//   return (
//     <div>
//       <h2>Storage</h2>
//       <table>
//         <th>
//           <td>Username</td>
//           <td>What Item</td>
//           <td>Location</td>
//           <td>Booking Number</td>
//           <td>Total Cost</td>
//           <td>Number of Items</td>
//           <td>Type of Storage</td>
//           {/* <td>Delivery Status</td> */}
//         </th>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id}>
//               <td>{order.username}</td>
//               <td>{order.whatItems}</td>
//               <td>{order.location}</td>
//               <td>{order.orderNumber}</td>
//               <td>{order.totalCost}</td>
//               <td>{order.numberofItems}</td>
//               <td>{order.typeofStorage}</td>
//               {/* <button onClick={() => handleOrderClick(order)}>View Details</button> */}
//               {/* <td>{order.deliveryStatus}</td> */}
//             </tr>
//           ))}
          
//         </tbody>
//       </table>
//       {/* <ul>
//         {orders.map((order) => (
//           <li key={order.id} onClick={() => handleOrderClick(order)}>
//             {order.customer} - {order.address}
//           </li>
//         ))}
//       </ul> */}

//       {/* {selectedOrder && (
//         <div className="popup">
//           <h3>Order Details</h3>
//           <p>Customer: {selectedOrder.customer}</p>
//           <p>Address: {selectedOrder.address}</p>
//           <div>
//             <button onClick={handleDeliver}>Deliver</button>
//             <button onClick={handleCancel}>Cancel</button>
//           </div>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default AllInventory;

import React, { useState, useEffect } from 'react';
import './inventory.css'; // Import your CSS file

const AllInventory = () => {
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleClosePopup = () => {
    setSelectedOrder(null);
  };

  const handleDeliver = () => {
    alert(`Order ${selectedOrder.id} delivered!`);
    handleClosePopup();
  };

  const handleCancel = () => {
    alert(`Delivery for order ${selectedOrder.id} canceled.`);
    handleClosePopup();
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/getAllInventoryOrders');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Storage</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>What Item</th>
            <th>Location</th>
            <th>Booking Number</th>
            <th>Total Cost</th>
            <th>Number of Items</th>
            <th>Type of Storage</th>
            {/* <th>Delivery Status</th> */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} onClick={() => handleOrderClick(order)}>
              <td>{order.username}</td>
              <td>{order.whatItems}</td>
              <td>{order.location}</td>
              <td>{order.orderNumber}</td>
              <td>{order.totalCost}</td>
              <td>{order.numberofItems}</td>
              <td>{order.typeofStorage}</td>
              {/* <td>{order.deliveryStatus}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <div className="popup">
          <h3>Order Details</h3>
          <p>Customer: {selectedOrder.customer}</p>
          <p>Address: {selectedOrder.address}</p>
          <div>
            <button onClick={handleDeliver}>Deliver</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInventory;

