import { useState } from "react";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const SERVER_URL = "https://1943-3-223-72-184.ngrok-free.app";

const UploadDocument = ({ onDocumentDataReceived }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("files", selectedFile); // Change "file" to "files"

    try {
      const response = await fetch(`${SERVER_URL}/upload_documents`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      console.log(data);
      onDocumentDataReceived(data);
      setSelectedFile(null); // Reset the selectedFile state after successful upload
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".txt,.pdf,.docx,.png,.jpg,.jpeg"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <Button component="span" color="primary" style={{ padding: 0 }}>
          <UploadFileIcon fontSize="large" />
        </Button>
      </label>

      {selectedFile && (
        <Button
          color="primary"
          onClick={handleUpload}
          style={{ marginLeft: "0px", padding: 0 }}
        >
          <CloudUploadIcon fontSize="large" />
        </Button>
      )}
    </>
  );
};

export default UploadDocument;
