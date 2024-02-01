import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './Home.css'; // Importing the CSS file

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

    // ----------------------------------------SIDEBAR FUNCTIONALITY----------------------------------------

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };



    // ----------------------------------------NEWS AND ANNOUNCEMENTS----------------------------------





    // ----------------------------------------AUTHENTICATER/LOGIN/----------------------------------------

    return (
        <div className={`home-container ${isSidebarOpen ? 'shifted' : ''}`}>
            {/* Menu Bar */}
            <div className="menu-bar" onClick={toggleSidebar}>
                <div className="menu-icon">☰</div> {/* Menu icon */}
            </div>

            {/* Sidebar */}
            <div className={isSidebarOpen ? "sidebar open" : "sidebar"}>
                <button className="close-btn" onClick={toggleSidebar}>✖</button>
                <div className="sidebar-content">
                    <button onClick={navigateLogin}>Login</button>
                    <button onClick={navigateSignUp}>Sign up</button>
                    <button onClick={navigateAdminPortal}>Admin Portal</button>
                    <button onClick={navigateParentPortal}>Parent Portal</button>
                </div>
            </div>

            {/* Main Content */}
            <main className="main-content">
                {/* News Section */}
                <section className="news-section">
                    <h2>News</h2>
                    {/* News content goes here */}
                </section>

                {/* Updates Section */}
                <section className="updates-section">
                    <h2>Updates</h2>
                    {/* Updates content goes here */}
                </section>
            </main>
        </div>
    );
}

export default Home;
