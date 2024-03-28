// Spinner.js

import React from 'react';
import styles from './Spinner.module.scss'; // Import your spinner styles

const Spinner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;
