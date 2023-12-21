import React, { useState, useEffect } from 'react';
import styles from "./styles.css";

/**
 *
 */
const CustomDataDisplay = () => {
  const [data, setData] = useState(null);

const schoolClosures = {
    "date": [
        "2023-07-04", "2023-08-16", "2023-08-17", "2023-08-18", "2023-08-21", "2023-08-22", "2023-08-23",
        "2023-08-25", "2023-08-28", "2023-09-04", "2023-09-25", "2023-10-09", "2023-10-20", "2023-11-02",
        "2023-11-03", "2023-11-10", "2023-11-22", "2023-11-23", "2023-11-24", "2023-12-25", "2023-12-26",
        "2023-12-27", "2023-12-28", "2023-12-29", "2024-01-01", "2024-01-02", "2024-01-15", "2024-01-19",
        "2024-01-22", "2024-02-19", "2024-02-20", "2024-03-04", "2024-03-25", "2024-03-26", "2024-03-27",
        "2024-03-28", "2024-03-29", "2024-04-01", "2024-04-04", "2024-04-05", "2024-04-10", "2024-05-14",
        "2024-05-27", "2024-06-13", "2024-06-14", "2024-06-19", "2024-06-20"
    ],
    "reason": [
        "Independence Day", "New Teacher Professional Duty Days", "New Teacher Professional Duty Days",
        "New Teacher Professional Duty Days", "All Teacher Professional Duty Days", "Professional Development",
        "Professional Development", "Student Orientation Day", "First Day of School", "Labor Day",
        "Yom Kippur", "Indigenous Peoples\" Day & Parent-Teacher Conferences", "Professional Development",
        "End of First Quarter", "Professional Day for Teachers", "Professional Development", "Thanksgiving Break",
        "Thanksgiving Break", "Thanksgiving Break", "Winter Break & Christmas", "Winter Break & Christmas",
        "Winter Break & Christmas", "Winter Break & Christmas", "Winter Break & Christmas", "New Year’s Day",
        "Winter Break", "Martin Luther King Jr. Day", "End of Second Quarter", "Professional Day for Teachers",
        "Presidents’ Day", "Parent-Teacher Conferences", "Professional Development", "Spring Break",
        "Spring Break", "Spring Break", "Spring Break", "Spring Break/Easter Holidays", "Spring Break/Easter Holidays",
        "End of Third Quarter", "Professional Day for Teachers", "Eid al-Fitr", "Primary Election Day",
        "Memorial Day", "Last Day for Students", "Last Day for Students", "Juneteenth", "Last Day for Teachers"
    ]
    };

useEffect(() => {
  const data = schoolClosures.date.map((date, i) => ({
    date: date,
    reason: schoolClosures.reason[i]
  }));
  setData(data);
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