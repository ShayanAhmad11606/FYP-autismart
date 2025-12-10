import userAPI from '../api/user.api';

/**
 * User Service
 * Business logic for user management operations
 */
class UserService {
  /**
   * Get all users (Admin only)
   */
  async getAllUsers() {
    return await userAPI.getAllUsers();
  }

  /**
   * Get user by ID
   */
  async getUser(userId) {
    return await userAPI.getUser(userId);
  }

  /**
   * Update user
   */
  async updateUser(userId, userData) {
    return await userAPI.updateUser(userId, userData);
  }

  /**
   * Update user role
   */
  async updateUserRole(userId, role) {
    // Validate role
    const validRoles = ['admin', 'caregiver', 'expert'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role');
    }
    return await userAPI.updateUserRole(userId, role);
  }

  /**
   * Toggle user verification status
   */
  async toggleVerification(userId) {
    return await userAPI.toggleVerification(userId);
  }

  /**
   * Delete user
   */
  async deleteUser(userId) {
    return await userAPI.deleteUser(userId);
  }

  /**
   * Get user statistics
   */
  async getStats() {
    return await userAPI.getStats();
  }

  /**
   * Format user data for display
   */
  formatUserForDisplay(user) {
    return {
      ...user,
      roleLabel: this.getRoleLabel(user.role),
      statusLabel: user.isVerified ? 'Verified' : 'Unverified',
    };
  }

  /**
   * Get role label
   */
  getRoleLabel(role) {
    const labels = {
      admin: 'Administrator',
      caregiver: 'Caregiver',
      expert: 'Expert',
    };
    return labels[role] || role;
  }
}

export default new UserService();
