'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import PDFViewer from "@/components/showPdf";
import PdfSplitter from "@/components/pdfSplitter";

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
      <h2>Individual PDF</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pdfData ? (
        <div>
          <PDFViewer pdfData={pdfData.pdf.data} /> 
          <PdfSplitter selectedPdf={pdfData.pdf.data}/>
        </div>
      ) : (
        <p>PDF not found.</p>
      )}
    </div>
  );
}
