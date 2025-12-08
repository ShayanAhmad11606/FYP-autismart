import axios from 'axios';

// Base API URL - change this to your backend URL
const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Verify OTP
  verifyOtp: async (verifyData) => {
    try {
      // Support both old signature (email, otp) and new signature (verifyData object)
      let otpData;
      if (typeof verifyData === 'string') {
        const otp = arguments[1];
        otpData = { email: verifyData, otp };
      } else {
        otpData = verifyData;
      }
      
      const response = await api.post('/auth/verify-otp', otpData);
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'OTP verification failed' };
    }
  },

  // Login
  login: async (credentials) => {
    try {
      // Support both old signature (email, password) and new signature (credentials object)
      let loginData;
      if (typeof credentials === 'string') {
        const password = arguments[1];
        loginData = { email: credentials, password };
      } else {
        loginData = credentials;
      }
      
      const response = await api.post('/auth/login', loginData);
      if (response.data.success && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Resend OTP
  resendOtp: async (resendData) => {
    try {
      // Support both old signature (email) and new signature (resendData object)
      let data;
      if (typeof resendData === 'string') {
        data = { email: resendData };
      } else {
        data = resendData;
      }
      
      const response = await api.post('/auth/resend-otp', data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to resend OTP' };
    }
  },

  // Forgot Password - send OTP
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send reset email' };
    }
  },

  // Reset Password with OTP
  resetPassword: async (email, otp, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        email, 
        otp, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to reset password' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// Admin API endpoints
export const adminAPI = {
  // Create new user
  createUser: async (userData) => {
    try {
      const response = await api.post('/admin/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create user' };
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Get single user
  getUser: async (userId) => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user' };
    }
  },

  // Update user
  updateUser: async (userId, userData) => {
    try {
      const response = await api.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user' };
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' };
    }
  },

  // Get user statistics
  getStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch statistics' };
    }
  },
};

// Child Management API endpoints
export const childAPI = {
  // Add a new child
  addChild: async (childData) => {
    try {
      const response = await api.post('/caregiver/children', childData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add child' };
    }
  },

  // Get all children for the logged-in caregiver
  getChildren: async () => {
    try {
      const response = await api.get('/caregiver/children');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch children' };
    }
  },

  // Get a specific child
  getChild: async (childId) => {
    try {
      const response = await api.get(`/caregiver/children/${childId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch child' };
    }
  },

  // Update child information
  updateChild: async (childId, childData) => {
    try {
      const response = await api.put(`/caregiver/children/${childId}`, childData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update child' };
    }
  },

  // Delete a child
  deleteChild: async (childId) => {
    try {
      const response = await api.delete(`/caregiver/children/${childId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete child' };
    }
  },

  // Record an activity for a child
  recordActivity: async (childId, activityData) => {
    try {
      const response = await api.post(`/caregiver/children/${childId}/activities`, activityData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to record activity' };
    }
  },

  // Get activities for a child
  getChildActivities: async (childId, limit = 50) => {
    try {
      const response = await api.get(`/caregiver/children/${childId}/activities?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch activities' };
    }
  },

  // Get child report with statistics
  getChildReport: async (childId) => {
    try {
      const response = await api.get(`/caregiver/children/${childId}/report`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch report' };
    }
  },

  // Download child report as PDF
  downloadChildReportPDF: async (childId) => {
    try {
      const response = await api.get(`/caregiver/children/${childId}/report/download`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to download report' };
    }
  },
};

export default api;
