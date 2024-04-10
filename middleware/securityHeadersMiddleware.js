const setSecurityHeaders = (req, res, next) => {
    if (res) {
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
    }
    next();
  };

  module.exports = { setSecurityHeaders };
