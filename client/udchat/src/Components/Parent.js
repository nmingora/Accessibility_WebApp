import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Parent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state to track login status


  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);


const navigate = useNavigate();
const navigateLogin = () => {
    navigate('/Login');
}
const navigateSignUp = () => {
    navigate('/SignUp');
}
const navigateAdminPortal = () => {
    navigate('/Admin');
}
const navigateParentPortal = () => {
    navigate('/Parent');
}
const navigateMyProfile = () => {
    navigate('/MyProfile');
}
const navigateStudentPortal = () => {
  navigate('/StudentName');

}


// ----------------------------------------SIDEBAR FUNCTIONALITY--------------------------------
const [isSidebarOpen, setSidebarOpen] = useState(false);
const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
};




const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('http://localhost:3005/api/uptown/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setLoginMessage(`You are logged in as ${data.fName} ${data.lName}`);
      setIsLoggedIn(true); // Set login status to true
      localStorage.setItem('isLoggedIn', 'true'); // Store login state in localStorage
    } else {
      setLoginMessage(data.message || 'Login failed');
    }
  } catch (error) {
    setLoginMessage('Failed to connect to the server.');
  }
};

const handleLogout = () => {
  setIsLoggedIn(false); // Reset login status
  setLoginMessage('');
  setUsername('');
  setPassword('');
  localStorage.removeItem('isLoggedIn'); // Remove login state from localStorage
  navigate('/Parent'); // Redirect to login page or another appropriate page
};










  
const toForumPosts = () => {
  console.log('Setting userEmail in localStorage:', username);
localStorage.setItem('userEmail', username);
navigate('/ForumPosts');
}
  

  return (

    <Layout>
    <div>
      <h2>Parent Login</h2>
      <h3>Welcome Parent! Please log in to view the parent dashboard</h3>

      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <>
        <button onClick={handleLogout}>Logout</button> // Logout button visible only when logged in
        <button onClick={toForumPosts}>Go to Community Forum!</button>
         </>

      )}
      {loginMessage && <p>{loginMessage}</p>}
      
    </div>
  </Layout>
);
};

    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
  

export default Parent;



