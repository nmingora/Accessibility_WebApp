// config.js
// This is only to change the url that the other components are sending requests to


// Determine the base URL dynamically
// For local development, it might be localhost; for production, it's the VM's external IP or domain
const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3005';
export { BASE_URL };

