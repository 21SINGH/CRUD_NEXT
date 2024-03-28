'use client'

import styles from "./index.module.scss"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PDFViewer from "../showPdf";

export default function GetPdf() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get("/api/pdfUpload", {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        });
        
        setPdfs(response.data.userPDFs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);


  return (
    <div className={styles.main}>
      {loading ? (
        <p>Loading...</p>
      ) : pdfs.length === 0 ? (
        <p>No PDFs uploaded yet.</p>
      ) : (
        <div className={styles.pdfContainer}>
          {pdfs.map((pdf, index) => (
            <div key={index} className={styles.pdfCard}>
              <div className={styles.top}>
              <h3>{pdf.title}</h3>
              <Link href={`/pdfViewer?pdfId=${pdf._id}`}>
                split pdf
              </Link>
              </div>
              <PDFViewer pdfData={pdf.pdf.data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
