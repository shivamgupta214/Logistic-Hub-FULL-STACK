// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const NearBy = () => {
//   const [zipCode, setZipCode] = useState('');
//   const [radius, setRadius] = useState(0);
//   const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default center is San Francisco

//   const handleSearch = () => {
//     // You can use the entered zip code and radius to perform a location-based search
//     // For simplicity, we are just updating the center of the map here
//     // You can implement your logic for searching and updating the map accordingly
//     setCenter({ lat: 37.7749, lng: -122.4194 }); // Update center coordinates based on your search
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="zipCode">Zip Code:</label>
//         <input
//           type="text"
//           id="zipCode"
//           value={zipCode}
//           onChange={(e) => setZipCode(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="radius">Radius (in miles):</label>
//         <input
//           type="number"
//           id="radius"
//           value={radius}
//           onChange={(e) => setRadius(e.target.value)}
//         />
//       </div>
//       <button onClick={handleSearch}>Search</button>

//       <LoadScript
//         googleMapsApiKey= "AIzaSyA296DVdQdQwLQl7tn6E0DhazcbnTtc_eg" // Replace with your API key
//       >
//         <GoogleMap
//           mapContainerStyle={{ height: '400px', width: '100%' }}
//           center={center}
//           zoom={10}
//         >
//           {/* You can add markers based on your search results */}
//           <Marker position={center} />
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default NearBy;

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const MapContainer = () => {
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(0);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [stores, setStores] = useState([]);

  const handleSearch = async () => {
    try {
      // Fetch nearby stores using Google Places API
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius * 0}&type=store&keyword=UPS|FedEx|USPS&key=AIzaSyA296DVdQdQwLQl7tn6E0DhazcbnTtc_eg`
      );

      // Extract store details from the response
      const storeResults = response.data.results.map((result) => ({
        name: result.name,
        location: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        },
      }));

      setStores(storeResults);
    } catch (error) {
      console.error('Error fetching nearby stores:', error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="radius">Radius (in miles):</label>
        <input
          type="number"
          id="radius"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>

      <LoadScript googleMapsApiKey="AIzaSyA296DVdQdQwLQl7tn6E0DhazcbnTtc_eg">
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={center}
          zoom={10}
        >
          {/* Display markers for the entered zip code and nearby stores */}
          <Marker position={center} label="Entered Zip Code" />
          {stores.map((store, index) => (
            <Marker key={index} position={store.location} label={store.name} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;
