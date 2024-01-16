import './App.css';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Register from './Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewOrder from './ViewOrder';
import Addproduct from './Addproduct';
import Orders from './Orders';
import ShipPackage from './Shipping';
import { useState } from 'react';
import SendLocally from './SendLocally';
import StoreInventory from './StoreInventory';
import NearBy from './NearBy';
import UserProfile from './UserProfile';
import OrderToDeliver from './OrderToDeliver';
import AllUsers from './AllUsers';
import AllInventory from './AllInventory';
import UserChart from './DataVisualization';
import AddUser from './AddCustomer';
import AddDeliveryAgent from './AddDeliveryAgent';
// import LeftNav from './LeftNavbar';
function App() {
  const [isScroll, setIsScroll] = useState(false);

  const isScrolling = ()=>{
    setIsScroll(true);
  }
  return (
    <div className="App">
      <Router>
        <Header p={isScrolling} />
        {/* <LeftNav /> */}
        <Routes>
          <Route path="/Home" element={<Home  scrolling = {isScroll} />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Vieworder" element={<ViewOrder />} />
          <Route path="/Addproduct" element={<Addproduct />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/allOrders" element={<Orders />} />
          <Route path="/Shipping" element={<ShipPackage />} />
          <Route path="/SendLocally" element={<SendLocally />} />
          <Route path="/NearBy" element={<NearBy />} />
          <Route path="/StoreInventory" element={<StoreInventory />} />
          <Route path="/OrdersToDeliver" element={<OrderToDeliver />} />
          <Route path="/UserProfile/:user" element={<UserProfile />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/AllInventory" element={<AllInventory />} />
          <Route path="/dataVisualization" element={<UserChart />} />
          <Route path="/AddDeliveryAgent" element={<AddDeliveryAgent />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
