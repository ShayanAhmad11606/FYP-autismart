import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';

const ExpertDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'expert') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const todaySessions = [
    { id: 1, patient: 'Alex Doe', caregiver: 'Tommy Doe', time: '10:00 AM', type: 'Speech Therapy', status: 'upcoming' },
    { id: 2, patient: 'Emma Smith', caregiver: 'John Smith', time: '2:00 PM', type: 'ABA Therapy', status: 'upcoming' },
    { id: 3, patient: 'Lily Williams', caregiver: 'Sarah Williams', time: '4:00 PM', type: 'Occupational Therapy', status: 'upcoming' }
  ];

  const myPatients = [
    { id: 1, name: 'Alex Doe', age: 8, therapyType: 'Speech Therapy', progress: 75, lastSession: '2025-11-25' },
    { id: 2, name: 'Emma Smith', age: 6, therapyType: 'ABA Therapy', progress: 68, lastSession: '2025-11-24' },
    { id: 3, name: 'Lily Williams', age: 7, therapyType: 'Occupational Therapy', progress: 82, lastSession: '2025-11-26' },
    { id: 4, name: 'Jack Brown', age: 9, therapyType: 'Social Skills', progress: 70, lastSession: '2025-11-23' }
  ];

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
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
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
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
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
              value={myPatients.length.toString()}
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
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
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
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                      <tr>
                        <th className="px-4 py-3 border-0">Patient</th>
                        <th className="py-3 border-0">Age</th>
                        <th className="py-3 border-0">Therapy Type</th>
                        <th className="py-3 border-0">Progress</th>
                        <th className="py-3 border-0">Last Session</th>
                        <th className="py-3 border-0">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myPatients.map((patient) => (
                        <tr key={patient.id} style={{ transition: 'background 0.2s ease' }}>
                          <td className="fw-bold px-4 py-3"><i className="bi bi-person-circle me-2 text-primary"></i>{patient.name}</td>
                          <td className="py-3">{patient.age} years</td>
                          <td className="py-3">
                            <Badge variant="info"><i className="bi bi-activity me-1"></i>{patient.therapyType}</Badge>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-2">
                              <div className="progress" style={{ width: '100px', height: '10px', borderRadius: '10px' }}>
                                <div
                                  className={`progress-bar bg-${patient.progress >= 70 ? 'success' : 'warning'}`}
                                  style={{ width: `${patient.progress}%`, transition: 'width 1s ease' }}
                                ></div>
                              </div>
                              <small className="fw-bold">{patient.progress}%</small>
                            </div>
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
