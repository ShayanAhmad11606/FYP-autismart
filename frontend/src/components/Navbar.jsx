import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          <i className="bi bi-heart-pulse-fill me-2"></i>
          AutiSmart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{ border: '1px solid rgba(255,255,255,0.3)' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeMenu}>About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resources" onClick={closeMenu}>Resources</Link>
                </li>
              </>
            )}
            
            {isAuthenticated && user?.role === 'user' && (
              <>
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    to="/dashboard" 
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/assessment" onClick={closeMenu}>Assessment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/games" onClick={closeMenu}>Games</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tracker" onClick={closeMenu}>Tracker</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/therapy" onClick={closeMenu}>Therapy</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resources" onClick={closeMenu}>Resources</Link>
                </li>
              </>
            )}
            
            {isAuthenticated && user?.role !== 'user' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={closeMenu}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about" onClick={closeMenu}>About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/games" onClick={closeMenu}>Games</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/assessment" onClick={closeMenu}>Assessment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tracker" onClick={closeMenu}>Tracker</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/therapy" onClick={closeMenu}>Therapy</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resources" onClick={closeMenu}>Resources</Link>
                </li>
                <li className="nav-item">
                  <Link 
                    className="nav-link" 
                    to={user?.role === 'admin' ? '/admin' : '/dashboard'} 
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            
            {/* Theme Toggle Button */}
            <li className="nav-item ms-2">
              <ThemeToggle />
            </li>
            
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    <i className="bi bi-person-circle me-1"></i>
                    {user?.name}
                  </span>
                </li>
                <li className="nav-item ms-3">
                  <button className="btn btn-light btn-sm px-3 py-2 shadow-sm" onClick={handleLogout} style={{borderRadius: '8px', fontWeight: '500'}}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item ms-3">
                <Link className="btn btn-light btn-sm px-3 py-2 shadow-sm" to="/login" onClick={closeMenu} style={{borderRadius: '8px', fontWeight: '500'}}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
