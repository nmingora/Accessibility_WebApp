import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios with 'npm install axios' if not already installed
import 'bootstrap/dist/css/bootstrap.min.css';
import "./News.css";
import CustomPdfViewer from './CustomPdfViewer';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [viewPdf, setViewPdf] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const fileType = ['application/pdf'];

  // Function to fetch the latest AdminNews PDF from the backend
  const fetchLatestAdminNews = async () => {
    try {
      // Assuming there's an endpoint to get the latest AdminNews PDF
      const response = await axios.get('/api/pdfWaivers/latestAdminNews', { responseType: 'blob' });
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setViewPdf(pdfUrl);
    } catch (error) {
      console.error('Failed to fetch latest AdminNews PDF:', error);
    }
  };

  useEffect(() => {
    fetchLatestAdminNews();
  }, []);

  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      const formData = new FormData();
      formData.append('pdfData', selectedFile);
      formData.append('pdfType', 'AdminNews'); // This is set automatically on the backend, but included here for clarity
      formData.append('uploadedBy', 'Admin'); // Adjust accordingly
      formData.append('pdfName', selectedFile.name);

      try {
        await axios.post('/api/pdfWaivers/uploadAdminNews', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert(`This PDF is uploaded: ${selectedFile.name}`);
        setShowAlert(true);
        fetchLatestAdminNews(); // Refresh the displayed PDF
      } catch (error) {
        console.error('Error uploading PDF:', error);
        alert('Failed to upload PDF');
      }
    } else {
      console.log("Please select a PDF file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This might be redundant if the upload is handled on file selection
  };

  const returnToAdmin = () => {
    navigate('/Admin');
  };

  const CoolAlert = ({ onClose }) => {
    const message = 'NICE! Your pdf is now uploaded - Check out the home screen to view this masterpiece!';
    return (
      <div className="coolAlert">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Upload Newsletter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" className="form-control" onChange={handleChange} />
        <button type="submit" className="btn btn-success">Upload</button>
      </form>
      <button type="button" onClick={returnToAdmin}>Return to Main Admin Page</button>

      {showAlert && <CoolAlert onClose={() => setShowAlert(false)} />}

      <h2>Preview Newsletter</h2>
      
      <div className="pdf-container">
        {viewPdf ? <CustomPdfViewer fileUrl={viewPdf} /> : <>No PDF selected</>}
      </div>
    </div>
  );
};

export default News;