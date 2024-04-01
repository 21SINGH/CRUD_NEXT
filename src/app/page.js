"use client";

import AuroraHero from "@/components/AuroHero";
import Login from "@/components/login";
import Navbar from "@/components/Navbar";
import styles from "./page.module.scss";
import SignUP from "@/components/signup";
import { useState } from "react";
import Bottom from "@/components/Bottom";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };
  return (
    <div className={styles.main}>
      <AuroraHero />
      <Navbar
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      {showLogin && <Login />}
      {showSignup && <SignUP />}
      <Bottom />
    </div>
  );
}
