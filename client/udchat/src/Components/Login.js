import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Adjust the import path as necessary
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Import signOut
import "./Login.css";
import Layout from './Layout';

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [loggedInUser, setLoggedInUser] = useState(null); // State to track logged-in user

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before login attempt
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoggedInUser(userCredential.user.email); // Set logged-in user's email
      onClose(); // Assume onClose is to close the login modal or navigate away
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
    return (
      <div className="login-container">
        <h1>You are now logged in as {loggedInUser}</h1>
        <button onClick={handleLogout}>Log Out</button> {/* Logout button */}
      </div>
    );
  }

  // Login form
  return (
    <Layout>
      <div className="login-container">
        <div className="login-title">Log In</div>
        <div className="input-container username-container">
          Username:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-container password-container">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="user-type-button student-button">Student</button>
        <button className="user-type-button admin-button">Admin</button>
        <button className="user-type-button parent-button">Parent</button>
        <button className="login-button" onClick={handleLogin}>Login</button>
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


 
