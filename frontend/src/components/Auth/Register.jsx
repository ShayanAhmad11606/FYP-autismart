import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../config/firebaseClient';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [registrationType, setRegistrationType] = useState('email'); // 'email' or 'phone'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'caregiver',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('reCAPTCHA verified');
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation based on registration type
    if (registrationType === 'email') {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
    } else {
      if (!formData.name || !formData.phone || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      if (registrationType === 'phone') {
        // Firebase Phone Authentication
        setupRecaptcha();
        const appVerifier = window.recaptchaVerifier;
        const confirmation = await signInWithPhoneNumber(auth, formData.phone, appVerifier);
        setConfirmationResult(confirmation);
        setShowOtpInput(true);
        setLoading(false);
        setError('OTP sent to your phone number. Please enter it below.');
      } else {
        // Email Registration (existing flow)
        const payload = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };

        const response = await register(payload);

        if (response.success) {
          navigate('/verify-otp', { state: { email: formData.email } });
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify OTP with Firebase
      const result = await confirmationResult.confirm(otp);
      const firebaseUser = result.user;

      // Register user in backend with Firebase UID
      const payload = {
        name: formData.name,
        phoneNumber: formData.phone,
        password: formData.password,
        role: formData.role,
        firebaseUid: firebaseUser.uid,
        isPhoneVerified: true
      };

      const response = await register(payload);

      if (response.success) {
        // Navigate to dashboard or login
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please login with your phone number and password.' 
          } 
        });
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Register for AutiSmart</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Registration Type Toggle */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-pencil-square me-2"></i>
                  Register With
                </label>
                <div className="btn-group w-100" role="group">
                  <button
                    type="button"
                    className={`btn ${registrationType === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setRegistrationType('email')}
                  >
                    <i className="bi bi-envelope-fill me-2"></i>
                    Email
                  </button>
                  <button
                    type="button"
                    className={`btn ${registrationType === 'phone' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setRegistrationType('phone')}
                  >
                    <i className="bi bi-phone-fill me-2"></i>
                    Phone Number
                  </button>
                </div>
              </div>

              <div id="recaptcha-container"></div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    disabled={showOtpInput}
                  />
                </div>

                {/* Conditional Email or Phone Field */}
                {registrationType === 'email' ? (
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      <i className="bi bi-envelope-fill me-2"></i>
                      Email Address
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      <i className="bi bi-phone-fill me-2"></i>
                      Phone Number
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+923001234567"
                      required
                      disabled={showOtpInput}
                    />
                    <small className="form-text text-muted">
                      Include country code (e.g., +92 for Pakistan)
                    </small>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={showOtpInput}
                  >
                    <option value="caregiver">Caregiver</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password (min 6 characters)"
                      required
                      disabled={showOtpInput}
                      style={{ paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute"
                      onClick={togglePasswordVisibility}
                      style={{
                        right: '5px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'none',
                        padding: '0',
                        color: '#6c757d'
                      }}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                      disabled={showOtpInput}
                      style={{ paddingRight: '40px' }}
                    />
                    <button
                      type="button"
                      className="btn btn-link position-absolute"
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        right: '5px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'none',
                        padding: '0',
                        color: '#6c757d'
                      }}
                    >
                      <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>

                {/* OTP Input for Phone Registration */}
                {showOtpInput && (
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">
                      <i className="bi bi-shield-lock-fill me-2"></i>
                      Enter OTP
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      required
                    />
                    <small className="form-text text-muted">
                      Enter the OTP sent to your phone number
                    </small>
                  </div>
                )}

                {!showOtpInput ? (
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {registrationType === 'phone' ? 'Sending OTP...' : 'Registering...'}
                      </>
                    ) : (
                      registrationType === 'phone' ? 'Send OTP' : 'Register'
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying OTP...
                      </>
                    ) : (
                      'Verify OTP & Register'
                    )}
                  </button>
                )}
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Already have an account?{' '}
                  <a href="/login" className="text-decoration-none" style={{ color: '#5BB8AC' }}>
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
