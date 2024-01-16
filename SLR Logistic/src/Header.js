// import React, { useEffect, useState } from 'react';
// import './Header.css';
// import { Link } from 'react-router-dom';
// import { useCart } from './CartContext';
// function Header() {
//     const [usertype,setUserType] = useState('')
//     const [username, setUsername] = useState('')
//     const { cart } = useCart();
//     useEffect(()=>{
//         let ut = sessionStorage.getItem('usertype');
//         setUserType(ut);
//         let un = sessionStorage.getItem('username');
//         setUsername(un);
//     })
//     const logout = ()=>{
//         window.sessionStorage.clear();
//         window.location.reload();
//         window.location.href = '/';
//     }
    
//   return (
//     <div className="header">
//       <header>
//         <div id="logo">
//           <a href="/"><img src="/logo.png"/></a>
//         </div>
//         <nav class='nav1'>
//             <ul>
//             {usertype == 'manager' ? <>
//                 <li>
//                     <Link to='/dataVisualization'>Data Visualization</Link>
//                 </li>
//                 <li>
//                     <Link to='/DataAnalytics'>Data Analytics</Link>
//                 </li>
//                 <li>
//                     <Link to='/SalesReport'>Sales Report</Link>
//                 </li>
//                 <li>
//                     <Link to='/AddProduct'>Add Product</Link>
//                 </li>
//                  </> : ''}
//                  {usertype == 'retailer' ? <>
//                 <li>
//                     <Link to='/AddCustomer'>Add Customers</Link>
//                 </li>
//                 <li>
//                     <Link to='/allOrders'>All Orders</Link>
//                 </li>
//                  </> : ''}
//                  <li>
//                     <Link  to='/Trending'>
//                         <span class='glyphicon glyphicon glyphicon-fire'>Trending</span>
//                     </Link></li>
//                 <li>
//                     <Link to='/Vieworder'>View Order</Link>
//                 </li>
//                 {username ? <li><Link to=''>Hello, {username}</Link></li>:''}
//                 <li>
//                     {usertype == 'customer' || usertype == 'retailer' || usertype == 'manager' ? <Link to='' onClick={logout}>Logout</Link>  : <Link to='/login'>Login</Link>}
//                 </li>
//                 <li>
//                     <Link to='/cart'>Cart ({cart.length})</Link>
//                 </li>
                

//             </ul>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Header;

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
        {/* <div id="logo">
          <a href="/">
            <img src="/logo.png" alt="Logo" />
          </a>
        </div> */}
        {/* <div className="menu-toggle" onClick={toggleSideMenu}>
          &#9776; 
        </div> */}
        <nav>
          <ul>
          <div id="logo">
          <a href="/">
            <img src="./images/logo.jpg" alt="SLR Logistics" />
          </a>
        </div>
            {usertype === 'manager' ? (
              <>
                <li>
                  <Link to="/dataVisualization">Data Visualization</Link>
                </li>
                <li>
                  <Link to="/DataAnalytics">Data Analytics</Link>
                </li>
                <li>
                  <Link to="/SalesReport">Sales Report</Link>
                </li>
                <li>
                  <Link to="/AddProduct">Add Product</Link>
                </li>
              </>
            ) : (
              ''
            )}
            {usertype === 'retailer' ? (
              <>
                <li>
                  <Link to="/AddCustomer">Add Customers</Link>
                </li>
                <li>
                  <Link to="/allOrders">All Orders</Link>
                </li>
              </>
            ) : (
              ''
            )}
             {/* <li>
              <Link to="/MapsLocation">Maps</Link>
            </li> */}
            {/* <li>
              <Link to="/OpenAIChatBot">Ask AI</Link>
            </li> */}
            {usertype === 'customer' || usertype === 'retailer' || usertype === 'manager' ? (
              <>
                <li>
                  <Link to="/EventRecommendations">Event Nearby</Link>
                </li>
              </>
            ) : (
              ''
            )}
            <li>
              <Link to="/Shipping">Book</Link>
            </li>
            <li>
              <Link to="/" onClick={()=>props.p()}>Our Services</Link>
            </li>
            <li>
              <Link to="/NearBy">Near By</Link>
            </li>
            {username ? <li>Hello, {username}</li> : ''}
            <li>
              {usertype === 'customer' || usertype === 'retailer' || usertype === 'manager' ? (
                <Link to="" onClick={logout}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
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
