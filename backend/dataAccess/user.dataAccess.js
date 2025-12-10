/**
 * User Data Access Layer
 * Handles all database operations for User model
 */
import User from '../models/User.js';

class UserDataAccess {
  /**
   * Find user by ID
   */
  async findById(id, selectFields = '-password') {
    return await User.findById(id).select(selectFields);
  }

  /**
   * Find user by email
   */
  async findByEmail(email, includePassword = false) {
    const query = User.findOne({ email });
    return includePassword ? query : query.select('-password');
  }

  /**
   * Find user by email with password (for authentication)
   */
  async findByEmailWithPassword(email) {
    return await User.findOne({ email }).select('+password');
  }

  /**
   * Create new user
   */
  async create(userData) {
    const user = new User(userData);
    return await user.save();
  }

  /**
   * Update user by ID
   */
  async updateById(id, updateData) {
    return await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
  }

  /**
   * Delete user by ID
   */
  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }

  /**
   * Find all users with filters
   */
  async findAll(filters = {}, selectFields = '-password') {
    return await User.find(filters).select(selectFields);
  }

  /**
   * Count users with filters
   */
  async count(filters = {}) {
    return await User.countDocuments(filters);
  }

  /**
   * Update user password
   */
  async updatePassword(userId, newPassword) {
    const user = await User.findById(userId);
    if (!user) return null;
    
    user.password = newPassword;
    return await user.save();
  }

  /**
   * Verify user email
   */
  async verifyEmail(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { isVerified: true, emailVerified: true },
      { new: true }
    ).select('-password');
  }

  /**
   * Update OTP fields
   */
  async updateOTP(userId, otp, otpExpiry) {
    return await User.findByIdAndUpdate(
      userId,
      { otp, otpExpiry },
      { new: true }
    );
  }

  /**
   * Clear OTP fields
   */
  async clearOTP(userId) {
    return await User.findByIdAndUpdate(
      userId,
      { $unset: { otp: '', otpExpiry: '' } },
      { new: true }
    );
  }
}

export default new UserDataAccess();
