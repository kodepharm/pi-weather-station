import React, { useState, useEffect } from 'react';

/**
 *
 */
const RouteDisplay = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch('/route') // Ensure this endpoint matches your backend route
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debug log
        if (data.routes) { // Adjust this to match your API response structure
          setRoutes(data.routes);
          console.log('Routes:', data.routes); // Debug log
        } else {
          console.error('Failed to fetch routes:', data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  console.log('Current routes state:', routes); // Debug log

  return (
    <div>
      <h3>Routes</h3>
      {routes.length > 0 ? (
        <ul>
          {routes.map(route => (
            <li key={route.id}>
              {route.id}: {route.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading routes...</p>
      )}
    </div>
  );
};

export default RouteDisplay;
