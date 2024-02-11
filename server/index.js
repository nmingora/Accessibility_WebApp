const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3005;
const app = express();
const router = express.Router();

// Import database modules
const mysql = require('mysql');
const dbConfig = require('./googleConfig.js');
// Create a connection to the database
const connection = mysql.createConnection(dbConfig);
// Open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
})



//setup middleware to do logging
app.use((req, res, next, err) => { //for all routes
    next(); //keep going
    console.error(err.stack); //handle errors
    res.status(500).send('Something went wrong!');
});

//setup serving front-end code
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'static')));
// app.use('/', express.static('static'));

//install router at /api/uptown
app.use('/api/uptown', router);

//get list of all users who have signed up
router.route('/')
    .get((res, req) => {
        //implement after database is set up
        res.send('Hello World!');
    })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




// TESTING ENVIRONMENT - DATABASE CONNECTION AND CONFIG

// Endpoint to insert a a new user into the database easily
// This is NOT recommended for production or real applications.
// Example ONLY to understand HTTP methods.

app.get('/addUserUnsafe', (req, res) => {
    const { userid, name, email } = req.query;
    const sql = 'INSERT INTO users (userid, name, email) VALUES (?, ?, ?)';
    pool.query(sql, [userid, name, email], (error, results) => {
        if (error) {
            return res.status(500).send('Error adding user');
        }
        res.send(`User added with ID: ${results.insertId}`);
    });
});

