import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendOTPEmail } from '../config/email.js';
import { sendOTPSMS } from '../config/sms.js';
import { firebaseAuth } from '../config/firebaseAdmin.js';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, phone, phoneNumber, password, role } = req.body;

    // Determine registration type
    const isEmailRegistration = email && email.trim() !== '';
    const isPhoneRegistration = (phoneNumber && phoneNumber.trim() !== '') || 
                                 (!email && phone && phone.trim() !== '');

    // Validation
    if (!name || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name and password are required',
      });
    }

    if (!isEmailRegistration && !isPhoneRegistration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either email or phone number',
      });
    }

    // Check if user already exists
    let existingUser = null;
    if (isEmailRegistration) {
      existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already registered',
        });
      }
    }

    if (isPhoneRegistration) {
      const phoneToCheck = phoneNumber || phone;
      existingUser = await User.findOne({ 
        $or: [
          { phoneNumber: phoneToCheck },
          { phone: phoneToCheck }
        ]
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Phone number already registered',
        });
      }
    }

    // Create user data object
    const userData = {
      name,
      password,
      role: role || 'caregiver',
    };

    // Add email or phone based on registration type
    if (isEmailRegistration) {
      userData.email = email;
      userData.phone = phone || ''; // Optional legacy field
    }

    if (isPhoneRegistration) {
      const phoneToUse = phoneNumber || phone;
      userData.phoneNumber = phoneToUse;
      userData.phone = phoneToUse; // Legacy field
      // For phone registration, we'll verify via Firebase later
      // So we don't send email OTP
    }

    // Create new user
    const user = new User(userData);

    // Only generate and send email OTP for email registration
    if (isEmailRegistration) {
      const otp = user.generateOTP();
      await user.save();
      
      console.log('✅ User saved to database:', { 
        id: user._id, 
        email: user.email,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      });

      // Send OTP email
      try {
        await sendOTPEmail(email, otp, name);
      } catch (emailError) {
        // If email fails, delete the user and return error
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({
          success: false,
          message: 'Failed to send verification email. Please try again.',
        });
      }

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your email for OTP.',
        data: {
          userId: user._id,
          email: user.email,
          registrationType: 'email',
        },
      });
    } else {
      // Phone registration - send SMS OTP (just like email)
      const otp = user.generateOTP();
      await user.save();
      
      console.log('✅ User saved to database:', { 
        id: user._id, 
        phoneNumber: user.phoneNumber,
        name: user.name,
        role: user.role,
        isVerified: user.isVerified
      });

      // Send OTP via SMS
      try {
        await sendOTPSMS(user.phoneNumber, otp, name);
      } catch (smsError) {
        // If SMS fails, delete the user and return error
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({
          success: false,
          message: 'Failed to send verification SMS. Please try again.',
        });
      }

      res.status(201).json({
        success: true,
        message: 'Registration successful. Please check your phone for OTP.',
        data: {
          userId: user._id,
          phoneNumber: user.phoneNumber,
          registrationType: 'phone',
        },
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req, res) => {
  try {
    const { email, phoneNumber, otp } = req.body;

    // Validation - need either email or phone
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide OTP',
      });
    }

    if (!email && !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or phone number',
      });
    }

    // Find user by email or phone
    let user;
    if (email) {
      user = await User.findOne({ email }).select('+otp +otpExpires');
    } else {
      user = await User.findOne({
        $or: [
          { phoneNumber: phoneNumber },
          { phone: phoneNumber }
        ]
      }).select('+otp +otpExpires');
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: email ? 'Email already verified' : 'Phone number already verified',
      });
    }

    // Check if OTP is valid
    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new one.',
      });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    // Mark user as verified and clear OTP
    user.isVerified = true;
    if (phoneNumber) {
      user.isPhoneVerified = true;
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: email ? 'Email verified successfully' : 'Phone number verified successfully',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during OTP verification',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    // Validation - need either email or phone
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide password',
      });
    }

    if (!email && !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or phone number',
      });
    }

    // Find user by email or phone with password field
    let user;
    if (email) {
      user = await User.findOne({ email }).select('+password');
    } else {
      user = await User.findOne({
        $or: [
          { phoneNumber: phoneNumber },
          { phone: phoneNumber }
        ]
      }).select('+password');
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: email ? 'Please verify your email first' : 'Please verify your phone number first',
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
export const resendOtp = async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;

    // Validation - need either email or phone
    if (!email && !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or phone number',
      });
    }

    // Find user
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({
        $or: [
          { phoneNumber: phoneNumber },
          { phone: phoneNumber }
        ]
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: email ? 'Email already verified' : 'Phone number already verified',
      });
    }

    // Generate new OTP
    const otp = user.generateOTP();
    await user.save();

    // Send OTP via email or SMS
    try {
      if (email) {
        await sendOTPEmail(email, otp, user.name);
      } else {
        await sendOTPSMS(user.phoneNumber, otp, user.name);
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: email ? 'Failed to send verification email. Please try again.' : 'Failed to send verification SMS. Please try again.',
      });
    }

    res.status(200).json({
      success: true,
      message: email ? 'OTP has been resent to your email' : 'OTP has been resent to your phone',
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resending OTP',
      error: error.message,
    });
  }
};

// @desc    Forgot password - send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email',
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Please verify your email first',
      });
    }

    // Generate OTP for password reset
    const otp = user.generateOTP();
    await user.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, user.name, 'Password Reset');
    } catch (emailError) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send reset email. Please try again.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset OTP has been sent to your email',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing request',
      error: error.message,
    });
  }
};

// @desc    Reset password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, OTP, and new password',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Find user with OTP
    const user = await User.findOne({ email }).select('+otp +otpExpires +password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if OTP is valid
    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please request a new one.',
      });
    }

    // Check if OTP has expired
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.',
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP',
      });
    }

    // Update password and clear OTP
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while resetting password',
      error: error.message,
    });
  }
};

// @desc    Firebase Phone Authentication - Login/Register
// @route   POST /api/auth/firebase-login
// @access  Public
export const firebaseLogin = async (req, res) => {
  try {
    const { idToken, phoneNumber } = req.body;

    // Validation
    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Firebase ID token is required',
      });
    }

    // Check if Firebase Admin is initialized
    if (!firebaseAuth) {
      console.error('Firebase Admin not initialized');
      return res.status(500).json({
        success: false,
        message: 'Firebase authentication service is not available',
      });
    }

    // Verify Firebase ID token
    let decodedToken;
    try {
      decodedToken = await firebaseAuth.verifyIdToken(idToken);
    } catch (verifyError) {
      console.error('Firebase token verification error:', verifyError);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired Firebase token',
      });
    }

    // Extract phone number and Firebase UID from decoded token
    const firebaseUid = decodedToken.uid;
    const verifiedPhone = decodedToken.phone_number || phoneNumber;

    if (!verifiedPhone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number not found in token',
      });
    }

    console.log('✓ Firebase token verified:', { uid: firebaseUid, phone: verifiedPhone });

    // Check if user exists with this phone number or Firebase UID
    let user = await User.findOne({
      $or: [
        { phoneNumber: verifiedPhone },
        { phone: verifiedPhone },
        { firebaseUid: firebaseUid }
      ]
    });

    if (user) {
      // User exists - update verification status and Firebase UID
      console.log('✓ Existing user found:', user._id);
      
      user.isPhoneVerified = true;
      
      // Update Firebase UID if not set
      if (!user.firebaseUid) {
        user.firebaseUid = firebaseUid;
      }
      
      // Update phone number if not set
      if (!user.phoneNumber) {
        user.phoneNumber = verifiedPhone;
      }
      
      // Update legacy phone field
      if (!user.phone) {
        user.phone = verifiedPhone;
      }
      
      // Mark as verified if not already
      if (!user.isVerified) {
        user.isVerified = true;
      }
      
      await user.save();
      
    } else {
      // User doesn't exist - create new user with phone authentication
      console.log('✓ Creating new user with phone:', verifiedPhone);
      
      // Extract name from phone number or use default
      const defaultName = `User_${verifiedPhone.slice(-4)}`;
      
      user = new User({
        name: defaultName,
        phoneNumber: verifiedPhone,
        firebaseUid: firebaseUid,
        isPhoneVerified: true,
        isVerified: true,
        role: 'caregiver', // Default role
        // No password required for phone-based signup
      });
      
      await user.save();
      console.log('✓ New user created:', user._id);
    }

    // Generate JWT token for session management
    const token = generateToken(user._id);

    // Return success response with JWT and user data
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          isPhoneVerified: user.isPhoneVerified,
        },
      },
    });

  } catch (error) {
    console.error('Firebase login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during Firebase authentication',
      error: error.message,
    });
  }
};

