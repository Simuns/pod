const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN_HERE

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Access Denied: Invalid token." });
        }
        req.user = user; // Add the decoded user to the request object
        next();
    });
};

module.exports = authenticateToken;
