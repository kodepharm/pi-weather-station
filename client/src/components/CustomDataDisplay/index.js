import React, { useState, useEffect } from 'react';
import styles from "./styles.css";
import schoolClosures from "../../public/custom_data.json";


const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

/**
 *
 */
export const CustomDataDisplay = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    const transformedData = schoolClosures.schoolClosures.date
      .map((date, i) => {
        const [year, month, day] = date.split('-');
        return {
          id: i,
          date: new Date(year, month - 1, day),
          reason: schoolClosures.schoolClosures.reason[i]
        };
      })
      .sort((a, b) => a.date - b.date) // Sort by date in ascending order
      .filter(item => item.date >= currentDate) // Filter out past events
      .slice(0, 10); // Get the first 10 elements
  
    setData(transformedData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dataContainer}>
      {data.map((item) => (
        <table key={item.id} className={styles.dataTable}>
          <tbody>
            <tr>
              <td className={styles.dataText}>
              {new Date(item.date).toLocaleDateString('en-US', { timeZone: 'America/New_York', ...dateOptions })}
              </td>
              <td className={styles.dataText}>
                {item.reason}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};