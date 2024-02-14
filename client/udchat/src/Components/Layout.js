import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css'; // Assuming rename Home.css to Layout.css
import logoImage from '../Images/logo_noName.png';

function Layout({ children }) {
    const navigate = useNavigate();
    const navigateHome = () => navigate('/');
    const navigateLogin = () => navigate('/Login');
    const navigateSignUp = () => navigate('/SignUp');
    const navigateAdminPortal = () => navigate('/Admin');
    const navigateParentPortal = () => navigate('/Parent');
    const navigateMyProfile = () => navigate('/MyProfile');
    const navigateNews = () => navigate('/News');


    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#FFFFFF' }}>
          
          {/* Header */}
          <div style={{ position: 'relative', height: '10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            {/* UPTOWN */}
            <div style={{ flex: '0 0 auto', fontFamily: 'Newsreader', fontStyle: 'normal', fontWeight: 500, fontSize: '2.5em', lineHeight: '100%', letterSpacing: '-0.01em', color: '#000000', padding: '10px', marginLeft: '20px' }}>UPTOWN</div>
            
            {/* Navigation Links */}
            <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '20px' }}>
            <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }} onClick={navigateHome}>Home</a>
              <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }} onClick={navigateLogin}>Log In</a>
              <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }} onClick={navigateParentPortal}>Parent Portal</a>
              <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }} onClick={navigateAdminPortal}>Admin Portal</a>
              <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }} onClick={navigateMyProfile}>My Profile</a>
            </div>
            
            {/* Cart button (Sign Up) */}
            <div style={{ flex: '0 0 auto', height: '100%', background: '#426B1F', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
              <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 600, fontSize: '1.1em', lineHeight: '130%', color: '#FFFFFF' }} onClick={navigateSignUp}>Sign Up</a>
            </div>
            
          </div>
            <main className="main-content">
                {children} {/* This is where the specific page content will go */}
            </main>
        </div>
    );
}

export default Layout;
