import styles from "./style.module.scss";

// Navbar.js
import React from "react";

export default function Navbar({ onLoginClick, onSignupClick }) {
  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h3> <span>PDF</span> splitter{" "}</h3>
          </div>
          <div className={styles.right}>
            <div className={styles.el} onClick={onLoginClick}>Upload Pdf</div>
            <div  className={styles.el} onClick={onSignupClick}>All pdf</div>
          </div>
        </div>
      </div>
    </div>
  );
}
