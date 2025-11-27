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
    <div className="min-vh-100">
      <div className="container-fluid px-4 mt-4 mb-5">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 hero-section">
              <div className="card-body p-4 text-white">
                <h2 className="mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                  <i className="bi bi-person-badge me-2"></i>
                  Expert Dashboard
                </h2>
                <p className="mb-0 opacity-90">
                  Welcome back, Dr. {user?.name}! You have {todaySessions.length} sessions scheduled today.
                </p>
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
            <Card title="Today's Schedule" className="mb-4">
              <div className="d-grid gap-3">
                {todaySessions.map((session) => (
                  <div key={session.id} className="d-flex gap-3 p-3 border rounded">
                    <div className="text-primary-custom">
                      <i className="bi bi-clock fs-3"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <div className="fw-bold">{session.patient}</div>
                          <small className="text-muted">Caregiver: {session.caregiver}</small>
                        </div>
                        <Badge variant="primary">{session.time}</Badge>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        <Badge variant="info">{session.type}</Badge>
                        <Badge variant="success">{session.status}</Badge>
                      </div>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-primary">
                        <i className="bi bi-play-circle"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* My Patients */}
            <Card title="My Patients">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Patient</th>
                      <th>Age</th>
                      <th>Therapy Type</th>
                      <th>Progress</th>
                      <th>Last Session</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="fw-medium">{patient.name}</td>
                        <td>{patient.age} years</td>
                        <td>
                          <Badge variant="info">{patient.therapyType}</Badge>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress" style={{ width: '80px' }}>
                              <div
                                className={`progress-bar bg-${patient.progress >= 70 ? 'success' : 'warning'}`}
                                style={{ width: `${patient.progress}%` }}
                              ></div>
                            </div>
                            <small className="fw-bold">{patient.progress}%</small>
                          </div>
                        </td>
                        <td className="text-muted small">{patient.lastSession}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-eye me-1"></i>
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
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
