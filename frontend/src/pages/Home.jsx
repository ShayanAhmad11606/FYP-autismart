import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container">
          <h1 className="display-4 fw-bold mb-4">Welcome to AutiSmart</h1>
          <p className="lead mb-4">
            Empowering children with autism through interactive games, assessments, and personalized therapy
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/register" className="btn btn-light btn-lg">
              Get Started
            </Link>
            <Link to="/games" className="btn btn-outline-light btn-lg">
              Explore Games
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container">
          <h2 className="text-center mb-5">Our Features</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3">
                    <i className="bi bi-controller"></i>
                  </div>
                  <h5 className="card-title">Interactive Games</h5>
                  <p className="card-text">
                    Engaging educational games designed to improve cognitive and motor skills
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3">
                    <i className="bi bi-clipboard-check"></i>
                  </div>
                  <h5 className="card-title">Smart Assessments</h5>
                  <p className="card-text">
                    Comprehensive assessments to track development and identify needs
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3">
                    <i className="bi bi-heart-pulse"></i>
                  </div>
                  <h5 className="card-title">Personalized Therapy</h5>
                  <p className="card-text">
                    Tailored therapy recommendations based on individual progress
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <h5 className="card-title">Progress Tracking</h5>
                  <p className="card-text">
                    Monitor symptoms and development with visual dashboards
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <h5 className="card-title">Expert Communication</h5>
                  <p className="card-text">
                    Connect with autism specialists and therapists for guidance
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3">
                    <i className="bi bi-book"></i>
                  </div>
                  <h5 className="card-title">Educational Resources</h5>
                  <p className="card-text">
                    Access a library of articles, videos, and learning materials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing bg-primary-light">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="stat-value">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="col-md-3">
              <div className="stat-value">50+</div>
              <div className="stat-label">Expert Therapists</div>
            </div>
            <div className="col-md-3">
              <div className="stat-value">100+</div>
              <div className="stat-label">Interactive Games</div>
            </div>
            <div className="col-md-3">
              <div className="stat-value">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container">
          <div className="card bg-primary text-white">
            <div className="card-body text-center p-5">
              <h2 className="mb-3">Ready to Get Started?</h2>
              <p className="lead mb-4">
                Join thousands of families using AutiSmart to support their children's development
              </p>
              <Link to="/register" className="btn btn-light btn-lg">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
