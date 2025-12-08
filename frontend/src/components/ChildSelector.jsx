import { useChild } from '../context/ChildContext';
import '../styles/childSelector.css';

const ChildSelector = ({ onChildSelect }) => {
  const { selectedChild, childrenList, selectChild, loading } = useChild();

  const handleSelectChild = (child) => {
    selectChild(child);
    if (onChildSelect) {
      onChildSelect(child);
    }
  };

  if (loading) {
    return (
      <div className="child-selector-loading">
        <div className="spinner-border spinner-border-sm" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (childrenList.length === 0) {
    return (
      <div className="child-selector-empty">
        <p className="mb-0">
          <i className="bi bi-exclamation-circle me-2"></i>
          No children added yet. Please add a child first.
        </p>
      </div>
    );
  }

  return (
    <div className="child-selector">
      <label className="child-selector-label">
        <i className="bi bi-person-check me-2"></i>
        Select Child:
      </label>
      <div className="child-selector-options">
        {childrenList.map(child => (
          <button
            key={child.id}
            className={`child-option ${selectedChild?.id === child.id ? 'active' : ''}`}
            onClick={() => handleSelectChild(child)}
          >
            <div className="child-option-avatar">
              {child.profileImage ? (
                <img src={child.profileImage} alt={child.name} />
              ) : (
                <div className="avatar-placeholder">
                  {child.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="child-option-info">
              <span className="child-option-name">{child.name}</span>
              <span className="child-option-details">{child.age} years</span>
            </div>
            {selectedChild?.id === child.id && (
              <i className="bi bi-check-circle-fill text-success"></i>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChildSelector;
