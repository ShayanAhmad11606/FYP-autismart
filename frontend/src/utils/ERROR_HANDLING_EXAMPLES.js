/**
 * ERROR HANDLING INTEGRATION GUIDE
 * Step-by-step guide to implement the error handling system in your AutiSmart project
 */

/*
=================================
1. SETUP IN App.jsx
=================================
*/

// Import the necessary components and hooks
import ErrorBoundary from './components/ErrorBoundary';
import { useGlobalErrorHandler } from './utils/globalErrorHandler';
import { useToast } from './components/Toast';

function App() {
  // Initialize global error handlers
  useGlobalErrorHandler();
  
  // Initialize toast notifications
  const { showToast, ToastContainer } = useToast();
  
  return (
    <ErrorBoundary>
      {/* Your app routes and components */}
      <Router>
        <Navbar />
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
      
      {/* Toast container for notifications */}
      {ToastContainer}
    </ErrorBoundary>
  );
}

/*
=================================
2. USING IN API CALLS
=================================
*/

import { apiErrorHandler, APIError } from '../utils/errorHandler';
import { useToast } from '../components/Toast';

// Example: Login function with error handling
export const loginUser = async (credentials) => {
  const result = await apiErrorHandler(
    async () => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new APIError(error.message || 'Login failed', response.status);
      }
      
      return await response.json();
    },
    { action: 'login', user: credentials.email }
  );
  
  return result;
};

// Example: Using in a component
function LoginComponent() {
  const { showToast } = useToast();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const result = await loginUser({ email, password });
    
    if (result.success) {
      showToast('Login successful!', 'success');
      // Navigate to dashboard
    } else {
      showToast(result.error, 'error');
    }
  };
}

/*
=================================
3. FORM VALIDATION
=================================
*/

import { validateForm, ValidationError } from '../utils/errorHandler';

function RegistrationForm() {
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Define validation rules
    const rules = {
      name: {
        required: true,
        minLength: 2,
        label: 'Full Name',
      },
      email: {
        required: true,
        email: true,
        label: 'Email',
      },
      password: {
        required: true,
        minLength: 8,
        label: 'Password',
        validate: (value) => {
          if (!/[A-Z]/.test(value)) {
            return 'Password must contain at least one uppercase letter';
          }
          if (!/[0-9]/.test(value)) {
            return 'Password must contain at least one number';
          }
          return null;
        },
      },
      confirmPassword: {
        required: true,
        label: 'Confirm Password',
        validate: (value, data) => {
          if (value !== data.password) {
            return 'Passwords do not match';
          }
          return null;
        },
      },
      phone: {
        required: true,
        phone: true,
        label: 'Phone Number',
      },
    };
    
    // Validate form
    const validation = validateForm(formData, rules);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }
    
    // Clear errors and proceed
    setErrors({});
    // Submit form...
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          placeholder="Full Name"
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      {/* Other fields... */}
    </form>
  );
}

/*
=================================
4. NETWORK REQUESTS WITH RETRY
=================================
*/

import { fetchWithRetry, NetworkError } from '../utils/errorHandler';

async function fetchUserProfile() {
  try {
    const data = await fetchWithRetry('/api/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }, 3); // Retry up to 3 times
    
    return data;
  } catch (error) {
    if (error instanceof NetworkError) {
      showToast('Unable to connect. Please check your internet.', 'error');
    } else {
      showToast(error.message, 'error');
    }
    throw error;
  }
}

/*
=================================
5. ASYNC/AWAIT ERROR HANDLING
=================================
*/

import { handleError } from '../utils/errorHandler';

async function loadDashboardData() {
  try {
    // Multiple API calls
    const [userStats, activities, notifications] = await Promise.all([
      fetch('/api/stats').then(r => r.json()),
      fetch('/api/activities').then(r => r.json()),
      fetch('/api/notifications').then(r => r.json()),
    ]);
    
    return { userStats, activities, notifications };
  } catch (error) {
    const errorDetails = handleError(error, {
      component: 'Dashboard',
      action: 'loadData',
    });
    
    showToast(errorDetails.message, 'error');
    return null;
  }
}

/*
=================================
6. CUSTOM ERROR HANDLING
=================================
*/

import { AppError } from '../utils/errorHandler';

function processPayment(amount) {
  // Input validation
  if (amount <= 0) {
    throw new ValidationError('Amount must be greater than zero', 'amount');
  }
  
  if (amount > 10000) {
    throw new AppError('Amount exceeds maximum limit of $10,000', 400);
  }
  
  // Process payment...
}

// Using in component
try {
  processPayment(paymentAmount);
} catch (error) {
  if (error instanceof ValidationError) {
    setFieldError(error.field, error.message);
  } else {
    showToast(error.message, 'error');
  }
}

/*
=================================
7. SHOWING TOAST NOTIFICATIONS
=================================
*/

// Success message
showToast('Profile updated successfully!', 'success');

// Error message
showToast('Failed to save changes', 'error');

// Warning message
showToast('Your session will expire in 5 minutes', 'warning');

// Info message
showToast('New features available!', 'info');

// Custom duration (0 = no auto-dismiss)
showToast('Important: Read this carefully', 'warning', 0);

/*
=================================
8. ERROR BOUNDARY USAGE
=================================
*/

// Wrap specific sections that might crash
function Dashboard() {
  return (
    <div>
      <Header />
      
      <ErrorBoundary>
        <UserStats />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <ActivityFeed />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <NotificationPanel />
      </ErrorBoundary>
    </div>
  );
}

/*
=================================
9. COMPLETE COMPONENT EXAMPLE
=================================
*/

import React, { useState, useEffect } from 'react';
import { apiErrorHandler, validateForm } from '../utils/errorHandler';
import { useToast } from '../components/Toast';
import ErrorBoundary from '../components/ErrorBoundary';

function UserProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast, ToastContainer } = useToast();
  
  // Load existing profile
  useEffect(() => {
    loadProfile();
  }, []);
  
  const loadProfile = async () => {
    const result = await apiErrorHandler(
      async () => {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Failed to load profile');
        return await response.json();
      },
      { action: 'loadProfile' }
    );
    
    if (result.success) {
      setFormData(result.data);
    } else {
      showToast('Failed to load profile: ' + result.error, 'error');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateForm(formData, {
      name: { required: true, minLength: 2, label: 'Name' },
      email: { required: true, email: true, label: 'Email' },
      phone: { required: true, phone: true, label: 'Phone' },
    });
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please fix the errors', 'error');
      return;
    }
    
    setErrors({});
    setLoading(true);
    
    // Submit form
    const result = await apiErrorHandler(
      async () => {
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Failed to update profile');
        return await response.json();
      },
      { action: 'updateProfile' }
    );
    
    setLoading(false);
    
    if (result.success) {
      showToast('Profile updated successfully!', 'success');
    } else {
      showToast('Failed to update: ' + result.error, 'error');
    }
  };
  
  return (
    <ErrorBoundary>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
        
        {ToastContainer}
      </div>
    </ErrorBoundary>
  );
}

export default UserProfileForm;
