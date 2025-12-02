import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Dashboard = () => {
  const recentActivities = [
    { activity: 'Completed Memory Match game', time: '2 hours ago', icon: 'bi-controller', color: 'success' },
    { activity: 'Assessment submitted', time: '1 day ago', icon: 'bi-clipboard-check', color: 'info' },
    { activity: 'Session with Dr. Johnson', time: '2 days ago', icon: 'bi-calendar-event', color: 'warning' },
    { activity: 'New achievement unlocked', time: '3 days ago', icon: 'bi-trophy', color: 'success' }
  ];

  const upcomingEvents = [
    { event: 'Speech Discussion Session', date: 'Tomorrow, 2:00 PM', therapist: 'Ms. Emily Chen' },
    { event: 'Monthly Assessment', date: 'Dec 1, 10:00 AM', therapist: 'Dr. Sarah Johnson' },
    { event: 'Social Skills Group', date: 'Dec 3, 3:00 PM', therapist: 'Mr. David Lee' }
  ];

  return (
    <div className="container-fluid mt-4 mb-5">
      <div className="row">
        {/* Main Content */}
        <div className="col-lg-9">
          {/* Welcome Section */}
          <div className="mb-4">
            <h1 className="text-primary-custom">
              <i className="bi bi-speedometer2 me-2"></i>
              Dashboard
            </h1>
            <p className="text-muted">Welcome back! Here's your child's progress overview</p>
          </div>

          {/* Stats Grid */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <StatCard value="24" label="Therapy Games Played" icon="bi-controller" variant="success" />
            </div>
            <div className="col-md-3">
              <StatCard value="85%" label="Overall Progress" icon="bi-graph-up-arrow" variant="info" />
            </div>
            <div className="col-md-3">
              <StatCard value="12" label="Sessions Completed" icon="bi-calendar-check" variant="warning" />
            </div>
            <div className="col-md-3">
              <StatCard value="3" label="Active Goals" icon="bi-bullseye" variant="stat" />
            </div>
          </div>

          {/* Progress Chart */}
          <Card title="Weekly Progress" className="mb-4">
            <div className="text-center py-5 bg-light rounded">
              <i className="bi bi-bar-chart-line-fill fs-1 text-primary-custom mb-3 d-block"></i>
              <p className="text-muted mb-2">Weekly activity and progress chart</p>
              <p className="text-muted small">(Chart visualization placeholder)</p>
              <div className="d-flex justify-content-center gap-4 mt-4">
                <div>
                  <div className="text-primary-custom fs-4 fw-bold">68%</div>
                  <small className="text-muted">Improvement</small>
                </div>
                <div>
                  <div className="text-success fs-4 fw-bold">+12%</div>
                  <small className="text-muted">vs Last Week</small>
                </div>
                <div>
                  <div className="text-info fs-4 fw-bold">24</div>
                  <small className="text-muted">Activities</small>
                </div>
              </div>
            </div>
          </Card>

          {/* Skill Progress */}
          <Card title="Skill Development">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Communication</span>
                    <Badge variant="success">85%</Badge>
                  </div>
                  <div className="progress" style={{ height: '12px' }}>
                    <div className="progress-bar bg-success" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Social Skills</span>
                    <Badge variant="info">70%</Badge>
                  </div>
                  <div className="progress" style={{ height: '12px' }}>
                    <div className="progress-bar bg-info" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Cognitive</span>
                    <Badge variant="warning">65%</Badge>
                  </div>
                  <div className="progress" style={{ height: '12px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Motor Skills</span>
                    <Badge variant="success">78%</Badge>
                  </div>
                  <div className="progress" style={{ height: '12px' }}>
                    <div className="progress-bar bg-success" style={{ width: '78%' }}></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Emotional Regulation</span>
                    <Badge variant="info">72%</Badge>
                  </div>
                  <div className="progress" style={{ height: '12px' }}>
                    <div className="progress-bar bg-info" style={{ width: '72%' }}></div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Sensory Processing</span>
                    <Badge variant="warning">60%</Badge>
                  </div>
                  <div className="progress" style={{ height: '12px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="col-lg-3">
          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className="d-grid gap-3">
              {recentActivities.map((item, index) => (
                <div key={index} className="d-flex gap-2">
                  <div className={`text-${item.color}`}>
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="small fw-medium">{item.activity}</div>
                    <small className="text-muted">{item.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Events */}
          <Card title="Upcoming Events" className="mt-4">
            <div className="d-grid gap-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-2 bg-light rounded">
                  <div className="fw-medium small mb-1">{event.event}</div>
                  <div className="text-muted small">
                    <i className="bi bi-calendar3 me-1"></i>
                    {event.date}
                  </div>
                  <div className="text-muted small">
                    <i className="bi bi-person me-1"></i>
                    {event.therapist}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary w-100 mt-3 btn-sm">
              View Calendar
            </button>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions" className="mt-4">
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-controller me-2"></i>
                Play Therapy Games
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-clipboard-check me-2"></i>
                Start Assessment
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-plus-circle me-2"></i>
                Log Activity
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="bi bi-chat-dots me-2"></i>
                Message Expert
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
