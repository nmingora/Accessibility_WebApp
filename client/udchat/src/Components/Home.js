import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './Home.css'; // Importing the CSS file
import logoImage from '../Images/logo_noName.png'; // Importing the logo image
import Layout from './Layout';
import CustomPdfViewer from './CustomPdfViewer';

function Home() {
  
    // ----------------------------------------NAVIGATION FUNCTIONS----------------------------------------
    
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
  

   
    // ----------------------------------------SIDEBAR FUNCTIONALITY--------------------------------------
  
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
  
    // ----------------------------------------NEWS AND ANNOUNCEMENTS------------------------------------
  
  
  

  const [viewPdf, setViewPdf] = useState(null);

  // Fetch the PDF URL from localStorage when the component mounts
  useEffect(() => {
    const savedPdf = localStorage.getItem('savedPdf');
    if (savedPdf) {
      setViewPdf(savedPdf);
    }
  }, []);





  
    // ----------------------------------------AUTHENTICATER/LOGIN/--------------------------------------
  
  
  
    
  
    // *********************************************************
  
    // NEED TO ADD MODULAR LAYOUT ANCHORS TO HOME PAGE. ALL OTHER PAGES HAVE IT ALREADY
  
    // *********************************************************
  
    return (
      <Layout>
        <div className="home-page-container">
        <div className="section-title">About Us</div>
        <div className="section-content">Welcome to Uptown! Join our interactive and intuitive server, where you have the ability to chat with friends, check news updates, keep up-to-date with events and way more!</div>
        <div className="section-title">Contact Us!</div>
        <p>Email Us At: <a href="mailto:: ongoinglivinglearning@gmail.com">ongoinglivinglearning@gmail.com</a></p>
        <p>Our Address: 8685 Rockglen Rd. Arkona ON, N0M 1B0</p>
        <p><a href="https://www.facebook.com/cheer.2023?mibextid=PzaGJu">Cheer Group Facebook</a></p>
        <p><a href="https://www.facebook.com/familyconnectionscheer?mibextid=ZbWKwL">Cheer Connections Facebook</a></p>
        <p><a href="https://www.facebook.com/people/Roxys-Mini-Golf-and-Cheer-Canteen/100057044577232/?mibextid=ZbWKwL">Cheer Works Facebook</a></p>

        
        <div className="section-title">Newsletter</div>
        {viewPdf ? (
          <CustomPdfViewer fileUrl={viewPdf} />
        ) : (
          <div className="rectangle">Newsletter not available</div>
        )}
        <div className="section-title">Updates</div>
        <div className="section-content">No updates at this time</div>
      </div>
        </Layout>
      );
      
    }
        
  
  export default Home;
  

