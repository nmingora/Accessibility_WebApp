import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css'; // Import the CSS file
import logoImage from '../Images/logo_noName.png';

function Layout({ children }) {
    const navigate = useNavigate();
    const navigateHome = () => navigate('/');
    const navigateLogin = () => navigate('/Login');
    const navigateSignUp = () => navigate('/SignUp');
    const navigateAdminPortal = () => navigate('/Admin');
    const navigateParentPortal = () => navigate('/Parent');
    const navigateStudentPortal = () => navigate('/StudentName');
    const navigateMyProfile = () => navigate('/MyProfile');
    const navigateGallery = () => navigate('/Gallery');
    const navigateAboutUs = () => navigate('/AboutUs');

    // unused
    const navigateNews = () => navigate('/News');
    const navigateForumPosts =() => navigate('/ForumPosts');

    return (
        <div className="container">
            {/* Header */}
            <div className="header">
                {/* UPTOWN */}
                <div className="logo">UPTOWN</div>

                {/* Navigation Links */}
                <div className="nav-links">
                    <a href="#" onClick={navigateHome}>Home</a>
                    <a href="#" onClick={navigateAboutUs}>About Us</a>
                    <a href="#" onClick={navigateGallery}>Gallery</a>
                    <a href="#" onClick={navigateLogin}>Log In</a>
                    <a href="#" onClick={navigateParentPortal}>Parent Portal</a>
                    <a href="#" onClick={navigateAdminPortal}>Admin Portal</a>
                    <a href="#" onClick={navigateStudentPortal}>Student Portal</a>
                </div>

                {/* Sign Up Button */}
                <div className="cartButtonStyle">
                    <a href="#" className="buttonTextStyle" onClick={navigateSignUp}>
                        Sign Up
                    </a>
                </div>
            </div>

            <main className="main-content">
                {children} {/* This is where the specific page content will go */}
            </main>
        </div>
    );
}

export default Layout;