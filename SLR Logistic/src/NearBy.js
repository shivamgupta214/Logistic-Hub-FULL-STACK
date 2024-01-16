import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import Maps from './Maps';

const MapContainer = () => {
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(0);
  const [center, setCenter] = useState({ lat: 41.84525, lng: -87.62725 });
  const [stores, setStores] = useState(["UPS", "USPS"]);

  const handleSearch = async () => {
    try {
      // Fetch nearby stores using Google Places API
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${center.lat},${center.lng}&radius=${radius * 0}&type=store&keyword=UPS|FedEx|USPS&key=//YourAPIKEY`
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
  const geocoderhere = GoogleMap.geo

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
          mapContainerStyle={{ height: '600px', width: '600px' }}
          center={center}
          zoom={14}
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
