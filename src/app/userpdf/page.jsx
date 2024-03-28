"use client";

import AuroraHero from "@/components/AuroHero";
import GetPdf from "@/components/getPdf";
import { useState } from "react";
import PdfUpload from "@/components/pdfUpload";
import Navbar from "./components/Navbar";

export default function UserPdf() {
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
    <div>
      <Navbar
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      {showLogin && <PdfUpload />}
      {showSignup && <GetPdf />}
      <AuroraHero />
    </div>
  );
}
