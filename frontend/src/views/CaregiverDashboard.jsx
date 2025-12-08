import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useChild } from '../context/ChildContext';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Badge from '../components/Badge';

const CaregiverDashboard = () => {
  const { user, logout } = useAuth();
  const { childrenList, loading: childrenLoading } = useChild();
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

  return (
    <div className="min-vh-100 caregiver-dashboard-wrapper">
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
                    Welcome back, <strong>{user?.name}</strong>! 
                    {childrenList.length > 0 ? ` Manage your ${childrenList.length} ${childrenList.length === 1 ? 'child' : 'children'} and track their progress.` : ' Add children to start tracking their progress.'}
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
          <div className="col-md-4">
            <StatCard
              value={childrenList.length.toString()}
              label="Total Children"
              icon="bi-people"
              variant="primary"
            />
          </div>
          <div className="col-md-4">
            <StatCard
              value={user?.email || 'N/A'}
              label="Your Email"
              icon="bi-envelope"
              variant="success"
            />
          </div>
          <div className="col-md-4">
            <StatCard
              value={user?.role || 'Caregiver'}
              label="Account Type"
              icon="bi-person-badge"
              variant="info"
            />
          </div>
        </div>

        {/* Child Management Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)' }}>
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h4 className="mb-2 fw-bold">
                      <i className="bi bi-people-fill me-2 text-primary"></i>
                      Child Management
                    </h4>
                    <p className="text-muted mb-3 mb-md-0">
                      Manage your children's profiles, track their progress, and view detailed reports for each child.
                    </p>
                  </div>
                  <div className="col-md-4">
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-primary btn-lg shadow-sm"
                        onClick={() => navigate('/child-management')}
                        style={{ borderRadius: '12px' }}
                      >
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Manage Children
                      </button>
                      <button 
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => navigate('/child-reports')}
                        style={{ borderRadius: '12px' }}
                      >
                        <i className="bi bi-file-earmark-bar-graph-fill me-2"></i>
                        View Reports
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Main Content */}
          <div className="col-lg-8">
            {childrenLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading children data...</p>
              </div>
            ) : childrenList.length === 0 ? (
              <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
                <div className="card-body p-5 text-center">
                  <div className="mb-4">
                    <i className="bi bi-info-circle" style={{ fontSize: '4rem', color: '#667eea' }}></i>
                  </div>
                  <h4 className="mb-3">No Children Added Yet</h4>
                  <p className="text-muted mb-4">
                    Add your first child to start tracking their progress, assessments, and therapy activities. 
                    Once you add children and they complete assessments or games, their data will appear here.
                  </p>
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate('/child-management')}
                    style={{ borderRadius: '12px' }}
                  >
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Add Your First Child
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Children List */}
                <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '16px' }}>
                  <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold"><i className="bi bi-people-fill me-2 text-primary"></i>Your Children</h5>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate('/child-management')}
                      style={{ borderRadius: '8px' }}
                    >
                      <i className="bi bi-pencil-square me-1"></i>Manage
                    </button>
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3">
                      {childrenList.map((child) => (
                        <div key={child._id} className="col-md-6">
                          <div 
                            className="p-4 rounded-3 border h-100" 
                            style={{ 
                              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                            onClick={() => navigate('/child-reports')}
                          >
                            <div className="d-flex align-items-center mb-3">
                              <div 
                                className="rounded-circle d-flex align-items-center justify-content-center text-white me-3"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                              >
                                <i className="bi bi-person-fill fs-4"></i>
                              </div>
                              <div>
                                <h6 className="mb-0 fw-bold">{child.name}</h6>
                                <small className="text-muted">{child.age} years old</small>
                              </div>
                            </div>
                            {child.gender && (
                              <div className="mb-2">
                                <small className="text-muted">
                                  <i className="bi bi-gender-ambiguous me-1"></i>
                                  {child.gender}
                                </small>
                              </div>
                            )}
                            {child.notes && (
                              <div className="text-muted small" style={{ 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                whiteSpace: 'nowrap' 
                              }}>
                                <i className="bi bi-sticky me-1"></i>
                                {child.notes}
                              </div>
                            )}
                            <div className="mt-3">
                              <Badge variant="info">
                                <i className="bi bi-bar-chart-fill me-1"></i>View Reports
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #667eea10 0%, #764ba210 100%)' }}>
                  <div className="card-body p-4">
                    <h5 className="mb-3 fw-bold">
                      <i className="bi bi-lightbulb-fill me-2 text-warning"></i>
                      Next Steps
                    </h5>
                    <ul className="mb-0" style={{ paddingLeft: '1.5rem' }}>
                      <li className="mb-2">Select a child and have them complete assessments or play therapy games</li>
                      <li className="mb-2">View detailed progress reports in the "View Reports" section</li>
                      <li className="mb-0">Download PDF reports to share with professionals</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Quick Actions */}
            <Card title="Quick Actions" className="mb-4">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary" onClick={() => navigate('/child-management')}>
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Manage Children
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/child-reports')}>
                  <i className="bi bi-file-earmark-bar-graph-fill me-2"></i>
                  View Reports
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/assessment')}>
                  <i className="bi bi-clipboard-check me-2"></i>
                  Start Assessment
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/games')}>
                  <i className="bi bi-controller me-2"></i>
                  Play Therapy Games
                </button>
                <button className="btn btn-outline-primary" onClick={() => navigate('/communication')}>
                  <i className="bi bi-chat-dots me-2"></i>
                  Message Expert
                </button>
              </div>
            </Card>

            {/* Getting Started Guide */}
            <Card title="Getting Started" className="mb-4">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start">
                  <div 
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: '32px', height: '32px', fontSize: '14px', flexShrink: 0 }}
                  >
                    1
                  </div>
                  <div>
                    <h6 className="mb-1">Add Children</h6>
                    <small className="text-muted">Create profiles for your children</small>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div 
                    className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: '32px', height: '32px', fontSize: '14px', flexShrink: 0 }}
                  >
                    2
                  </div>
                  <div>
                    <h6 className="mb-1">Select Child</h6>
                    <small className="text-muted">Choose a child before starting activities</small>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div 
                    className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: '32px', height: '32px', fontSize: '14px', flexShrink: 0 }}
                  >
                    3
                  </div>
                  <div>
                    <h6 className="mb-1">Complete Activities</h6>
                    <small className="text-muted">Play games and do assessments</small>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <div 
                    className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: '32px', height: '32px', fontSize: '14px', flexShrink: 0 }}
                  >
                    4
                  </div>
                  <div>
                    <h6 className="mb-1">Track Progress</h6>
                    <small className="text-muted">View reports and download PDFs</small>
                  </div>
                </div>
              </div>
            </Card>

            {/* Help Card */}
            <Card title="Need Help?" className="card-info">
              <p className="mb-3 small">
                If you have questions or need assistance, feel free to reach out to our support team.
              </p>
              <button className="btn btn-info w-100" onClick={() => navigate('/help')}>
                <i className="bi bi-question-circle me-2"></i>
                Visit Help Center
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard;
