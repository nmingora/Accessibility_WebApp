import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from "./Login";
import Home from "./Home.js";



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/Login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
  );
}


export default App;
