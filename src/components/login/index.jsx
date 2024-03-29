"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner"; // Import your spinner component

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting login process
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });
      // Handle successful login
      localStorage.setItem("token", response.data.authToken);
      router.push("/userpdf");
    } catch (error) {
      setError("Invalid email or password");
    }
    setLoading(false); // Set loading to false after API call completes
  };

  return (
    <div className={styles.container2}>
      <div className={styles.main}>
        {loading && <Spinner />} 
        <div className={styles.div}>
          <div className={styles.title}>
            <h2>/ log in</h2>
          </div>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.el}>
              <label className={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.el}>
              <label className={styles.label}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              Login
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
      </div>
  );
}
