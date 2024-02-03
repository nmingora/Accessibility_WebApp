import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Layout.css'; // Assuming rename Home.css to Layout.css
import logoImage from '../Images/logo_noName.png';

function Layout({ children }) {
    const navigate = useNavigate();
    const navigateLogin = () => navigate('/Login');
    const navigateSignUp = () => navigate('/SignUp');
    const navigateAdminPortal = () => navigate('/Admin');
    const navigateParentPortal = () => navigate('/Parent');

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <div className={`home-container ${isSidebarOpen ? 'shifted' : ''}`}>
            <div className="picture-header">
                <img src={logoImage} alt="Logo" style={{ width: '100%', height: '150px' }} />
            </div>
            <div className="menu-bar" onClick={toggleSidebar}>
                <div className="menu-icon">☰</div>
            </div>
            <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
                <button className="close-btn" onClick={toggleSidebar}>✖</button>
                <div className="sidebar-content">
                    <button onClick={navigateLogin}>Login</button>
                    <button onClick={navigateSignUp}>Sign up</button>
                    <button onClick={navigateAdminPortal}>Admin Portal</button>
                    <button onClick={navigateParentPortal}>Parent Portal</button>
                </div>
            </div>
            <main className="main-content">
                {children} {/* This is where the specific page content will go */}
            </main>
        </div>
    );
}

export default Layout;
