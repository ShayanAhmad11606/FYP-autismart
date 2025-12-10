import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Toast from '../components/Toast';
import { userService } from '../services';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'caregiver',
    isVerified: true
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Fetch users error:', error);
      const errorMessage = error?.message || error?.response?.data?.message || 'Failed to fetch users';
      showToast(errorMessage, 'danger');
      setUsers([]); // Ensure users is always an array
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleCreateNew = () => {
    setModalMode('create');
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      role: 'caregiver',
      isVerified: true
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      password: '' // Don't populate password for edit
    });
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      setLoading(true);
      await userService.deleteUser(userId);
      showToast('User deleted successfully', 'success');
      await fetchUsers();
    } catch (error) {
      console.error('Delete error:', error);
      const errorMessage = error?.message || error?.response?.data?.message || 'Failed to delete user';
      showToast(errorMessage, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields validation
    if (!formData.name || !formData.email) {
      showToast('Name and email are required fields', 'warning');
      return;
    }

    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      showToast('Name must be at least 2 characters long', 'warning');
      return;
    }

    if (formData.name.trim().length > 50) {
      showToast('Name must not exceed 50 characters', 'warning');
      return;
    }

    // Check for numbers in name
    if (/\d/.test(formData.name)) {
      showToast('Name cannot contain numbers', 'warning');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }

    if (modalMode === 'create' && !formData.password) {
      showToast('Password is required for new users', 'warning');
      return;
    }

    // Password validation for new users or when changing password
    if ((modalMode === 'create' || formData.password) && formData.password) {
      // Password length check
      if (formData.password.length < 8) {
        showToast('Password must be at least 8 characters long', 'warning');
        return;
      }

      if (formData.password.length > 50) {
        showToast('Password must not exceed 50 characters', 'warning');
        return;
      }

      // Password strength check - require uppercase, lowercase, number, and special character
      const hasUpperCase = /[A-Z]/.test(formData.password);
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

      if (!hasUpperCase) {
        showToast('Password must contain at least one uppercase letter', 'warning');
        return;
      }

      if (!hasLowerCase) {
        showToast('Password must contain at least one lowercase letter', 'warning');
        return;
      }

      if (!hasNumber) {
        showToast('Password must contain at least one number', 'warning');
        return;
      }

      if (!hasSpecialChar) {
        showToast('Password must contain at least one special character (!@#$%^&*)', 'warning');
        return;
      }
    }

    try {
      setSubmitting(true);
      if (modalMode === 'create') {
        await userService.createUser(formData);
        showToast('User created successfully', 'success');
      } else {
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password; // Don't send empty password
        await userService.updateUser(selectedUser._id, updateData);
        showToast('User updated successfully', 'success');
      }
      setShowModal(false);
      await fetchUsers();
    } catch (error) {
      console.error('Submit error:', error);
      // Extract error message from various possible error structures
      let errorMessage = 'Failed to save user';
      if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      showToast(errorMessage, 'danger');
      // Keep modal open on error so user can fix it
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter(user => {
    if (!user) return false;
    const matchesSearch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (user.phone || '').includes(searchTerm);
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  }) : [];

  return (
    <div className="container-fluid mt-4 mb-5">
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 10000,
            maxWidth: '400px',
          }}
        >
          <Toast 
            message={toast.message} 
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'success' })}
          />
        </div>
      )}

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="text-primary-custom">
            <i className="bi bi-people me-2"></i>
            User Management
          </h1>
          <p className="text-muted">Manage all platform users and their permissions</p>
        </div>
        <button className="btn btn-primary" onClick={handleCreateNew}>
          <i className="bi bi-person-plus me-2"></i>
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Card className="card-stat">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{users.length}</div>
                <div className="stat-label">Total Users</div>
              </div>
              <i className="bi bi-people-fill fs-1 text-muted opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{users.filter(u => u.isVerified).length}</div>
                <div className="stat-label">Verified Users</div>
              </div>
              <i className="bi bi-person-check-fill fs-1 text-success opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-info">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{users.filter(u => u.role === 'expert').length}</div>
                <div className="stat-label">Experts</div>
              </div>
              <i className="bi bi-star-fill fs-1 text-info opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{users.filter(u => u.role === 'caregiver').length}</div>
                <div className="stat-label">Caregivers</div>
              </div>
              <i className="bi bi-heart-fill fs-1 text-warning opacity-50"></i>
            </div>
          </Card>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="row g-3 mb-4">
        <div className="col-md-9">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="caregiver">Caregiver</option>
            <option value="expert">Expert</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-muted"></i>
            <p className="text-muted mt-2">No users found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Verified</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="fw-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Badge variant={
                        user.role === 'admin' ? 'danger' :
                        user.role === 'expert' ? 'success' : 'primary'
                      }>
                        {user.role}
                      </Badge>
                    </td>
                    <td>
                      <Badge variant={user.isVerified ? 'success' : 'warning'}>
                        {user.isVerified ? 'Verified' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="text-muted small">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(user)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user._id)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Info */}
        {!loading && filteredUsers.length > 0 && (
          <div className="mt-3 pt-3 border-top">
            <span className="text-muted small">Showing {filteredUsers.length} of {users.length} users</span>
          </div>
        )}
      </Card>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-light text-dark">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {modalMode === 'create' ? 'Add New User' : 'Edit User'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => !submitting && setShowModal(false)}
                  disabled={submitting}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-dark fw-bold">Name *</label>
                    <input
                      type="text"
                      className="form-control border-2"
                      style={{ backgroundColor: '#fff', color: '#000' }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-dark fw-bold">Email *</label>
                    <input
                      type="email"
                      className="form-control border-2"
                      style={{ backgroundColor: '#fff', color: '#000' }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-dark fw-bold">Phone *</label>
                    <input
                      type="tel"
                      className="form-control border-2"
                      style={{ backgroundColor: '#fff', color: '#000' }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-dark fw-bold">
                      Password {modalMode === 'create' && '*'}
                    </label>
                    <input
                      type="password"
                      className="form-control border-2"
                      style={{ backgroundColor: '#fff', color: '#000' }}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required={modalMode === 'create'}
                      placeholder={modalMode === 'edit' ? 'Leave blank to keep current password' : ''}
                    />
                    {modalMode === 'create' && (
                      <small className="text-muted d-block mt-1">
                        Must be 8+ characters with uppercase, lowercase, number, and special character (!@#$%^&*)
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-dark fw-bold">Role *</label>
                    <select
                      className="form-select border-2"
                      style={{ backgroundColor: '#fff', color: '#000' }}
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    >
                      <option value="caregiver">Caregiver</option>
                      <option value="expert">Expert</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.isVerified}
                        onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                      />
                      <label className="form-check-label">
                        Verified User
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowModal(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {modalMode === 'create' ? 'Creating...' : 'Updating...'}
                        </>
                      ) : (
                        modalMode === 'create' ? 'Create User' : 'Update User'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
