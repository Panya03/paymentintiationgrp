import React from 'react'

const Status = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status.toLowerCase()) {
        case 'draft':
          return 'badge text-dark border border-secondary bg-light';
        case 'pending':
          return 'badge text-warning border border-warning bg-light';
        case 'approved':
          return 'badge text-success border border-success bg-light';
        case 'rejected':
          return 'badge text-danger border border-danger bg-light';
        case 'processing':
          return 'badge text-primary border border-primary bg-light';
        default:
          return 'badge text-dark border border-secondary bg-light';
      }
    };
  
    return (
      <span className={`${getStatusStyle(status)} px-3 py-2 rounded-pill`}>
        {status}
      </span>
    );
  };
  

export default Status;
