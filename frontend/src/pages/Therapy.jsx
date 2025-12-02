import Card from '../components/Card';
import Badge from '../components/Badge';

const Therapy = () => {
  const recommendations = [
    {
      id: 1,
      title: 'Applied Behavior Analysis (ABA)',
      description: 'Evidence-based therapy focusing on improving specific behaviors',
      duration: '2-3 hours/day',
      priority: 'high',
      status: 'Recommended',
      benefits: ['Improves communication', 'Reduces problem behaviors', 'Enhances social skills']
    },
    {
      id: 2,
      title: 'Speech & Language Discussion',
      description: 'Helps improve verbal and non-verbal communication skills',
      duration: '1 hour, 2x/week',
      priority: 'high',
      status: 'Recommended',
      benefits: ['Verbal communication', 'Social interaction', 'Language comprehension']
    },
    {
      id: 3,
      title: 'Occupational Discussion',
      description: 'Develops daily living skills and sensory integration',
      duration: '1 hour/week',
      priority: 'medium',
      status: 'Optional',
      benefits: ['Motor skills', 'Sensory processing', 'Independence']
    },
    {
      id: 4,
      title: 'Social Skills Training',
      description: 'Group sessions to practice social interactions',
      duration: '1 hour/week',
      priority: 'medium',
      status: 'Recommended',
      benefits: ['Peer interaction', 'Turn-taking', 'Conversation skills']
    },
    {
      id: 5,
      title: 'Play Discussion',
      description: 'Uses play to improve emotional and social development',
      duration: '45 min, 2x/week',
      priority: 'low',
      status: 'Optional',
      benefits: ['Emotional expression', 'Creativity', 'Social engagement']
    }
  ];

  const upcomingSessions = [
    { date: 'Nov 27, 2025', time: '10:00 AM', therapy: 'ABA Discussion', therapist: 'Dr. Sarah Johnson', location: 'Room 201' },
    { date: 'Nov 28, 2025', time: '2:00 PM', therapy: 'Speech Discussion', therapist: 'Ms. Emily Chen', location: 'Room 105' },
    { date: 'Nov 29, 2025', time: '11:00 AM', therapy: 'Social Skills', therapist: 'Mr. David Lee', location: 'Group Room A' },
    { date: 'Nov 30, 2025', time: '9:00 AM', therapy: 'Occupational Discussion', therapist: 'Dr. Maria Garcia', location: 'Room 302' }
  ];

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-chat-dots me-2"></i>
          Discussion Recommendations
        </h1>
        <p className="text-muted">
          Personalized discussion plans based on your child's assessment results
        </p>
      </div>

      <div className="row g-4">
        {/* Therapy Recommendations */}
        <div className="col-lg-8">
          <div className="d-grid gap-4">
            {recommendations.map((therapy) => (
              <Card key={therapy.id} className={`card-${therapy.priority === 'high' ? 'success' : therapy.priority === 'medium' ? 'warning' : 'info'}`}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-1" style={{ color: 'var(--text-primary, #000)' }}>{therapy.title}</h5>
                    <p className="mb-2" style={{ color: 'var(--text-secondary, #6c757d)' }}>{therapy.description}</p>
                  </div>
                  <Badge variant={therapy.priority === 'high' ? 'danger' : therapy.priority === 'medium' ? 'warning' : 'info'}>
                    {therapy.priority.toUpperCase()}
                  </Badge>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <small className="d-block" style={{ color: 'var(--text-secondary, #6c757d)' }}>Duration</small>
                    <span className="fw-medium" style={{ color: 'var(--text-primary, #000)' }}>
                      <i className="bi bi-clock me-1"></i>
                      {therapy.duration}
                    </span>
                  </div>
                  <div className="col-md-4">
                    <small className="d-block" style={{ color: 'var(--text-secondary, #6c757d)' }}>Status</small>
                    <Badge variant={therapy.status === 'Recommended' ? 'success' : 'info'}>
                      {therapy.status}
                    </Badge>
                  </div>
                  <div className="col-md-4">
                    <small className="d-block" style={{ color: 'var(--text-secondary, #6c757d)' }}>Priority</small>
                    <span className="fw-medium text-capitalize" style={{ color: 'var(--text-primary, #000)' }}>{therapy.priority}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <small className="d-block mb-2" style={{ color: 'var(--text-secondary, #6c757d)' }}>Key Benefits:</small>
                  <div className="d-flex flex-wrap gap-2">
                    {therapy.benefits.map((benefit, idx) => (
                      <span key={idx} className="badge border" style={{
                        backgroundColor: 'var(--bg-secondary, #f8f9fa)',
                        color: 'var(--text-primary, #000)',
                        borderColor: 'var(--border-color, #dee2e6)'
                      }}>
                        <i className="bi bi-check-circle-fill text-success me-1"></i>
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm">
                    <i className="bi bi-calendar-plus me-1"></i>
                    Schedule Session
                  </button>
                  <button className="btn btn-secondary btn-sm">
                    Learn More
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Upcoming Sessions */}
          <Card>
            <h5 className="mb-4" style={{ color: 'var(--text-primary, #000)' }}>Upcoming Sessions</h5>
            <div className="d-grid gap-3">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="p-3 rounded" style={{
                  backgroundColor: 'var(--bg-secondary, #f8f9fa)',
                  border: '1px solid var(--border-color, #dee2e6)'
                }}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="fw-medium mb-1" style={{ color: 'var(--text-primary, #000)' }}>{session.therapy}</div>
                      <small className="d-block" style={{ color: 'var(--text-secondary, #6c757d)' }}>{session.therapist}</small>
                    </div>
                    <Badge variant="info">
                      <i className="bi bi-clock me-1"></i>
                      {session.time}
                    </Badge>
                  </div>
                  <div className="small" style={{ color: 'var(--text-secondary, #6c757d)' }}>
                    <i className="bi bi-calendar3 me-1"></i>
                    {session.date}
                  </div>
                  <div className="small" style={{ color: 'var(--text-secondary, #6c757d)' }}>
                    <i className="bi bi-geo-alt me-1"></i>
                    {session.location}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary w-100 mt-3">
              View All Sessions
            </button>
          </Card>

          {/* Progress Summary */}
          <Card className="mt-4">
            <h5 className="mb-4" style={{ color: 'var(--text-primary, #000)' }}>Progress Summary</h5>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-primary, #000)' }}>Sessions Completed</span>
                <span className="fw-bold" style={{ color: 'var(--text-primary, #000)' }}>24/30</span>
              </div>
              <div className="progress" style={{ height: '10px' }}>
                <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-primary, #000)' }}>Goal Achievement</span>
                <span className="fw-bold" style={{ color: 'var(--text-primary, #000)' }}>65%</span>
              </div>
              <div className="progress" style={{ height: '10px' }}>
                <div className="progress-bar bg-info" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-primary, #000)' }}>Attendance Rate</span>
                <span className="fw-bold" style={{ color: 'var(--text-primary, #000)' }}>95%</span>
              </div>
              <div className="progress" style={{ height: '10px' }}>
                <div className="progress-bar bg-warning" style={{ width: '95%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Therapy;
