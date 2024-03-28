"use client"

import styles from "./page.module.scss"
import React, { useState, useEffect } from "react";
import axios from "axios";
import PDFViewer from "@/components/showPdf";
import PdfSplitter from "@/components/pdfSplitter";
import AuroraHero from "@/components/AuroHero";

export default function IndiPdf() {
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        const pdfId = new URLSearchParams(window.location.search).get("pdfId");
        const response = await axios.get(`/api/individualPdf?pdfId=${pdfId}`);
        setPdfData(response.data.pdfData);
        console.log(response.data.pdfData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PDF data:", error);
        setLoading(false);
      }
    };

    fetchPdfData();
  }, []);

  return (
    <div>
      <AuroraHero />
      <div className={styles.main}>
        {loading ? (
          <p>Loading...</p>
        ) : pdfData ? (
          <div> 
            <h2 className={styles.title}>{pdfData.title}</h2>
          <div className={styles.cardHolder}>
            <div className={styles.card}>
              <PDFViewer pdfData={pdfData.pdf.data} /> 
            </div>
            <div className={styles.card}>
              <PdfSplitter selectedPdf={pdfData.pdf.data}/>
            </div>
            </div>
          </div>
        ) : (
          <p>PDF not found.</p>
        )}
      </div>
    </div>
  );
}
