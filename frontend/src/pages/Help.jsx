import { useState } from 'react';
import Card from '../components/Card';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Register" button and fill in your details. You will receive an OTP to verify your account.',
        },
        {
          q: 'What roles are available?',
          a: 'AutiSmart has four roles: Admin, Expert (therapist), Caregiver (parent), and regular User.',
        },
      ],
    },
    {
      category: 'Assessments',
      questions: [
        {
          q: 'How do I start an assessment?',
          a: 'Navigate to the Assessment page and click "Start Assessment". Follow the on-screen instructions.',
        },
        {
          q: 'Can I save and resume later?',
          a: 'Yes, your progress is automatically saved. You can resume from where you left off.',
        },
      ],
    },
    {
      category: 'Therapy Sessions',
      questions: [
        {
          q: 'How do I schedule a session?',
          a: 'Go to the Therapy page and click "Schedule Session". Choose your preferred date and therapist.',
        },
        {
          q: 'Can I reschedule a session?',
          a: 'Yes, you can reschedule up to 24 hours before the session starts.',
        },
      ],
    },
    {
      category: 'Games & Activities',
      questions: [
        {
          q: 'Are the games suitable for all ages?',
          a: 'Our games are designed for children aged 3-12 with autism spectrum disorder.',
        },
        {
          q: 'How do I track progress?',
          a: 'Visit the Tracker page to see detailed progress reports and statistics.',
        },
      ],
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for contacting us! We will get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h2 className="mb-4">
            <i className="bi bi-question-circle me-2 text-primary"></i>
            Help & Support
          </h2>

          {/* Search Bar */}
          <Card className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </Card>

          {/* Tabs */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
                onClick={() => setActiveTab('faq')}
              >
                <i className="bi bi-question-circle me-2"></i>
                FAQs
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'guides' ? 'active' : ''}`}
                onClick={() => setActiveTab('guides')}
              >
                <i className="bi bi-book me-2"></i>
                User Guides
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                onClick={() => setActiveTab('contact')}
              >
                <i className="bi bi-envelope me-2"></i>
                Contact Us
              </button>
            </li>
          </ul>

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div>
              {faqs.map((category, idx) => (
                <Card key={idx} title={category.category} className="mb-4">
                  <div className="accordion" id={`accordion${idx}`}>
                    {category.questions.map((item, qIdx) => (
                      <div className="accordion-item" key={qIdx}>
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${idx}${qIdx}`}
                          >
                            {item.q}
                          </button>
                        </h2>
                        <div
                          id={`collapse${idx}${qIdx}`}
                          className="accordion-collapse collapse"
                          data-bs-parent={`#accordion${idx}`}
                        >
                          <div className="accordion-body">{item.a}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* User Guides Tab */}
          {activeTab === 'guides' && (
            <div className="row g-4">
              <div className="col-md-6">
                <Card>
                  <div className="text-center mb-3">
                    <i className="bi bi-book-fill text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="text-center mb-3">Getting Started Guide</h5>
                  <p className="text-muted">
                    Learn how to set up your account and start using AutiSmart effectively.
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-download me-2"></i>
                    Download PDF
                  </button>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <div className="text-center mb-3">
                    <i className="bi bi-clipboard-check-fill text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="text-center mb-3">Assessment Guide</h5>
                  <p className="text-muted">
                    Complete guide on conducting assessments and interpreting results.
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-download me-2"></i>
                    Download PDF
                  </button>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <div className="text-center mb-3">
                    <i className="bi bi-controller text-warning" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="text-center mb-3">Games & Activities</h5>
                  <p className="text-muted">
                    How to use therapeutic games and track your child's progress.
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-download me-2"></i>
                    Download PDF
                  </button>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <div className="text-center mb-3">
                    <i className="bi bi-heart-fill text-danger" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5 className="text-center mb-3">Caregiver Resources</h5>
                  <p className="text-muted">
                    Tips and resources for parents and caregivers of children with autism.
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    <i className="bi bi-download me-2"></i>
                    Download PDF
                  </button>
                </Card>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <Card title="Contact Support">
                  <form onSubmit={handleContactSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </button>
                  </form>
                </Card>

                <Card className="mt-4">
                  <h5 className="mb-3">Other Ways to Reach Us</h5>
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-envelope-fill text-primary fs-4 me-3"></i>
                    <div>
                      <div className="fw-bold">Email</div>
                      <a href="mailto:support@autismart.com">support@autismart.com</a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <i className="bi bi-telephone-fill text-primary fs-4 me-3"></i>
                    <div>
                      <div className="fw-bold">Phone</div>
                      <a href="tel:+1234567890">+1 (234) 567-890</a>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-clock-fill text-primary fs-4 me-3"></i>
                    <div>
                      <div className="fw-bold">Support Hours</div>
                      <div>Monday - Friday: 9AM - 6PM</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
