"use client";

import styles from "./style.module.scss";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUP() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users", {
        email,
        userName,
        password,
      });
      // Handle successful login
      localStorage.setItem("token", response.data.authToken);
      router.push("/userpdf");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.div}>
        <h2 className={styles.title}>
          <h2>/ sign in</h2>
        </h2>
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
          <button type="submit">SignIn</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
