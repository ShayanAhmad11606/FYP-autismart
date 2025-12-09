const Card = ({ title, children, className = '', variant = '' }) => {
  const variantClass = variant ? `card-${variant}` : '';
  
  return (
    <div className={`card ${variantClass} ${className}`}>
      {title && (
        <div className="card-header border-bottom card-header-custom">
          <h5 className="mb-0">{title}</h5>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
