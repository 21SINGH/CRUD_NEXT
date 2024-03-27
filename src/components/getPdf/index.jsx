'use client'
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
        // console.log(response.data.userPDFs);
        
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
    <div>
      <h2>PDFs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pdfs.length === 0 ? (
        <p>No PDFs uploaded yet.</p>
      ) : (
        <ul>
          {pdfs.map((pdf, index) => (
            <li key={index}>
              {pdf.title}
              <PDFViewer pdfData={pdf.pdf.data} />
              <Link href={`/pdfViewer?pdfId=${pdf._id}`}>
                show pdf
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
