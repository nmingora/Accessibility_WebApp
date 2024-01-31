import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from "./Login";
import Home from "./Home.js";
import SignUp from "./SignUp.js";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}


export default App;
