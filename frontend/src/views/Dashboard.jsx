import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to role-specific dashboard
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin', { replace: true });
          break;
        case 'caregiver':
          navigate('/caregiver-dashboard', { replace: true });
          break;
        case 'expert':
          navigate('/expert-dashboard', { replace: true });
          break;
        default:
          // Keep on this dashboard for other roles
          break;
      }
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'danger';
      case 'expert': return 'success';
      case 'caregiver': return 'primary';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-vh-100">
      {/* Main Content */}
      <div className="container mt-4">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 hero-section">
              <div className="card-body p-4 text-white">
                <h2 className="mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>Welcome back, {user?.name}! 👋</h2>
                <p className="mb-0 opacity-90">
                  You're logged in as {user?.role}. Here's your dashboard overview.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{
              borderRadius: '16px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div style={{
                      background: '#5EBEB0',
                      borderRadius: '16px',
                      padding: '1rem',
                      color: 'white'
                    }}>
                      <i className="bi bi-person-badge fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="small mb-2 fw-semibold text-uppercase" style={{ letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Account Status</div>
                    <div>
                      <span className="badge bg-success fs-6 px-3 py-2">
                        <i className="bi bi-check-circle me-1"></i>Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{
              borderRadius: '16px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div style={{
                      background: '#5EBEB0',
                      borderRadius: '16px',
                      padding: '1rem',
                      color: 'white'
                    }}>
                      <i className="bi bi-shield-check fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="small mb-2 fw-semibold text-uppercase" style={{ letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Email Verified</div>
                    <div className="fs-5 fw-bold text-success">
                      <i className="bi bi-patch-check-fill me-2"></i>Yes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{
              borderRadius: '16px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '';
            }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div style={{
                      background: '#5EBEB0',
                      borderRadius: '16px',
                      padding: '1rem',
                      color: 'white'
                    }}>
                      <i className="bi bi-award fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="small mb-2 fw-semibold text-uppercase" style={{ letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Your Role</div>
                    <div>
                      <span className={`badge bg-${getRoleColor(user?.role)} fs-6 px-3 py-2 text-capitalize`}>
                        <i className="bi bi-star-fill me-1"></i>{user?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Information Card */}
        <div className="row">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header border-0 py-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h5 className="mb-0 text-primary-custom">
                  <i className="bi bi-person-lines-fill me-2"></i>
                  Account Details
                </h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <tbody>
                      <tr>
                        <td className="text-muted" width="30%" style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-person me-2"></i>
                          Full Name
                        </td>
                        <td className="fw-medium" style={{ color: 'var(--text-primary)' }}>{user?.name}</td>
                      </tr>
                      <tr>
                        <td className="text-muted" style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-envelope me-2"></i>
                          Email Address
                        </td>
                        <td className="fw-medium" style={{ color: 'var(--text-primary)' }}>{user?.email}</td>
                      </tr>
                      <tr>
                        <td className="text-muted" style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-tag me-2"></i>
                          User Role
                        </td>
                        <td>
                          <span className={`badge bg-${getRoleColor(user?.role)}`}>
                            {user?.role?.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted" style={{ color: 'var(--text-secondary)' }}>
                          <i className="bi bi-hash me-2"></i>
                          User ID
                        </td>
                        <td>
                          <code style={{ color: 'var(--text-secondary)' }}>{user?.id}</code>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header border-0 py-3" style={{ backgroundColor: 'var(--card-bg)' }}>
                <h5 className="mb-0 text-primary-custom">
                  <i className="bi bi-lightning-charge-fill me-2"></i>
                  Quick Actions
                </h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={() => navigate('/settings')}>
                    <i className="bi bi-gear me-2"></i>
                    Account Settings
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate('/change-password')}>
                    <i className="bi bi-lock me-2"></i>
                    Change Password
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate('/notifications')}>
                    <i className="bi bi-bell me-2"></i>
                    Notifications
                  </button>
                  <button className="btn btn-primary" onClick={() => navigate('/help')}>
                    <i className="bi bi-question-circle me-2"></i>
                    Help & Support
                  </button>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="card border-0 shadow-sm mt-3">
              <div className="card-body">
                <h6 className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                  <i className="bi bi-info-circle me-2"></i>
                  System Information
                </h6>
                <small className="d-block mb-2" style={{ color: 'var(--text-secondary)' }}>
                  <i className="bi bi-calendar-check me-2"></i>
                  Last Login: {new Date().toLocaleDateString()}
                </small>
                <small className="d-block" style={{ color: 'var(--text-secondary)' }}>
                  <i className="bi bi-shield-lock me-2"></i>
                  Security: 2FA Enabled
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
