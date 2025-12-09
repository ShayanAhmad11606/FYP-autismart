import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';
import { childAPI } from '../services/api';

const ExpertDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.role !== 'expert') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await childAPI.getAllChildren();
      if (response.success) {
        setPatients(response.data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError(error.message || 'Failed to fetch patients');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const todaySessions = [
    { id: 1, patient: 'Alex Doe', caregiver: 'Tommy Doe', time: '10:00 AM', type: 'Speech Discussion', status: 'upcoming' },
    { id: 2, patient: 'Emma Smith', caregiver: 'John Smith', time: '2:00 PM', type: 'ABA Discussion', status: 'upcoming' },
    { id: 3, patient: 'Lily Williams', caregiver: 'Sarah Williams', time: '4:00 PM', type: 'Occupational Discussion', status: 'upcoming' }
  ];

  // Transform real patient data for display
  const recentPatients = patients.map(child => ({
    id: child._id,
    name: child.name,
    age: child.age,
    therapyType: child.diagnosis || 'General Care',
    progress: 0, // This would need to be calculated from activities
    lastSession: child.updatedAt ? new Date(child.updatedAt).toISOString().split('T')[0] : 'N/A',
    caregiver: child.caregiverId?.name || 'Unknown'
  }));

  const pendingReviews = [
    { id: 1, patient: 'Alex Doe', type: 'Assessment', date: '2025-11-26', priority: 'high' },
    { id: 2, patient: 'Emma Smith', type: 'Progress Report', date: '2025-11-25', priority: 'medium' },
    { id: 3, patient: 'Lily Williams', type: 'Treatment Plan', date: '2025-11-24', priority: 'low' }
  ];

  const messages = [
    { id: 1, from: 'Tommy Doe', message: 'Alex showed great improvement today!', time: '1 hour ago', unread: true },
    { id: 2, from: 'John Smith', message: 'Can we reschedule tomorrow\'s session?', time: '3 hours ago', unread: true },
    { id: 3, from: 'Sarah Williams', message: 'Thank you for the detailed report', time: '5 hours ago', unread: false }
  ];

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container-fluid px-4 mt-4 mb-5">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-lg" style={{
              background: 'linear-gradient(135deg, #ADA9D3 0%, #9B96C9 100%)',
              borderRadius: '20px',
              overflow: 'hidden'
            }}>
              <div className="card-body p-4 p-md-5 text-white position-relative">
                <div className="position-absolute top-0 end-0 opacity-10" style={{ fontSize: '10rem' }}>
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
                <div className="position-relative">
                  <h1 className="mb-3 fw-bold" style={{textShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
                    <i className="bi bi-person-badge-fill me-3"></i>
                    Expert Dashboard
                  </h1>
                  <p className="mb-0 fs-5 opacity-90">
                    Welcome back, <strong>Dr. {user?.name}</strong>! You have <span className="fw-bold">{todaySessions.length}</span> sessions scheduled today.
                  </p>
                  {loading && (
                    <div className="mt-2">
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Loading patients...
                    </div>
                  )}
                  {error && (
                    <div className="alert alert-warning mt-2 mb-0" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Info Cards */}
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
                      background: 'linear-gradient(135deg, #ADA9D3 0%, #9B96C9 100%)',
                      borderRadius: '16px',
                      padding: '1rem',
                      color: 'white'
                    }}>
                      <i className="bi bi-person-badge fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="text-muted small mb-1">Account Status</div>
                    <div className="d-flex align-items-center gap-2">
                      <Badge variant="success"><i className="bi bi-check-circle me-1"></i>Active</Badge>
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
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      borderRadius: '16px',
                      padding: '1rem',
                      color: 'white'
                    }}>
                      <i className="bi bi-shield-check fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="text-muted small mb-1">Email Verified</div>
                    <div className="d-flex align-items-center gap-2">
                      <Badge variant="success"><i className="bi bi-patch-check-fill me-1"></i>Verified</Badge>
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
                      background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                      borderRadius: '16px',
                      padding: '1rem',
                      color: 'white'
                    }}>
                      <i className="bi bi-award fs-3"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="text-muted small mb-1">Your Role</div>
                    <div className="d-flex align-items-center gap-2">
                      <Badge variant="success"><i className="bi bi-mortarboard-fill me-1"></i>Expert</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <StatCard
              value={recentPatients.length.toString()}
              label="Active Patients"
              icon="bi-people"
              variant="primary"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              value={todaySessions.length.toString()}
              label="Today's Sessions"
              icon="bi-calendar-event"
              variant="success"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              value={pendingReviews.length.toString()}
              label="Pending Reviews"
              icon="bi-clipboard-check"
              variant="warning"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              value={messages.filter(m => m.unread).length.toString()}
              label="New Messages"
              icon="bi-envelope"
              variant="info"
            />
          </div>
        </div>

        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Today's Sessions */}
            <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="mb-0 fw-bold"><i className="bi bi-calendar-check me-2 text-primary"></i>Today's Schedule</h5>
              </div>
              <div className="card-body p-4">
                <div className="d-grid gap-3">
                  {todaySessions.map((session) => (
                    <div key={session.id} className="d-flex gap-3 p-4 rounded-3 border" style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      transition: 'all 0.3s ease'
                    }} onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                      <div className="text-white" style={{
                        background: 'linear-gradient(135deg, #ADA9D3 0%, #9B96C9 100%)',
                        borderRadius: '12px',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <i className="bi bi-clock-fill fs-3"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <div className="fw-bold fs-6">{session.patient}</div>
                            <small className="text-muted"><i className="bi bi-person-fill me-1"></i>Caregiver: {session.caregiver}</small>
                          </div>
                          <Badge variant="primary"><i className="bi bi-clock-fill me-1"></i>{session.time}</Badge>
                        </div>
                        <div className="d-flex gap-2 align-items-center mt-2">
                          <Badge variant="info"><i className="bi bi-activity me-1"></i>{session.type}</Badge>
                          <Badge variant="success"><i className="bi bi-check-circle me-1"></i>{session.status}</Badge>
                        </div>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          <i className="bi bi-eye me-1"></i>View
                        </button>
                        <button className="btn btn-sm btn-primary rounded-pill px-3">
                          <i className="bi bi-play-circle me-1"></i>Start
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* My Patients */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="mb-0 fw-bold"><i className="bi bi-people-fill me-2 text-success"></i>My Patients</h5>
              </div>
              <div className="card-body p-0">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading patients...</p>
                  </div>
                ) : recentPatients.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-people fs-1 text-muted"></i>
                    <p className="mt-3 text-muted">No patients found in the database</p>
                    <p className="text-muted small">Patients will appear here once caregivers add children to the system</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                        <tr>
                          <th className="px-4 py-3 border-0">Patient</th>
                          <th className="py-3 border-0">Age</th>
                          <th className="py-3 border-0">Diagnosis</th>
                          <th className="py-3 border-0">Caregiver</th>
                          <th className="py-3 border-0">Last Updated</th>
                          <th className="py-3 border-0">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPatients.map((patient) => (
                          <tr key={patient.id} style={{ transition: 'background 0.2s ease' }}>
                            <td className="fw-bold px-4 py-3"><i className="bi bi-person-circle me-2 text-primary"></i>{patient.name}</td>
                            <td className="py-3">{patient.age} years</td>
                            <td className="py-3">
                              <Badge variant="info"><i className="bi bi-activity me-1"></i>{patient.therapyType}</Badge>
                            </td>
                            <td className="py-3">
                              <small className="text-muted"><i className="bi bi-person-fill me-1"></i>{patient.caregiver}</small>
                            </td>
                            <td className="text-muted py-3"><i className="bi bi-calendar3 me-1"></i>{patient.lastSession}</td>
                            <td className="py-3">
                              <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                                <i className="bi bi-eye me-1"></i>
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Pending Reviews */}
            <Card title="Pending Reviews" className="mb-4">
              <div className="d-grid gap-2">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <div className="fw-medium">{review.patient}</div>
                        <small className="text-muted">{review.type}</small>
                      </div>
                      <Badge variant={review.priority === 'high' ? 'danger' : review.priority === 'medium' ? 'warning' : 'success'}>
                        {review.priority}
                      </Badge>
                    </div>
                    <small className="text-muted d-block mb-2">
                      <i className="bi bi-calendar3 me-1"></i>
                      {review.date}
                    </small>
                    <button className="btn btn-sm btn-primary w-100">
                      Review Now
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Messages */}
            <Card title="Recent Messages" className="mb-4">
              <div className="d-grid gap-2">
                {messages.map((msg) => (
                  <div key={msg.id} className={`p-3 border rounded ${msg.unread ? 'bg-light' : ''}`}>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <div className="fw-medium">{msg.from}</div>
                      {msg.unread && <Badge variant="primary">New</Badge>}
                    </div>
                    <p className="mb-1 small text-muted">{msg.message}</p>
                    <small className="text-muted">
                      <i className="bi bi-clock me-1"></i>
                      {msg.time}
                    </small>
                  </div>
                ))}
              </div>
              <button className="btn btn-outline-primary w-100 mt-3">
                <i className="bi bi-envelope me-2"></i>
                View All Messages
              </button>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Actions">
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => navigate('/sessions')}>
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Session Notes
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/admin/reports')}>
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Create Report
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/therapy')}>
                  <i className="bi bi-calendar-plus me-2"></i>
                  Schedule Session
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/tracker')}>
                  <i className="bi bi-graph-up me-2"></i>
                  View Analytics
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
