import { useState } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';

const Communication = () => {
  const [message, setMessage] = useState('');
  const [selectedExpert, setSelectedExpert] = useState(null);

  const experts = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'ABA Discussion',
      experience: '15 years',
      rating: 4.9,
      availability: 'Available',
      image: 'https://via.placeholder.com/100',
      bio: 'Board-certified behavior analyst specializing in autism spectrum disorders'
    },
    {
      id: 2,
      name: 'Ms. Emily Chen',
      specialty: 'Speech Discussion',
      experience: '10 years',
      rating: 4.8,
      availability: 'Available',
      image: 'https://via.placeholder.com/100',
      bio: 'Licensed speech-language pathologist with expertise in communication disorders'
    },
    {
      id: 3,
      name: 'Dr. Maria Garcia',
      specialty: 'Occupational Discussion',
      experience: '12 years',
      rating: 4.9,
      availability: 'Busy',
      image: 'https://via.placeholder.com/100',
      bio: 'Pediatric occupational therapist focused on sensory integration'
    },
    {
      id: 4,
      name: 'Mr. David Lee',
      specialty: 'Special Education',
      experience: '8 years',
      rating: 4.7,
      availability: 'Available',
      image: 'https://via.placeholder.com/100',
      bio: 'Special education teacher with focus on individualized learning plans'
    }
  ];

  const messages = [
    {
      id: 1,
      from: 'Dr. Sarah Johnson',
      preview: 'Your child showed great progress in today\'s session...',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      from: 'Ms. Emily Chen',
      preview: 'I recommend practicing the exercises we discussed...',
      time: '1 day ago',
      unread: false
    },
    {
      id: 3,
      from: 'Dr. Maria Garcia',
      preview: 'Let\'s schedule a follow-up session for next week...',
      time: '2 days ago',
      unread: false
    }
  ];

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-chat-dots me-2"></i>
          Expert Communication
        </h1>
        <p className="text-muted">
          Connect with autism specialists and therapists for guidance and support
        </p>
      </div>

      <div className="row g-4">
        {/* Experts Directory */}
        <div className="col-lg-8">
          <Card title="Our Expert Team">
            <div className="row g-4">
              {experts.map((expert) => (
                <div key={expert.id} className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex gap-3 mb-3">
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                          style={{ width: '80px', height: '80px' }}
                        >
                          <i className="bi bi-person-circle fs-1 text-muted"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="mb-1">{expert.name}</h5>
                          <Badge variant="primary">{expert.specialty}</Badge>
                          <div className="mt-2">
                            <div className="text-warning mb-1">
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-fill"></i>
                              <i className="bi bi-star-half"></i>
                              <span className="text-muted ms-1">{expert.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted small mb-3">{expert.bio}</p>

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <small className="text-muted d-block">Experience</small>
                          <span className="fw-medium">{expert.experience}</span>
                        </div>
                        <Badge variant={expert.availability === 'Available' ? 'success' : 'warning'}>
                          {expert.availability}
                        </Badge>
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-primary btn-sm flex-grow-1"
                          onClick={() => setSelectedExpert(expert)}
                        >
                          <i className="bi bi-chat-fill me-1"></i>
                          Message
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <i className="bi bi-calendar-plus"></i>
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <i className="bi bi-telephone"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Message Compose */}
          {selectedExpert && (
            <Card title={`Message ${selectedExpert.name}`} className="mt-4">
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control" placeholder="Enter message subject" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary">
                  <i className="bi bi-send-fill me-2"></i>
                  Send Message
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedExpert(null)}>
                  Cancel
                </button>
              </div>
            </Card>
          )}
        </div>

        {/* Messages Sidebar */}
        <div className="col-lg-4">
          <Card title="Recent Messages">
            <div className="d-grid gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded cursor-pointer ${msg.unread ? 'bg-primary-light border-primary' : 'bg-light'}`}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="fw-medium">{msg.from}</div>
                    {msg.unread && <Badge variant="primary">New</Badge>}
                  </div>
                  <p className="text-muted small mb-2">{msg.preview}</p>
                  <small className="text-muted">
                    <i className="bi bi-clock me-1"></i>
                    {msg.time}
                  </small>
                </div>
              ))}
            </div>
            <button className="btn btn-primary w-100 mt-3">
              View All Messages
            </button>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions" className="mt-4">
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary">
                <i className="bi bi-calendar-plus me-2"></i>
                Schedule Consultation
              </button>
              <button className="btn btn-outline-primary">
                <i className="bi bi-telephone me-2"></i>
                Request Call
              </button>
              <button className="btn btn-outline-primary">
                <i className="bi bi-file-earmark-text me-2"></i>
                View Reports
              </button>
              <button className="btn btn-outline-primary">
                <i className="bi bi-question-circle me-2"></i>
                FAQs
              </button>
            </div>
          </Card>

          {/* Support Hours */}
          <Card title="Support Hours" className="mt-4">
            <div className="small">
              <div className="d-flex justify-content-between mb-2">
                <span>Monday - Friday</span>
                <span className="fw-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Saturday</span>
                <span className="fw-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Sunday</span>
                <span className="fw-medium">Closed</span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-success text-white rounded text-center">
              <i className="bi bi-circle-fill me-2" style={{ fontSize: '0.5rem' }}></i>
              We're currently available
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Communication;
