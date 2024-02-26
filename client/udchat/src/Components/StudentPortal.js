// StudentPortal.js
import React from 'react';
import Layout from './Layout';
import './StudentPortal.css'; // Import the CSS for student portal

const StudentPortal = () => {
  return (
    <Layout>
      <div className="student-portal-container">
        <h1>Welcome to Student Portal</h1>
        <div className="content">
          <p>Dear Student,</p>
          <p>Welcome to your fun and colorful Student Portal!</p>
          <p>Here you can explore, learn, and have fun!</p>
          <p>Enjoy your time here!</p>
        </div>
      </div>
    </Layout>
  );
};

export default StudentPortal;
