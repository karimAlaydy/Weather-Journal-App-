// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express and Body-parser to run server and routes
const express = require('express');

//Dependencies
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// POST route
app.post('/addData', addData);

function addData(req,res){
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
}

// GET
app.get('/getData',getData);

function getData(req,res) { 
    res.send(projectData);
}

// Setup Server
const port = 8000;
app.listen(port,listening);
// For debuging and making sure the server is up and running
function listening() {
    console.log(`Server running on localhost: ${port}`);
}