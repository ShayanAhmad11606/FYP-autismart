import { useState, useEffect } from 'react';
import { useChild } from '../context/ChildContext';
import { childAPI } from '../services/api';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import '../styles/childReports.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChildReports = () => {
  const { childrenList, loading: childrenLoading } = useChild();
  const [selectedChildId, setSelectedChildId] = useState('');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (childrenList.length > 0 && !selectedChildId) {
      setSelectedChildId(childrenList[0].id);
    }
  }, [childrenList]);

  useEffect(() => {
    if (selectedChildId) {
      loadReport();
    }
  }, [selectedChildId]);

  const loadReport = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await childAPI.getChildReport(selectedChildId);
      setReportData(response.data);
    } catch (err) {
      console.error('Error loading report:', err);
      setError(err.message || 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const blob = await childAPI.downloadChildReportPDF(selectedChildId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const child = childrenList.find(c => c.id === selectedChildId);
      a.download = `report-${child?.name.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to download PDF: ' + err.message);
    }
  };

  if (childrenLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (childrenList.length === 0) {
    return (
      <div className="container mt-5">
        <div className="empty-state">
          <i className="bi bi-person-plus-fill"></i>
          <h4>No Children Added Yet</h4>
          <p>Add a child to view their progress reports</p>
        </div>
      </div>
    );
  }

  const selectedChild = childrenList.find(c => c.id === selectedChildId);

  // Prepare chart data
  const progressChartData = reportData?.statistics?.progressOverTime ? {
    labels: reportData.statistics.progressOverTime.map(item => item.date),
    datasets: [{
      label: 'Average Score',
      data: reportData.statistics.progressOverTime.map(item => item.averageScore),
      borderColor: '#61C3B4',
      backgroundColor: 'rgba(97, 195, 180, 0.1)',
      fill: true,
      tension: 0.4
    }]
  } : null;

  const activityChartData = reportData?.statistics?.byActivityType ? {
    labels: Object.keys(reportData.statistics.byActivityType),
    datasets: [{
      label: 'Average Score (%)',
      data: Object.values(reportData.statistics.byActivityType).map(item => item.averageScore),
      backgroundColor: [
        '#61C3B4',
        '#79C9A0',
        '#b4a7d6',
        '#f4a261',
        '#87ceeb'
      ]
    }]
  } : null;

  return (
    <div className="child-reports-container">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="page-title">
            <i className="bi bi-file-earmark-bar-graph me-2"></i>
            Progress Reports
          </h2>
          {reportData && (
            <button className="btn btn-primary" onClick={handleDownloadPDF}>
              <i className="bi bi-download me-2"></i>
              Download PDF
            </button>
          )}
        </div>

        {/* Child Selector */}
        <div className="mb-4">
          <label className="form-label">Select Child:</label>
          <select
            className="form-select"
            value={selectedChildId}
            onChange={(e) => setSelectedChildId(e.target.value)}
          >
            {childrenList.map(child => (
              <option key={child.id} value={child.id}>
                {child.name} - {child.age} years
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {reportData && !loading && (
          <>
            {/* Child Bio Section */}
            <div className="report-section">
              <h3 className="section-title">Child Information</h3>
              <div className="child-bio-card">
                <div className="row">
                  <div className="col-md-2 text-center">
                    <div className="child-avatar-large">
                      {selectedChild?.profileImage ? (
                        <img src={selectedChild.profileImage} alt={selectedChild.name} />
                      ) : (
                        <div className="avatar-placeholder-large">
                          {selectedChild?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <strong>Name:</strong> {reportData.child.name}
                      </div>
                      <div className="col-md-6 mb-3">
                        <strong>Age:</strong> {reportData.child.age} years
                      </div>
                      <div className="col-md-6 mb-3">
                        <strong>Gender:</strong> {reportData.child.gender}
                      </div>
                      {reportData.child.dateOfBirth && (
                        <div className="col-md-6 mb-3">
                          <strong>Date of Birth:</strong> {reportData.child.dateOfBirth}
                        </div>
                      )}
                      {reportData.child.diagnosis && (
                        <div className="col-md-12 mb-3">
                          <strong>Diagnosis:</strong> {reportData.child.diagnosis}
                        </div>
                      )}
                      {reportData.child.specialNeeds && (
                        <div className="col-md-12 mb-3">
                          <strong>Special Needs:</strong> {reportData.child.specialNeeds}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="report-section">
              <h3 className="section-title">Activity Summary</h3>
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="bi bi-activity"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">{reportData.statistics.totalActivities}</div>
                      <div className="stat-label">Total Activities</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="bi bi-controller"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">{reportData.statistics.totalGames}</div>
                      <div className="stat-label">Games Played</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="bi bi-clipboard-check"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">{reportData.statistics.totalAssessments}</div>
                      <div className="stat-label">Assessments</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <i className="bi bi-graph-up-arrow"></i>
                    </div>
                    <div className="stat-content">
                      <div className="stat-value">{reportData.statistics.averageScore.toFixed(1)}%</div>
                      <div className="stat-label">Average Score</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cognitive Assessment */}
            <div className="report-section">
              <h3 className="section-title">Cognitive Assessment</h3>
              <div className="assessment-card">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="assessment-item">
                      <strong>Overall Level:</strong>
                      <span className={`badge ms-2 bg-${getLevelBadgeClass(reportData.cognitiveAssessment.overallLevel)}`}>
                        {reportData.cognitiveAssessment.overallLevel}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="assessment-item">
                      <strong>Progress Trend:</strong>
                      <span className={`badge ms-2 bg-${getTrendBadgeClass(reportData.cognitiveAssessment.progressTrend)}`}>
                        {reportData.cognitiveAssessment.progressTrend}
                      </span>
                    </div>
                  </div>
                </div>

                {reportData.cognitiveAssessment.strengths.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-success">
                      <i className="bi bi-star-fill me-2"></i>Strengths
                    </h5>
                    <ul>
                      {reportData.cognitiveAssessment.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reportData.cognitiveAssessment.areasForImprovement.length > 0 && (
                  <div className="mb-4">
                    <h5 className="text-warning">
                      <i className="bi bi-exclamation-triangle me-2"></i>Areas for Improvement
                    </h5>
                    <ul>
                      {reportData.cognitiveAssessment.areasForImprovement.map((area, index) => (
                        <li key={index}>{area}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {reportData.cognitiveAssessment.recommendations.length > 0 && (
                  <div>
                    <h5 className="text-primary">
                      <i className="bi bi-lightbulb me-2"></i>Recommendations
                    </h5>
                    <ul>
                      {reportData.cognitiveAssessment.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Charts */}
            {progressChartData && (
              <div className="report-section">
                <h3 className="section-title">Progress Over Time</h3>
                <div className="chart-container">
                  <Line 
                    data={progressChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: true },
                        title: { display: false }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {activityChartData && (
              <div className="report-section">
                <h3 className="section-title">Performance by Activity</h3>
                <div className="chart-container">
                  <Bar 
                    data={activityChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        title: { display: false }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100
                        }
                      }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Recent Activities */}
            {reportData.statistics.recentActivities && reportData.statistics.recentActivities.length > 0 && (
              <div className="report-section">
                <h3 className="section-title">Recent Activities</h3>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Type</th>
                        <th>Score</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.statistics.recentActivities.slice(0, 10).map((activity, index) => (
                        <tr key={index}>
                          <td>{activity.activityName}</td>
                          <td>
                            <span className={`badge bg-${getActivityTypeBadgeClass(activity.activityType)}`}>
                              {activity.activityType}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${getScoreBadgeClass(activity.percentage)}`}>
                              {activity.score}/{activity.maxScore} ({activity.percentage.toFixed(1)}%)
                            </span>
                          </td>
                          <td>
                            {activity.completedAt?.toDate ? 
                              activity.completedAt.toDate().toLocaleDateString() : 
                              'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Helper functions for badge colors
function getLevelBadgeClass(level) {
  switch (level) {
    case 'Excellent': return 'success';
    case 'Good': return 'primary';
    case 'Fair': return 'warning';
    case 'Needs Support': return 'danger';
    default: return 'secondary';
  }
}

function getTrendBadgeClass(trend) {
  switch (trend) {
    case 'Improving': return 'success';
    case 'Declining': return 'danger';
    case 'Stable': return 'info';
    default: return 'secondary';
  }
}

function getActivityTypeBadgeClass(type) {
  switch (type) {
    case 'game': return 'primary';
    case 'assessment': return 'info';
    case 'therapy': return 'success';
    default: return 'secondary';
  }
}

function getScoreBadgeClass(percentage) {
  if (percentage >= 80) return 'success';
  if (percentage >= 60) return 'primary';
  if (percentage >= 40) return 'warning';
  return 'danger';
}

export default ChildReports;
