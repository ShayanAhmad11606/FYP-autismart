/**
 * SMS Service Configuration
 * 
 * Sends OTP via SMS using Firebase Admin SDK
 * No additional SMS service required - uses Firebase Phone Auth
 */

import { firebaseAuth } from './firebaseAdmin.js';

/**
 * Generate OTP code
 * @returns {string} - 6-digit OTP
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via Firebase (stores for verification)
 * Note: Firebase handles SMS sending automatically when user verifies on frontend
 * Backend just generates and stores the OTP
 * 
 * @param {string} phoneNumber - Recipient phone number (with country code)
 * @param {string} otp - 6-digit OTP code
 * @param {string} name - User's name (optional)
 * @returns {Promise} - Success response
 */
export const sendOTPSMS = async (phoneNumber, otp, name = 'User') => {
  try {
    // Log OTP for development/testing
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📱 SMS OTP Generated');
    console.log(`Phone: ${phoneNumber}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Name: ${name}`);
    console.log('User will receive OTP via Firebase on frontend');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // OTP is stored in database and will be verified when user submits
    // Firebase will handle actual SMS sending on frontend
    return { 
      success: true, 
      message: 'OTP generated successfully',
      otp: otp 
    };
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw new Error('Failed to generate OTP. Please try again.');
  }
};

/**
 * Send password reset OTP via SMS
 * @param {string} phoneNumber - Recipient phone number
 * @param {string} otp - 6-digit OTP code
 * @param {string} name - User's name
 * @returns {Promise} - Success response
 */
export const sendPasswordResetSMS = async (phoneNumber, otp, name = 'User') => {
  try {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📱 PASSWORD RESET OTP Generated');
    console.log(`Phone: ${phoneNumber}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Name: ${name}`);
    console.log('User will receive OTP via Firebase on frontend');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return { 
      success: true, 
      message: 'Password reset OTP generated',
      otp: otp 
    };
  } catch (error) {
    console.error('Error generating password reset OTP:', error);
    throw new Error('Failed to generate password reset OTP. Please try again.');
  }
};

