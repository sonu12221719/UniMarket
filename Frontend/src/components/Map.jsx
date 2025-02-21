import { useState, useEffect } from "react";

const Map = ({ socket }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Send location to backend via WebSocket
          socket.emit("updateLocation", { latitude, longitude });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, [socket]);

  return (
    <div>
      <h3>Live Location</h3>
      {location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default Map;
