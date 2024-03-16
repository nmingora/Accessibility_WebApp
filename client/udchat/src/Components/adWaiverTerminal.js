// AdWaiversTerminal.js
import React, { useState, useEffect } from 'react';
import './adWaiverTerminal.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const AdWaiversTerminal = () => {
const navigate = useNavigate();
const [isModalOpen, setIsModalOpen] = useState(false);
const [pdfWaivers, setPdfWaivers] = useState([]); // State to store the fetched documents

  const [pdfName, setPdfName] = useState('');
  const [pdfType, setPdfType] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null); // State to handle the displayed PDF






  const toAdmin = () => {
    navigate("/Admin");
  }


  useEffect(() => {
    // Function to fetch all PDF waivers
    const fetchPdfWaivers = async () => {
      try {
        const response = await axios.get('/api/pdfWaivers/getAll');
        setPdfWaivers(response.data); // Set the fetched documents in state
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchPdfWaivers(); // Call the function to fetch documents
  }, []);




  const handlePdfNameChange = (e) => {
    setPdfName(e.target.value);
  };

  const handlePdfTypeChange = (e) => {
    setPdfType(e.target.value);
  };

  const handlePdfFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  
  const handleDisplayPdf = (pdfId) => {
    // Set the URL to the backend endpoint that serves the PDF
    const pdfUrl = `/api/pdfs/${pdfId}`;
    setViewPdf(pdfUrl);
  };
  


  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdfName', pdfName);
    formData.append('pdfType', pdfType);
    formData.append('uploadedBy', 'admin');
    formData.append('pdfData', pdfFile);

    try {
        const response = await axios.post('/api/pdfWaivers/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
            // Assuming the server responds with status code 201 for a successful creation
            alert('PDF uploaded successfully!');
            setIsModalOpen(false); // Close the modal after successful upload
            // You might want to clear the form or update the list of documents here
            setPdfName('');
            setPdfType('');
            setPdfFile(null);
          } else {
            // If the server's response status code is not 201, consider it a failure
            alert('Upload failed, please try again.');
          }
        } catch (error) {
          console.error(error);
          alert('An error occurred while uploading the PDF. Please try again.');
        }
      };
      


      const downloadFile = (pdfData, pdfName) => {
        // Convert binary data to a Blob and create a link to download the file
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = pdfName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl); // Clean up the URL object
      };
    
      
      
      
      
      
      
      
    
  


  return (
    <div className="container">
      <h1 className ="bigTitle">Shared Documents</h1>
      <div>
        <p></p>
        <button type="button" onClick={toAdmin}>Back to Admin Page</button>
        <p></p>
        </div>


        <div className="document-list">
        {pdfWaivers.map((waiver, index) => (
          <div className="document-item" key={index}>
            <strong>PDF Name:</strong> {waiver.pdfName}<br />
            <strong>PDF Type:</strong> {waiver.pdfType}, <strong>Shared By:</strong> {waiver.uploadedBy}<br />
            <button onClick={() => handleDisplayPdf(waiver._id)}>Display PDF</button>

          </div>
        ))}
      </div>

    
      <div className="pdf-viewer">
        {viewPdf ? (
          <iframe src={viewPdf} title="PDF Viewer" width="100%" height="500px"></iframe>
        ) : (
          <div className="rectangle">Select a PDF to view</div>
        )}
      </div>
    
    
    
  
  
  
  
  
  
  
  
      
      
      
      
      

     
      <div className="button-group">
      <div>
      <button onClick={() => setIsModalOpen(true)}>Share a New Document</button>


      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pdfName">PDF Name:</label>
          <input type="text" id="pdfName" value={pdfName} onChange={handlePdfNameChange} required />
        </div>

        <div className="form-group">
          <label>PDF Type:</label>
          <label><input type="radio" name="pdfType" value="Newsletter" checked={pdfType === 'Newsletter'} onChange={handlePdfTypeChange} /> Newsletter</label>
          <label><input type="radio" name="pdfType" value="Consent Form" checked={pdfType === 'Consent Form'} onChange={handlePdfTypeChange} /> Consent Form</label>
          <label><input type="radio" name="pdfType" value="Waiver" checked={pdfType === 'Waiver'} onChange={handlePdfTypeChange} /> Waiver</label>
          <label><input type="radio" name="pdfType" value="Policy Document" checked={pdfType === 'Policy Document'} onChange={handlePdfTypeChange} /> Policy Document</label>
          <label><input type="radio" name="pdfType" value="Other" checked={pdfType === 'Other'} onChange={handlePdfTypeChange} /> Other</label>
        </div>

        {/* The uploadedBy field can be a hidden input since it's always 'admin' */}
        <input type="hidden" name="uploadedBy" value="admin" />

        <div className="form-group">
          <label htmlFor="pdfFile">Upload PDF:</label>
          <input type="file" id="pdfFile" onChange={handlePdfFileChange} required />
        </div>
        
        <button type="submit">Upload PDF</button>
      </form>
      <button onClick={() => setIsModalOpen(false)}>Cancel</button>
    </div>
    
    
    
    
    
    
  





    
    
    
    
    
    
    






  </div>
)}

      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    </div>
      







        <button>EDIT SHARED DOCUMENTS</button>
        <button>VIEW RETURNED DOCUMENTS</button>
      </div>
    </div>
  );
};


export default AdWaiversTerminal;
