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
app.use((req, res, next) => { //for all routes
    console.log(req.method, req.url)
    next(); //keep going
});

//connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
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






