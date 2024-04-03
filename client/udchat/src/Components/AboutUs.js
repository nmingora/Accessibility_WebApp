import React from 'react';
import Layout from './Layout';
import "./AboutUs.css";
import { BASE_URL } from '../config';  // Importing from the src directory
import { useNavigate } from 'react-router-dom';



const AboutUs = () => {
    return (
      <Layout>
        <div className="about-us">
            <h3>Hello?</h3>
        </div>
      </Layout>
    );
  };
  
  export default AboutUs;