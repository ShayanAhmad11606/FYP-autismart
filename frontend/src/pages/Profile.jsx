import Card from '../components/Card';
import Badge from '../components/Badge';

const Profile = () => {
  const userProfile = {
    name: 'Tommy Doe',
    email: 'tommy.doe@example.com',
    phone: '+1234567890',
    role: 'caregiver',
    joinDate: 'January 15, 2025',
    avatar: '👦',
    child: {
      name: 'Alex Doe',
      age: 8,
      diagnosis: 'Autism Spectrum Disorder',
      diagnosisDate: 'March 2020'
    }
  };

  const stats = [
    { label: 'Games Played', value: '120', icon: 'bi-controller', color: 'success' },
    { label: 'Sessions Completed', value: '45', icon: 'bi-calendar-check', color: 'info' },
    { label: 'Current Level', value: '15', icon: 'bi-star', color: 'warning' },
    { label: 'Total Points', value: '2850', icon: 'bi-trophy', color: 'danger' }
  ];

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-person-circle me-2"></i>
          User Profile
        </h1>
        <p className="text-muted">View and manage your account information</p>
      </div>

      <div className="row g-4">
        {/* Profile Info */}
        <div className="col-lg-4">
          <Card>
            <div className="text-center mb-4">
              <div className="mb-3" style={{ fontSize: '5rem' }}>
                {userProfile.avatar}
              </div>
              <h4 className="mb-1">{userProfile.name}</h4>
              <Badge variant="primary">{userProfile.role}</Badge>
              <p className="text-muted small mt-2">
                <i className="bi bi-calendar3 me-1"></i>
                Member since {userProfile.joinDate}
              </p>
            </div>

            <div className="d-grid gap-3 mb-4">
              <div>
                <small className="text-muted d-block mb-1">Email</small>
                <div className="fw-medium">
                  <i className="bi bi-envelope me-2"></i>
                  {userProfile.email}
                </div>
              </div>
              <div>
                <small className="text-muted d-block mb-1">Phone</small>
                <div className="fw-medium">
                  <i className="bi bi-telephone me-2"></i>
                  {userProfile.phone}
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button className="btn btn-primary">
                <i className="bi bi-pencil me-2"></i>
                Edit Profile
              </button>
              <button className="btn btn-outline-secondary">
                <i className="bi bi-shield-lock me-2"></i>
                Change Password
              </button>
            </div>
          </Card>

          {/* Child Information */}
          <Card title="Child Information" className="mt-4">
            <div className="d-grid gap-3">
              <div>
                <small className="text-muted d-block mb-1">Name</small>
                <div className="fw-medium">{userProfile.child.name}</div>
              </div>
              <div>
                <small className="text-muted d-block mb-1">Age</small>
                <div className="fw-medium">{userProfile.child.age} years old</div>
              </div>
              <div>
                <small className="text-muted d-block mb-1">Diagnosis</small>
                <div className="fw-medium">{userProfile.child.diagnosis}</div>
              </div>
              <div>
                <small className="text-muted d-block mb-1">Diagnosis Date</small>
                <div className="fw-medium">{userProfile.child.diagnosisDate}</div>
              </div>
            </div>
            <button className="btn btn-outline-primary w-100 mt-3">
              <i className="bi bi-pencil me-2"></i>
              Edit Child Info
            </button>
          </Card>
        </div>

        {/* Activity and Stats */}
        <div className="col-lg-8">
          {/* Stats Grid */}
          <div className="row g-4 mb-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-md-6">
                <Card className={`card-${stat.color}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                    <i className={`bi ${stat.icon} fs-1 text-${stat.color} opacity-50`}></i>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className="d-grid gap-3">
              {[
                { activity: 'Completed Memory Match game', time: '2 hours ago', icon: 'bi-controller', color: 'success' },
                { activity: 'Therapy session with Dr. Johnson', time: '1 day ago', icon: 'bi-calendar-event', color: 'info' },
                { activity: 'Unlocked "Rising Star" achievement', time: '2 days ago', icon: 'bi-trophy', color: 'warning' },
                { activity: 'Completed monthly assessment', time: '3 days ago', icon: 'bi-clipboard-check', color: 'primary' },
                { activity: 'Reached Level 15', time: '4 days ago', icon: 'bi-star', color: 'success' }
              ].map((item, idx) => (
                <div key={idx} className="d-flex gap-3 p-3 bg-light rounded">
                  <div className={`text-${item.color}`}>
                    <i className={`bi ${item.icon} fs-4`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-medium">{item.activity}</div>
                    <small className="text-muted">{item.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Progress Overview */}
          <Card title="Skill Progress Overview" className="mt-4">
            <div className="row g-4">
              {[
                { skill: 'Communication', progress: 85, color: 'success' },
                { skill: 'Social Skills', progress: 70, color: 'info' },
                { skill: 'Cognitive', progress: 78, color: 'warning' },
                { skill: 'Motor Skills', progress: 82, color: 'success' },
                { skill: 'Emotional Regulation', progress: 65, color: 'info' },
                { skill: 'Sensory Processing', progress: 72, color: 'warning' }
              ].map((item, idx) => (
                <div key={idx} className="col-md-6">
                  <div className="mb-2">
                    <div className="d-flex justify-content-between mb-1">
                      <span>{item.skill}</span>
                      <Badge variant={item.color}>{item.progress}%</Badge>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                      <div
                        className={`progress-bar bg-${item.color}`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Preferences */}
          <Card title="Account Preferences" className="mt-4">
            <div className="d-grid gap-3">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="notifications" defaultChecked />
                <label className="form-check-label" htmlFor="notifications">
                  Email Notifications
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="reminders" defaultChecked />
                <label className="form-check-label" htmlFor="reminders">
                  Session Reminders
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="weekly" defaultChecked />
                <label className="form-check-label" htmlFor="weekly">
                  Weekly Progress Reports
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="achievements" defaultChecked />
                <label className="form-check-label" htmlFor="achievements">
                  Achievement Notifications
                </label>
              </div>
            </div>
            <button className="btn btn-primary mt-3">
              Save Preferences
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
