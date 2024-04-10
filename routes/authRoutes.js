const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controlllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
