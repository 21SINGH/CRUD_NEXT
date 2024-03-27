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
      <h3>PDF Splitter</h3>
      <label>
        Page Numbers or Ranges (e.g., 1, 3, 5-7):
        <input
          type="text"
          value={pageNumbers}
          onChange={(e) => setPageNumbers(e.target.value)}
        />
      </label>

      <button onClick={handleSplitPdf} disabled={splitting}>
        {splitting ? "Splitting..." : "Split PDF"}
      </button>
      {newPdfData && (
        <div>
          <h4>New PDF</h4>
          <PDFViewer pdfData={newPdfData} />
          <button onClick={handleDownloadPdf}>Download Split PDF</button>
        </div>
      )}
    </div>
  );
};

export default PdfSplitter;


// import React, { useState } from "react";
// import axios from "axios";
// import { saveAs } from "file-saver";
// import PDFViewer from "../showPdf";

// const PdfSplitter = ({ selectedPdf }) => {
//   const [startPage, setStartPage] = useState(1);
//   const [endPage, setEndPage] = useState(1);
//   const [splitting, setSplitting] = useState(false);
//   const [newPdfData, setNewPdfData] = useState(null);
//   const [splitPdfName, setSplitPdfName] = useState("");

//   const handleSplitPdf = async () => {
//     setSplitting(true);
//     try {
//       const response = await axios.post("/api/splitPdf", {
//         pdfData: selectedPdf,
//         startPage,
//         endPage,
//       });

//       // Extract PDF data from the response
//       const pdfData = response.data.pdfDataToSend;
//       console.log(pdfData);

//       // Set the new PDF data
//       setNewPdfData(pdfData);

//       // Generate a default name for the split PDF
//       const defaultName = "split_pdf";
//       setSplitPdfName(defaultName);

//       // Enable download button
//       setSplitting(false);
//     } catch (error) {
//       console.error("Error splitting PDF:", error);
//       setSplitting(false);
//     }
//   };

//   const handleDownloadPdf = () => {
//     if (newPdfData) {
//       try {
//         // Convert data array to Uint8Array
//         const uint8Array = new Uint8Array(newPdfData.data);

//         // Create Blob from Uint8Array
//         const blob = new Blob([uint8Array], { type: "application/pdf" });

//         // Trigger download
//         saveAs(blob, `${splitPdfName}.pdf`);
//       } catch (error) {
//         console.error("Error downloading PDF:", error);
//         // Display an error message to the user
//       }
//     }
//   };

//   return (
//     <div>
//       <h3>PDF Splitter</h3>
//       <label>
//         Start Page:
//         <input
//           type="number"
//           value={isNaN(startPage) ? "" : startPage} // Ensure value is a valid number or empty string
//           onChange={(e) => setStartPage(parseInt(e.target.value))}
//           min={1}
//           max={endPage}
//         />
//       </label>
//       <label>
//         End Page:
//         <input
//           type="number"
//           value={isNaN(endPage) ? "" : endPage} // Ensure value is a valid number or empty string
//           onChange={(e) => setEndPage(parseInt(e.target.value))}
//           min={startPage}
//         />
//       </label>

//       <button onClick={handleSplitPdf} disabled={splitting}>
//         {splitting ? "Splitting..." : "Split PDF"}
//       </button>
//       {newPdfData && (
//         <div>
//           <h4>New PDF</h4>
//           <PDFViewer pdfData={newPdfData} />
//           <button onClick={handleDownloadPdf}>Download Split PDF</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PdfSplitter;
