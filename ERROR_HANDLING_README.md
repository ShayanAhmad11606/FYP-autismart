# AutiSmart Error Handling System

## 📋 Overview

This comprehensive error handling system provides robust error management for both frontend (React) and backend (Express.js) of the AutiSmart application.

## 🎯 Features

- ✅ **Global Error Handlers** - Catch unhandled errors and promise rejections
- ✅ **React Error Boundaries** - Graceful UI fallback for component crashes
- ✅ **Custom Error Classes** - Structured error types for different scenarios
- ✅ **API Error Handling** - Standardized error handling for network requests
- ✅ **Form Validation** - Reusable validation with clear error messages
- ✅ **Toast Notifications** - User-friendly error/success messages
- ✅ **Network Retry Logic** - Automatic retry with exponential backoff
- ✅ **Error Logging** - Console logging + optional external service integration
- ✅ **Security** - No sensitive data exposure in production
- ✅ **Backend Middleware** - Express.js error handling middleware

---

## 📁 File Structure

```
autismart/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx          # React error boundary component
│   │   │   └── Toast.jsx                  # Toast notification system
│   │   └── utils/
│   │       ├── errorHandler.js            # Core error handling utilities
│   │       ├── globalErrorHandler.js      # Global error listeners
│   │       └── ERROR_HANDLING_EXAMPLES.js # Integration examples
│   └──
└── backend/
    ├── middleware/
    │   └── errorHandler.js                # Express error middleware
    └── BACKEND_ERROR_EXAMPLES.js          # Backend integration examples
```

---

## 🚀 Quick Start

### Frontend Setup

**1. Initialize Global Error Handlers in App.jsx**

```jsx
import ErrorBoundary from './components/ErrorBoundary';
import { useGlobalErrorHandler } from './utils/globalErrorHandler';
import { useToast } from './components/Toast';

function App() {
  useGlobalErrorHandler(); // Initialize global handlers
  const { showToast, ToastContainer } = useToast();
  
  return (
    <ErrorBoundary>
      {/* Your app content */}
      <Router>
        <Routes>
          {/* Your routes */}
        </Routes>
      </Router>
      {ToastContainer}
    </ErrorBoundary>
  );
}
```

**2. Use in Components**

```jsx
import { apiErrorHandler, validateForm } from '../utils/errorHandler';
import { useToast } from '../components/Toast';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleSubmit = async (data) => {
    // Validate form
    const validation = validateForm(data, {
      email: { required: true, email: true },
      password: { required: true, minLength: 8 },
    });
    
    if (!validation.isValid) {
      showToast('Please fix form errors', 'error');
      return;
    }
    
    // API call with error handling
    const result = await apiErrorHandler(
      async () => {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) throw new Error('Login failed');
        return await response.json();
      }
    );
    
    if (result.success) {
      showToast('Login successful!', 'success');
    } else {
      showToast(result.error, 'error');
    }
  };
}
```

### Backend Setup

**1. Add Error Middleware to server.js/app.js**

```javascript
const express = require('express');
const { errorHandler, notFoundHandler, asyncHandler } = require('./middleware/errorHandler');

const app = express();

// Your routes here...

// 404 Handler (must be before error handler)
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
```

**2. Use in Routes**

```javascript
const { asyncHandler, NotFoundError, ValidationError } = require('./middleware/errorHandler');

// Wrap async routes with asyncHandler
app.get('/api/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User');
  }
  
  res.json({ success: true, data: user });
}));

app.post('/api/users', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ValidationError('Email and password required');
  }
  
  const user = await User.create(req.body);
  res.status(201).json({ success: true, data: user });
}));
```

---

## 📚 Error Classes

### Frontend Error Classes

| Class | Status Code | Usage |
|-------|-------------|-------|
| `AppError` | 500 | Base error class |
| `APIError` | varies | API request failures |
| `ValidationError` | 400 | Form validation errors |
| `AuthError` | 401 | Authentication failures |
| `NetworkError` | 0 | Network connectivity issues |
| `NotFoundError` | 404 | Resource not found |
| `ServerError` | 500 | Server-side errors |

**Example:**

```javascript
import { ValidationError, APIError } from '../utils/errorHandler';

// Throw validation error
if (!email) {
  throw new ValidationError('Email is required', 'email');
}

// Throw API error
if (response.status === 401) {
  throw new APIError('Unauthorized', 401);
}
```

### Backend Error Classes

| Class | Status Code | Usage |
|-------|-------------|-------|
| `AppError` | 500 | Base error class |
| `ValidationError` | 400 | Input validation errors |
| `AuthenticationError` | 401 | Auth required |
| `AuthorizationError` | 403 | Insufficient permissions |
| `NotFoundError` | 404 | Resource not found |
| `DatabaseError` | 500 | Database operation failures |

---

## 🛠️ Core Functions

### Frontend Functions

#### `apiErrorHandler(apiCall, context)`
Wraps API calls with try/catch and standardized error handling.

```javascript
const result = await apiErrorHandler(
  async () => fetch('/api/data').then(r => r.json()),
  { action: 'fetchData', component: 'Dashboard' }
);

if (result.success) {
  // Use result.data
} else {
  // Handle result.error
}
```

#### `validateForm(data, rules)`
Validates form data against rules and returns structured errors.

```javascript
const validation = validateForm(formData, {
  name: { required: true, minLength: 2, label: 'Name' },
  email: { required: true, email: true },
  password: {
    required: true,
    minLength: 8,
    validate: (value) => {
      if (!/[A-Z]/.test(value)) {
        return 'Password must contain uppercase letter';
      }
    }
  }
});

if (!validation.isValid) {
  setErrors(validation.errors);
}
```

#### `fetchWithRetry(url, options, retries)`
Network request with automatic retry and exponential backoff.

```javascript
const data = await fetchWithRetry('/api/data', { method: 'GET' }, 3);
```

#### `handleError(error, context)`
Extracts user-friendly message and logs error.

```javascript
const errorDetails = handleError(error, { component: 'Login' });
showToast(errorDetails.message, 'error');
```

### Backend Functions

#### `asyncHandler(fn)`
Wraps async route handlers to catch errors.

```javascript
app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ success: true, data: users });
}));
```

#### `handleDatabaseOperation(operation, errorMessage)`
Wraps database operations with error handling.

```javascript
const users = await handleDatabaseOperation(
  async () => User.find(),
  'Failed to fetch users'
);
```

---

## 🎨 Toast Notifications

### Basic Usage

```javascript
const { showToast } = useToast();

// Success
showToast('Changes saved!', 'success');

// Error
showToast('Something went wrong', 'error');

// Warning
showToast('Session expiring soon', 'warning');

// Info
showToast('New update available', 'info');

// Custom duration (0 = persistent)
showToast('Read this carefully', 'warning', 0);
```

### Toast Types

- **success** - Green background, check icon
- **error** - Red background, X icon
- **warning** - Yellow background, triangle icon
- **info** - Blue background, info icon

---

## 🔒 Form Validation Rules

```javascript
const rules = {
  fieldName: {
    required: true,              // Field is required
    minLength: 8,                // Minimum character length
    maxLength: 100,              // Maximum character length
    email: true,                 // Email format validation
    phone: true,                 // Phone number validation
    pattern: /regex/,            // Custom regex pattern
    patternMessage: 'Custom message',
    label: 'Display Name',       // User-friendly field name
    validate: (value, allData) => { // Custom validation function
      if (condition) return 'Error message';
      return null; // No error
    }
  }
};
```

---

## 🛡️ Error Boundary

Wraps components to catch JavaScript errors and show fallback UI.

```jsx
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}

// Wrap individual sections
function Page() {
  return (
    <div>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <Content />
      </ErrorBoundary>
    </div>
  );
}
```

---

## 📊 Error Logging

### Console Logging

Errors are automatically logged to console in development mode with full details:

```
Error Log: {
  message: "User not found",
  name: "NotFoundError",
  stack: "...",
  statusCode: 404,
  timestamp: "2025-11-27T10:30:00Z",
  context: { action: "fetchUser" },
  userAgent: "...",
  url: "https://..."
}
```

### External Service Integration

Uncomment and configure in `errorHandler.js`:

```javascript
// Optional: Send to error tracking service
// await fetch('/api/logs/error', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(errorLog),
// });
```

Popular services:
- Sentry
- LogRocket
- Rollbar
- Bugsnag

---

## ✨ Best Practices

### 1. Always Use Try/Catch for Async Code

```javascript
// ❌ Bad
async function loadData() {
  const data = await fetch('/api/data').then(r => r.json());
  return data;
}

// ✅ Good
async function loadData() {
  try {
    const data = await fetch('/api/data').then(r => r.json());
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

// ✅ Better
async function loadData() {
  return await apiErrorHandler(
    async () => fetch('/api/data').then(r => r.json())
  );
}
```

### 2. Validate Input Early

```javascript
// ✅ Good
function processPayment(amount) {
  if (!amount || amount <= 0) {
    throw new ValidationError('Invalid amount', 'amount');
  }
  // Process payment...
}
```

### 3. Use Specific Error Types

```javascript
// ❌ Generic
throw new Error('Failed');

// ✅ Specific
throw new AuthError('Invalid credentials');
throw new NotFoundError('User');
throw new ValidationError('Email required', 'email');
```

### 4. Provide Context

```javascript
handleError(error, {
  component: 'Dashboard',
  action: 'loadData',
  userId: user.id,
});
```

### 5. Display User-Friendly Messages

```javascript
// ❌ Bad - Exposes internal details
showToast('Database connection failed at pg_pool.js:123', 'error');

// ✅ Good - User-friendly
showToast('Unable to load data. Please try again.', 'error');
```

---

## 🔧 Configuration

### Environment Variables

```env
# .env file
NODE_ENV=production           # 'development' or 'production'
ERROR_LOGGING_ENABLED=true    # Enable external logging
ERROR_LOG_ENDPOINT=/api/logs  # Error logging endpoint
```

### Customization

**Change session timeout duration:**
```javascript
// In AuthContext.jsx
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes
```

**Customize toast duration:**
```javascript
showToast('Message', 'info', 10000); // 10 seconds
```

**Customize retry attempts:**
```javascript
fetchWithRetry('/api/data', {}, 5); // 5 retries
```

---

## 🧪 Testing Error Handling

### Frontend Tests

```javascript
// Test error boundary
test('ErrorBoundary catches errors', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };
  
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  );
  
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});

// Test validation
test('Validates form correctly', () => {
  const validation = validateForm(
    { email: 'invalid' },
    { email: { required: true, email: true } }
  );
  
  expect(validation.isValid).toBe(false);
  expect(validation.errors.email).toBeDefined();
});
```

### Backend Tests

```javascript
// Test error middleware
const request = require('supertest');
const app = require('./app');

test('Returns 404 for unknown route', async () => {
  const res = await request(app).get('/api/unknown');
  expect(res.status).toBe(404);
  expect(res.body.success).toBe(false);
});

test('Handles validation errors', async () => {
  const res = await request(app)
    .post('/api/users')
    .send({ email: 'invalid' });
    
  expect(res.status).toBe(400);
  expect(res.body.message).toContain('validation');
});
```

---

## 📖 Common Scenarios

### Scenario 1: API Request Fails

```javascript
const result = await apiErrorHandler(
  async () => fetch('/api/data').then(r => r.json())
);

if (!result.success) {
  showToast(result.error, 'error');
  // Show fallback UI or cached data
}
```

### Scenario 2: Form Validation

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  const validation = validateForm(formData, rules);
  
  if (!validation.isValid) {
    setErrors(validation.errors);
    showToast('Please fix the errors', 'error');
    return;
  }
  
  // Submit form...
};
```

### Scenario 3: Network Error with Retry

```javascript
try {
  const data = await fetchWithRetry('/api/data', {}, 3);
  setData(data);
} catch (error) {
  if (error instanceof NetworkError) {
    showToast('Please check your connection', 'error');
  }
}
```

### Scenario 4: Session Timeout

```javascript
if (error.statusCode === 401) {
  logout();
  setSessionExpired(true);
  showToast('Session expired. Please login again.', 'warning');
  navigate('/login');
}
```

---

## 🐛 Troubleshooting

### Issue: Errors not being caught

**Solution:** Ensure ErrorBoundary wraps components and asyncHandler wraps routes.

### Issue: Toast not showing

**Solution:** Check that `{ToastContainer}` is rendered in your component.

### Issue: Validation not working

**Solution:** Verify field names in `rules` match `formData` keys.

### Issue: Network retry not working

**Solution:** Check network connectivity and API endpoint availability.

---

## 📞 Support

For questions or issues:
1. Check the examples in `ERROR_HANDLING_EXAMPLES.js`
2. Review the backend examples in `BACKEND_ERROR_EXAMPLES.js`
3. Contact the development team

---

## 📝 License

This error handling system is part of the AutiSmart project.

---

**Last Updated:** November 27, 2025
**Version:** 1.0.0
