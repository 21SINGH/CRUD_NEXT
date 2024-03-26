'use client'


import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GetPdf() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get("/api/pdf", {
          headers: {
            "auth-token": `${localStorage.getItem("token")}`,
          },
        });
        setPdfs(response.data);
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
      ) : (
        <ul>
          {pdfs.map((pdf, index) => (
            <li key={index}>
              <a href={pdf.pdfUrl} target="_blank" rel="noopener noreferrer">
                {pdf.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
