import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './Login.js';
import Home from './Home.js';
import SignUp from './SignUp.js';
import Parent from './Parent.js';
import Admin from './Admin.js';
import StudentPassword from './StudentPassword.js'
import News from './News.js';
import AdminProcessApps from './AdminProcessApps.js';
import ForumPosts from './ForumPosts';
import StudentName from './StudentName.js';
import StudentPortal from './StudentPortal.js';
import StudentGame from './StudentGame1.js';
import ForumPostsAd from './ForumPostsAd.js';
import AdWaiversTerminal from './adWaiverTerminal.js';
import ViewPDFs from './ViewPDFs.js';
import Gallery from './Gallery.js';
import ChildPage from './addChildPage.js';
import AboutUs from './AboutUs.js';
import Members from './OrgMembers.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/Parent" element={<Parent/>}/>
        <Route path="/Admin" element={<Admin/>}/>
        <Route path="/StudentName" element={<StudentName/>}/>
        <Route path="/News" element={<News/>}/>
        <Route path="/addChildPage" element={<ChildPage/>}/>
        <Route path="/StudentPassword/:childId" element={<StudentPassword/>}/>
        <Route path="/StudentPortal" element={<StudentPortal />}/>
        <Route path="/StudentGame1" element={<StudentGame />}/>
        <Route path="/AdminProcessApps" element={<AdminProcessApps/>}/>
        <Route path="/ForumPosts" element={<ForumPosts/>}/>
        <Route path="/ForumPostsAd" element={<ForumPostsAd/>}/>
        <Route path="/AdWaiversTerminal" element={<AdWaiversTerminal/>}/>
        <Route path="/OrgMembers" element={<Members/>}/>
        <Route path="/ViewPDFs" element={<ViewPDFs/>}/>
        <Route path="/Gallery" element={<Gallery/>}/>
        <Route path="/AboutUs" element={<AboutUs/>}/>
      </Routes>
    </Router>
  );
}

export default App;
