import React from "react";
import styles from "./style.module.scss";

const Nav = ({ onLoginClick, onSignupClick ,setIsActive }) => {
  const handleLoginClick = () => {
    onLoginClick();
    setIsActive(false); // Close the navbar after login button is clicked
  };

  const handleSignupClick = () => {
    onSignupClick();
    setIsActive(false); // Close the navbar after signup button is clicked
  };
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        <div className={styles.el}  onClick={handleLoginClick}>Login</div>
        <div className={styles.el} onClick={handleSignupClick}>Sign Up</div>
      </div>
    </div>
  );
};

export default Nav;
