import React, { useState, useEffect } from 'react';
import styles from './styles.css';

/**
 *
 */
export const CustomTrainDisplay = () => {
  const [trainData, setTrainData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      console.log('Fetching train data...');
      fetch('/train')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Fetched data:', data);
          if (!Array.isArray(data)) {
            throw new Error('Fetched data is not an array');
          }
          setTrainData(data);
        })
        .catch(error => {
          console.error('Error during fetch:', error);
        });
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 300000); // Fetch new data every 30 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  if (!trainData) {
    console.log('No train data yet');
    return <div>Loading...</div>;
  }

  if (!Array.isArray(trainData)) {
    console.error('Expected trainData to be an array but got:', trainData);
    return <div>Data is invalid</div>;
  }

  if (trainData.length === 0) {
    return <div>No train data available</div>;
  }

  return (
    <div className={styles.oneThird}>
      <div className={styles.dataText}>
        <h3 className={styles.dataHeader}>Upcoming MARC trains</h3>
      </div>
      {trainData.slice(0, 5).map(item => (
        <table key={item.id} className={styles.dataTable}>
          <tbody>
            <tr>
              <td className={styles.dataText}>
               {item.tripUpdate.trip.tripId}
              </td>
              <td className={styles.dataText}>
              {item.tripUpdate.trip.startTime}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    {/* <div>
      {trainData.slice(0, 4).map(item => (
        <div key={item.id}>
          <h4>Train ID: {item.id}</h4>
          <p><h4>Train Line: {item.tripUpdate.trip.tripId}</h4></p>
          <p>Start Time: {item.tripUpdate.trip.startTime}</p>
          <p>Route ID: {item.tripUpdate.trip.routeId}</p>
          <p>Direction: {item.tripUpdate.trip.directionId}</p>
          <div>
            <h5>Stops:</h5>
            {item.tripUpdate.stopTimeUpdate.map((stop, index) => (
              <div key={index}>
                <p>Stop Sequence: {stop.stopSequence}</p>
                <p>Stop ID: {stop.stopId}</p>
                <p>Arrival Time: {stop.arrival ? stop.arrival.time : 'N/A'}</p>
                <p>Departure Time: {stop.departure ? stop.departure.time : 'N/A'}</p>
              </div>
            ))}
          </div>

        {trainData.slice(0, 4).map(item => (
        <table key={item.id} className={styles.dataTable}>
            <tbody>
              <tr>
                <td className={styles.dataText}>
                <p><h4>Train Line: {item.tripUpdate.trip.tripId}</h4></p>
                </td>
                <td className={styles.dataText}>
                <p>Start Time: {item.tripUpdate.trip.startTime}</p>
                </td>
              </tr>
            </tbody>
        </table>
      ))}
        </div>
      ))}
    </div> */}
    </div>
  );
};