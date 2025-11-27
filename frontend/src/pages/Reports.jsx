import StatCard from '../components/StatCard';
import Card from '../components/Card';

const Reports = () => {
  const reportData = [
    { month: 'Jan', users: 120, sessions: 450, assessments: 95 },
    { month: 'Feb', users: 145, sessions: 520, assessments: 110 },
    { month: 'Mar', users: 178, sessions: 610, assessments: 135 },
    { month: 'Apr', users: 210, sessions: 720, assessments: 160 },
    { month: 'May', users: 245, sessions: 850, assessments: 185 },
    { month: 'Jun', users: 290, sessions: 980, assessments: 215 }
  ];

  return (
    <div className="container-fluid mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-file-earmark-text me-2"></i>
          Reports & Analytics
        </h1>
        <p className="text-muted">Comprehensive platform analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard value="1,248" label="Total Users" icon="bi-people" variant="stat" />
        </div>
        <div className="col-md-3">
          <StatCard value="5,130" label="Sessions Completed" icon="bi-calendar-check" variant="success" />
        </div>
        <div className="col-md-3">
          <StatCard value="900" label="Assessments" icon="bi-clipboard-data" variant="info" />
        </div>
        <div className="col-md-3">
          <StatCard value="85%" label="Satisfaction Rate" icon="bi-emoji-smile" variant="warning" />
        </div>
      </div>

      <div className="row g-4">
        {/* Growth Chart */}
        <div className="col-lg-8">
          <Card title="Platform Growth Trends">
            <div className="text-center py-5 bg-light rounded">
              <i className="bi bi-graph-up-arrow fs-1 text-primary-custom mb-3 d-block"></i>
              <p className="text-muted mb-2">Line/bar chart showing platform growth metrics</p>
              <p className="text-muted small">(Chart visualization placeholder)</p>
              <div className="table-responsive mt-4">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>New Users</th>
                      <th>Sessions</th>
                      <th>Assessments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.month}</td>
                        <td>{row.users}</td>
                        <td>{row.sessions}</td>
                        <td>{row.assessments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* User Engagement */}
          <Card title="User Engagement Metrics" className="mt-4">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Daily Active Users</span>
                    <span className="fw-bold text-primary-custom">450</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-primary" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Weekly Active Users</span>
                    <span className="fw-bold text-success">890</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-success" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Avg Session Duration</span>
                    <span className="fw-bold text-info">24 min</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-info" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 bg-light rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Completion Rate</span>
                    <span className="fw-bold text-warning">92%</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Reports */}
        <div className="col-lg-4">
          {/* Quick Reports */}
          <Card title="Quick Reports">
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary btn-sm text-start">
                <i className="bi bi-file-earmark-pdf me-2"></i>
                Monthly Summary
              </button>
              <button className="btn btn-outline-primary btn-sm text-start">
                <i className="bi bi-file-earmark-excel me-2"></i>
                User Activity Report
              </button>
              <button className="btn btn-outline-primary btn-sm text-start">
                <i className="bi bi-file-earmark-bar-graph me-2"></i>
                Assessment Analytics
              </button>
              <button className="btn btn-outline-primary btn-sm text-start">
                <i className="bi bi-file-earmark-text me-2"></i>
                Session Statistics
              </button>
              <button className="btn btn-outline-primary btn-sm text-start">
                <i className="bi bi-file-earmark-spreadsheet me-2"></i>
                Financial Report
              </button>
            </div>
            <button className="btn btn-primary w-100 mt-3">
              <i className="bi bi-download me-2"></i>
              Generate Custom Report
            </button>
          </Card>

          {/* Top Performers */}
          <Card title="Top Performers This Month" className="mt-4">
            <div className="d-grid gap-3">
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small fw-medium">Dr. Sarah Johnson</span>
                  <span className="badge badge-success">98%</span>
                </div>
                <small className="text-muted">124 sessions completed</small>
              </div>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small fw-medium">Ms. Emily Chen</span>
                  <span className="badge badge-success">96%</span>
                </div>
                <small className="text-muted">112 sessions completed</small>
              </div>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="small fw-medium">Dr. Maria Garcia</span>
                  <span className="badge badge-success">95%</span>
                </div>
                <small className="text-muted">108 sessions completed</small>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Report Downloads" className="mt-4">
            <div className="d-grid gap-2">
              <div className="small">
                <div className="fw-medium">Monthly Summary - Oct 2025</div>
                <div className="text-muted">Downloaded 2 hours ago</div>
              </div>
              <div className="small">
                <div className="fw-medium">User Activity Report</div>
                <div className="text-muted">Downloaded yesterday</div>
              </div>
              <div className="small">
                <div className="fw-medium">Assessment Analytics Q3</div>
                <div className="text-muted">Downloaded 3 days ago</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="row g-4 mt-4">
        <div className="col-md-6">
          <Card title="Game Performance">
            <div className="text-center py-4 bg-light rounded">
              <i className="bi bi-pie-chart-fill fs-1 text-primary-custom mb-2 d-block"></i>
              <p className="text-muted small">Pie chart showing game completion rates</p>
              <p className="text-muted small">(Chart visualization placeholder)</p>
            </div>
          </Card>
        </div>
        <div className="col-md-6">
          <Card title="Therapy Outcomes">
            <div className="text-center py-4 bg-light rounded">
              <i className="bi bi-graph-up fs-1 text-success mb-2 d-block"></i>
              <p className="text-muted small">Progress metrics for therapy sessions</p>
              <p className="text-muted small">(Chart visualization placeholder)</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
