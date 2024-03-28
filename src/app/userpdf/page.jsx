"use client";

import AuroraHero from "@/components/AuroHero";
import GetPdf from "@/components/getPdf";
import { useState } from "react";
import PdfUpload from "@/components/pdfUpload";
import Navbar from "./components/Navbar";

export default function UserPdf() {
  const [showPdfUpload, setShowPdfUpload] = useState(true);
  const [showGetPdf, setShowGetPdf] = useState(false);


  const handleLoginClick = () => {
    setShowPdfUpload(true);
    setShowGetPdf(false);
  };

  const handleSignupClick = () => {
    setShowGetPdf(true);
    setShowPdfUpload(false);
  };
  const handlePdfUploaded = () => {
    setShowPdfUpload(false);
    setShowGetPdf(true);
  };

  return (
    <div>
      <Navbar
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      {showPdfUpload && <PdfUpload onPdfUploaded={handlePdfUploaded} />}
      {showGetPdf && <GetPdf />}
      <AuroraHero />
    </div>
  );
}
