const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');


module.exports = {
  authenticateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
      req.user = decoded;
      next();
    });
  },

  checkRole(role) {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ error: 'Unauthorized access.' });
      }
      next();
    };
  }
};
