// Navbar.js
"use client";

import styles from "./style.module.scss";
import React from "react";
import Nav from "./Nav";
import { useState } from "react";

export default function Navbar({ onLoginClick, onSignupClick }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.top}>
          <div className={styles.left}>
            <h3>
              {" "}
              <span>PDF</span> splitter{" "}
            </h3>
          </div>
          <div className={styles.right}>
            <div
              className={styles.el}
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                viewBox="0 96 960 960"
                width="28"
              >
                <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z"></path>
              </svg>
            </div>
          </div>
        </div>
        {isActive && (
          <div className={styles.model}>
            <Nav
              onLoginClick={onLoginClick}
              onSignupClick={onSignupClick}
              setIsActive={setIsActive}
            />
          </div>
        )}
      </div>
    </div>
  );
}
