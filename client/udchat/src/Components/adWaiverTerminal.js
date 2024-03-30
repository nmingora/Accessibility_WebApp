// AdWaiversTerminal.js
import React, { useState, useEffect } from 'react';
import './adWaiverTerminal.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './Layout';





const AdWaiversTerminal = () => {


  
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
      downloadLink.setAttribute('download', `downloaded_pdf_${pdfId}.pdf`); // You can customize the download file name
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
      alert('Failed to download the PDF. Please try again.');
    }
  };
  


  









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
  


  const handleDeletePdf = async (pdfId) => {
    try {
      const response = await axios.delete(`/api/pdfWaivers/delete/${pdfId}`);
      if (response.status === 200) {
        alert('Waiver deleted successfully');
        // Filter out the deleted waiver from the pdfWaivers state
        setPdfWaivers(pdfWaivers.filter(waiver => waiver._id !== pdfId));
      }
    } catch (error) {
      console.error('Error deleting the waiver:', error);
      alert('Failed to delete the waiver. Please try again.');
    }
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
    <Layout>
    <div className="container">
      <p></p>
      <p></p>
      <h2 style={{ color: 'black', fontWeight: 'bold', fontSize: '30px', textAlign: 'center' }}>Document Sharing Portal</h2>

      <button className = "share-document-button" type="button" onClick={toAdmin}>Back to Admin Page</button>
        {/* Cheer Application Forms Section */}
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
      <div>
        <p></p>
        
        <p></p>
        </div>

        <h2 style={{ color: 'black', fontWeight: 'bold' }}>Other Documents</h2>
        <button className = "share-document-button" onClick={() => setIsModalOpen(true)}>Share a New Document</button>
        <div className="document-list">
        {pdfWaivers.map((waiver, index) => (
          
          
          <div className="document-item" key={index}>
            <strong className="bold-and-big" >PDF Name:</strong> {waiver.pdfName}<br />
            <strong className="bold-and-big" >PDF Type:</strong> {waiver.pdfType}, <strong>Shared By:</strong> {waiver.uploadedBy}<br />
          
            // In your map function where you render each PDF waiver
            <button className = "share-document-button" onClick={() => handleDownloadPdf(waiver._id)}>Download PDF</button>






            <button className = "share-document-button" onClick={() => handleDeletePdf(waiver._id)} style={{ marginLeft: '10px' }}>Delete</button>
          </div>
        ))}

      </div>

    
      
    
    
    
  
  
  
  
  
  
  
  
      
      
      

     
      <div className="button-group">
      <div>
      


      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
    <h2>Upload New PDF!</h2>
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
        
        <button className = "share-document-button" type="submit">Upload PDF</button>
      </form>
      <button className = "share-document-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
    </div>
    
    
    
    
    
    
  





    
    
    
    
    
    
    






  </div>
)}

      
      
    </div>
      
<p></p>

<p>

</p>
<p></p>
       
      </div>
    </div>
    </Layout>
  );
  
};


export default AdWaiversTerminal;
