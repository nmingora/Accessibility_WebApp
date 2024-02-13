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
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#FFFFFF' }}>
          
          {/* About Us */}
          <div style={{ position: 'relative', width: '60%', margin: '0 auto', textAlign: 'center', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: 400, fontSize: '3em', lineHeight: '130%', color: '#426B1F', marginTop: '5%' }}>About Us</div>
          
          {/* Welcome message */}
          <div style={{ position: 'relative', width: '80%', margin: '0 auto', textAlign: 'center', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: 400, fontSize: '1.5em', lineHeight: '130%', color: '#000000', marginTop: '3%' }}>Welcome to Uptown! Join our interactive and intuitive server, where you have the ability to chat with friends, check news updates, keep up-to-date with events and way more!</div>
          
          {/* Newsletter */}
          <div style={{ position: 'relative', width: '60%', margin: '0 auto', textAlign: 'center', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: 400, fontSize: '3em', lineHeight: '130%', color: '#426B1F', marginTop: '5%' }}>Newsletter</div>
          
          {/* Rectangle 6 */}
          <div style={{ position: 'relative', width: '90%', margin: '0 auto', height: '30vh', background: '#D9D9D9', marginTop: '5%' }}></div>
          
          {/* Updates */}
          <div style={{ position: 'relative', width: '60%', margin: '0 auto', textAlign: 'center', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: 400, fontSize: '3em', lineHeight: '130%', color: '#426B1F', marginTop: '5%' }}>Updates</div>
          
          {/* No updates message */}
          <div style={{ position: 'relative', width: '80%', margin: '0 auto', textAlign: 'center', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: 400, fontSize: '1.5em', lineHeight: '130%', color: '#000000', marginTop: '3%' }}>No updates at this time</div>
          
        </div>
        </Layout>
      );
      
    }
        
  
  export default Home;
  
