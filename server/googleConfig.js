// googleConfig.js
require('dotenv').config(); // Make sure to install dotenv if you haven't already

const dbConfig = {
  host: process.env.DB_HOST || '34.130.183.208', // Public IP Address
  user: process.env.DB_USER || 'root', // Your database user
  password: process.env.DB_PASSWORD || 'shaimaa', // Your database password
  database: 'TEST-Database', // Name of the database you want to connect to
  port: 3306, // Default port for MySQL
};

module.exports = dbConfig;
