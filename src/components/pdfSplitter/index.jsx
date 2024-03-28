import styles from "./style.module.scss";
import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import PDFViewer from "../showPdf";

const PdfSplitter = ({ selectedPdf }) => {
  const [pageNumbers, setPageNumbers] = useState(""); // State to store user input for page numbers or ranges
  const [splitting, setSplitting] = useState(false);
  const [newPdfData, setNewPdfData] = useState(null);
  const [splitPdfName, setSplitPdfName] = useState("");

  const handleSplitPdf = async () => {
    setSplitting(true);
    try {
      const response = await axios.post("/api/splitPdf", {
        pdfData: selectedPdf,
        pageNumbers: pageNumbers.trim(), // Send user input to the server
      });

      const pdfData = response.data.pdfDataToSend;
      setNewPdfData(pdfData);

      const defaultName = "split_pdf";
      setSplitPdfName(defaultName);

      setSplitting(false);
    } catch (error) {
      console.error("Error splitting PDF:", error);
      setSplitting(false);
    }
  };

  const handleDownloadPdf = () => {
    if (newPdfData) {
      try {
        const uint8Array = new Uint8Array(newPdfData.data);
        const blob = new Blob([uint8Array], { type: "application/pdf" });
        saveAs(blob, `${splitPdfName}.pdf`);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }
  };

  return (
    <div>
      <h3 className={styles.heading}>PDF Splitter</h3>
      <div className={styles.main}>
        <div className={styles.form}>
          <div>
            <label>Page Numbers or Ranges (e.g., 1, 3, 5-7):</label>
          </div>
          <div>
            <input
              type="text"
              value={pageNumbers}
              onChange={(e) => setPageNumbers(e.target.value)}
            />
          </div>
        </div>
        <button
          className={styles.btn}
          onClick={handleSplitPdf}
          disabled={splitting}
        >
          {splitting ? "Splitting..." : "Split PDF"}
        </button>

        {newPdfData && (
          <div className={styles.newData}>
            <div className={styles.top}> 
            <div><h7 className={styles.heading2 }>Newly created PDF</h7></div>
            <div ><button className={styles.btn} onClick={handleDownloadPdf}>Download</button></div>
            </div>
            <div className={styles.viewer}><PDFViewer  pdfData={newPdfData} /></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfSplitter;
