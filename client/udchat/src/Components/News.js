// News.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./News.css";
import CustomPdfViewer from './CustomPdfViewer';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [pdfFile, setPDFFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility
  const navigate = useNavigate();

  // Load PDF from localStorage when the component mounts
  useEffect(() => {
    const savedPdf = localStorage.getItem('savedPdf');
    if (savedPdf) {
      setViewPdf(savedPdf);
      setPDFFile(savedPdf); // Assuming you want to keep the file for other operations
    }
  }, []);

  const fileType = ['application/pdf'];
  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = (e) => {
        localStorage.setItem('savedPdf', e.target.result); // Save the PDF data to localStorage
        setPDFFile(e.target.result);
        setViewPdf(e.target.result);
      };
    } else {
      console.log("Please select a PDF file.");
      setPDFFile(null);
      setViewPdf(null);
      localStorage.removeItem('savedPdf'); // Clear the saved PDF if the new file is invalid
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true); // Show the alert on form submission
  };

  const returnToAdmin = () => {
    navigate('/Admin'); // Adjust this to your desired route
  };

  // Corrected coolAlert function implementation
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
      <p>The pdf below will now be displayed on the home screen.</p>
      <div className="pdf-container">
        {viewPdf && <CustomPdfViewer fileUrl={viewPdf} />}
        {!viewPdf && <>No PDF selected</>}
      </div>
    </div>
  );
};

export default News;
