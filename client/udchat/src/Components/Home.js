import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './Home.css'; // Importing the CSS file
import logoImage from '../Images/logo_noName.png'; // Importing the logo image
import Layout from './Layout';

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
  
    // ----------------------------------------SIDEBAR FUNCTIONALITY--------------------------------------
  
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
  
    // ----------------------------------------NEWS AND ANNOUNCEMENTS------------------------------------
  
  
  
    // ----------------------------------------AUTHENTICATER/LOGIN/--------------------------------------
  
  
  
    
  
    // *********************************************************
  
    // NEED TO ADD MODULAR LAYOUT ANCHORS TO HOME PAGE. ALL OTHER PAGES HAVE IT ALREADY
  
    // *********************************************************
  
    return (
      <Layout>
        <div className="home-page-container">
        <div className="section-title">About Us</div>
        <div className="section-content">Welcome to Uptown! Join our interactive and intuitive server, where you have the ability to chat with friends, check news updates, keep up-to-date with events and way more!</div>
        <div className="section-title">Newsletter</div>
        <div className="rectangle"></div>
        <div className="section-title">Updates</div>
        <div className="section-content">No updates at this time</div>
      </div>
        </Layout>
      );
      
    }
        
  
  export default Home;
  
