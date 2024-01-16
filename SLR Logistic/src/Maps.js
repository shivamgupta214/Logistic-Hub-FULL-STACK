import React, { useRef, useEffect } from "react";
import "./Maps.css";

const Maps = ({ onPlaceChanged, placeholder }) => {
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Create a new Autocomplete instance
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["geocode"], // Restrict results to geographical locations
      }
    );

    // Listen for the 'place_changed' event
    autoCompleteRef.current.addListener("place_changed", handlePlaceChanged);

    // Cleanup when the component unmounts
    return () => {
      if (autoCompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autoCompleteRef.current);
      }
    };
  }, []);

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current.getPlace();
    if (onPlaceChanged && typeof onPlaceChanged === "function") {
      onPlaceChanged(place.formatted_address); // Pass the formatted address to the parent component
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        placeholder={placeholder}
        className="maps-input"
        type="text"
      />
    </div>
  );
};

export default Maps;
