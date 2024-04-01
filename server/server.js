const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Adjust the path to point to your SQLite database file
const dbPath = path.resolve(__dirname, 'database/crud.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
        return;
    }
    console.log("Successfully connected to the database.");
});

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ?";
    db.get(sql, [req.body.email], (err, row) => {
        if (err) {
            return res.json("Error");
        }
        if (row) {
            bcrypt.compare(req.body.password, row.password, (err, result) => {
                if (result) {
                    return res.json("Login Successfully");
                } else {
                    return res.json("Incorrect password");
                }
            });
        } else {
            return res.json("No record found");
        }
    });
});

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]});
});

app.listen(5000, () => {console.log("Server started on port 5000")});
