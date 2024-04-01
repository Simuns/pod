const bcrypt = require('bcrypt');
const db = require('../db');

exports.login = (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ?";
    db.get(sql, [req.body.email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: "Error" });
        }
        if (row) {
            bcrypt.compare(req.body.password, row.password, (err, result) => {
                if (result) {
                    return res.json({ message: "Login Successfully" });
                } else {
                    return res.json({ message: "Incorrect password" });
                }
            });
        } else {
            return res.json({ message: "No record found" });
        }
    });
};
