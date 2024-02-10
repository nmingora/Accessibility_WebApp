import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Adjust the import path as necessary
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Import signOut
import Layout from './Layout';
 
const AdminLogin = ({ onClose }) => {
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
        <h1>Sign in Here</h1>
        <p>This page is for admin personel.</p>
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            />
            <button type="submit">Log In</button>
        </form>
        </div>

        </Layout>

  );
};
 
export default AdminLogin;
 
