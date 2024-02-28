import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const Parent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');


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
      } else {
        setLoginMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setLoginMessage('Failed to connect to the server.');
    }
  };

  return (
    <Layout>
    <div>
      <h2>Parent Login</h2>
      <h3>Welcome Parent! Please log in the view parent dashboard</h3>

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
      {loginMessage && <p>{loginMessage}</p>}
    </div>
    </Layout>
  );
};

export default Parent;


