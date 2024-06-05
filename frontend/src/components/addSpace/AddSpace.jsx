import React, { useState } from 'react';
import{createSpaces} from '../../services/SpaceService'

import styles from './AddSpace.module.scss';

const AddSpace = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        capacity: '',
        description: '',
        image: null,
        facilities: [],
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    
      const handleFacilityChange = (e) => {
        const facility = e.target.value;
        const { facilities } = formData;
    
        if (e.target.checked) {
          setFormData({ ...formData, facilities: [...facilities, facility] });
        } else {
          setFormData({
            ...formData,
            facilities: facilities.filter((f) => f !== facility),
          });
        }
      };

    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Create the request body object
        const requestBody = {
          name: formData.name,
          location: formData.location,
          capacity: parseInt(formData.capacity), // Convert capacity to integer
          description: formData.description,
          image: '', // Add a placeholder for the image field
          facilities: Array.isArray(formData.facilities)
             ? formData.facilities
             : formData.facilities.split(','), // Split the facilities string into an array
        };
      
        console.log('Request body:', requestBody);
      
        try {
          createSpaces(requestBody);
          console.log('Hall details submitted successfully:');
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with error:', error.response.data.message || 'Unknown error');
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error in request setup:', error.message);
          }
        }
      };


    
      return (
        <div className={styles.container}>
          <h2 className={styles.heading}>Add Hall Details</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Space Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="location" className={styles.label}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
  <label htmlFor="capacity" className={styles.label}>
    Capacity
  </label>
  <div className={styles.rangeContainer}>
    <input
      type="range"
      id="capacity"
      name="capacity"
      min="0"
      max="250"
      value={formData.capacity}
      onChange={handleInputChange}
      className={styles.rangeInput}
    />
    <span className={styles.rangeValue}>{formData.capacity}</span>
  </div>
</div>
            <div className={styles.inputGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className={styles.textarea}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="image" className={styles.label}>
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Facilities</label>
              <div className={styles.facilities}>
                <label className={styles.facilityLabel}>
                  <input
                    type="checkbox"
                    value="AC"
                    onChange={handleFacilityChange}
                    checked={formData.facilities.includes('AC')}
                    className={styles.facilityCheckbox}
                  />
                  AC
                </label>
              
                <label className={styles.facilityLabel}>
                  <input
                    type="checkbox"
                    value="Computers"
                    onChange={handleFacilityChange}
                    checked={formData.facilities.includes('Computers')}
                    className={styles.facilityCheckbox}
                  />
                  Computers
                </label>
                <label className={styles.facilityLabel}>
                  <input
                    type="checkbox"
                    value="Projector"
                    onChange={handleFacilityChange}
                    checked={formData.facilities.includes('Projector')}
                    className={styles.facilityCheckbox}
                  />
                  Projector
                </label>
                <label className={styles.facilityLabel}>
                  <input
                    type="checkbox"
                    value="ElectronicEquipment"
                    onChange={handleFacilityChange}
                    checked={formData.facilities.includes('ElectronicEquipment')}
                    className={styles.facilityCheckbox}
                  />
                  Electronic Equipment
                </label>
                
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      );
}

export default AddSpace
