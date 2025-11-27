import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span
          className={`theme-toggle__knob ${isDark ? 'is-on' : 'is-off'}`}
        >
          {/* Moon icon (visible on dark) */}
          <svg className="theme-toggle__icon theme-toggle__icon--moon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="white" />
          </svg>

          {/* Sun icon (visible on light) */}
          <svg className="theme-toggle__icon theme-toggle__icon--sun" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="#0ea5e9" />
            <g stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round">
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 17.66l1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M4.93 19.07l1.41-1.41" />
              <path d="M17.66 6.34l1.41-1.41" />
            </g>
          </svg>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
