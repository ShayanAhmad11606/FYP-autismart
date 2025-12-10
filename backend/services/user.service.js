/**
 * User Service
 * Handles business logic for user management operations
 */
import userDataAccess from '../dataAccess/user.dataAccess.js';

class UserService {
  /**
   * Get all users
   */
  async getAllUsers(filters = {}) {
    const users = await userDataAccess.findAll(filters);
    return users;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    const user = await userDataAccess.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Update user
   */
  async updateUser(userId, updateData) {
    // Remove sensitive fields that shouldn't be updated directly
    const { password, otp, otpExpiry, ...safeUpdateData } = updateData;

    const user = await userDataAccess.updateById(userId, safeUpdateData);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Delete user
   */
  async deleteUser(userId) {
    const user = await userDataAccess.deleteById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return { message: 'User deleted successfully' };
  }

  /**
   * Get user statistics
   */
  async getUserStatistics() {
    const totalUsers = await userDataAccess.count();
    const caregivers = await userDataAccess.count({ role: 'caregiver' });
    const experts = await userDataAccess.count({ role: 'expert' });
    const admins = await userDataAccess.count({ role: 'admin' });
    const verifiedUsers = await userDataAccess.count({ isVerified: true });

    return {
      totalUsers,
      caregivers,
      experts,
      admins,
      verifiedUsers,
      unverifiedUsers: totalUsers - verifiedUsers
    };
  }

  /**
   * Update user role
   */
  async updateUserRole(userId, newRole) {
    const validRoles = ['caregiver', 'expert', 'admin'];
    
    if (!validRoles.includes(newRole)) {
      throw new Error('Invalid role');
    }

    const user = await userDataAccess.updateById(userId, { role: newRole });
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  /**
   * Toggle user verification status
   */
  async toggleVerificationStatus(userId) {
    const user = await userDataAccess.findById(userId, '+password');
    
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await userDataAccess.updateById(userId, { 
      isVerified: !user.isVerified 
    });

    return updatedUser;
  }
}

export default new UserService();
