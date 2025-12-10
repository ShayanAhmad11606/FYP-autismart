import authAPI from '../api/auth.api';

/**
 * Authentication Service
 * Business logic for authentication operations
 */
class AuthService {
  /**
   * Register a new user
   */
  async register(userData) {
    return await authAPI.register(userData);
  }

  /**
   * Verify OTP after registration
   */
  async verifyOtp(verifyData) {
    return await authAPI.verifyOtp(verifyData);
  }

  /**
   * Login user
   */
  async login(credentials) {
    return await authAPI.login(credentials);
  }

  /**
   * Resend OTP
   */
  async resendOtp(resendData) {
    return await authAPI.resendOtp(resendData);
  }

  /**
   * Get user profile
   */
  async getProfile() {
    return await authAPI.getProfile();
  }

  /**
   * Change password
   */
  async changePassword(currentPassword, newPassword) {
    return await authAPI.changePassword({ currentPassword, newPassword });
  }

  /**
   * Forgot password - send OTP
   */
  async forgotPassword(email) {
    return await authAPI.forgotPassword(email);
  }

  /**
   * Reset password with OTP
   */
  async resetPassword(email, otp, newPassword) {
    return await authAPI.resetPassword(email, otp, newPassword);
  }

  /**
   * Logout user
   */
  logout() {
    authAPI.logout();
  }

  /**
   * Get current user from storage
   */
  getCurrentUser() {
    return authAPI.getCurrentUser();
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return authAPI.isAuthenticated();
  }

  /**
   * Get user role
   */
  getUserRole() {
    const user = this.getCurrentUser();
    return user?.role || null;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role) {
    return this.getUserRole() === role;
  }

  /**
   * Check if user is admin
   */
  isAdmin() {
    return this.hasRole('admin');
  }

  /**
   * Check if user is caregiver
   */
  isCaregiver() {
    return this.hasRole('caregiver');
  }

  /**
   * Check if user is expert
   */
  isExpert() {
    return this.hasRole('expert');
  }
}

export default new AuthService();
