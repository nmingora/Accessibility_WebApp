import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import "./Parent.css";
import EventCalendar from "./EventCalendar";
const BASE_URL = process.env.REACT_APP_BACKEND_URL;  // Importing from the src directory

const Parent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state to track login status


  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  //   setIsLoggedIn(loggedIn);
  // }, []);


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
    const response = await fetch(`${BASE_URL}/api/uptown/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setLoginMessage(`You are logged in as ${data.userData.fName} ${data.userData.lName}`);
      setIsLoggedIn(true); // Set login status to true
      localStorage.setItem('isLoggedIn', 'true'); // Store login state in localStorage
      localStorage.setItem('accessToken',data.accessToken);
      localStorage.setItem('refreshToken',data.refreshToken);
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
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  navigate('/Parent'); // Redirect to login page or another appropriate page
};






// const toViewPDFs = () => {
//   console.log('Setting userEmail in localStorage:', username);
// localStorage.setItem('userEmail', username);
// navigate('/ViewPDFs');
// }

  
const toForumPosts = () => {
  console.log('Setting userEmail in localStorage:', username);
//localStorage.setItem('userEmail', username);
navigate('/ForumPosts');
}
  

const toViewPDFs = () => {
  console.log('Setting userEmail in localStorage:', username);
//localStorage.setItem('userEmail', username);
navigate('/ViewPDFs');
}

const toAddChildPage = () => {
  console.log('going to child add page')
  navigate('/addChildPage');
}
  

return (
  <Layout>
    <div className="parent-login-container">
      {!isLoggedIn ? (
        <>
          <h2 className="parent-login-title">Parent Login</h2>
          <h3 className="parent-login-description">Welcome Parent! Please Log In To View The Parent Dashboard!</h3>
          <form className="login-form" onSubmit={handleLogin}>
            <div>
              <label className="username-css">Username:</label>
              <input
                className="login-input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="password-css">Password:</label>
              <input
                className="login-input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-button-container">
              <button className="login-button" type="submit">Login</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h3 className="welcome-text">Welcome Parent! Feel Free To Use The Community Forum!</h3>
          {/* Add your sidebar toggle button here */}
          <div class="centered-button-container">
          <button className="community-button" onClick={handleLogout}>Logout</button>
          <button className="community-button" onClick={toForumPosts}>Go to Community Forum!</button>
          <button className="community-button" onClick={toViewPDFs}>See Community Documents</button>
          <button className="community-button" onClick={toAddChildPage}>Join your child</button>
          </div>
        </>
      )}
      {loginMessage && <p className="login-message">{"loginMessage"}</p>}
    </div>
  </Layout>
);
}
export default Parent;