import React from 'react';
import { Upload } from 'lucide-react';

// Upload Button Component
const UploadButton = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name);
      // Add your CSV processing logic here
      alert(`File "${file.name}" selected for upload. CSV processing would happen here.`);
    }
  };

  return (
    <>
      <input
        type="file"
        id="csv-upload"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
        className="d-none"
      />
      <label
        htmlFor="csv-upload"
        className="btn btn-outline-secondary me-3 d-inline-flex align-items-center"
        style={{cursor: 'pointer'}}
      >
        <Upload className="me-2" style={{width: '16px', height: '16px'}} />
        Upload Excel/CSV
      </label>
    </>
  );
};

export default UploadButton;