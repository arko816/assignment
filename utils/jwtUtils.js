const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = {
  generateAccessToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  },
  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
};
