// StudentPortal.js
import React from 'react';
import Layout from './Layout';
import gameImg from './game.png';
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
