import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';

const CaregiverDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'caregiver') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const childInfo = {
    name: 'Alex',
    age: 8,
    diagnosis: 'Autism Spectrum Disorder',
    diagnosisDate: 'March 2020'
  };

  const upcomingSessions = [
    { id: 1, type: 'Speech Therapy', therapist: 'Dr. Sarah Johnson', date: '2025-11-28', time: '10:00 AM' },
    { id: 2, type: 'Occupational Therapy', therapist: 'Dr. Mike Chen', date: '2025-11-29', time: '2:00 PM' },
    { id: 3, type: 'ABA Therapy', therapist: 'Dr. Emily Brown', date: '2025-11-30', time: '11:00 AM' }
  ];

  const recentProgress = [
    { skill: 'Communication', current: 75, previous: 68, trend: 'up' },
    { skill: 'Social Skills', current: 62, previous: 58, trend: 'up' },
    { skill: 'Emotional Regulation', current: 70, previous: 65, trend: 'up' },
    { skill: 'Motor Skills', current: 80, previous: 80, trend: 'stable' }
  ];

  const todayTasks = [
    { id: 1, task: 'Morning routine practice', completed: true },
    { id: 2, task: 'Complete speech exercises', completed: true },
    { id: 3, task: 'Play therapy session', completed: false },
    { id: 4, task: 'Evening sensory activities', completed: false }
  ];

  return (
    <div className="min-vh-100">
      <div className="container mt-4 mb-5">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 hero-section">
              <div className="card-body p-4 text-white">
                <h2 className="mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
                  <i className="bi bi-heart-fill me-2"></i>
                  Caregiver Dashboard
                </h2>
                <p className="mb-0 opacity-90">
                  Welcome back, {user?.name}! Track {childInfo.name}'s progress and upcoming activities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <StatCard
              value="12"
              label="Sessions This Month"
              icon="bi-calendar-check"
              variant="primary"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              value="85%"
              label="Overall Progress"
              icon="bi-graph-up-arrow"
              variant="success"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              value="3"
              label="Upcoming Sessions"
              icon="bi-clock"
              variant="info"
            />
          </div>
          <div className="col-md-3">
            <StatCard
              value="24"
              label="Games Played"
              icon="bi-controller"
              variant="warning"
            />
          </div>
        </div>

        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            {/* Child Information */}
            <Card title="Child Information" className="mb-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Name</small>
                    <div className="fw-bold">{childInfo.name}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Age</small>
                    <div className="fw-bold">{childInfo.age} years old</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Diagnosis</small>
                    <div className="fw-bold">{childInfo.diagnosis}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted d-block mb-1">Diagnosis Date</small>
                    <div className="fw-bold">{childInfo.diagnosisDate}</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Progress Tracking */}
            <Card title="Recent Progress" className="mb-4">
              {recentProgress.map((item, idx) => (
                <div key={idx} className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <span className="fw-medium">{item.skill}</span>
                      <small className="text-muted ms-2">
                        {item.previous}% → {item.current}%
                        {item.trend === 'up' && <i className="bi bi-arrow-up text-success ms-1"></i>}
                        {item.trend === 'stable' && <i className="bi bi-dash text-muted ms-1"></i>}
                      </small>
                    </div>
                    <Badge variant={item.current >= 70 ? 'success' : item.current >= 50 ? 'warning' : 'danger'}>
                      {item.current}%
                    </Badge>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-bar bg-${item.current >= 70 ? 'success' : item.current >= 50 ? 'warning' : 'danger'}`}
                      style={{ width: `${item.current}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </Card>

            {/* Upcoming Sessions */}
            <Card title="Upcoming Therapy Sessions">
              <div className="d-grid gap-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="d-flex gap-3 p-3 bg-light rounded">
                    <div className="text-primary-custom">
                      <i className="bi bi-calendar-event fs-3"></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{session.type}</div>
                      <div className="text-muted small">
                        <i className="bi bi-person me-1"></i>
                        {session.therapist}
                      </div>
                      <div className="text-muted small mt-1">
                        <i className="bi bi-calendar3 me-1"></i>
                        {session.date} at {session.time}
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-primary">
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Today's Tasks */}
            <Card title="Today's Tasks" className="mb-4">
              <div className="d-grid gap-2">
                {todayTasks.map((task) => (
                  <div key={task.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={task.completed}
                      readOnly
                    />
                    <label className={`form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
                      {task.task}
                    </label>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary w-100 mt-3">
                <i className="bi bi-plus-circle me-2"></i>
                Add Task
              </button>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Actions" className="mb-4">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary" onClick={() => navigate('/assessment')}>
                  <i className="bi bi-clipboard-check me-2"></i>
                  Start Assessment
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/games')}>
                  <i className="bi bi-controller me-2"></i>
                  Play Games
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/communication')}>
                  <i className="bi bi-chat-dots me-2"></i>
                  Message Expert
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/sessions')}>
                  <i className="bi bi-file-earmark-text me-2"></i>
                  View Reports
                </button>
              </div>
            </Card>

            {/* Weekly Goal */}
            <Card title="Weekly Goal" className="card-warning">
              <div className="text-center mb-3">
                <i className="bi bi-trophy-fill fs-1 text-warning"></i>
              </div>
              <h6 className="text-center mb-3">Complete 5 Therapy Sessions</h6>
              <div className="mb-2">
                <div className="d-flex justify-content-between mb-1">
                  <small>Progress</small>
                  <small className="fw-bold">3/5</small>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-warning" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="text-center mt-3">
                <Badge variant="warning">2 more to go!</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
