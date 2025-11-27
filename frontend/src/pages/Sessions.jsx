import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Sessions = () => {
  const [viewMode, setViewMode] = useState('list');

  const sessions = [
    {
      id: 1,
      title: 'ABA Therapy Session',
      date: 'Nov 27, 2025',
      time: '10:00 AM - 11:30 AM',
      therapist: 'Dr. Sarah Johnson',
      child: 'Tommy Doe',
      type: 'ABA',
      status: 'Upcoming',
      location: 'Room 201',
      notes: 'Focus on social interaction skills'
    },
    {
      id: 2,
      title: 'Speech Therapy',
      date: 'Nov 28, 2025',
      time: '2:00 PM - 3:00 PM',
      therapist: 'Ms. Emily Chen',
      child: 'Emma Smith',
      type: 'Speech',
      status: 'Upcoming',
      location: 'Room 105',
      notes: 'Work on pronunciation and vocabulary'
    },
    {
      id: 3,
      title: 'Occupational Therapy',
      date: 'Nov 25, 2025',
      time: '11:00 AM - 12:00 PM',
      therapist: 'Dr. Maria Garcia',
      child: 'Alex Johnson',
      type: 'OT',
      status: 'Completed',
      location: 'Room 302',
      notes: 'Sensory integration activities completed'
    },
    {
      id: 4,
      title: 'Social Skills Group',
      date: 'Nov 24, 2025',
      time: '3:00 PM - 4:00 PM',
      therapist: 'Mr. David Lee',
      child: 'Lily Williams',
      type: 'Social',
      status: 'Completed',
      location: 'Group Room A',
      notes: 'Great progress in turn-taking'
    },
    {
      id: 5,
      title: 'Play Therapy',
      date: 'Nov 29, 2025',
      time: '1:00 PM - 1:45 PM',
      therapist: 'Dr. Sarah Johnson',
      child: 'Jack Brown',
      type: 'Play',
      status: 'Upcoming',
      location: 'Room 201',
      notes: 'Emotional expression through play'
    }
  ];

  return (
    <div className="container-fluid mt-4 mb-5">
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="text-primary-custom">
              <i className="bi bi-calendar-event me-2"></i>
              Therapy Sessions
            </h1>
            <p className="text-muted">Manage and track all therapy sessions</p>
          </div>
          <div className="btn-group">
            <button
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('list')}
            >
              <i className="bi bi-list-ul"></i> List
            </button>
            <button
              className={`btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setViewMode('calendar')}
            >
              <i className="bi bi-calendar3"></i> Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Card className="card-stat">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{sessions.length}</div>
                <div className="stat-label">Total Sessions</div>
              </div>
              <i className="bi bi-calendar-event-fill fs-1 text-muted opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{sessions.filter(s => s.status === 'Upcoming').length}</div>
                <div className="stat-label">Upcoming</div>
              </div>
              <i className="bi bi-clock-fill fs-1 text-success opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-info">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{sessions.filter(s => s.status === 'Completed').length}</div>
                <div className="stat-label">Completed</div>
              </div>
              <i className="bi bi-check-circle-fill fs-1 text-info opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">95%</div>
                <div className="stat-label">Attendance Rate</div>
              </div>
              <i className="bi bi-person-check-fill fs-1 text-warning opacity-50"></i>
            </div>
          </Card>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search sessions..."
            />
          </div>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option>All Types</option>
            <option>ABA</option>
            <option>Speech</option>
            <option>OT</option>
            <option>Social</option>
            <option>Play</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option>All Status</option>
            <option>Upcoming</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="col-md-2">
          <input type="date" className="form-control" />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">
            <i className="bi bi-plus-circle me-2"></i>
            New Session
          </button>
        </div>
      </div>

      {/* Sessions Display */}
      {viewMode === 'list' ? (
        <div className="row g-4">
          {sessions.map((session) => (
            <div key={session.id} className="col-lg-6">
              <Card className={session.status === 'Upcoming' ? 'card-success' : 'card-info'}>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-1">{session.title}</h5>
                    <Badge variant={session.status === 'Upcoming' ? 'success' : 'info'}>
                      {session.status}
                    </Badge>
                  </div>
                  <Badge variant="primary">{session.type}</Badge>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <small className="text-muted d-block">Date & Time</small>
                    <div className="fw-medium small">
                      <i className="bi bi-calendar3 me-1"></i>
                      {session.date}
                    </div>
                    <div className="text-muted small">
                      <i className="bi bi-clock me-1"></i>
                      {session.time}
                    </div>
                  </div>
                  <div className="col-6">
                    <small className="text-muted d-block">Therapist</small>
                    <div className="fw-medium small">{session.therapist}</div>
                    <div className="text-muted small">
                      <i className="bi bi-geo-alt me-1"></i>
                      {session.location}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <small className="text-muted d-block">Child</small>
                  <div className="fw-medium">{session.child}</div>
                </div>

                {session.notes && (
                  <div className="mb-3 p-2 bg-light rounded">
                    <small className="text-muted d-block mb-1">Notes:</small>
                    <small>{session.notes}</small>
                  </div>
                )}

                <div className="d-flex gap-2">
                  {session.status === 'Upcoming' ? (
                    <>
                      <button className="btn btn-primary btn-sm">
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-calendar-plus me-1"></i>
                        Reschedule
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-x-circle me-1"></i>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-eye me-1"></i>
                        View Report
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="bi bi-download me-1"></i>
                        Download
                      </button>
                    </>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card title="Calendar View">
          <div className="text-center py-5 bg-light rounded">
            <i className="bi bi-calendar3 fs-1 text-primary-custom mb-3 d-block"></i>
            <p className="text-muted mb-2">Interactive calendar showing all sessions</p>
            <p className="text-muted small">(Calendar visualization placeholder)</p>
            <div className="mt-4">
              <button className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Schedule New Session
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Sessions;
