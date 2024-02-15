const express           = require('express')
const jwt               = require('jsonwebtoken');
const authenticateJWT   = require('../jwt/authMiddleware');
const router = express.Router()

const authController =   require('../controller/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/protected', authenticateJWT, (req, res) => {
    // If token is valid, return protected data
    res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router