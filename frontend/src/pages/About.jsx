import Card from '../components/Card';

const About = () => {
  const team = [
    { name: 'Dr. Sarah Johnson', role: 'Chief Medical Officer', specialty: 'Pediatric Autism Specialist', image: '👩‍⚕️' },
    { name: 'Dr. Mike Chen', role: 'Lead Therapist', specialty: 'Applied Behavior Analysis', image: '👨‍⚕️' },
    { name: 'Dr. Emily Brown', role: 'Speech Pathologist', specialty: 'Communication Development', image: '👩‍⚕️' },
    { name: 'Dr. James Wilson', role: 'Occupational Therapist', specialty: 'Sensory Integration', image: '👨‍⚕️' }
  ];

  const features = [
    { icon: 'bi-clipboard-check', title: 'Professional Assessment', description: 'Comprehensive autism screening and evaluation tools' },
    { icon: 'bi-controller', title: 'Interactive Games', description: 'Educational games designed for skill development' },
    { icon: 'bi-graph-up-arrow', title: 'Progress Tracking', description: 'Real-time monitoring of developmental milestones' },
    { icon: 'bi-people', title: 'Expert Support', description: 'Connect with qualified therapists and specialists' },
    { icon: 'bi-book', title: 'Resource Library', description: 'Access evidence-based information and guides' },
    { icon: 'bi-heart-pulse', title: 'Personalized Care', description: 'Customized therapy plans for individual needs' }
  ];

  const stats = [
    { value: '10,000+', label: 'Families Helped' },
    { value: '50+', label: 'Expert Therapists' },
    { value: '100+', label: 'Interactive Games' },
    { value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-vh-100">
      {/* Hero Section */}
      <div className="py-5 hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-3" style={{color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
                <i className="bi bi-heart-pulse-fill me-3"></i>
                About AutiSmart
              </h1>
              <p className="lead mb-0" style={{color: 'white', opacity: 0.95}}>
                Empowering families and children with autism through technology, therapy, and community support
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        {/* Mission Section */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <Card>
              <div className="text-center mb-4">
                <i className="bi bi-bullseye text-primary-custom" style={{ fontSize: '3rem' }}></i>
              </div>
              <h2 className="text-center text-primary-custom mb-4">Our Mission</h2>
              <p className="lead text-center mb-4">
                AutiSmart is dedicated to providing comprehensive support for children with autism and their families through innovative technology and evidence-based therapeutic interventions.
              </p>
              <p className="text-muted text-center">
                We believe that every child deserves access to quality care, personalized support, and the tools they need to reach their full potential. Our platform combines cutting-edge technology with proven therapeutic methods to create a holistic approach to autism care.
              </p>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row g-4 mb-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-md-3">
              <div className="text-center">
                <div className="display-4 fw-bold text-primary-custom mb-2">{stat.value}</div>
                <div className="text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="text-center text-primary-custom mb-4">What We Offer</h2>
            <div className="row g-4">
              {features.map((feature, idx) => (
                <div key={idx} className="col-md-4">
                  <Card>
                    <div className="text-center mb-3">
                      <i className={`bi ${feature.icon} text-primary-custom`} style={{ fontSize: '2.5rem' }}></i>
                    </div>
                    <h5 className="text-center mb-3">{feature.title}</h5>
                    <p className="text-muted text-center mb-0">{feature.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <Card>
              <h2 className="text-primary-custom mb-4">Our Story</h2>
              <p className="mb-3">
                AutiSmart was founded in 2020 by a team of healthcare professionals, therapists, and technology experts who recognized the need for accessible, comprehensive autism support services.
              </p>
              <p className="mb-3">
                Our platform was born from the understanding that families caring for children with autism often face challenges in accessing quality resources, finding qualified experts, and tracking their child's progress effectively.
              </p>
              <p className="mb-0">
                Today, AutiSmart serves thousands of families worldwide, providing them with the tools, resources, and expert support they need to help their children thrive.
              </p>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="text-center text-primary-custom mb-4">Meet Our Expert Team</h2>
            <div className="row g-4">
              {team.map((member, idx) => (
                <div key={idx} className="col-md-3">
                  <Card>
                    <div className="text-center">
                      <div style={{ fontSize: '4rem' }} className="mb-3">{member.image}</div>
                      <h5 className="mb-1">{member.name}</h5>
                      <p className="text-primary-custom mb-2">{member.role}</p>
                      <p className="text-muted small mb-0">{member.specialty}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="row mb-5">
          <div className="col-lg-10 mx-auto">
            <Card>
              <h2 className="text-primary-custom mb-4 text-center">Our Core Values</h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <i className="bi bi-heart-fill text-primary-custom fs-3"></i>
                    <div>
                      <h5>Compassion</h5>
                      <p className="text-muted mb-0">We approach every family with empathy, understanding, and genuine care.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <i className="bi bi-lightbulb-fill text-primary-custom fs-3"></i>
                    <div>
                      <h5>Innovation</h5>
                      <p className="text-muted mb-0">We continuously improve our platform with the latest research and technology.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <i className="bi bi-shield-check text-primary-custom fs-3"></i>
                    <div>
                      <h5>Trust</h5>
                      <p className="text-muted mb-0">We maintain the highest standards of privacy, security, and professional ethics.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex gap-3">
                    <i className="bi bi-people-fill text-primary-custom fs-3"></i>
                    <div>
                      <h5>Community</h5>
                      <p className="text-muted mb-0">We build connections between families, experts, and support networks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow-sm" style={{background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'}}>
              <div className="card-body p-5 text-white text-center">
                <h2 className="mb-3">Ready to Get Started?</h2>
                <p className="mb-4">
                  Join thousands of families who trust AutiSmart for their autism care journey
                </p>
                <div className="d-flex gap-3 justify-content-center">
                  <a href="/register" className="btn btn-light btn-lg px-4">
                    <i className="bi bi-person-plus me-2"></i>
                    Sign Up Now
                  </a>
                  <a href="/communication" className="btn btn-outline-light btn-lg px-4">
                    <i className="bi bi-chat-dots me-2"></i>
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
