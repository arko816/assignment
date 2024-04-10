const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controlllers/userController');

// Get user profile
router.get('/profile', getUserProfile);

// Update user profile
router.put('/profile', updateUserProfile);

module.exports = router;
