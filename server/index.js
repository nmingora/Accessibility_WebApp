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




// -------------------------------- Backend Functions ------------------------------------------//


// function to get all the applications from the database
async function getAllApplications() {
    const connection = await initializeDatabase();
    const [results] = await connection.query('SELECT * FROM applications')
    return results;
}

