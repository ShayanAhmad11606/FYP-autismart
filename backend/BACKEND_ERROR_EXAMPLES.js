/**
 * Backend Integration Example
 * How to use the error handling middleware in your Express.js server
 */

const express = require('express');
const {
  errorHandler,
  notFoundHandler,
  asyncHandler,
  validateRequest,
  ValidationError,
  AuthenticationError,
  NotFoundError,
} = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Example Route with Error Handling
 */

// Using asyncHandler to catch async errors
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User');
  }
  
  res.json({
    success: true,
    data: user,
  });
}));

// Manual error throwing
app.post('/api/auth/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  // Input validation
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }
  
  // Find user
  const user = await User.findOne({ email });
  
  if (!user) {
    throw new AuthenticationError('Invalid credentials');
  }
  
  // Check password
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    throw new AuthenticationError('Invalid credentials');
  }
  
  // Generate token
  const token = generateToken(user._id);
  
  res.json({
    success: true,
    data: { user, token },
  });
}));

// Using validation middleware with Joi
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('user', 'caregiver', 'expert', 'admin'),
});

app.post(
  '/api/users',
  validateRequest(userSchema),
  asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    
    res.status(201).json({
      success: true,
      data: user,
    });
  })
);

// Protected route example
const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    throw new AuthenticationError('No token provided');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
});

app.get('/api/profile', authenticate, asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
}));

// Database operation with error handling
const { handleDatabaseOperation } = require('./middleware/errorHandler');

app.get('/api/stats', asyncHandler(async (req, res) => {
  const stats = await handleDatabaseOperation(
    async () => {
      return await User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
      ]);
    },
    'Failed to fetch user statistics'
  );
  
  res.json({
    success: true,
    data: stats,
  });
}));

/**
 * Error Handling Middleware (Must be last)
 */

// Handle 404 errors
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * Handle unhandled promise rejections
 */
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server and exit
  process.exit(1);
});

/**
 * Handle uncaught exceptions
 */
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Close server and exit
  process.exit(1);
});

module.exports = app;
