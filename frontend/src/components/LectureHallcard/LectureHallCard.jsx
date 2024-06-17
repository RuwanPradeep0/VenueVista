

import React from 'react';
import styles from './LectureHallCard.module.scss';

const facilityOptions = ['AC', 'Projector', 'Computers'];

const LectureHallCard = ({ space, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={space.image} alt={space.name} className={styles.image} />
        <h3 className={styles.imageTitle}>LEC HALL IMAGE</h3>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>TITLE (SPACE NAME):- {space.name}</h3>
        <p className={styles.location}>
          <span className={styles.locationIcon}></span>
          LOCATION:- {space.location}
        </p>
        <p className={styles.description}>DESCRIPTION:- {space.description}</p>
        <p className={styles.capacity}>CAPACITY:- {space.capacity}</p>
        <div className={styles.facilities}>
          FACILITIES:-
          {facilityOptions.map((facility) => (
            <label key={facility} className={styles.facilityLabel}>
              <input
                type="checkbox"
                checked={space.facilities.includes(facility)}
                readOnly
              />
              {facility}
            </label>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={() => onEdit(space)} className={styles.editButton}>
            <span className={styles.editIcon}></span>
            EDIT SPACE PROPERTY
          </button>
          <button onClick={() => onDelete(space.id)} className={styles.deleteButton}>
            <span className={styles.deleteIcon}></span>
            DELETE SPACE
          </button>
        </div>
      </div>
    </div>
  );
};

export default LectureHallCard;
