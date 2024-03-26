"use client";

import styles from "./index.module.scss";
import { useState } from "react";
import axios from "axios";


export default function PdfUpload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:3000/api/pdf",
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
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setUploadStatus("Upload failed");
    }
  };

  return (
    <div className={styles.main}>
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf in React</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
