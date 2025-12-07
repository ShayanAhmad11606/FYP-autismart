import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp } = useAuth();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationType, setVerificationType] = useState('email'); // 'email' or 'phone'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    // Get email or phone from navigation state
    if (location.state?.email) {
      setEmail(location.state.email);
      setVerificationType('email');
    } else if (location.state?.phoneNumber) {
      setPhoneNumber(location.state.phoneNumber);
      setVerificationType('phone');
    } else {
      // If no email or phone in state, redirect to register
      navigate('/register');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const payload = verificationType === 'email' 
        ? { email, otp }
        : { phoneNumber, otp };
      
      const response = await verifyOtp(payload);
      
      if (response.success) {
        setSuccess(verificationType === 'email' 
          ? 'Email verified successfully! Redirecting...' 
          : 'Phone number verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    setResendLoading(true);

    try {
      const payload = verificationType === 'email'
        ? { email }
        : { phoneNumber };
        
      const response = await authAPI.resendOtp(payload);
      
      if (response.success) {
        setSuccess(verificationType === 'email'
          ? 'OTP has been resent to your email!'
          : 'OTP has been resent to your phone!');
        setOtp('');
      }
    } catch (err) {
      setError(err.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {verificationType === 'email' ? 'Verify Your Email' : 'Verify Your Phone'}
              </h2>
              
              <p className="text-center text-muted mb-4">
                We've sent a 6-digit OTP to<br />
                <strong>{verificationType === 'email' ? email : phoneNumber}</strong>
              </p>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg text-center"
                    id="otp"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 6) {
                        setOtp(value);
                        setError('');
                      }
                    }}
                    placeholder="000000"
                    maxLength={6}
                    required
                    style={{ letterSpacing: '0.5em', fontSize: '1.5rem' }}
                  />
                  <div className="form-text text-center">
                    OTP expires in 10 minutes
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Verifying...
                    </>
                  ) : (
                    'Verify OTP'
                  )}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={handleResendOtp}
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Resending...
                    </>
                  ) : (
                    'Resend OTP'
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  <a href="/register" className="text-decoration-none">
                    Back to Register
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

export default VerifyOtp;
