// EmptyLectureHallCard.jsx
import React from 'react';
import styles from './EmptyLectureHallCard.module.scss';

const EmptyLectureHallCard = () => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>TITLE (SPACE NAME):-</h3>
      <div className={styles.imageContainer}>
        <div className={styles.placeholderImage}>LEC HALL IMAGE</div>
      </div>
      <p className={styles.location}>LOCATION:-</p>
      <p className={styles.description}>DESCRIPTION:- .............................................</p>
      <p className={styles.capacity}>CAPACITY:-</p>
      <div className={styles.facilities}>
        FACILITIES:-
        <label className={styles.facilityLabel}>
          <input type="checkbox" disabled /> AC
        </label>
        <label className={styles.facilityLabel}>
          <input type="checkbox" disabled /> PROJECTOR
        </label>
        <label className={styles.facilityLabel}>
          <input type="checkbox" disabled /> SMART BOARD
        </label>
      </div>
      <div className={styles.actions}>
        <button className={styles.editButton} disabled>EDIT SPACE PROPERTY</button>
        <button className={styles.deleteButton} disabled>DELETE SPACE</button>
      </div>
    </div>
  );
};

export default EmptyLectureHallCard;