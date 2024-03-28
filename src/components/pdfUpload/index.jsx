import styles from "./index.module.scss";
import { useState } from "react";
import axios from "axios";
import Spinner from "../Spinner"; // Import your spinner component
import Bottom from "../Bottom";

export default function PdfUpload({ onPdfUploaded }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [loading, setLoading] = useState(false); // State to track loading

  const submitImage = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting upload process

    // Check if the file size is greater than 1MB
    if (file && file.size > 1024 * 1024) {
      setUploadStatus("File size exceeds 1MB. Please upload a smaller file.");
      setLoading(false); // Set loading to false if validation fails
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "/api/pdfUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "auth-token": `${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(result);
      setUploadStatus("Upload successful");
      onPdfUploaded(); // Notify UserPdf component that PDF is uploaded
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setUploadStatus("Upload failed");
    }

    setLoading(false); // Set loading to false after API call completes
  };

  return (
    <div className={styles.main}>
      {loading && <Spinner />} {/* Conditionally render the spinner */}
      <div className={styles.div}>
        <div className={styles.title}>
          <h2>/ Upload pdf</h2>
        </div>
        <form className={styles.form} onSubmit={submitImage}>
          <div className={styles.el}>
            <label className={styles.label}>Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <br />
          <div className={styles.el}>
            <label className={styles.label}>PDF file:</label>
            <input
              type="file"
              accept="application/pdf"
              className={styles.but}
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <br />
          <button type="submit" disabled={loading}>Submit</button>
        </form>

        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
      <Bottom />
    </div>
  );
}
