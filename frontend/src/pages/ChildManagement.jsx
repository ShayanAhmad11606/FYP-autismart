import { useState, useEffect } from 'react';
import { useChild } from '../context/ChildContext';
import '../styles/childManagement.css';

const ChildManagement = () => {
  const { childrenList, loading, addChild, updateChild, deleteChild, refreshChildren } = useChild();
  const [showModal, setShowModal] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    diagnosis: '',
    specialNeeds: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    refreshChildren();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // If dateOfBirth is changed, automatically calculate age
    if (name === 'dateOfBirth' && value) {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // Adjust age if birthday hasn't occurred this year yet
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      // Update both dateOfBirth and age
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        age: age >= 0 ? age.toString() : '' 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenModal = (child = null) => {
    if (child) {
      setEditingChild(child);
      setFormData({
        name: child.name || '',
        age: child.age || '',
        gender: child.gender || '',
        dateOfBirth: child.dateOfBirth || '',
        diagnosis: child.diagnosis || '',
        specialNeeds: child.specialNeeds || '',
        notes: child.notes || ''
      });
    } else {
      setEditingChild(null);
      setFormData({
        name: '',
        age: '',
        gender: '',
        dateOfBirth: '',
        diagnosis: '',
        specialNeeds: '',
        notes: ''
      });
    }
    setShowModal(true);
    setError('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingChild(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Required fields validation
    if (!formData.name || !formData.age || !formData.gender) {
      setError('Name, age, and gender are required');
      return;
    }

    // Name validation
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }

    if (formData.name.trim().length > 50) {
      setError('Name must not exceed 50 characters');
      return;
    }

    // Check for numbers in name
    if (/\d/.test(formData.name)) {
      setError('Child name cannot contain numbers');
      return;
    }

    // Age validation
    const ageNum = parseInt(formData.age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 18) {
      setError('Age must be between 1 and 18 years');
      return;
    }

    // Gender validation
    if (!['male', 'female', 'other'].includes(formData.gender.toLowerCase())) {
      setError('Please select a valid gender');
      return;
    }

    try {
      setSubmitting(true);
      if (editingChild) {
        await updateChild(editingChild.id, formData);
      } else {
        await addChild(formData);
      }
      handleCloseModal();
    } catch (err) {
      setError(err.message || 'Failed to save child');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (childId) => {
    if (window.confirm('Are you sure you want to delete this child? All associated data will be removed.')) {
      try {
        await deleteChild(childId);
      } catch (err) {
        alert('Failed to delete child: ' + err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="child-management-container">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="page-title">
            <i className="bi bi-people-fill me-2"></i>
            Manage Children
          </h2>
          <button className="btn btn-primary" onClick={() => handleOpenModal()}>
            <i className="bi bi-plus-circle me-2"></i>
            Add Child
          </button>
        </div>

        {childrenList.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-person-plus-fill"></i>
            <h4>No Children Added Yet</h4>
            <p>Add your first child to start tracking their progress</p>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              <i className="bi bi-plus-circle me-2"></i>
              Add Your First Child
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {childrenList.map(child => (
              <div key={child.id} className="col-12 col-md-6 col-lg-4">
                <div className="child-card">
                  <div className="child-card-header">
                    <div className="child-avatar">
                      {child.profileImage ? (
                        <img src={child.profileImage} alt={child.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {child.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="child-info">
                      <h4>{child.name}</h4>
                      <p className="text-muted">{child.age} years old • {child.gender}</p>
                    </div>
                  </div>
                  
                  <div className="child-card-body">
                    {child.dateOfBirth && (
                      <p><strong>DOB:</strong> {child.dateOfBirth}</p>
                    )}
                    {child.diagnosis && (
                      <p><strong>Diagnosis:</strong> {child.diagnosis}</p>
                    )}
                    {child.specialNeeds && (
                      <p><strong>Special Needs:</strong> {child.specialNeeds}</p>
                    )}
                    {child.notes && (
                      <p className="notes"><strong>Notes:</strong> {child.notes}</p>
                    )}
                  </div>

                  <div className="child-card-actions">
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleOpenModal(child)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(child.id)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Child Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingChild ? 'Edit Child' : 'Add New Child'}</h3>
              <button className="btn-close" onClick={handleCloseModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <div className="form-group mb-3">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="age">Age * (auto-calculated from DOB)</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleInputChange}
                        min="1"
                        max="18"
                        required
                        readOnly={formData.dateOfBirth ? true : false}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label htmlFor="gender">Gender *</label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-control"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="dateOfBirth">Date of Birth (will auto-calculate age)</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="form-control"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <small className="text-muted">Select date of birth to automatically calculate age</small>
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="diagnosis">Diagnosis</label>
                  <input
                    type="text"
                    id="diagnosis"
                    name="diagnosis"
                    className="form-control"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    placeholder="e.g., Autism Spectrum Disorder"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="specialNeeds">Special Needs</label>
                  <input
                    type="text"
                    id="specialNeeds"
                    name="specialNeeds"
                    className="form-control"
                    value={formData.specialNeeds}
                    onChange={handleInputChange}
                    placeholder="e.g., Speech therapy, Occupational therapy"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="form-control"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Additional notes or observations"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
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
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    editingChild ? 'Update Child' : 'Add Child'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildManagement;
