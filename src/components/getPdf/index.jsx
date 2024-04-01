import styles from "./index.module.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import PDFViewer from "../showPdf";
import Spinner from "../Spinner"; // Import your spinner component

export default function GetPdf() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdfs = async () => {
      setLoading(true); // Set loading to true when fetching PDFs
      try {
        const response = await axios.get("/api/pdfUpload", {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        });
        console.log(localStorage.getItem("token"));

        setPdfs(response.data.userPDFs);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
      setLoading(false); // Set loading to false after fetching PDFs
    };

    fetchPdfs();
  }, []);

  return (
    <div className={styles.main}>
      {loading ? (
        <Spinner /> // Conditionally render the spinner
      ) : pdfs.length === 0 ? (
        <p>No PDFs uploaded yet.</p>
      ) : (
        <div className={styles.pdfContainer}>
          {pdfs.map((pdf, index) => (
            <div key={index} className={styles.pdfCard}>
              <div className={styles.top}>
                <h3>{pdf.title}</h3>
                <Link href={`/pdfViewer?pdfId=${pdf._id}`}>
                  <div className={styles.link}>split pdf</div>
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
