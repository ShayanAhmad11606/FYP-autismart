import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Toast from '../components/Toast';
import { assessmentService } from '../services';

const AssessmentManagement = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    level: 'easy',
    title: '',
    description: '',
    questions: [],
    isActive: true,
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    id: '',
    category: 'Social Interaction',
    question: '',
    options: ['', '', ''],
    scores: [1, 2, 3],
  });

  const categories = [
    'Eye Contact',
    'Social Interaction',
    'Communication',
    'Repetitive Behavior',
    'Sensory Sensitivity',
    'Focus & Attention'
  ];

  const levels = [
    { value: 'easy', label: 'Level 1 - Easy' },
    { value: 'intermediate', label: 'Level 2 - Intermediate' },
    { value: 'advanced', label: 'Level 3 - Advanced' },
    { value: 'sensory', label: 'Bonus - Sensory & Attention' }
  ];

  // Fetch assessments
  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const response = await assessmentService.getAllAssessments();
      setAssessments(response.data || []);
    } catch (error) {
      showToast(error.message || 'Failed to fetch assessments', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleCreateNew = () => {
    setModalMode('create');
    setFormData({
      level: 'easy',
      title: '',
      description: '',
      questions: [],
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (assessment) => {
    setModalMode('edit');
    setSelectedAssessment(assessment);
    setFormData({
      level: assessment.level,
      title: assessment.title,
      description: assessment.description,
      questions: assessment.questions,
      isActive: assessment.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (assessmentId) => {
    if (!window.confirm('Are you sure you want to delete this assessment?')) return;

    try {
      await assessmentService.deleteAssessment(assessmentId);
      showToast('Assessment deleted successfully', 'success');
      fetchAssessments();
    } catch (error) {
      showToast(error.message || 'Failed to delete assessment', 'danger');
    }
  };

  const handleAddQuestion = () => {
    // Question validation
    if (!currentQuestion.question || currentQuestion.question.trim().length === 0) {
      showToast('Please enter a question', 'warning');
      return;
    }

    if (currentQuestion.question.trim().length < 5) {
      showToast('Question must be at least 5 characters long', 'warning');
      return;
    }

    if (currentQuestion.question.trim().length > 200) {
      showToast('Question must not exceed 200 characters', 'warning');
      return;
    }

    // Options validation
    if (currentQuestion.options.some(opt => !opt || opt.trim().length === 0)) {
      showToast('Please fill all option fields', 'warning');
      return;
    }

    if (currentQuestion.options.some(opt => opt.trim().length < 1 || opt.trim().length > 100)) {
      showToast('Each option must be between 1 and 100 characters', 'warning');
      return;
    }

    // Category validation
    const validCategories = ['Social Interaction', 'Communication', 'Behavior', 'Sensory', 'Daily Living'];
    if (!validCategories.includes(currentQuestion.category)) {
      showToast('Please select a valid category', 'warning');
      return;
    }

    const questionId = `${formData.level}_${formData.questions.length + 1}`;
    const newQuestion = { ...currentQuestion, id: questionId };
    
    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });

    // Reset current question
    setCurrentQuestion({
      id: '',
      category: 'Social Interaction',
      question: '',
      options: ['', '', ''],
      scores: [1, 2, 3],
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title || !formData.description) {
      showToast('Please fill all required fields (title and description)', 'warning');
      return;
    }

    // Title validation
    if (formData.title.trim().length < 3) {
      showToast('Title must be at least 3 characters long', 'warning');
      return;
    }

    if (formData.title.trim().length > 100) {
      showToast('Title must not exceed 100 characters', 'warning');
      return;
    }

    // Description validation
    if (formData.description.trim().length < 10) {
      showToast('Description must be at least 10 characters long', 'warning');
      return;
    }

    if (formData.description.trim().length > 500) {
      showToast('Description must not exceed 500 characters', 'warning');
      return;
    }

    // Level validation
    const validLevels = ['easy', 'intermediate', 'advanced', 'sensory'];
    if (!validLevels.includes(formData.level)) {
      showToast('Please select a valid assessment level', 'warning');
      return;
    }

    if (formData.questions.length === 0) {
      showToast('Please add at least one question to the assessment', 'warning');
      return;
    }

    try {
      setSubmitting(true);
      if (modalMode === 'create') {
        await assessmentService.createAssessment(formData);
        showToast('Assessment created successfully', 'success');
      } else {
        await assessmentService.updateAssessment(selectedAssessment._id, formData);
        showToast('Assessment updated successfully', 'success');
      }
      setShowModal(false);
      await fetchAssessments();
    } catch (error) {
      console.error('Submit error:', error);
      let errorMessage = 'Failed to save assessment';
      if (error?.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      showToast(errorMessage, 'danger');
      // Keep modal open on error
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = !filterLevel || assessment.level === filterLevel;
    const matchesStatus = !filterStatus || 
                         (filterStatus === 'active' && assessment.isActive) ||
                         (filterStatus === 'inactive' && !assessment.isActive);
    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="container-fluid mt-4 mb-5">
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 10000,
            maxWidth: '400px',
          }}
        >
          <Toast 
            message={toast.message} 
            type={toast.type}
            onClose={() => setToast({ show: false, message: '', type: 'success' })}
          />
        </div>
      )}

      <div className="mb-4">
        <h1 className="text-primary-custom">
          <i className="bi bi-clipboard-data me-2"></i>
          Quiz Assessment Management
        </h1>
        <p className="text-muted">Create and manage quiz-based assessments</p>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Card className="card-stat">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{assessments.length}</div>
                <div className="stat-label">Total Assessments</div>
              </div>
              <i className="bi bi-clipboard-check fs-1 text-muted opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-success">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{assessments.filter(a => a.isActive).length}</div>
                <div className="stat-label">Active</div>
              </div>
              <i className="bi bi-check-circle-fill fs-1 text-success opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-warning">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">{assessments.filter(a => !a.isActive).length}</div>
                <div className="stat-label">Inactive</div>
              </div>
              <i className="bi bi-slash-circle fs-1 text-warning opacity-50"></i>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="card-info">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="stat-value">
                  {assessments.reduce((acc, a) => acc + a.questions.length, 0)}
                </div>
                <div className="stat-label">Total Questions</div>
              </div>
              <i className="bi bi-question-circle fs-1 text-info opacity-50"></i>
            </div>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
            <option value="">All Levels</option>
            {levels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Assessments Table */}
      <Card>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox fs-1 text-muted"></i>
            <p className="text-muted mt-2">No assessments found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Title</th>
                  <th>Questions</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((assessment) => (
                  <tr key={assessment._id}>
                    <td>
                      <Badge variant="info">
                        {levels.find(l => l.value === assessment.level)?.label || assessment.level}
                      </Badge>
                    </td>
                    <td>
                      <div className="fw-medium">{assessment.title}</div>
                      <div className="text-muted small">{assessment.description}</div>
                    </td>
                    <td>
                      <span className="badge bg-secondary">{assessment.questions.length} Questions</span>
                    </td>
                    <td>
                      <Badge variant={assessment.isActive ? 'success' : 'secondary'}>
                        {assessment.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="text-muted small">
                      {new Date(assessment.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(assessment)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(assessment._id)}
                          title="Delete"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === 'create' ? 'Create New Assessment' : 'Edit Assessment'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {/* Basic Info */}
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label">Level *</label>
                      <select
                        className="form-select"
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        required
                      >
                        {levels.map(level => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <div className="form-check form-switch mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        />
                        <label className="form-check-label">
                          {formData.isActive ? 'Active' : 'Inactive'}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Description *</label>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Questions List */}
                  <div className="mb-4">
                    <h6>Questions ({formData.questions.length})</h6>
                    {formData.questions.length > 0 && (
                      <div className="list-group mb-3">
                        {formData.questions.map((q, index) => (
                          <div key={index} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="flex-grow-1">
                                <div className="fw-medium">{index + 1}. {q.question}</div>
                                <div className="text-muted small">Category: {q.category}</div>
                                <div className="mt-1">
                                  {q.options.map((opt, i) => (
                                    <span key={i} className="badge bg-light text-dark me-2">
                                      {opt} (Score: {q.scores[i]})
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemoveQuestion(index)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Question Form */}
                  <div className="card mb-3">
                    <div className="card-header">
                      <h6 className="mb-0">Add New Question</h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Category</label>
                          <select
                            className="form-select"
                            value={currentQuestion.category}
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, category: e.target.value })}
                          >
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label">Question</label>
                          <input
                            type="text"
                            className="form-control"
                            value={currentQuestion.question}
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                            placeholder="Enter the question"
                          />
                        </div>
                        {[0, 1, 2].map(i => (
                          <div key={i} className="col-md-4">
                            <label className="form-label">Option {i + 1}</label>
                            <input
                              type="text"
                              className="form-control"
                              value={currentQuestion.options[i]}
                              onChange={(e) => {
                                const newOptions = [...currentQuestion.options];
                                newOptions[i] = e.target.value;
                                setCurrentQuestion({ ...currentQuestion, options: newOptions });
                              }}
                              placeholder={`Option ${i + 1}`}
                            />
                            <div className="mt-1">
                              <label className="form-label small">Score</label>
                              <select
                                className="form-select form-select-sm"
                                value={currentQuestion.scores[i]}
                                onChange={(e) => {
                                  const newScores = [...currentQuestion.scores];
                                  newScores[i] = parseInt(e.target.value);
                                  setCurrentQuestion({ ...currentQuestion, scores: newScores });
                                }}
                              >
                                <option value="1">1 (Positive)</option>
                                <option value="2">2 (Mixed)</option>
                                <option value="3">3 (Concerning)</option>
                              </select>
                            </div>
                          </div>
                        ))}
                        <div className="col-12">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleAddQuestion}
                          >
                            <i className="bi bi-plus-lg me-2"></i>
                            Add Question
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setShowModal(false)}
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {modalMode === 'create' ? 'Creating...' : 'Updating...'}
                        </>
                      ) : (
                        modalMode === 'create' ? 'Create Assessment' : 'Update Assessment'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentManagement;
