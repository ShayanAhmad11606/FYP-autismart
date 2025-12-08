import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/homeStats.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({
    users: 0,
    therapists: 0,
    games: 0,
    satisfaction: 0
  });

  // Dynamic text animation states
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const dynamicPhrases = [
    "interactive games",
    "smart assessments",
    "personalized therapy",
    "progress tracking",
    "expert guidance",
    "educational resources"
  ];

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = dynamicPhrases[currentPhraseIndex];
    
    const typingTimeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
          setTypingSpeed(150);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
          setTypingSpeed(75);
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [displayText, isDeleting, currentPhraseIndex, typingSpeed]);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);
            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;

            const targets = {
              users: 10000,
              therapists: 50,
              games: 100,
              satisfaction: 98
            };

            let currentStep = 0;

            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;

              setCounters({
                users: Math.floor(targets.users * progress),
                therapists: Math.floor(targets.therapists * progress),
                games: Math.floor(targets.games * progress),
                satisfaction: Math.floor(targets.satisfaction * progress)
              });

              if (currentStep >= steps) {
                clearInterval(interval);
                setCounters(targets);
              }
            }, stepDuration);
          }
        });
      },
      { threshold: 0.2 }
    );

    const statsSection = document.querySelector('.stats-section-new');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, [statsVisible]);

  return (
    <div>
      {/* Hero Section */}
      <section className={`hero-section text-center ${isVisible ? 'fade-in' : ''}`} style={{borderRadius: '0px' }}>
        <div className="container">
          <h1 className="display-4 fw-bold mb-4 slide-up">Welcome to AutiSmart</h1>
          <p className="lead mb-4 slide-up delay-1" style={{ minHeight: '60px' }}>
            Empowering children with autism through{' '}
            <span className="dynamic-text-wrapper">
              <span className="dynamic-text">{displayText}</span>
              <span className="typing-cursor">|</span>
            </span>
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap slide-up delay-2">
            <Link to="/register" className="btn btn-light btn-lg btn-hover-lift">
              Get Started
            </Link>
            <Link to="/games" className="btn btn-outline-light btn-lg btn-hover-lift">
              Explore Therapy Games
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container">
          <h2 className="text-center mb-5 fade-in-up">Our Features</h2>
          <div className="row g-4">
            <div className="col-md-4 feature-card-wrapper" style={{ animationDelay: '0.1s' }}>
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3 icon-float">
                    <i className="bi bi-controller"></i>
                  </div>
                  <h5 className="card-title">Interactive Therapy Games</h5>
                  <p className="card-text">
                    Engaging educational therapy games designed to improve cognitive and motor skills
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 feature-card-wrapper" style={{ animationDelay: '0.2s' }}>
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3 icon-float">
                    <i className="bi bi-clipboard-check"></i>
                  </div>
                  <h5 className="card-title">Smart Assessments</h5>
                  <p className="card-text">
                    Comprehensive assessments to track development and identify needs
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 feature-card-wrapper" style={{ animationDelay: '0.3s' }}>
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3 icon-float">
                    <i className="bi bi-heart-pulse"></i>
                  </div>
                  <h5 className="card-title">Personalized Discussion</h5>
                  <p className="card-text">
                    Tailored discussion recommendations based on individual progress
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 feature-card-wrapper" style={{ animationDelay: '0.4s' }}>
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3 icon-float">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <h5 className="card-title">Progress Tracking</h5>
                  <p className="card-text">
                    Monitor symptoms and development with visual dashboards
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 feature-card-wrapper" style={{ animationDelay: '0.5s' }}>
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3 icon-float">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <h5 className="card-title">Expert Communication</h5>
                  <p className="card-text">
                    Connect with autism specialists and therapists for guidance
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 feature-card-wrapper" style={{ animationDelay: '0.6s' }}>
              <div className="card h-100 text-center card-hover">
                <div className="card-body">
                  <div className="fs-1 text-primary-custom mb-3 icon-float">
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
      <section className="stats-section-new">
        <div className="container">
          <div className="row g-0 text-center">
            <div className="col-md-3 col-sm-6 stat-item-new" style={{ animationDelay: '0.1s' }}>
              <div className="stat-content-new">
                <div className={`stat-value-new ${statsVisible ? 'animate-count' : ''}`}>
                  {counters.users > 0 ? `${(counters.users / 1000).toFixed(0)}K+` : '0'}
                </div>
                <div className="stat-label-new">ACTIVE USERS</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 stat-item-new" style={{ animationDelay: '0.2s' }}>
              <div className="stat-content-new">
                <div className={`stat-value-new ${statsVisible ? 'animate-count' : ''}`}>
                  {counters.therapists}+
                </div>
                <div className="stat-label-new">EXPERT THERAPISTS</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 stat-item-new" style={{ animationDelay: '0.3s' }}>
              <div className="stat-content-new">
                <div className={`stat-value-new ${statsVisible ? 'animate-count' : ''}`}>
                  {counters.games}+
                </div>
                <div className="stat-label-new">INTERACTIVE GAMES</div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 stat-item-new" style={{ animationDelay: '0.4s' }}>
              <div className="stat-content-new">
                <div className={`stat-value-new ${statsVisible ? 'animate-count' : ''}`}>
                  {counters.satisfaction}%
                </div>
                <div className="stat-label-new">SATISFACTION RATE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing">
        <div className="container">
          <div className="card text-white cta-card" style={{ backgroundColor: '#61C3B4' }}>
            <div className="card-body text-center p-5">
              <h2 className="mb-3 fade-in-up">Ready to Get Started?</h2>
              <p className="lead mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
                Join thousands of families using AutiSmart to support their children's development
              </p>
              <Link to="/register" className="btn btn-light btn-lg btn-hover-lift pulse-on-hover" style={{ animationDelay: '0.4s' }}>
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
