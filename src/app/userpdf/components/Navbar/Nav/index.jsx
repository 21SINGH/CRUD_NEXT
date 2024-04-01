import React from 'react'
import styles from "./style.module.scss"

const Nav = ({onLoginClick, onSignupClick ,setIsActive ,handleLogout }) => {
    const handleLoginClick = () => {
        onLoginClick();
        setIsActive(false);
    }
    const handleSignupClick = () => {
        onSignupClick();
        setIsActive(false);
    }
    const onhandleLogout = () => {
        handleLogout();
        setIsActive(false);
    }

    return (
        <div className={styles.nav}>
            <div className={styles.body}>
             <div className={styles.el} onClick={handleLoginClick}>
              Upload Pdf
            </div>
            <div className={styles.el} onClick={handleSignupClick}>
              All pdf
            </div>
            <div className={styles.el} onClick={onhandleLogout}>
              Logout
            </div>
            </div>
        </div>
    )
}

export default Nav
