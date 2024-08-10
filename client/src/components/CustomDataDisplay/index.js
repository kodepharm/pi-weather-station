import React, { useState, useEffect } from 'react';
import styles from "./styles.css";
import schoolClosures from "../../public/custom_data.json";


const dateOptions = {
  year: 'numeric',
  month: 'short',
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
      .slice(0, 8); // Get the first 10 elements
  
    setData(transformedData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dataContainer}>
      <div className={styles.twoThirds}>
        <div className={styles.dataText}>
          <h3 className={styles.dataHeader}>Upcoming School Closures</h3>
        </div>
      {data.map((item) => (
        <table key={item.id} className={styles.dataTable}>
            <tbody>
              <tr>
                <td className={styles.dataText}>
                {new Date(item.date).toLocaleDateString('en-US', { timeZone: 'America/New_York', ...dateOptions })}
                </td>
                <td className={styles.dataText}>
                  {item.reason.substring(0, 45)}
                </td>
              </tr>
            </tbody>
        </table>
      ))}
      </div>
      {/* <div className={styles.oneThird}>
        <div className={styles.dataText}>
          Replace this with the actual properties of your data
        </div>
    </div> */}
    </div>
  );
};