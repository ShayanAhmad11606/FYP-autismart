/**
 * PhoneAuth Component
 * 
 * Implements Firebase Phone Authentication with OTP verification
 * Features:
 * - Phone number input with international format (+92)
 * - Invisible reCAPTCHA verification
 * - OTP sending via Firebase signInWithPhoneNumber
 * - OTP verification and Firebase ID token retrieval
 * - Backend integration for JWT token generation
 */

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../config/firebaseClient';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../styles/forms.css';

const PhoneAuth = () => {
  const location = useLocation();
  const registrationPhone = location.state?.phoneNumber || '';
  const isNewRegistration = location.state?.isNewRegistration || false;
  
  const [phoneNumber, setPhoneNumber] = useState(registrationPhone || '+92');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [timer, setTimer] = useState(0);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  // Setup invisible reCAPTCHA on component mount
  useEffect(() => {
    setupRecaptcha();
    
    // Show success message for new registrations
    if (isNewRegistration) {
      setSuccess('Registration successful! Please verify your phone number.');
    }
    
    // Cleanup on unmount
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, [isNewRegistration]);

  // Timer countdown for resend OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  /**
   * Initialize invisible reCAPTCHA verifier
   * This runs automatically before sending OTP
   */
  const setupRecaptcha = () => {
    try {
      // Clear existing verifier if any
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      // Create new reCAPTCHA verifier
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow OTP sending
            console.log('reCAPTCHA verified');
          },
          'expired-callback': () => {
            // Response expired, ask user to solve reCAPTCHA again
            setError('reCAPTCHA expired. Please try again.');
            setupRecaptcha();
          }
        }
      );
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      setError('Failed to initialize reCAPTCHA. Please refresh the page.');
    }
  };

  /**
   * Validate phone number format
   * Expected format: +92XXXXXXXXXX (Pakistan)
   */
  const validatePhoneNumber = (phone) => {
    // Remove spaces and check format
    const cleanPhone = phone.replace(/\s/g, '');
    
    // Must start with + and have 10-15 digits
    const phoneRegex = /^\+[1-9]\d{9,14}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      return false;
    }
    return true;
  };

  /**
   * Send OTP to the provided phone number
   * Uses Firebase signInWithPhoneNumber
   */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number with country code (e.g., +923001234567)');
      return;
    }

    setLoading(true);

    try {
      // Get reCAPTCHA verifier
      const appVerifier = window.recaptchaVerifier;

      // Send OTP via Firebase
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      
      // Store confirmation result for OTP verification
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setSuccess('OTP sent successfully! Please check your phone.');
      setTimer(60); // Start 60 second countdown
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please try again later.');
      } else if (error.code === 'auth/quota-exceeded') {
        setError('SMS quota exceeded. Please try again later.');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
      
      // Reset reCAPTCHA for retry
      setupRecaptcha();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verify OTP entered by user
   * Retrieves Firebase ID token and sends to backend
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!confirmationResult) {
      setError('Please request OTP first');
      return;
    }

    setLoading(true);

    try {
      // Verify OTP with Firebase
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Get Firebase ID Token
      const idToken = await user.getIdToken();

      console.log('Firebase verification successful:', { 
        phoneNumber: user.phoneNumber,
        uid: user.uid 
      });

      // Send ID token to backend for verification and JWT generation
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      console.log('Sending to backend:', apiUrl);
      
      const response = await axios.post(
        `${apiUrl}/api/auth/firebase-login`,
        { 
          idToken,
          phoneNumber: user.phoneNumber 
        }
      );

      console.log('Backend response:', response.data);

      // Store JWT token and user data
      const responseData = response.data.data || response.data;
      const { token, user: userData } = responseData;
      
      if (!token || !userData) {
        throw new Error('Invalid response from server');
      }
      
      // Use existing auth context login
      login(token, userData);

      setSuccess('Login successful! Redirecting...');
      
      // Redirect based on role
      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }, 1000);

    } catch (error) {
      console.error('Error verifying OTP:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        response: error.response?.data
      });
      
      if (error.code === 'auth/invalid-verification-code') {
        setError('Invalid OTP. Please check and try again.');
      } else if (error.code === 'auth/code-expired') {
        setError('OTP expired. Please request a new one.');
        setOtpSent(false);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to verify OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resend OTP to the same phone number
   */
  const handleResendOtp = async () => {
    if (timer > 0) return;
    
    setOtp('');
    setOtpSent(false);
    setConfirmationResult(null);
    setupRecaptcha();
    
    // Trigger send OTP again
    setTimeout(() => {
      handleSendOtp({ preventDefault: () => {} });
    }, 500);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="bi bi-phone-fill text-primary" style={{ fontSize: '3rem' }}></i>
                <h2 className="mt-3 fw-bold">Phone Login</h2>
                <p className="text-muted">Sign in with your phone number</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setError('')}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {success}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSuccess('')}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {/* Phone Number Input Form */}
              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <div className="mb-4">
                    <label htmlFor="phoneNumber" className="form-label fw-semibold">
                      <i className="bi bi-telephone-fill me-2"></i>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg"
                      id="phoneNumber"
                      placeholder="+923001234567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      disabled={loading}
                      style={{ borderRadius: '10px' }}
                    />
                    <small className="form-text text-muted">
                      Enter with country code (e.g., +92 for Pakistan)
                    </small>
                  </div>

                  {/* Invisible reCAPTCHA container */}
                  <div id="recaptcha-container"></div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={loading}
                    style={{ borderRadius: '10px', fontWeight: '600' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send-fill me-2"></i>
                        Send OTP
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* OTP Verification Form */
                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      <i className="bi bi-shield-lock-fill me-2"></i>
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={phoneNumber}
                      disabled
                      style={{ borderRadius: '10px', backgroundColor: '#f8f9fa' }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="otp" className="form-label fw-semibold">
                      <i className="bi bi-key-fill me-2"></i>
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg text-center"
                      id="otp"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength="6"
                      required
                      disabled={loading}
                      style={{ 
                        borderRadius: '10px', 
                        fontSize: '1.5rem', 
                        letterSpacing: '0.5rem',
                        fontWeight: '600'
                      }}
                    />
                    <small className="form-text text-muted">
                      Enter the 6-digit code sent to your phone
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg w-100 mb-3"
                    disabled={loading}
                    style={{ borderRadius: '10px', fontWeight: '600' }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Verify OTP
                      </>
                    )}
                  </button>

                  {/* Resend OTP */}
                  <div className="text-center">
                    {timer > 0 ? (
                      <p className="text-muted mb-2">
                        Resend OTP in <strong>{timer}s</strong>
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none"
                        onClick={handleResendOtp}
                        disabled={loading}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {/* Change Number */}
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setConfirmationResult(null);
                        setupRecaptcha();
                      }}
                      disabled={loading}
                    >
                      <i className="bi bi-pencil-fill me-2"></i>
                      Change Phone Number
                    </button>
                  </div>
                </form>
              )}

              {/* Divider */}
              <div className="position-relative my-4">
                <hr />
                <span 
                  className="position-absolute top-50 start-50 translate-middle px-3" 
                  style={{ backgroundColor: 'white' }}
                >
                  OR
                </span>
              </div>

              {/* Alternative Login Methods */}
              <div className="text-center">
                <p className="text-muted mb-2">Login with email instead?</p>
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => navigate('/login')}
                  style={{ borderRadius: '10px' }}
                >
                  <i className="bi bi-envelope-fill me-2"></i>
                  Email Login
                </button>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="text-muted">
              Don't have an account?{' '}
              <a href="/register" className="text-decoration-none fw-semibold">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;
