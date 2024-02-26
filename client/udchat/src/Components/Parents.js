import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';
import './Parents.css'; // Import the CSS for parent login

const Parent = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const navigateToParentPortal = () => {
    navigate('/Parent');
  };

  const goForumPosts = () => {
    navigate("/ForumPosts");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigateToParentPortal();
      onClose();
    } catch (error) {
      setErrorMessage('Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <Layout>
      <div className="parent-login-container">
        <h1>Parent Sign in</h1>
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
          <button type="button" onClick={goForumPosts}>Update Newsletter</button>
        </form>
      </div>
    </Layout>
  );
};

export default Parent;
