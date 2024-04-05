import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewPDF.css';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const ViewPDFs = () => {
  const [pdfWaivers, setPdfWaivers] = useState([]);




  const navigate = useNavigate();
  const navigateLogin = () => {
      navigate('/Login');
  }
  const navigateSignUp = () => {
      navigate('/SignUp');
  }
  const navigateAdminPortal = () => {
      navigate('/Admin');
  }
  const navigateParentPortal = () => {
      navigate('/Parent');
  }
  const navigateMyProfile = () => {
      navigate('/MyProfile');
  }
  const navigateStudentPortal = () => {
    navigate('/StudentName');
  
  }
  // ----------------------------------------SIDEBAR FUNCTIONALITY--------------------------------
const [isSidebarOpen, setSidebarOpen] = useState(false);
const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
};











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

  const handleDownloadPdf = async (pdfId) => {
    try {
      // Make a GET request to fetch the PDF
      const response = await axios.get(`/api/pdfWaivers/pdfs/${pdfId}`, { responseType: 'blob' });
      // Create a new Blob object using the response data
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      // Generate a URL for the Blob object
      const pdfUrl = URL.createObjectURL(pdfBlob);
      // Create a temporary link element and trigger the download
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfUrl;
      downloadLink.setAttribute('download', `downloaded_pdf_${pdfId}.pdf`); // You can customize the
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
      alert('Failed to download the PDF. Please try again.');
    }
  };
    

  return (
    <Layout>

    <div className="pdf-container">
      <p1 className= "community-header">Available PDFs</p1>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ color: 'black', fontWeight: 'bold' }}>Cheer Application Forms</h2>
        <ul>
        <li><a href="https://docs.google.com/document/d/1GbLAj8M7l4bvNb1Ljiis60jjp2myPwsi30-r5S9IxLU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007bff' }}>Photo / Video Consent Form</a></li>
        <li><a href="https://docs.google.com/document/d/1gL0ngKTv1L_JatlsQtNxpR8Km7WSkyxMvqJ4axz5ngY/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007bff' }}>Emergency Contact Form</a></li>
        <li><a href="https://docs.google.com/document/d/1GbLAj8M7l4bvNb1Ljiis60jjp2myPwsi30-r5S9IxLU/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007bff' }}>Participant Profile</a></li>
        <li><a href="https://drive.google.com/file/d/1tfAvM3N1_vVPeQNnJPSCZzcPpypDeoye/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007bff' }}>Rules & Guidelines</a></li>
        <li><a href="https://docs.google.com/document/d/1HK3m-dMIRXlUC_f0Mvy02WiULBoLTThw9saVUwg-tJY/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#007bff' }}>Code of Conduct</a></li>
          
          
          
          
        </ul>
      </div>

      {pdfWaivers.map((waiver, index) => (
        <div key={index} className="pdf-item">
          <p><strong>Name:</strong> {waiver.pdfName}</p>
          <p><strong>Type:</strong> {waiver.pdfType}</p>
          <p><strong>Uploaded By:</strong> {waiver.uploadedBy}</p>
          <button className = "community-button" onClick={() => handleDownloadPdf(waiver._id)}>Download PDF</button>
          
          
        </div>
      ))}
    </div>
    </Layout>
  );
};

export default ViewPDFs;