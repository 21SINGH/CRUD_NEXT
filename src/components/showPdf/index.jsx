'use client'

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
    <div>
      <iframe src={pdfUrl} width="100%" height="500px"></iframe>
    </div>
  );
};

export default PDFViewer;



