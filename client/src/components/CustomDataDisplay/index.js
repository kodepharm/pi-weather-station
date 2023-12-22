import React, { useState, useEffect } from 'react';
import styles from "./styles.css";
import schoolClosures from "../../public/custom_data.json";

/**
 *
 */
const CustomDataDisplay = () => {
  const [data, setData] = useState(null);

useEffect(() => {
  const transformedData = schoolClosures.schoolClosures.date.map((date, i) => ({
    date: date,
    reason: schoolClosures.schoolClosures.reason[i]
  }));
  setData(transformedData);
}, []);

if (!data) {
  return <div>Loading...</div>;
}

  const currentDate = new Date().toISOString().split('T')[0];

  const upcomingData = data
    .filter(item => item.date >= currentDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10);
  
  return (
    <div className={styles.dataContainer}>
      {upcomingData.map((item, index) => (
        <table key={index} className={styles.dataTable}>
      <   tbody>
          <tr>
          <td className={styles.dataText}>
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </td>
          <td className={styles.dataText}>{item.reason}</td>
        </tr>
        </tbody>
      </table>
      ))}
  </div>
    );
}; 

export default CustomDataDisplay;