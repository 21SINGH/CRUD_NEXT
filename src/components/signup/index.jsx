"use client"

import styles from "./style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner"; // Import your spinner component

export default function SignUP() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading
  const router = useRouter(); // Initialize useRouter

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting sign up process
    try {
      const response = await axios.post("/api/users", {
        email,
        userName,
        password,
      });
      // Handle successful sign up
      localStorage.setItem("token", response.data.authToken);
      router.push("/userpdf");
    } catch (error) {
      setError("Invalid email or password");
    }
    setLoading(false); // Set loading to false after API call completes
  };

  return (
    <div className={styles.main}>
      {loading && <Spinner />} {/* Conditionally render the spinner */}
      <div className={styles.div}>
        <h2 className={styles.title}>/ sign up</h2>
        <form className={styles.form} onSubmit={handleSignUp}>
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
            <label className={styles.label}>Username:</label>
            <input
              type="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
          <button type="submit" disabled={loading}>SignUp</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
