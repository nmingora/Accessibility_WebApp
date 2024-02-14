const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3005;
const app = express();
const router = express.Router();

//--------------------------- Google Cloud SQL Connection ---------------------------//
// Import database modules
const mysql = require('mysql2/promise');
const dbConfig = require('./googleConfig.js');
// Create a connection to the database
const connection = mysql.createConnection(dbConfig);
// Open the MySQL connection
async function initializeDatabase() {
    try{
        const connection = mysql.createConnection(dbconfig);
        console.log('Successfully connected to the database.');
        return connection;
    }
    catch (error) {
        console.error('Failed to connect to the database', error);
        throw error;
    }
}



// --------------------------- Middleware for Debugging ------------------------------//

//setup middleware to do logging
app.use((req, res, next) => { //for all routes
    console.log(req.method, req.url)
    next(); //keep going
});


// --------------------------- Base Route and Routes --------------------------------------------//

//setup serving front-end code
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'static')));
// app.use('/', express.static('static'));

//install router at /api/uptown
app.use('/api/uptown', router);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


// --------------------------- Express Endpoints -------------------------------------//



//users endpoint - tester
// app.post('/api/users', (req, res) => {
//     const {userid, name, email, create_time} = req.body;

//     const sql = 'INSERT INTO users (userid, name, email, create_time) VALUES (?, ?, ?)';
//     connection.query(sql, [userid, name, email, create_time], (err, results) => {
//         if(err) {
//             console.error('Error adding user:', error);
//             res.status(500).json({ error: 'An error occurred while adding user.' });
//         } else {
//             res.json({ message: 'User added successfully.' });
//         }
//     })
// })


//signup endpoint
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


// SENSITIVE DATA ENDPOINT -> THIS NEEDS TO BE SECURED VIA USER AUTHENTICATION !!!!!!!!!!!!!!!!!!!!!!!!
// ADMIN: Endpoint to retrieve all applications from the database

router.get('/admin/applications', async (req, res) => {
    try {
        const applications = await getAllApplications();
        res.json(applications);
    }
    catch (error) {
        console.error('Failed to fetch applications:', error);
        res.status(500).send('Error fetching applications');
    }

});




// -------------------------------- Backend Functions ------------------------------------------//


// function to get all the applications from the database
async function getAllApplications() {
    const connection = await initializeDatabase();
    const [results] = await connection.query('SELECT * FROM applications')
    return results;
}

