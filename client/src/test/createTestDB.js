const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

// Adjust the path to point to the server/database directory from the client/src/test directory
const dbPath = path.resolve(__dirname, '../../../server/src/db/crud.db');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database', err);
        return;
    }
    console.log("Successfully connected to the database.");

    db.run(`CREATE TABLE IF NOT EXISTS login (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
            return;
        }
        console.log("Table creation/check complete.");

        const username = 'test@test.test';
        const password = 'qwer1234';

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err.message);
                return;
            }

            db.run(`INSERT INTO login (username, password) VALUES (?, ?)`, [username, hash], function(err) {
                if (err) {
                    console.error('Error inserting user into the database:', err.message);
                } else {
                    console.log(`User inserted successfully with ID ${this.lastID}`);
                }
                db.close(); // Ensure the database connection is closed after operation
            });
        });
    });
});
