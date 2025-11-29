import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, sessionExpired, setSessionExpired } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (sessionExpired) {
      setError('Session expired due to inactivity. Please login again.');
      setSessionExpired(false);
    }
  }, [sessionExpired, setSessionExpired]);

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

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleLoading(true);
    
    try {
      // For now, this is a placeholder. You'll need to implement Google OAuth
      // This would typically redirect to Google's OAuth endpoint or use Google's SDK
      setError('Google Sign-In will be configured with your Google OAuth credentials');
      
      // Example implementation would be:
      // window.location.href = 'http://localhost:5000/api/auth/google';
      // OR use Google's JavaScript SDK
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);
      
      if (response.success) {
        // Navigate based on user role
        const userRole = response.data.user.role;
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
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
              <h2 className="text-center mb-4">Login to AutiSmart</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
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
                      placeholder="Enter your password"
                      required
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

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="position-relative my-4">
                <hr />
                <span 
                  className="position-absolute top-50 start-50 translate-middle px-3 bg-white text-muted"
                  style={{ fontSize: '0.9rem' }}
                >
                  OR
                </span>
              </div>

              {/* Google Sign-In Button */}
              <button
                type="button"
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                onClick={handleGoogleLogin}
                disabled={googleLoading}
                style={{
                  borderRadius: '8px',
                  padding: '12px',
                  fontWeight: '500',
                  border: '1px solid #dadce0',
                  backgroundColor: '#ffffff',
                  color: '#3c4043'
                }}
              >
                {googleLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in with Google...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" className="me-2">
                      <g fill="none" fillRule="evenodd">
                        <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4"/>
                        <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
                        <path d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z" fill="#FBBC05"/>
                        <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
                      </g>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <div className="text-center mt-3">
                <p className="mb-2">
                  <a href="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </a>
                </p>
                <p className="mb-0">
                  Don't have an account?{' '}
                  <a href="/register" className="text-decoration-none">
                    Register here
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

export default Login;
