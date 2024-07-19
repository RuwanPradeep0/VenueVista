import React from 'react'
import { getTimeString } from '../../utills';

import styles from './TimeSelector.module.scss'


const TimeSelector = ({ startTime, setStartTime, endTime, setEndTime }) => {

    const handleStartTimeChange = (event) => {
        const selectedStartTime = parseInt(event.target.value);
    
        // Automatically adjust the endTime if it's less than the selected startTime
        if (endTime < selectedStartTime) {
          setEndTime(selectedStartTime + 1);
        }
    
        setStartTime(selectedStartTime);
      };


    
      const handleEndTimeChange = (event) => {
        const selectedEndTime = parseInt(event.target.value);
    
        // Ensure the endTime is always greater than the startTime
        if (selectedEndTime > startTime) {
          setEndTime(selectedEndTime);
        }
      };

      // Helper function to generate time options
    const generateTimeOptions = () => {
        const startHour = 8;
        const endHour = 17;
    
        const options = [];
    
        for (let hour = startHour; hour <= endHour; hour++) {
        options.push(
            <option key={hour} value={hour}> 
            {getTimeString(hour * 100)}
            </option>
        );
        }
    
        return options;
    };


  return (
    <div className={styles.container}>
        <div className={styles.options}>
        <label htmlFor="start-time">Start Time:</label>

        <select
          id="start-time"
          value={startTime}
          onChange={handleStartTimeChange}
        >
            {generateTimeOptions()}
        </select>
        </div>


        <div className={styles.options}>
        <label htmlFor="end-time">End Time:</label>
        <select 
        id="end-time" 
        value={endTime} 
        onChange={handleEndTimeChange}>
          {generateTimeOptions()}
        </select>
      </div>
      
    </div>
  )
}

export default TimeSelector
