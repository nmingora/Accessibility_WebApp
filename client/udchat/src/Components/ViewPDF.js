import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewPDF.css';

const ViewPDFs = () => {
  const [pdfWaivers, setPdfWaivers] = useState([]);

  useEffect(() => {
    const fetchPdfWaivers = async () => {
      try {
        const response = await axios.get('/api/pdfWaivers/getAll');
        setPdfWaivers(response.data);
      } catch (error) {
        console.error('Error fetching PDF waivers:', error);
      }
    };

    fetchPdfWaivers();
  }, []);

  const downloadFile = async (id, pdfName) => {
    try {
      const response = await axios.get(`/api/pdfs/${id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdfName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };

  return (

    <div className="pdf-container">
      <h1>Available PDFs</h1>
      {pdfWaivers.map((waiver, index) => (
        <div key={index} className="pdf-item">
          <p><strong>Name:</strong> {waiver.pdfName}</p>
          <p><strong>Type:</strong> {waiver.pdfType}</p>
          <p><strong>Uploaded By:</strong> {waiver.uploadedBy}</p>
          <button onClick={() => downloadFile(waiver._id, waiver.pdfName)}>
            Download PDF
          </button>
        </div>
      ))}
    </div>
  );
};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  


export default ViewPDFs;
