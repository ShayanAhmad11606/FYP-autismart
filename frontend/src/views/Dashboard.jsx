import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
            <div className="card border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'}}>
              <div className="card-body p-4 text-white">
                <h2 className="mb-2">Welcome back, {user?.name}! 👋</h2>
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
            <div className="card card-stat border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-primary-custom bg-opacity-10 text-primary-custom rounded p-3">
                      <i className="bi bi-person-badge fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div class="stat-label">Account Status</div>
                    <div className="stat-value">
                      <span className="badge bg-success">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-stat border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="bg-success bg-opacity-10 text-success rounded p-3">
                      <i className="bi bi-shield-check fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div class="stat-label">Email Verified</div>
                    <div className="stat-value">
                      <i className="bi bi-check-circle-fill text-success"></i> Yes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-stat border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className={`bg-${getRoleColor(user?.role)} bg-opacity-10 text-${getRoleColor(user?.role)} rounded p-3`}>
                      <i className="bi bi-award fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div class="stat-label">Your Role</div>
                    <div className="stat-value">
                      <span className={`badge bg-${getRoleColor(user?.role)}`}>
                        {user?.role}
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
              <div className="card-header bg-white border-0 py-3">
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
                        <td className="text-muted" width="30%">
                          <i className="bi bi-person me-2"></i>
                          Full Name
                        </td>
                        <td className="fw-medium">{user?.name}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">
                          <i className="bi bi-envelope me-2"></i>
                          Email Address
                        </td>
                        <td className="fw-medium">{user?.email}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">
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
                        <td className="text-muted">
                          <i className="bi bi-hash me-2"></i>
                          User ID
                        </td>
                        <td>
                          <code className="text-muted">{user?.id}</code>
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
              <div className="card-header bg-white border-0 py-3">
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
                <h6 className="text-muted mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  System Information
                </h6>
                <small className="text-muted d-block mb-2">
                  <i className="bi bi-calendar-check me-2"></i>
                  Last Login: {new Date().toLocaleDateString()}
                </small>
                <small className="text-muted d-block">
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
