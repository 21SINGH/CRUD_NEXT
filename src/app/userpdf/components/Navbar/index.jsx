import React from "react";
import styles from "./style.module.scss";

export default function Navbar({ onLoginClick, onSignupClick }) {
  const handleLogout = () => {
    // Clear localStorage token
    localStorage.removeItem("token");
    // Redirect to home page
    window.history.pushState(null, "", "/");
    // Force reload to reflect the updated URL
    window.location.reload();
  };

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h3>
              <span>PDF</span> splitter
            </h3>
          </div>
          <div className={styles.right}>
            <div className={styles.el} onClick={onLoginClick}>
              Upload Pdf
            </div>
            <div className={styles.el} onClick={onSignupClick}>
              All pdf
            </div>
            <div className={styles.el} onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
