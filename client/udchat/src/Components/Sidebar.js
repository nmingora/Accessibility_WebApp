import './Sidebar.css';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";



function Sidebar(){


    //Side bar functionalities
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };


    //Navigation
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

  return (
    <div>
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
    </div>
  );
}

export default Sidebar;
