import React from 'react';

// Validation Message Component
const ValidationMessage = ({ message, type = 'error' }) => {
  if (!message) return null;
  
  const alertClass = type === 'error' ? 'alert-danger' : 'alert-warning';
  
  return (
    <div className={`alert ${alertClass} py-1 px-2 mt-1 small mb-0`}>
      {message}
    </div>
  );
};

export default ValidationMessage;