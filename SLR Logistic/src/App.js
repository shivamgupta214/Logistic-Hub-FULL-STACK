import './App.css';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Register from './Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShipPackage from './Shipping';
import { useState } from 'react';
import SendLocally from './SendLocally';
import StoreInventory from './StoreInventory';
import OpenAIChatBot from './OpenAI';
import EventFinder from './Recommendations';
import StoreMap from './MapComponent';
import YelpAPI from './EventNearBy';

// import LeftNav from './LeftNavbar';
function App() {
  const [isScroll, setIsScroll] = useState(false);

  // sessionStorage.setItem("isloggedin", false)
  sessionStorage.setItem("isloggedin", true)
  const isScrolling = ()=>{
    setIsScroll(true);
  }
  return (
    <div className="App">
      <Router>
        <Header p={isScrolling} />
        {/* <LeftNav /> */}
        <Routes>
          <Route path="/" element={<Home  scrolling = {isScroll} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Shipping" element={<ShipPackage />} />
          <Route path="/SendLocally" element={<SendLocally />} />
          <Route path="/NearBy" element={<StoreMap />} />
          <Route path="/OpenAIChatBot" element={<OpenAIChatBot />} />
          <Route path="/StoreInventory" element={<StoreInventory />} />
          <Route path="/EventRecommendations" element={< EventFinder/>} />
          <Route path="/YelpAPI" element={< YelpAPI/>} />
          {/* <Route path="/Maps" element={< EventFinder/>} /> */}
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
