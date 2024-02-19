const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

var token
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        token = authHeader.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" })
        }

        req.user = user
        next()
    })
}

module.exports = authenticateJWT;