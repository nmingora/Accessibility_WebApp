import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Adjust the import path as necessary
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Import signOut
import "./Login.css";
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const Login = ({ onClose }) => {
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [loggedInUser, setLoggedInUser] = useState(null); // State to track logged-in user
  const navigate = useNavigate(); // Define useNavigate here

  const navigateToAdminPage = () => {
    navigate('/Admin'); // Navigate to the Admin page
  };

  const navigateToStudentPage = () => {
    navigate('/StudentName'); // Navigate to the Student page
  };

  const navigateToParentPage = () => {
    navigate('/Parent'); // Navigate to the Parent page
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before login attempt
    try {
      // Perform login logic here
      // Assuming successful login, navigate to the appropriate page based on user type
      navigateToAdminPage(); // For demonstration, always navigate to admin page after login
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      setLoggedInUser(null); // Reset the logged-in user state
      // Optionally, handle any actions after logout, like redirecting
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // If the user is logged in, show the logged-in message and logout button
  if (loggedInUser) {
    navigateToAdminPage(); // Redirect to the Admin page
  }

  // Login form
  return (
    <Layout>
      <div className="login-container">
        <div className="login-title">What Is Your Role?</div>
        <button className="user-type-button student-button" onClick={navigateToStudentPage}>Student</button>
        <button className="user-type-button admin-button" onClick={navigateToAdminPage}>Admin</button>
        <button className="user-type-button parent-button" onClick={navigateToParentPage}>Parent</button>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Login;



 
