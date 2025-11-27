import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4 py-5">
          {/* About Section */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand mb-3">
              <i className="bi bi-heart-pulse-fill me-2"></i>
              <span className="fw-bold fs-5">AutiSmart</span>
            </div>
            <p className="footer-text mb-3">
              Empowering families and children with autism through technology, therapy, and community support. Building a better future together.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading mb-3">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/games">Games</Link></li>
              <li><Link to="/assessment">Assessment</Link></li>
              <li><Link to="/resources">Resources</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h6 className="footer-heading mb-3">Support</h6>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/therapy">Therapy</Link></li>
              <li><Link to="/tracker">Progress Tracker</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading mb-3">Get In Touch</h6>
            <ul className="footer-contact">
              <li>
                <i className="bi bi-envelope-fill me-2"></i>
                <a href="mailto:support@autismart.com">support@autismart.com</a>
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2"></i>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li>
                <i className="bi bi-geo-alt-fill me-2"></i>
                <span>123 Care Street, Health City, HC 12345</span>
              </li>
              <li>
                <i className="bi bi-clock-fill me-2"></i>
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">
                &copy; {currentYear} AutiSmart. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <ul className="footer-bottom-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
