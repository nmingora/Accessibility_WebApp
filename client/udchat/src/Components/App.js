import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Login.js';
import Home from './Home.js';
import SignUp from './SignUp.js';
import Parent from './Parents.js';
import Admin from './Admin.js';
import MyProfile from './MyProfile.js';
import News from './News.js';
import AdminProcessApps from './AdminProcessApps.js';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/Parent" element={<Parent/>}/>
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="/MyProfile" element={<MyProfile/>}/>
        <Route path="/News" element={<News/>}/>
        <Route path="/AdminProcessApps" element={<AdminProcessApps/>}/>
      </Routes>
    </Router>
  );
}

export default App;
