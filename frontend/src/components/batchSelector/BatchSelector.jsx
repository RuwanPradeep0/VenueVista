import React, { useState } from 'react';
import styles from './BatchSelector.module.scss';

function BatchSelector({ selectedBatches, setSelectedBatches }) {
  const batchOptions = ['E19', 'E20', 'E21', 'E22', 'E23', 'E24', 'other'];

  const handleCheckboxChange = (event) => {
    const batch = event.target.value;
    if (selectedBatches.includes(batch)) {
      setSelectedBatches(selectedBatches.filter((b) => b !== batch));
    } else {
      setSelectedBatches([...selectedBatches, batch]);
    }
  };

  return (
    <div className={styles.options}>
      <div className={styles.optionLabel}>Batches</div>
      <div className={`${styles.optionContent} ${styles.checkboxes}`}>
        {batchOptions.map((batch) => (
          <div key={batch} className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              value={batch}
              id={batch}
              checked={selectedBatches.includes(batch)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={batch}>{batch}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BatchSelector;
