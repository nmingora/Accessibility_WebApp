
const express = require("express");
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 3005;
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//setup middleware to do logging
app.use((req, res, next) => { //for all routes
    console.log(req.method, req.url)
    next(); //keep going
});

//--------------------------- Google Cloud SQL Connection ---------------------------//
// Import database modules
const mysql = require('mysql2/promise');
const dbConfig = require('./googleConfig.js');
// Create a connection to the database
const connection = mysql.createConnection(dbConfig);
// Open the MySQL connection
async function initializeDatabase() {
    try {
        const connection = mysql.createConnection(dbConfig);
        console.log('Successfully connected to the database.');
        return connection;
    }
    catch (error) {
        console.error('Failed to connect to the database', error);
        throw error;
    }
}

// --------------------------- Middleware for Debugging ------------------------------//





// --------------------------- Base Route and Routes --------------------------------------------//



//install router at /api/uptown <-----> ROUTER ROUTER ROUTER ROUTER
app.use('/api/uptown', router);







//------------------------------Nodemailer----------------------------//

//for parents to make account for campers
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS, // gmail email address
        pass: process.env.EMAIL_PASSWORD, // gmail password
    },
});

// Send email function
const sendEmail = async (to, subject, text) => {
    try {
        // Send mail with defined transport object
        await transporter.sendMail({
            from: process.env.EMAIL_ADDRESS, // Sender address
            to, // List of recipients
            subject, // Subject line
            text, // Plain text body
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};






// --------------------------- Express Endpoints -------------------------------------//



//signup endpoint
router.post("/SignUp", async (req, res) => {
    const connection = await initializeDatabase();
    try {
        
        const { fName, lName, username, pass, email, contact, DOB, addr, notes } = req.body;
        console.log(req.body)
        const insertData = [fName, lName, username, pass, email, contact, DOB, addr, notes, 1, 'Pending', new Date()];

        console.log('heree2') //debug

        const sql = 'INSERT INTO Application (fName,lName,username,pass,email,contact,DOB,addr,notes,reviewingAdmin, status, dateApplied) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        connection.query(sql, insertData, (err, result) => {
            if (err) {
                console.error('Error adding user:', error);
                res.status(500).json({ error: 'An error occurred while adding user.' });
            } else {
                res.json({ message: 'Application successfully submitted! An admin will contact you.' });
            }
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json({ "message": "(500) Unexpected error occured during submission" })
    } finally {
        connection.end();
    }
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


// ENDPOINT TO RETRIEVE THE USER ID OF THE PARENT WHO'S PROFILE WAS APPROVED BY THE ADMIN

router.post('/accept-application', async (req, res) => {
    try {
        const { id } = req.body;

        // call function to update the status of the application
        await setApplicationStatus(id, 'approved');
        // call function to create the parent's account
        await createParent(id);



    } catch (error) {
        console.error('Failed to retrieve application ID: ', error);
    }
});

// ENDPOINT TO RETRIEVE THE USER ID OF THE PARENT WHOS PROFILE WAS REJECTED BY THE ADMIN
router.put('/reject-application', async (req, res) => {
    try {
        const {id} = req.body;

        await setApplicationStatus(id, 'rejected');
    } catch (error) {
        console.error("Failed to retrieve the rejected application's id, here's why: ", error);
    }
});

// Route to handle child account setup
router.post('/setup-child-account', (req, res) => {
    const { parentEmail, childName, childPassword } = req.body;
    const parentQuery = `SELECT * FROM Parents WHERE email = ?`;
    pool.execute(parentQuery, [parentEmail], (parentError, parentResults) => {
        if (parentError) {
            console.error('Error finding parent:', parentError);
            return res.status(500).send('Internal server error');
        }
        if (parentResults.length === 0) {
            return res.status(404).send('Parent not found');
        }
        const studentQuery = `INSERT INTO Camper (name, password) VALUES (?, ?)`;
        pool.query(studentQuery, [childName, childPassword], (studentError, studentResults) => {
            if (studentError) {
                console.error('Error setting up child account:', studentError);
                return res.status(500).send('Internal server error');
            }
            res.status(201).send('Child account setup completed successfully');
        });
    });
});


//------------------------------Retrieve Parent Username and password_____________________________________
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming passwords are stored in plain text (which is not recommended for production)
        if (user.pass !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Login successful
        res.json({ message: 'You are logged in', fName: user.fName, lName: user.lName });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error during login');
    }
});


// -------------------------------- Backend Functions ------------------------------------------//


// function to get all the applications from the database
async function getAllApplications() {
    const connection = await initializeDatabase();
    const [results] = await connection.query('SELECT * FROM Application')
    return results;
}


// function to create the parent account when given the user id
async function createParent(id) {
    // Initialize database connection
    const connection = await initializeDatabase();

    let accountData; // Define outside of any one specific try/catch block to be accessible throughout function

    // Retrieve all the attribute values for the application which concern Parent account creation -> so much data!
    try {
        const retrieveQuery = 'SELECT username, pass, fName, lName, email, DOB, contact, addr FROM Application WHERE appID = ?';
        const values = [id];
        const [rows] = await connection.query(retrieveQuery, values);
        // if rows is greater than 0, means it should return 1 row
        if (rows.length > 0) {
            accountData = rows[0];
        } else {
            console.log('There is no data to be found for the given ID');
            // escape when the data isn't found
            return;
        }
    } catch (error) {
        console.error("Failed to retrieve the application information, here's why: ", error);
    }

    // Now to INSERT the new data into the Parent table with the correct tables
    try {
        const insertQuery = 'INSERT INTO Parent (username, pass, fName, lName, email, DOB, contact, addr) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        values = [accountData.username, accountData.pass, accountData.fName, accountData.lName, accountData.email, accountData.DOB, accountData.contact, accountData.addr]
        const insertResult = await connection.query(insertQuery, values);

        console.log("Insertion result", insertResult);
    } catch (error) {
        console.error("Failed to INSERT the new Parent object into the Parent table, here's why: ", error);
    } finally {
        await connection.end();
    }

}


// function to set the applicaiton status of a newly created user account
async function setApplicationStatus(id, status) {
    const connection = await initializeDatabase();

    // sql to set the value of the application with
    try {
        const query = `UPDATE Application SET status = ? WHERE appID = ?`;
        const values = [status, id];
        const result = await connection.query(query, values);
        console.log(result);
    }
    catch (error) {
        console.error('Changing the application status in the db query failed, here`s why: ', error);
    }

    // Close the database connection here to prevent unnecesary transmission traffic -> Not sure if that makes sense but it seems like good practice
    try {
        connection.end();
    }
    catch (error) {
        console.error("Database failed to close the connection, here's why: ", error);
    }

}


//login checka, checks username with pass

async function findUserByUsername(username) {
    const connection = await initializeDatabase();

    try {
        const query = 'SELECT * FROM Parent WHERE username = ?';
        const [rows] = await connection.execute(query, [username]);

        if (rows.length > 0) {
            return rows[0]; // Return the first matching user
        } else {
            return null; // No user found
        }
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}











// ------------------------- KEEP THIS AS LAST -> MUST BE AFTER ENDPOINTS ------------------------------- //


//setup serving front-end code
app.use(express.static(path.join(__dirname, '../client/udchat/build')));


// Finally, the catch-all handler to serve your React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/udchat/build/index.html'));
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});















//signup endpoint

// const { fName, lName, username, password, email, phoneNumber, dob, address, notes } = req.body;
//         const insertData = [fName, lName, username, password, email, phoneNumber, dob, address, notes, 'NULL', new Date(), 'Pending'];
//         validApplication = false;

//         console.log('heree2') //debug

//         const sql = 'INSERT INTO Application (fName,lName,username,pass,email,contact,DOB,addr,notes,reviewingAdmin,applicationDate,appStatus)'
//         connection.query(sql, insertData, (err, result) => {
//             if (err) {
//                 console.error('Error adding user:', error);
//                 res.status(500).json({ error: 'An error occurred while adding user.' });
//             } else {
//                 res.json({ message: 'Application successfully submitted! An admin will contact you.' });
//             }
//         });

//         //if phone number has been taken by existing user
//         const takenField = `SELECT SUM(count) AS total_count FROM(SELECT COUNT(*) AS count FROM User WHERE username='${username}' UNION SELECT COUNT(*) AS count FROM User WHERE email='${email}' UNION SELECT COUNT(*) AS count FROM User WHERE contact='${phoneNumber}') AS subquery;`

//         //if multiple submissions (same email & contact) in 1 week
//         const pendingSubmissions = `SELECT COUNT(*) AS count FROM Application WHERE email='${email}' AND contact='${phoneNumber}' AND appStatus='Pending';`

//         //if previously denied submissions in 1 month
//         const deniedSubmissions = `SELECT COUNT(*) AS count FROM Application WHERE email='${email}' AND contact='${phoneNumber}' AND appStatus='Denied' AND applicationDate >= DATE_SUB(CURRENT_DATE(),INTERVAL 1 MONTH);`

//         connection.query(takenField, function (err, takenResult) {
//             if (err) throw err;
//             if (takenResult[0].total_count !== 0) {
//                 res.sendStatus(401).json({ "message": "(401) Unauthorized Application: username, email, and/or phone number already taken" });
//             }
//         });
//         connection.query(pendingSubmissions, function (err, pendingResult) {
//             if (err) throw err;
//             if (pendingResult[0].count !== 0) {
//                 res.sendStatus(401).json({ "message": "(401) Unauthorized Application: Multiple pending submissions, please wait response" })
//             }
//         });
//         connection.query(deniedSubmissions, function (err, deniedResult) {
//             if (err) throw err;
//             if (deniedResult[0].count !== 0) {
//                 res.sendStatus(401).json({ "message": "(401) Unauthorized Application: Previously denied, please wait 1 month before resubmission" })
//             }
//         })




