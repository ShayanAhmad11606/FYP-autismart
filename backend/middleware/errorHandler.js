/**
 * Backend Error Handler (Express.js)
 * Centralized error handling middleware for the Node.js/Express server
 */

/**
 * Custom Error Classes for Backend
 */
class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 400);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
    this.name = 'DatabaseError';
  }
}

/**
 * Error Logger
 * Logs errors to console and optionally to external service
 */
const logError = (error, req = null) => {
  const errorLog = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    statusCode: error.statusCode,
    timestamp: new Date().toISOString(),
    ...(req && {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      user: req.user?.id,
    }),
  };

  // Log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', errorLog);
  } else {
    // In production, log only essential info
    console.error(`[${errorLog.timestamp}] ${errorLog.name}: ${errorLog.message}`);
  }

  // Optional: Send to error tracking service (e.g., Sentry, LogRocket)
  // if (process.env.ERROR_LOGGING_ENABLED === 'true') {
  //   sendToErrorService(errorLog);
  // }

  return errorLog;
};

/**
 * Error Response Handler
 * Sends formatted error response to client
 */
const sendErrorResponse = (res, error, req = null) => {
  // Log the error
  logError(error, req);

  // Determine status code
  const statusCode = error.statusCode || 500;

  // Determine if we should expose error details
  const isProduction = process.env.NODE_ENV === 'production';
  const isOperational = error.isOperational !== false;

  // Build response
  const response = {
    success: false,
    message: error.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  };

  // Add error details in development
  if (!isProduction) {
    response.error = {
      name: error.name,
      stack: error.stack,
      statusCode,
    };
  }

  // Don't expose details of non-operational errors in production
  if (isProduction && !isOperational) {
    response.message = 'An unexpected error occurred';
  }

  res.status(statusCode).json(response);
};

/**
 * Async Handler Wrapper
 * Wraps async route handlers to catch errors
 * 
 * Usage:
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Validation Middleware
 * Validates request data against schema
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return next(new ValidationError('Validation failed', errors));
    }

    next();
  };
};

/**
 * Not Found Handler
 * Handles 404 errors for undefined routes
 */
const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl}`));
};

/**
 * Global Error Handler Middleware
 * Must be the last middleware in the chain
 * 
 * Usage in app.js:
 * app.use(errorHandler);
 */
const errorHandler = (err, req, res, next) => {
  // Default to 500 server error
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new NotFoundError('Resource');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ValidationError(`${field} already exists`, field);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    error = new ValidationError(errors.join(', '));
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AuthenticationError('Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    error = new AuthenticationError('Token expired');
  }

  // Send error response
  sendErrorResponse(res, error, req);
};

/**
 * Database Error Handler
 * Wraps database operations with error handling
 */
const handleDatabaseOperation = async (operation, errorMessage = 'Database operation failed') => {
  try {
    return await operation();
  } catch (error) {
    console.error('Database error:', error);
    throw new DatabaseError(errorMessage);
  }
};

/**
 * Rate Limit Error Handler
 */
const rateLimitHandler = (req, res) => {
  res.status(429).json({
    success: false,
    message: 'Too many requests. Please try again later.',
    timestamp: new Date().toISOString(),
  });
};

/**
 * CORS Error Handler
 */
const corsErrorHandler = (err, req, res, next) => {
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: 'CORS policy violation',
    });
  }
  next(err);
};

/**
 * Export all error handling utilities
 */
module.exports = {
  // Error classes
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  DatabaseError,
  
  // Middleware
  errorHandler,
  notFoundHandler,
  asyncHandler,
  validateRequest,
  corsErrorHandler,
  rateLimitHandler,
  
  // Utilities
  logError,
  sendErrorResponse,
  handleDatabaseOperation,
};
