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

//setup serving front-end code
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'static')));
// app.use('/', express.static('static'));

//install router at /api/uptown
app.use('/api/uptown', router);

//users endpoint
app.post('/api/users', (req, res) => {
    const {userid, name, email, create_time} = req.body;

    const sql = 'INSERT INTO users (userid, name, email, create_time) VALUES (?, ?, ?)';
    connection.query(sql, [userid, name, email, create_time], (err, results) => {
        if(err) {
            console.error('Error adding user:', error);
            res.status(500).json({ error: 'An error occurred while adding user.' });
        } else {
            res.json({ message: 'User added successfully.' });
        }
    })
})

app.post('/signup', (req, res) => {
    const {email, password} = req.body;

    const sql = 'INSERT INTO signedUpUser (email, passwords) VALUES (?, ?)';
    connection.query(sql, [email, password], (error) => {
        if(error) {
            console.error('Error signing up user: ', error);
            res.status(500).json({error: 'An error occured while signing up user.'});
        } else {
            res.json({message: 'User signed up successfully.'});
        }
    });
});

//get list of all users who have signed up
router.route('/')
    .get((res, req) => {
        //implement after database is set up
        res.send('Hello World!');
    })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});






