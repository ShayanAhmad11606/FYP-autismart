import { useEffect } from 'react';
import { logError } from './errorHandler';

/**
 * Global Error Boundary Handler
 * Sets up global error listeners for unhandled errors and promise rejections
 */

export const setupGlobalErrorHandlers = () => {
  // Handle unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    event.preventDefault();
    
    const error = {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
    };
    
    logError(error, {
      type: 'Global Error',
      source: 'window.onerror',
    });
    
    // Show user-friendly message
    console.error('An unexpected error occurred. Please refresh the page.');
  });
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    event.preventDefault();
    
    const error = {
      message: event.reason?.message || 'Unhandled Promise Rejection',
      stack: event.reason?.stack,
      promise: event.promise,
    };
    
    logError(error, {
      type: 'Promise Rejection',
      source: 'unhandledrejection',
    });
    
    console.error('An unexpected error occurred. Please try again.');
  });
};

/**
 * React Hook for Global Error Handling Setup
 * Use this in your App component to initialize global handlers
 */
export const useGlobalErrorHandler = () => {
  useEffect(() => {
    setupGlobalErrorHandlers();
    
    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('error', setupGlobalErrorHandlers);
      window.removeEventListener('unhandledrejection', setupGlobalErrorHandlers);
    };
  }, []);
};

export default {
  setupGlobalErrorHandlers,
  useGlobalErrorHandler,
};
