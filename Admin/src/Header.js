import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header(props) {
  console.log(props)

  const [usertype, setUserType] = useState('');
  const [username, setUsername] = useState('');


  useEffect(() => {
    let ut = sessionStorage.getItem('usertype');
    setUserType(ut);
    let un = sessionStorage.getItem('username');
    setUsername(un);
  }, []);

  const logout = () => {
    window.sessionStorage.clear();
    window.location.reload();
    window.location.href = '/';
  };

  // const toggleSideMenu = () => {
  //   setIsSideMenuOpen(!isSideMenuOpen);
  // };

  return (
    <div className="header">
      <header>
        <nav>
          <ul>
          {usertype === 'manager' || usertype === 'warehouseAgent' ? (
             <div id="logo">
             <a href="/Home"> Admin </a>
           </div>
            ) : (
              ''
            )}
          
            {usertype === 'manager' ? (
              <>
                <li>
                  <Link to="/dataVisualization">Data Visualization</Link>
                </li>
                <li>
                  <Link to="/AddUser">Add User</Link>
                </li>
                <li>
                  <Link to="/AllUsers">All User</Link>
                </li>
              </>
            ) : (
              ''
            )}
            {usertype === 'warehouseAgent' ? (
              <>
                <li>
                  <Link to="/AllInventory">Storage</Link>
                </li>
                <li>
                  <Link to="/AddDeliveryAgent">Add Delivery Agent</Link>
                </li>
              </>
            ) : (
              ''
            )}
            {usertype === 'deliveryagent' ? (
              <>
                <li>
                  <Link to="/OrdersToDeliver">Orders to Pick or Deliver</Link>
                </li>
                {/* <li>
                  <Link to="/allOrders">All Orders</Link>
                </li> */}
              </>
            ) : (
              ''
            )}
            {username ? <li>Hello, {username}</li> : ''}
            <li>
              {usertype === 'deliveryagent' || usertype === 'manager' || usertype === 'warehouseAgent' ? (
                <Link to="" onClick={logout}>
                  Logout
                </Link>
              ) : (
                <Link to="/">Login</Link>
              )}
            </li>
            {/* <li>
              <Link to="/cart">Cart ({cart.length})</Link>
            </li> */}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
