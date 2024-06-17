// SpaceManagement.jsx
import React, { useState } from 'react';
import AddSpace from '../addSpace/AddSpace';
import LectureHallCard from '../LectureHallcard/LectureHallCard';
import styles from './SpaceManagement.module.scss';
import EmptyLectureHallCard from '../EmptyLectureHallCard/EmptyLectureHallCard';

const SpaceManagement = () => {
  const [spaces, setSpaces] = useState([]);

  const handleAddSpace = (newSpace) => {
    setSpaces([...spaces, { ...newSpace, id: Date.now() }]);
  };

  const handleEditSpace = (editedSpace) => {
    setSpaces(spaces.map(space => space.id === editedSpace.id ? editedSpace : space));
  };

  const handleDeleteSpace = (id) => {
    setSpaces(spaces.filter(space => space.id !== id));
  };

return (
    <div className={styles.container}>
      <div className={styles.cardSection}>
        <h2 className={styles.sectionTitle}>Lecture Halls</h2>
        {spaces.length === 0 ? (
          <EmptyLectureHallCard />
        ) : (
          spaces.map(space => (
            <LectureHallCard 
              key={space.id} 
              space={space} 
              onEdit={handleEditSpace}
              onDelete={handleDeleteSpace}
            />
          ))
        )}
      </div>
      <div className={styles.formSection}>
        <AddSpace onAddSpace={handleAddSpace} />
      </div>
    </div>
  );

};

export default SpaceManagement;