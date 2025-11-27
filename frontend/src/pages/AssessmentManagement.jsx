import Card from '../components/Card';
import Badge from '../components/Badge';

const AssessmentManagement = () => {
  const assessments = [
    { id: 1, user: 'John Doe', child: 'Tommy Doe', date: '2025-11-25', type: 'Initial Screening', score: 85, status: 'Completed', reviewer: 'Dr. Sarah Johnson' },
    { id: 2, user: 'Jane Smith', child: 'Emma Smith', date: '2025-11-24', type: 'Follow-up', score: 72, status: 'Completed', reviewer: 'Dr. Sarah Johnson' },
    { id: 3, user: 'Mike Johnson', child: 'Alex Johnson', date: '2025-11-23', type: 'Initial Screening', score: null, status: 'Pending Review', reviewer: 'Unassigned' },
    { id: 4, user: 'Sarah Williams', child: 'Lily Williams', date: '2025-11-22', type: 'Progress Check', score: 78, status: 'Completed', reviewer: 'Ms. Emily Chen' },
    { id: 5, user: 'Tom Brown', child: 'Jack Brown', date: '2025-11-21', type: 'Initial Screening', score: null, status: 'In Progress', reviewer: 'N/A' },
    { id: 6, user: 'Emily Davis', child: 'Sophie Davis', date: '2025-11-20', type: 'Follow-up', score: 90, status: 'Completed', reviewer: 'Dr. Maria Garcia' }
  ];

  return (
    <div className="container-fluid mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-clipboard-data me-2"></i>
          Assessment Management
        </h1>
        <p className="text-muted">Track and manage all user assessments</p>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Card className="card-stat">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{assessments.length}</div>
                <div className="stat-label">Total Assessments</div>
              </div>
              <i className="bi bi-clipboard-check fs-1 text-muted opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{assessments.filter(a => a.status === 'Completed').length}</div>
                <div className="stat-label">Completed</div>
              </div>
              <i className="bi bi-check-circle-fill fs-1 text-success opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{assessments.filter(a => a.status === 'Pending Review').length}</div>
                <div className="stat-label">Pending Review</div>
              </div>
              <i className="bi bi-hourglass-split fs-1 text-warning opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-info">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">82%</div>
                <div className="stat-label">Avg Score</div>
              </div>
              <i className="bi bi-graph-up fs-1 text-info opacity-50"></i>
            </div>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search assessments..."
            />
          </div>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option>All Types</option>
            <option>Initial Screening</option>
            <option>Follow-up</option>
            <option>Progress Check</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending Review</option>
            <option>In Progress</option>
          </select>
        </div>
        <div className="col-md-2">
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100">
            <i className="bi bi-download me-2"></i>
            Export
          </button>
        </div>
      </div>

      {/* Assessments Table */}
      <Card>
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>User/Caregiver</th>
                <th>Child Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Score</th>
                <th>Status</th>
                <th>Reviewer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td>{assessment.id}</td>
                  <td className="fw-medium">{assessment.user}</td>
                  <td>{assessment.child}</td>
                  <td>{assessment.date}</td>
                  <td>
                    <Badge variant="info">{assessment.type}</Badge>
                  </td>
                  <td>
                    {assessment.score ? (
                      <span className={`fw-bold ${
                        assessment.score >= 80 ? 'text-success' :
                        assessment.score >= 60 ? 'text-warning' : 'text-danger'
                      }`}>
                        {assessment.score}%
                      </span>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    <Badge variant={
                      assessment.status === 'Completed' ? 'success' :
                      assessment.status === 'Pending Review' ? 'warning' : 'info'
                    }>
                      {assessment.status}
                    </Badge>
                  </td>
                  <td className="text-muted small">{assessment.reviewer}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-download"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-success">
                        <i className="bi bi-check-circle"></i>
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
          <span className="text-muted small">Showing 1-6 of 6 assessments</span>
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

export default AssessmentManagement;
