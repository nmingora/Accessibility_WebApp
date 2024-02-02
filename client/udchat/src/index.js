import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './index.css'
import './Components/Home.css';
import './Components/NavBar.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
