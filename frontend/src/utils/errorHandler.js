/**
 * Custom Error Classes
 * These provide structured error types for different scenarios
 */

// Base custom error class
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

// API-specific errors
export class APIError extends AppError {
  constructor(message, statusCode = 500) {
    super(message, statusCode);
    this.name = 'APIError';
  }
}

// Validation errors
export class ValidationError extends AppError {
  constructor(message, field = null) {
    super(message, 400);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// Authentication errors
export class AuthError extends AppError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthError';
  }
}

// Network errors
export class NetworkError extends AppError {
  constructor(message = 'Network connection failed') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

// Not found errors
export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404);
    this.name = 'NotFoundError';
  }
}

// Server errors
export class ServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500);
    this.name = 'ServerError';
  }
}

/**
 * Error Handler Utility Functions
 */

// Map HTTP status codes to user-friendly messages
const getStatusMessage = (statusCode) => {
  const statusMessages = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please login.',
    403: 'You don\'t have permission to access this resource.',
    404: 'The requested resource was not found.',
    408: 'Request timeout. Please try again.',
    429: 'Too many requests. Please wait a moment.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. Please try again later.',
  };
  
  return statusMessages[statusCode] || 'An unexpected error occurred.';
};

// Check if error is operational (expected) or programming error
export const isOperationalError = (error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

// Extract meaningful error message from various error types
export const extractErrorMessage = (error) => {
  // Custom error classes
  if (error instanceof AppError) {
    return error.message;
  }
  
  // Axios error
  if (error.response) {
    return error.response.data?.message || getStatusMessage(error.response.status);
  }
  
  // Network error
  if (error.request && !error.response) {
    return 'Network error. Please check your connection.';
  }
  
  // Fetch API error
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  
  // Generic error
  return error.message || 'An unexpected error occurred.';
};

// Log error to console (development) and optionally to server
export const logError = async (error, context = {}) => {
  const errorLog = {
    message: error.message,
    name: error.name,
    stack: error.stack,
    statusCode: error.statusCode,
    timestamp: new Date().toISOString(),
    context,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };
  
  // Always log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Log:', errorLog);
  }
  
  // Only log operational errors to server
  if (isOperationalError(error)) {
    try {
      // Optional: Send to error logging service
      // await fetch('/api/logs/error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorLog),
      // });
    } catch (loggingError) {
      console.error('Failed to log error to server:', loggingError);
    }
  }
};

// Handle different types of errors and return user-friendly message
export const handleError = (error, context = {}) => {
  // Log the error
  logError(error, context);
  
  // Extract user-friendly message
  const message = extractErrorMessage(error);
  
  // Return error details for UI display
  return {
    message,
    statusCode: error.statusCode || error.response?.status || 500,
    type: error.name || 'Error',
    isOperational: isOperationalError(error),
  };
};

/**
 * API Error Handler Wrapper
 * Wraps API calls with try/catch and standardized error handling
 */
export const apiErrorHandler = async (apiCall, context = {}) => {
  try {
    const response = await apiCall();
    return { success: true, data: response };
  } catch (error) {
    const errorDetails = handleError(error, context);
    return {
      success: false,
      error: errorDetails.message,
      statusCode: errorDetails.statusCode,
      type: errorDetails.type,
    };
  }
};

/**
 * Form Validation Helper
 * Validates form inputs and returns structured errors
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    // Required validation
    if (fieldRules.required && !value) {
      errors[field] = `${fieldRules.label || field} is required`;
      return;
    }
    
    // Skip other validations if field is empty and not required
    if (!value) return;
    
    // Min length validation
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = `${fieldRules.label || field} must be at least ${fieldRules.minLength} characters`;
      return;
    }
    
    // Max length validation
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = `${fieldRules.label || field} must not exceed ${fieldRules.maxLength} characters`;
      return;
    }
    
    // Email validation
    if (fieldRules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field] = 'Please enter a valid email address';
      return;
    }
    
    // Phone validation
    if (fieldRules.phone && !/^[\d\s\-\+\(\)]+$/.test(value)) {
      errors[field] = 'Please enter a valid phone number';
      return;
    }
    
    // Pattern validation
    if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.patternMessage || `${fieldRules.label || field} format is invalid`;
      return;
    }
    
    // Custom validation function
    if (fieldRules.validate) {
      const customError = fieldRules.validate(value, data);
      if (customError) {
        errors[field] = customError;
        return;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Network Request Wrapper with Retry Logic
 */
export const fetchWithRetry = async (url, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      
      // Check if response is ok
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new APIError(
          error.message || getStatusMessage(response.status),
          response.status
        );
      }
      
      return await response.json();
    } catch (error) {
      // If it's the last retry, throw the error
      if (i === retries - 1) {
        if (error instanceof APIError) {
          throw error;
        }
        throw new NetworkError('Failed to connect to server');
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

export default {
  AppError,
  APIError,
  ValidationError,
  AuthError,
  NetworkError,
  NotFoundError,
  ServerError,
  handleError,
  logError,
  apiErrorHandler,
  validateForm,
  fetchWithRetry,
  extractErrorMessage,
  isOperationalError,
};
