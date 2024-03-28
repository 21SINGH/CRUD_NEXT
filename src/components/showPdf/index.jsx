'use client'

import styles from "./style.module.scss"
import React, { useEffect, useState } from 'react';

const PDFViewer = ({ pdfData }) => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    // Convert the PDF data to a Base64-encoded data URL
    console.log(pdfData);
    const base64Data = Buffer.from(pdfData).toString('base64');
    const dataUrl = `data:application/pdf;base64,${base64Data}`;
    // Set the data URL to state
    setPdfUrl(dataUrl);
  }, [pdfData]);

  return (
    <div className={styles.pdfViewerContainer}>
      <iframe src={pdfUrl} className={styles.pdfViewer} width="100%" height="500px"></iframe>
    </div>
  );
};

export default PDFViewer;



