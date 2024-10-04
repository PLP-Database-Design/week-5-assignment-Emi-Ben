// Import some dependencies/ packages 
const path = require("path");
// Express Framework ~ Handling HTTP Requests/Responses
const express = require('express');
// Create an instance of the framework
const app = express();
// DBMS Mysql
const mysql = require('mysql2');
// Cross origin resource sharing
const cors = require('cors');
// Environment variable
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
dotenv.config();

// Connecting to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Check for connection
db.connect((err) => {
    // If no connection = No wedding
    if (err) return console.log("Error connecting to MySQL");

    // If yes connect = wedding YESSS!!!
    console.log("Connected to MySQL as id: ", db.threadID);
});


//QUESTION 1 GOES HERE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname,"public")));

//GET Method below

app.get('/data', (req,res) =>{
    //Retrieve data from database

    db.query('SELECT * FROM patients', (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data')
        } else{
            //Display the patient records to the browser
            res.render('data', {results});
        }
    });
});

// QUESTION 2 GOES HERE 
 //Retrieve data from database
 app.get("/providers",(req,res)=>{
    const query ='SELECT first_name,last_name,provider_specialty FROM providers'
    db.query(query, (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data')
        } else{
            //Display the patient records to the browser
            console.log(results)
            res.render('providers', {results});
        }
    });

  })
    //Send a message to the browser
    console.log('Sending message to the browser...')
    app.get('/', (req,res) => {
        res.send('Server Succesfully installed');
    });

 // QUESTION 3 GOES HERE   
// GET PATIENT FIRST NAME
app.get("/firstname", (req, res) => {
    const query = 'SELECT first_name FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            // Display the patient records to the browser
            console.log(results); // Check if data is coming through correctly
            res.render('firstname', { results }); // Pass results to the view
        }
    });
});


// QUESTION 4 GOES HERE 
   //Retrieve data from database
   app.get("/specialty",(req,res)=>{
    const query ='SELECT provider_specialty FROM providers'
    db.query(query, (err, results) =>{
        if(err){
            console.error(err);
            res.status(500).send('Error retrieving data')
        } else{
            //Display the patient records to the browser
            console.log(results)
            res.render('specialty', { results}); // Pass results to the view
        }
    });

  })
// Start the server
app.listen(3300, () => {
    console.log('Server listening on port 3300');
  });
 
