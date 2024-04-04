import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Layout from './Layout';
import gameImg from './game.png';
import './StudentPortal.css'; // Import the CSS for student portal

const StudentPortal = () => {
  const location = useLocation();
  const studentName = location.state?.studentName;

  return (
    <Layout>
      <div className="student-portal-container">
        <h1>Welcome {studentName}!</h1>
        <div className="content">
          {/* Use the student's name in the welcome message */}
          <p>Dear {studentName},</p>
          <p>Welcome to your fun and colorful Student Portal!</p>
          <p>Here you can explore, learn, and have fun!</p>
          <p>Enjoy your time here!</p>
          {/* Link to the matching game */}
          <div className="game-link">
            <a href="/StudentGame1">
              <img src={gameImg} alt="Matching Emojis Game" />
              <p>Matching Game</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentPortal;
