const User = require('../models/User');
const { generateResetToken, sendPasswordResetEmail } = require('../utils/resetPasswordUtils');

module.exports = {
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
     
      const resetToken = generateResetToken(user._id);
      await sendPasswordResetEmail(user.email, resetToken);
      res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { newPassword } = req.body;
      // Verify token
      const userId = verifyResetToken(token);
      if (!userId) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Update password
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
