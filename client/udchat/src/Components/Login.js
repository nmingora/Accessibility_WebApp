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
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#FFFFFF' }}>
      
      {/* Header */}
      <div style={{ position: 'relative', height: '10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* UPTOWN */}
        <div style={{ flex: '0 0 auto', fontFamily: 'Newsreader', fontStyle: 'normal', fontWeight: 500, fontSize: '2.5em', lineHeight: '100%', letterSpacing: '-0.01em', color: '#000000', padding: '10px', marginLeft: '20px' }}>UPTOWN</div>
        
        {/* Navigation Links */}
        <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '20px' }}>
            <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }}>Log In</a>
            <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }}>Parent Portal</a>
            <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }}>Admin Portal</a>
            <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 400, fontSize: '1em', lineHeight: '130%', color: '#000000', marginRight: '20px' }}>My Profile</a>
          </div>
        
        {/* Cart button (Sign Up) */}
        <div style={{ flex: '0 0 auto', height: '100%', background: '#426B1F', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
          <a href="#" style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: 600, fontSize: '1.1em', lineHeight: '130%', color: '#FFFFFF' }}>Sign Up</a>
        </div>
        
      </div>
      
      {/* Log In */}
      <div style={{ position: 'absolute', width: '505px', height: '63px', left: '20%', transform: 'translateX(-50%)', top: '136px', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: '400', fontSize: '48px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#426B1F' }}>
        Log In
      </div>

      {/* Username */}
      <div style={{ position: 'absolute', width: '125px', height: '37px', left: '40px', top: '242px', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: '400', fontSize: '24px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#000000' }}>
        Username:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginLeft: '10px' }} />
      </div>

      {/* Password */}
      <div style={{ position: 'absolute', width: '125px', height: '43px', left: '40px', top: '295px', fontFamily: 'Jacques Francois', fontStyle: 'normal', fontWeight: '400', fontSize: '24px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#000000' }}>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginLeft: '10px' }} />
      </div>

      {/* Yellow Cart button with Student */}
      <button style={{ position: 'absolute', width: '94px', height: '30px', left: '40px', top: '381px', background: '#C5BE1E', borderRadius: '8px' }}>
        <div style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '600', fontSize: '16px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
          Student
        </div>
      </button>

      {/* Pink Cart button with Admin */}
      <button style={{ position: 'absolute', width: '94px', height: '30px', left: '160px', top: '381px', background: '#0500FD', borderRadius: '8px' }}>
        <div style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '600', fontSize: '16px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
          Admin
        </div>
      </button>

      {/* Blue Cart button with Parent */}
      <button style={{ position: 'absolute', width: '94px', height: '30px', left: '280px', top: '381px', background: '#FA00FF', borderRadius: '8px' }}>
        <div style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '600', fontSize: '16px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
          Parent
        </div>
      </button>
      
    {/* Login button */}
    <button style={{ position: 'absolute', width: '94px', height: '30px', left: '380px', top: '450px', background: '#426B1F', borderRadius: '8px' }} onClick={handleLogin}>
    <div style={{ fontFamily: 'Inter', fontStyle: 'normal', fontWeight: '600', fontSize: '16px', lineHeight: '130%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
      Login
    </div>
  </button>
  
  {/* Error message */}
  {errorMessage && (
    <div style={{ position: 'absolute', top: '500px', left: '20%', transform: 'translateX(-50%)', color: 'red' }}>
      {errorMessage}
    </div>
  )}
  
</div>


  );
};

export default Login;


 
