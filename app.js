const express = require('express');
const mysql = require('mysql2');

const application = express();
application.use(express.json());

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_database'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err.message);
        return;
    }
    console.log("Successfully connected to database");
});

// Route yo kongeramo student
application.post("/add", (req, res) => {
    const { name, password, location } = req.body;

    connection.query(
        "INSERT INTO student VALUES (null, ?, ?, ?)",
        [name, password, location],
        (err, result) => {
            if (err) {
                console.log("Error inserting into database:", err.message);
                res.status(500).send("Error inserting data");
            } else {
                console.log("Inserted well into database");
                res.send("Data inserted successfully");
            }
        }
    );
});

// Start server
application.listen(3000, () => {
    console.log("Server running on port 3000");
});






//code building server



const express= require('express');
const app= express();
const db = require('./app');
    app.listen(3000,()=>{
        console.log("server is runing on port 3000")
    });
