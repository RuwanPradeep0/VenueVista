import React, { useState } from 'react';
import { createSpaces } from '../../services/SpaceService';
import styles from './AddSpace.module.scss';
import Hero from '../Hero';
import FeedbackMessage from '../feedbackMessage/FeedbackMessage';

const AddSpace = () => {
    const initialFormData = {
        name: '',
        location: '',
        capacity: '',
        description: '',
        image: null,
        facilities: [],
    };

    const [formData, setFormData] = useState(initialFormData);
    const [feedback, setFeedback] = useState({ message: '', type: '' });

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

        const requestBody = {
            name: formData.name,
            location: formData.location,
            capacity: parseInt(formData.capacity),
            description: formData.description,
            image: '',
            facilities: Array.isArray(formData.facilities)
                ? formData.facilities
                : formData.facilities.split(','),
        };

        try {
            await createSpaces(requestBody);
            setFormData(initialFormData);
            setFeedback({ message: 'Space created successfully!', type: 'success' });
        } catch (error) {
            setFeedback({ message: error.message || 'An error occurred while creating the space.', type: 'error' });
        }
    };

    return (
        <div>
            <Hero
                spanText="Create"
                title="Spaces"
                description="Create spaces and make up to date the system"
            />

            <div className={styles.container}>
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
                
                <FeedbackMessage
                    message={feedback.message}
                    type={feedback.type}
                    duration={5000}
                />
            </div>
        </div>
    );
};

export default AddSpace;