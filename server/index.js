
const express = require("express");
const cors = require('cors');
const path = require("path");

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/applicationForms';
const PORT = 3005;
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');


// Add mongoose import from indexMongo.js
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
const pdfWaiversRouter = require('./routes/pdfWaivers');
//--------------------------- Moongoose Connection ---------------------------//

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const multer = require('multer');
const Grid = require('gridfs-stream');
const stream = require('stream');
const { MongoClient, GridFSBucket } = require('mongodb');
const GridFsStream = require('gridfs-stream');

// Create mongo connection
const conn = MongoClient.connect(mongoURI);

// Init bucket
let bucket;

conn.then(client => {
    console.log('MongoDB Connected...');

    // Init stream
    const db = client.db('applicationForms');
    bucket = new GridFSBucket(db, {
        bucketName: 'uploads'
    });
});

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('form'); // 'form' is the field name for the file

router.get('/file/:filename', async (req, res) => {
    const filename = req.params.filename;
    console.log(filename);

    try {
        if (!bucket) {
            return res.status(500).send('Server initialization error');
        }

        const downloadStream = bucket.openDownloadStreamByName(filename);
        res.setHeader('Content-Disposition', 'attachment; filename=' + filename);

        downloadStream.on('error', () => {
            res.status(404).send('File not found');
        });

        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error serving file:', error);
        res.status(500).send('Server error');
    }
});

//--------------------------- MIDDLEWARE ---------------------------//






const uri = process.env.MONGODB_URI || "mongodb+srv://madisonjlo88:MongoPassword@cluster0.corysq5.mongodb.net/userForum?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));
app.use('/api/posts', postsRouter);
app.use('/api/pdfWaivers', pdfWaiversRouter);

// Production mode
if(process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'client/build')));  
    app.get('*', (req, res) => {    
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // Relative path
    });
  }
  














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
router.post("/SignUp", upload, async (req, res) => {
    console.log("SignUp endpoint hit");
    console.log("Received data:", req.body);
    if (req.file) {
        console.log("Received file:", req.file);
    } else {
        console.log("No file received");
    }
    try {
        const connection = await initializeDatabase();
        const { fName, lName, username, pass, email, contact, DOB, addr, notes } = req.body;

        let originalName;

        if (req.file) {
            originalName = req.file.originalname;

            await new Promise((resolve, reject) => {
                const fileBuffer = req.file.buffer;
                const readableStream = new stream.Readable();

                readableStream.push(fileBuffer);
                readableStream.push(null); // Signal EOF

                const uploadStream = bucket.openUploadStream(originalName, {
                    metadata: { contentType: req.file.mimetype },
                });

                readableStream.pipe(uploadStream)
                    .on('error', (error) => {
                        console.error('Error uploading file:', error);
                        reject(error);
                    })
                    .on('finish', () => {
                        console.log('File upload to GridFS complete');
                        resolve();
                    });
            });

            const insertData = [fName, lName, username, pass, email, contact, DOB, addr, notes, 1, 'Pending', new Date(), originalName];
            const sql = 'INSERT INTO Application (fName, lName, username, pass, email, contact, DOB, addr, notes, reviewingAdmin, status, dateApplied, fileName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            await connection.query(sql, insertData);
            res.json({ message: 'Application successfully submitted! An admin will contact you.' });
        } else {
            res.status(400).send('No form uploaded');
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json({ "message": "(500) Unexpected error occured during submission" })
    } finally {
        if (connection) {
            // Ensure the connection is released back to the pool instead of ending it
            if (typeof connection.release === 'function') {
                connection.release();
            } else if (typeof connection.end === 'function') {
                connection.end();
            }
        }
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

    // try {
    //     const { id } = req.body;
    //     const application = await getApplication(id);
    //     if (application) {
    //         await createParent(application);
    //         await setApplicationStatus(id, 'approved');
    //         res.send('Application accepted and parent created');
    //     } else {
    //         res.status(404).send('Application not found');
    //     }
    // } catch (error) {
    //     console.error('Failed to accept application: ', error);
    //     res.status(500).send('Error accepting application');
    // }

});

// ENDPOINT TO RETRIEVE THE USER ID OF THE PARENT WHOS PROFILE WAS REJECTED BY THE ADMIN
router.put('/reject-application', async (req, res) => {
    try {
        const { id } = req.body;

        await setApplicationStatus(id, 'rejected');
    } catch (error) {
        console.error("Failed to retrieve the rejected application's id, here's why: ", error);
    }
    // try {
    //     const { id } = req.body;
    //     const application = await getApplication(id);
    //     if (application) {
    //         if (application.fileName) {
    //             await deleteFile(application.fileName);
    //         }
    //         await setApplicationStatus(id, 'rejected');
    //         res.send('Application rejected');
    //     } else {
    //         res.status(404).send('Application not found');
    //     }
    // } catch (error) {
    //     console.error("Failed to reject application: ", error);
    //     res.status(500).send('Error rejecting application');
    // }
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
    const [applications] = await connection.query('SELECT * FROM Application');

    // Modify each application object to include a file URL
    applications.forEach(app => {
        if (app.fileName) {
            app.fileUrl = `http://localhost:3001/file/${app.fileName}`;
        }
    });

    return applications;
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
        values = [accountData.username, accountData.pass, accountData.fName, accountData.lName, accountData.email, accountData.DOB, accountData.contact, accountData.addr];
        const insertResult = await connection.query(insertQuery, values);

        console.log("Insertion result", insertResult);
        console.log("Parent account created with associated PDF");
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

//delete pdfs when user account is rejected
async function deleteFile(filename) {
    const conn = await MongoClient.connect(mongoURI);
    const db = conn.db('applicationForms');
    const gfs = GridFsStream(db, MongoClient);
    gfs.remove({ filename: filename, root: 'uploads' }, (err) => {
        if (err) return Promise.reject(err);
        return Promise.resolve();
    });
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


//SIGN UP OLD FUNCIIONALITY
// const { fName, lName, username, pass, email, contact, DOB, addr, notes } = req.body;
//         console.log(req.body)
//         const insertData = [fName, lName, username, pass, email, contact, DOB, addr, notes, 1, 'Pending', new Date()];

//         console.log('heree2') //debug

//         const sql = 'INSERT INTO Application (fName,lName,username,pass,email,contact,DOB,addr,notes,reviewingAdmin, status, dateApplied) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
//         connection.query(sql, insertData, (err, result) => {
//             if (err) {
//                 console.error('Error adding user:', error);
//                 res.status(500).json({ error: 'An error occurred while adding user.' });
//             } else {
//                 res.json({ message: 'Application successfully submitted! An admin will contact you.' });
//             }
//         });


