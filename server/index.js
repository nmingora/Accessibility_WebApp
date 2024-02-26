const express = require("express");
const cors = require('cors');
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

//setup middleware to do logging
app.use((req, res, next) => { //for all routes
    console.log(req.method, req.url)
    next(); //keep going
});

app.use(cors());
app.use(express.json());


// --------------------------- Base Route and Routes --------------------------------------------//

//setup serving front-end code
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'static')));
// app.use('/', express.static('static'));

//install router at /api/uptown <-----> ROUTER ROUTER ROUTER ROUTER
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
app.put("/apply",(req,res)=>{
    try{
        const {fName,lName,username,password,phoneNumber,dob,address,notes} = req.body;
        const insertData = [fName,lName,username,password,phoneNumber,dob,address,notes,'NULL',new Date(),'Pending'];
        validApplication = false;

        //if phone number has been taken by existing user
        const takenField = `SELECT SUM(count) AS total_count FROM(SELECT COUNT(*) AS count FROM User WHERE username='${username}' UNION SELECT COUNT(*) AS count FROM User WHERE email='${email}' UNION SELECT COUNT(*) AS count FROM User WHERE contact='${phoneNumber}') AS subquery;`

        //if multiple submissions (same email & contact) in 1 week
        const pendingSubmissions = `SELECT COUNT(*) AS count FROM Application WHERE email='${email}' AND contact='${phoneNumber}' AND appStatus='Pending';`

        //if previously denied submissions in 1 month
        const deniedSubmissions = `SELECT COUNT(*) AS count FROM Application WHERE email='${email}' AND contact='${phoneNumber}' AND appStatus='Denied' AND applicationDate >= DATE_SUB(CURRENT_DATE(),INTERVAL 1 MONTH);`

        connection.query(takenField,function(err,takenResult){
            if(err) throw err;
            if(takenResult[0].total_count!==0){
                res.sendStatus(401).json({"message":"(401) Unauthorized Application: username, email, and/or phone number already taken"});
            }
        });
        connection.query(pendingSubmissions,function(err,pendingResult){
            if(err) throw err;
            if(pendingResult[0].count!==0){
                res.sendStatus(401).json({"message":"(401) Unauthorized Application: Multiple pending submissions, please wait response"})
            }
        });
        connection.query(deniedSubmissions,function(err,deniedResult){
            if(err) throw err;
            if(deniedResult[0].count!==0){
                res.sendStatus(401).json({"message":"(401) Unauthorized Application: Previously denied, please wait 1 month before resubmission"})
            }
        })

        connection.query("INSERT INTO Application (fName,lName,username,pass,email,contact,DOB,addr,notes,reviewingAdmin,applicationDate,appStatus) VALUES ?",insertData,function(err,result){
            if(err) throw err;
            res.sendStatus(202).json({"message":"Application successfully submitted! An admin will contact you"})
        });
    }catch(err){
        console.log(err);
        res.sendStatus(500).json({"message":"(500) Unexpected error occured during submission"})
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
        const {id} = req.body;

        // call function to update the status of the application
        await setApplicationStatus(id, 'approved');
        // call function to create the parent's account
        await createParent(id);



    } catch (error) {
        console.error('Failed to retrieve application ID: ', error);
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
        if(rows.length > 0 ) {
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
        values = [accountData.username,accountData.pass, accountData.fName, accountData.lName, accountData.email, accountData.DOB, accountData.contact, accountData.addr]
        const insertResult = await connection.query(insertQuery, values);
        
        console.log("Insertion result",insertResult);
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






