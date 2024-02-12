const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
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
})


//10. Static Signup
router.route('/user/signup') 
    .post(async(req, res) => {
        const {email, password} = req.body;

        try {
            const user = await User.signup(email, password);

            //create token
            const token = createToken(user._id);

            res.status(200).json({email, token});
        } catch (error){
            res.status(400).json({error: error.message});
        }
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