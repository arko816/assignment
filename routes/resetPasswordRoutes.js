const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controlllers/resetPasswordController');

// Forgot password route
router.post('/forgot-password', forgotPassword);

// Reset password route
router.put('/reset-password', resetPassword);

module.exports = router;
