/**
 * Authentication Service
 * Handles business logic for authentication operations
 */
import jwt from 'jsonwebtoken';
import userDataAccess from '../dataAccess/user.dataAccess.js';
import { sendOTPEmail } from '../config/email.js';
import User from '../models/User.js';

class AuthService {
  /**
   * Generate JWT token
   */
  generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  }

  /**
   * Register new user
   */
  async register(userData) {
    const { name, email, password, role } = userData;

    // Validation
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    // Check if user already exists
    const existingUser = await userDataAccess.findByEmail(email, false);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create user data object
    const newUserData = {
      name,
      email,
      password,
      role: role || 'caregiver',
    };

    // Create new user
    const user = new User(newUserData);

    // Generate and send email OTP
    const otp = user.generateOTP();
    await user.save();
    
    console.log('✅ User saved to database:', { 
      id: user._id, 
      email: user.email,
      otp: user.otp,
      otpExpiry: user.otpExpiry
    });
    
    // Send OTP email
    try {
      await sendOTPEmail(user.email, otp, user.name);
      console.log('✅ OTP email sent to:', user.email);
    } catch (emailError) {
      console.error('❌ Email send error:', emailError);
      throw new Error('Failed to send verification email. Please try again.');
    }

      return {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: 'Registration successful! Please check your email for the verification code.',
      };
  }

  /**
   * Login user
   */
  async login(credentials) {
    const { email, password } = credentials;

    // Validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user with password
    const user = await userDataAccess.findByEmailWithPassword(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Check if verified
    if (!user.isVerified) {
      throw new Error('Please verify your email before logging in');
    }

    const token = this.generateToken(user._id);
    return { user, token };
  }

  /**
   * Verify OTP
   */
  async verifyOTP(email, otp) {
    // Need to get user with OTP fields
    const user = await User.findOne({ email }).select('+otp +otpExpires');

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      throw new Error('User already verified');
    }

    // Check if OTP is valid
    if (!user.otp || !user.otpExpires) {
      throw new Error('No OTP found. Please request a new one.');
    }

    if (Date.now() > user.otpExpires) {
      throw new Error('OTP has expired. Please request a new one.');
    }

    if (user.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Mark user as verified
    const updatedUser = await userDataAccess.verifyEmail(user._id);
    await userDataAccess.clearOTP(user._id);

    const token = this.generateToken(updatedUser._id);
    return { user: updatedUser, token };
  }

  /**
   * Resend OTP
   */
  async resendOTP(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.isVerified) {
      throw new Error('User already verified');
    }

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();
    

    // Send OTP email
    await sendOTPEmail(user.email, otp, user.name);

    return { message: 'OTP sent successfully' };
  }

  /**
   * Change password
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    await userDataAccess.updatePassword(userId, newPassword);

    return { message: 'Password changed successfully' };
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    const user = await userDataAccess.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default new AuthService();
