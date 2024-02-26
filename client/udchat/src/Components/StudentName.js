// NameSelectionPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './StudentName.css'; // Import the CSS file for styling
import Layout from './Layout';


const NameSelectionPage = () => {
  return (
    <Layout>
    <div className="student-login-container">
      <h1>Select Your Name</h1>
      <h2>Choose your name from the list below:</h2>
      <div className="image-grid">
        {/* Example: List of names with links */}
        <ul>
          <li><Link to="/StudentPassword">Student 1</Link></li>
          <li><Link to="/StudentPassword">Student 2</Link></li>
          {/* Add more names as needed */}
        </ul>
      </div>
    </div>
    </Layout>
  );
};

export default NameSelectionPage;
