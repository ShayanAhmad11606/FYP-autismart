import { useState } from 'react';
import Card from '../components/Card';
import StatCard from '../components/StatCard';

const Tracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const symptoms = [
    { id: 1, name: 'Eye Contact', severity: 65, trend: 'up', color: 'success' },
    { id: 2, name: 'Social Interaction', severity: 45, trend: 'up', color: 'warning' },
    { id: 3, name: 'Communication', severity: 70, trend: 'up', color: 'success' },
    { id: 4, name: 'Repetitive Behavior', severity: 50, trend: 'down', color: 'info' },
    { id: 5, name: 'Sensory Sensitivity', severity: 35, trend: 'up', color: 'warning' },
    { id: 6, name: 'Focus & Attention', severity: 55, trend: 'up', color: 'info' }
  ];

  const recentLogs = [
    { date: '2025-11-26', time: '14:30', symptom: 'Good eye contact during lunch', mood: 'Happy', notes: 'Positive interaction with peers' },
    { date: '2025-11-26', time: '10:15', symptom: 'Completed puzzle independently', mood: 'Calm', notes: 'Showed improvement in focus' },
    { date: '2025-11-25', time: '16:45', symptom: 'Avoided loud noises', mood: 'Anxious', notes: 'Covered ears during assembly' },
    { date: '2025-11-25', time: '09:00', symptom: 'Initiated conversation', mood: 'Happy', notes: 'Asked about favorite game' },
    { date: '2025-11-24', time: '15:30', symptom: 'Shared toys with friends', mood: 'Happy', notes: 'Great progress in social skills' }
  ];

  return (
    <div className="container mt-4 mb-5">
      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-graph-up me-2"></i>
          Symptom Tracker
        </h1>
        <p className="text-muted">
          Monitor and track your child's behavior patterns and progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard value="85%" label="Overall Progress" icon="bi-graph-up-arrow" variant="success" />
        </div>
        <div className="col-md-3">
          <StatCard value="12" label="Days Tracked" icon="bi-calendar-check" variant="info" />
        </div>
        <div className="col-md-3">
          <StatCard value="6" label="Active Symptoms" icon="bi-clipboard-data" variant="warning" />
        </div>
        <div className="col-md-3">
          <StatCard value="24" label="Total Logs" icon="bi-journal-text" variant="stat" />
        </div>
      </div>

      {/* Period Selector */}
      <div className="mb-4">
        <div className="btn-group" role="group">
          <button
            className={`btn ${selectedPeriod === 'week' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedPeriod('week')}
          >
            This Week
          </button>
          <button
            className={`btn ${selectedPeriod === 'month' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedPeriod('month')}
          >
            This Month
          </button>
          <button
            className={`btn ${selectedPeriod === 'year' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedPeriod('year')}
          >
            This Year
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Symptom Progress */}
        <div className="col-lg-8">
          <Card title="Symptom Progress Overview">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-medium">{symptom.name}</span>
                    <i className={`bi bi-arrow-${symptom.trend === 'up' ? 'up' : 'down'} text-${symptom.trend === 'up' ? 'success' : 'danger'}`}></i>
                  </div>
                  <span className={`badge badge-${symptom.color}`}>{symptom.severity}%</span>
                </div>
                <div className="progress" style={{ height: '12px' }}>
                  <div
                    className={`progress-bar bg-${symptom.color}`}
                    style={{ width: `${symptom.severity}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </Card>

          {/* Chart Placeholder */}
          <Card title="Trend Analysis" className="mt-4">
            <div className="text-center py-5 bg-light rounded">
              <i className="bi bi-graph-up fs-1 text-muted mb-3 d-block"></i>
              <p className="text-muted">Line chart showing symptom trends over time</p>
              <p className="text-muted small">(Chart visualization placeholder)</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity Log */}
        <div className="col-lg-4">
          <Card title="Recent Activity Log">
            <div className="d-grid gap-3">
              {recentLogs.map((log, index) => (
                <div key={index} className="p-3 bg-light rounded">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <small className="text-muted">
                      <i className="bi bi-calendar3 me-1"></i>
                      {log.date}
                    </small>
                    <small className="text-muted">{log.time}</small>
                  </div>
                  <p className="mb-1 fw-medium">{log.symptom}</p>
                  <div className="d-flex gap-2 align-items-center">
                    <span className="badge badge-info">{log.mood}</span>
                    {log.notes && (
                      <small className="text-muted">{log.notes}</small>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary w-100 mt-3">
              <i className="bi bi-plus-circle me-2"></i>
              Add New Log
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
