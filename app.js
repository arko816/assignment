const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); 
const { authenticateToken, checkRole } = require('./middleware/authMiddleware');
const { csrfProtection } = require('./middleware/csrfMiddleware');
const { setSecurityHeaders } = require('./middleware/securityHeadersMiddleware');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const resetPasswordRoutes = require('./routes/resetPasswordRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(setSecurityHeaders); 
app.use(express.json());
app.use(cookieParser()); 
app.use(csrfProtection); 

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/auth', ()=>authRoutes);
app.use('/users', authenticateToken, ()=>userRoutes);
app.use('/reset-password',()=>resetPasswordRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
