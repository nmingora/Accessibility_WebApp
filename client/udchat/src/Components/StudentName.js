import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StudentName.css'; // Make sure this CSS file is linked correctly
import Layout from './Layout';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const NameSelectionPage = () => {
  const [children, setChildren] = useState([]);

  const fetchChildren = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/uptown/child`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const children = await response.json();
      setChildren(children);
    } catch (error) {
      console.error("There was a problem with the fetch operation: ", error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  return (
    <Layout>
      <div className="name-selection-container">
        <h1 className="section-title">Select Your Name</h1>
        <p className="section-content">Choose your name from the list below:</p>
        <ul className="name-list">
          {children.map((child) => (
            <li key={child.id} className="name-item">
              <Link to={`/StudentPassword/${child.id}`} className="name-link">{child.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default NameSelectionPage;
