import React from 'react';

/**
 * React Error Boundary Component
 * Catches JavaScript errors in child components and displays fallback UI
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });
    
    // Optional: Log to error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card shadow-sm">
                  <div className="card-body p-5 text-center">
                    <div className="text-danger mb-4">
                      <i className="bi bi-exclamation-triangle" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h2 className="mb-3">Oops! Something went wrong</h2>
                    <p className="text-muted mb-4">
                      We're sorry for the inconvenience. An unexpected error has occurred.
                    </p>
                    
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                      <div className="alert alert-danger text-start mb-4">
                        <strong>Error Details:</strong>
                        <pre className="mb-0 mt-2" style={{ fontSize: '0.85rem' }}>
                          {this.state.error.toString()}
                        </pre>
                      </div>
                    )}
                    
                    <div className="d-flex gap-3 justify-content-center">
                      <button
                        className="btn btn-primary"
                        onClick={this.handleReset}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Try Again
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => window.location.href = '/'}
                      >
                        <i className="bi bi-house me-2"></i>
                        Go Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
