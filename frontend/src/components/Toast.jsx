import { useState } from 'react';

/**
 * Toast Notification Component
 * Displays error/success/info messages to users
 * 
 * Usage:
 * const { showToast, ToastContainer } = useToast();
 * showToast('Error message', 'error');
 * return <>{ToastContainer}</>;
 */

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const ToastContainer = (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        maxWidth: '400px',
      }}
    >
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );

  return { showToast, ToastContainer, removeToast };
};

const Toast = ({ message, type, onClose }) => {
  const getToastStyle = () => {
    const baseStyle = {
      marginBottom: '10px',
      padding: '15px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideIn 0.3s ease-out',
      minWidth: '300px',
    };

    const typeStyles = {
      error: {
        backgroundColor: '#fee',
        color: '#c00',
        borderLeft: '4px solid #c00',
      },
      success: {
        backgroundColor: '#efe',
        color: '#060',
        borderLeft: '4px solid #060',
      },
      warning: {
        backgroundColor: '#ffc',
        color: '#840',
        borderLeft: '4px solid #f80',
      },
      info: {
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
        borderLeft: '4px solid #1976d2',
      },
    };

    return { ...baseStyle, ...typeStyles[type] };
  };

  const getIcon = () => {
    const icons = {
      error: 'bi-x-circle-fill',
      success: 'bi-check-circle-fill',
      warning: 'bi-exclamation-triangle-fill',
      info: 'bi-info-circle-fill',
    };
    return icons[type] || icons.info;
  };

  return (
    <div style={getToastStyle()}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
        <i className={`bi ${getIcon()}`} style={{ fontSize: '1.2rem' }}></i>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5rem',
          lineHeight: 1,
          opacity: 0.7,
          padding: '0 5px',
        }}
      >
        ×
      </button>
    </div>
  );
};

// Add animation styles to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

export default useToast;
