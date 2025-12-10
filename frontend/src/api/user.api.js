import http from './http';

/**
 * User/Admin API endpoints
 */
const userAPI = {
  /**
   * Create new user (Admin only)
   */
  createUser: async (userData) => {
    try {
      const response = await http.post('/admin/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create user' };
    }
  },

  /**
   * Get all users (Admin only)
   */
  getAllUsers: async () => {
    try {
      const response = await http.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  /**
   * Get single user by ID (Admin only)
   */
  getUser: async (userId) => {
    try {
      const response = await http.get(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user' };
    }
  },

  /**
   * Update user (Admin only)
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await http.put(`/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user' };
    }
  },

  /**
   * Update user role (Admin only)
   */
  updateUserRole: async (userId, role) => {
    try {
      const response = await http.put(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user role' };
    }
  },

  /**
   * Toggle user verification status (Admin only)
   */
  toggleVerification: async (userId) => {
    try {
      const response = await http.put(`/admin/users/${userId}/toggle-verification`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to toggle verification' };
    }
  },

  /**
   * Delete user (Admin only)
   */
  deleteUser: async (userId) => {
    try {
      const response = await http.delete(`/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' };
    }
  },

  /**
   * Get user statistics (Admin only)
   */
  getStats: async () => {
    try {
      const response = await http.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch statistics' };
    }
  },
};

export default userAPI;
