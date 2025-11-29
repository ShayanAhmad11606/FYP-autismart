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
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="container mt-4 mb-5">
        {/* Welcome Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-lg" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              overflow: 'hidden'
            }}>
              <div className="card-body p-4 p-md-5 text-white position-relative">
                <div className="position-absolute top-0 end-0 opacity-10" style={{ fontSize: '10rem' }}>
                  <i className="bi bi-heart-fill"></i>
                </div>
                <div className="position-relative">
                  <h1 className="mb-3 fw-bold" style={{textShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
                    <i className="bi bi-heart-fill me-3"></i>
                    Caregiver Dashboard
                  </h1>
                  <p className="mb-0 fs-5 opacity-90">
                    Welcome back, <strong>{user?.name}</strong>! Track {childInfo.name}'s progress and upcoming activities.
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
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
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
                      <Badge variant="primary"><i className="bi bi-star-fill me-1"></i>Caregiver</Badge>
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
            <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="mb-0 fw-bold"><i className="bi bi-person-circle me-2 text-primary"></i>Child Information</h5>
              </div>
              <div className="card-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-4 rounded-3" style={{ background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)', border: '1px solid #e9ecef' }}>
                      <small className="text-muted d-block mb-2"><i className="bi bi-tag-fill me-1"></i>Name</small>
                      <div className="fw-bold fs-5">{childInfo.name}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 rounded-3" style={{ background: 'linear-gradient(135deg, #f093fb15 0%, #f5576c15 100%)', border: '1px solid #e9ecef' }}>
                      <small className="text-muted d-block mb-2"><i className="bi bi-calendar-heart me-1"></i>Age</small>
                      <div className="fw-bold fs-5">{childInfo.age} years old</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 rounded-3" style={{ background: 'linear-gradient(135deg, #4facfe15 0%, #00f2fe15 100%)', border: '1px solid #e9ecef' }}>
                      <small className="text-muted d-block mb-2"><i className="bi bi-heart-pulse-fill me-1"></i>Diagnosis</small>
                      <div className="fw-bold fs-5">{childInfo.diagnosis}</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-4 rounded-3" style={{ background: 'linear-gradient(135deg, #43e97b15 0%, #38f9d715 100%)', border: '1px solid #e9ecef' }}>
                      <small className="text-muted d-block mb-2"><i className="bi bi-calendar3 me-1"></i>Diagnosis Date</small>
                      <div className="fw-bold fs-5">{childInfo.diagnosisDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="mb-0 fw-bold"><i className="bi bi-graph-up-arrow me-2 text-success"></i>Recent Progress</h5>
              </div>
              <div className="card-body p-4">
                {recentProgress.map((item, idx) => (
                  <div key={idx} className="mb-4 p-3 rounded-3" style={{ background: '#f8f9fa' }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <span className="fw-bold fs-6">{item.skill}</span>
                        <div className="text-muted small mt-1">
                          <i className="bi bi-arrow-right me-1"></i>
                          {item.previous}% → {item.current}%
                          {item.trend === 'up' && <i className="bi bi-arrow-up-circle-fill text-success ms-2"></i>}
                          {item.trend === 'stable' && <i className="bi bi-dash-circle text-muted ms-2"></i>}
                        </div>
                      </div>
                      <Badge variant={item.current >= 70 ? 'success' : item.current >= 50 ? 'warning' : 'danger'}>
                        <i className="bi bi-star-fill me-1"></i>{item.current}%
                      </Badge>
                    </div>
                    <div className="progress" style={{ height: '12px', borderRadius: '10px' }}>
                      <div
                        className={`progress-bar bg-${item.current >= 70 ? 'success' : item.current >= 50 ? 'warning' : 'danger'}`}
                        style={{ width: `${item.current}%`, transition: 'width 1s ease' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
              <div className="card-header bg-white border-0 pt-4 px-4">
                <h5 className="mb-0 fw-bold"><i className="bi bi-calendar-event me-2 text-info"></i>Upcoming Therapy Sessions</h5>
              </div>
              <div className="card-body p-4">
                <div className="d-grid gap-3">
                  {upcomingSessions.map((session) => (
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
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '12px',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <i className="bi bi-calendar-event fs-3"></i>
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold fs-6 mb-2">{session.type}</div>
                        <div className="text-muted small mb-1">
                          <i className="bi bi-person-fill me-1"></i>
                          {session.therapist}
                        </div>
                        <div className="text-muted small">
                          <i className="bi bi-clock-fill me-1"></i>
                          {session.date} at {session.time}
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-sm btn-primary rounded-pill px-3">
                          <i className="bi bi-arrow-right-circle me-1"></i>View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
