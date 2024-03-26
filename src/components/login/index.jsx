'use client'

import styles from "./style.module.scss"
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", { email, password });
      // Handle successful login
      localStorage.setItem("token", response.data.authToken);
      router.push("/pdfUpload");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={styles.main}   >
      <h2 >Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
