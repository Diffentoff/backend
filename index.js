// 1. Import libraries
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json()); // Ifasha kwakira JSON muri POST requests

// 2. Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',      // shyiramo password yawe niba ufite
    database: 'my_database', // database igomba kuba yarakozwe
    port: 3306         // default MySQL port
});

// 3. Connect to database
connection.connect(err => {
    if (err) {
        console.error("Error connecting to database:", err.message);
        process.exit(1); // Hagarika server niba database idashobora gufunguka
    }
    console.log("Successfully connected to database");
});

// 4. Test GET route
app.get("/", (req, res) => {
    res.send("Server iri gukora neza!");
});

// 5. POST route yo kongera student
app.post("/add", (req, res) => {
    const { name, password, location } = req.body;

    if (!name || !password || !location) {
        return res.status(400).send("All fields are required");
    }

    connection.query(
        "INSERT INTO student (name, password, location) VALUES (?, ?, ?)",
        [name, password, location],
        (err, result) => {
            if (err) {
                console.error("Error inserting into database:", err.message);
                return res.status(500).send("Error inserting data");
            }
            res.send("Data inserted successfully");
        }
    );
});

// 6. Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});