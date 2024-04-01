const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

// Assuming environment variables are loaded at the application's entry point
const JWT_SECRET = process.env.JWT_SECRET;
const expiresIn = '4h'; // Token expiration time

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const sql = "SELECT * FROM login WHERE username = ?";
    db.get(sql, [req.body.email.trim().toLowerCase()], (err, user) => { // Lowercase email for consistency
        if (err) {
            console.error(err); // Log the error for debugging purposes
            return res.status(500).json({ message: "Error accessing the database" });
        }
        if (!user) {
            // To prevent username enumeration, use a generic error message
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error during password comparison" });
            }
            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect email or password" });
            }

            // User authentication successful, generate JWT
            const tokenPayload = { userId: user.id, email: user.username };
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn });

            res.json({ message: "Login Successfully", token });
        });
    });
};
