import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: '',
    isVerified: false
  });
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'caregiver',
    isVerified: true
  });

  useEffect(() => {
    // Redirect if not admin
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching admin data...');
      const [statsData, usersData] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getAllUsers()
      ]);
      console.log('Stats data:', statsData);
      console.log('Users data:', usersData);
      setStats(statsData.data);
      setUsers(usersData.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.updateUser(selectedUser._id, editForm);
      setShowEditModal(false);
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to update user');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.createUser(createForm);
      setShowCreateModal(false);
      setCreateForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'caregiver',
        isVerified: true
      });
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await adminAPI.deleteUser(userId);
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <div className="container-fluid px-4 mt-4">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{background: 'linear-gradient(135deg, var(--danger) 0%, var(--danger-light) 100%)'}}>
              <div className="card-body p-4 text-white">
                <h2 className="mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
                  <i className="bi bi-shield-lock me-2"></i>
                  Admin Dashboard
                </h2>
                <p className="mb-0 opacity-90">
                  Welcome back, {user?.name}! Manage users and system settings.
                </p>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm" style={{background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)'}}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-people-fill fs-1 me-3 text-white opacity-75"></i>
                  <div>
                    <div className="text-white opacity-75 small">Total Users</div>
                    <h2 className="text-white mb-0">{stats?.totalUsers || 0}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm" style={{background: 'linear-gradient(135deg, var(--success) 0%, var(--success-light) 100%)'}}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill fs-1 me-3 text-white opacity-75"></i>
                  <div>
                    <div className="text-white opacity-75 small">Verified</div>
                    <h2 className="text-white mb-0">{stats?.verifiedUsers || 0}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm" style={{background: 'linear-gradient(135deg, var(--warning) 0%, var(--warning-light) 100%)'}}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-clock-fill fs-1 me-3 text-white opacity-75"></i>
                  <div>
                    <div className="text-white opacity-75 small">Unverified</div>
                    <h2 className="text-white mb-0">{stats?.unverifiedUsers || 0}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm" style={{background: 'linear-gradient(135deg, var(--info) 0%, var(--info-light) 100%)'}}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <i className="bi bi-star-fill fs-1 me-3 text-white opacity-75"></i>
                  <div>
                    <div className="text-white opacity-75 small">Experts</div>
                    <h2 className="text-white mb-0">{stats?.byRole?.expert || 0}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-primary-custom">
              <i className="bi bi-table me-2"></i>
              User Management
            </h5>
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Create User
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                        <p className="text-muted mb-0">No users found</p>
                      </td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user._id}>
                        <td className="fw-medium">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || 'N/A'}</td>
                        <td>
                          <span className={`badge bg-${
                            user.role === 'admin' ? 'danger' : 
                            user.role === 'expert' ? 'success' : 'primary'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          {user.isVerified ? (
                            <span className="badge bg-success">
                              <i className="bi bi-check-circle me-1"></i>
                              Verified
                            </span>
                          ) : (
                            <span className="badge bg-warning">
                              <i className="bi bi-clock me-1"></i>
                              Pending
                            </span>
                          )}
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEdit(user)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(user._id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select 
                      className="form-select"
                      value={editForm.role}
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                    >
                      <option value="caregiver">Caregiver</option>
                      <option value="expert">Expert</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={editForm.isVerified}
                      onChange={(e) => setEditForm({...editForm, isVerified: e.target.checked})}
                    />
                    <label className="form-check-label">Verified</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Create New User
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowCreateModal(false)}></button>
              </div>
              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={createForm.name}
                      onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control"
                      value={createForm.email}
                      onChange={(e) => setCreateForm({...createForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-control"
                      value={createForm.phone}
                      onChange={(e) => setCreateForm({...createForm, phone: e.target.value})}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control"
                      value={createForm.password}
                      onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
                      required
                      minLength="6"
                    />
                    <small className="text-muted">Minimum 6 characters</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select 
                      className="form-select"
                      value={createForm.role}
                      onChange={(e) => setCreateForm({...createForm, role: e.target.value})}
                    >
                      <option value="caregiver">Caregiver</option>
                      <option value="expert">Expert</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input"
                      checked={createForm.isVerified}
                      onChange={(e) => setCreateForm({...createForm, isVerified: e.target.checked})}
                    />
                    <label className="form-check-label">Verified (User can login immediately)</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-2"></i>
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
