import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'caregiver', status: 'Active', joined: '2025-01-15', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', role: 'expert', status: 'Active', joined: '2025-02-20', lastActive: '1 day ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1234567892', role: 'caregiver', status: 'Active', joined: '2025-03-10', lastActive: '3 hours ago' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1234567893', role: 'expert', status: 'Inactive', joined: '2025-01-25', lastActive: '2 weeks ago' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '+1234567894', role: 'caregiver', status: 'Active', joined: '2025-04-05', lastActive: '5 hours ago' },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', phone: '+1234567895', role: 'admin', status: 'Active', joined: '2025-01-01', lastActive: '1 hour ago' }
  ];

  return (
    <div className="container-fluid mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-people me-2"></i>
          User Management
        </h1>
        <p className="text-muted">Manage all platform users and their permissions</p>
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
                <div className="stat-value">{users.filter(u => u.status === 'Active').length}</div>
                <div className="stat-label">Active Users</div>
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
        <div className="col-md-6">
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
          <select className="form-select">
            <option>All Roles</option>
            <option>Caregiver</option>
            <option>Expert</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">
            <i className="bi bi-person-plus me-2"></i>
            Add New User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Last Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
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
                    <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td>{user.joined}</td>
                  <td className="text-muted small">{user.lastActive}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
          <span className="text-muted small">Showing 1-6 of 6 users</span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <a className="page-link" href="#">Previous</a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
