// resetPasswordUtils.js
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { JWT_SECRET } = require('../config');

const generateResetToken = (userId) => {
    const resetToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
    return resetToken;
};

const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'arko123@gmail.com',
                pass: 'Arko123'
            }
        });

        const mailOptions = {
            from: 'arko123@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click on the following link to reset your password: ${resetToken}`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to send password reset email');
    }
};

module.exports = {
    generateResetToken,
    sendPasswordResetEmail
};
