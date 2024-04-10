const fs = require('fs');

module.exports = {
  logActivity: (userId, action) => {
    const logEntry = `${new Date().toISOString()} - User ${userId}: ${action}\n`;
    fs.appendFile('activity.log', logEntry, (err) => {
      if (err) {
        console.error('Error logging activity:', err);
      }
    });
  }
};
