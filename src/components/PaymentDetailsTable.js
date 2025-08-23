import React from 'react';
import { Plus } from 'lucide-react';
import PaymentRow from './PaymentRow';
import UploadButton from './UploadButton';
import DownloadTemplateButton from './DownloadTemplateButton';
import { useState } from 'react';
// Payment Details Table Component
const PaymentDetailsTable = ({ rows=[], updateRow, addRow, removeRow, errors, currentPage, totalPages, onPageChange, canAddMore }) => {
  const [hover, setHover] = useState(false);

  return (
    <div className="card shadow-sm">
      <div className="card-header border-bottom">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-3">
            <h3 className="h5 fw-semibold text-dark mb-0">Payment Details</h3>
            <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <DownloadTemplateButton/>
            <UploadButton />
            <button
              onClick={addRow}
              disabled={!canAddMore}
              className={`btn ${canAddMore ? 'btn-primary' : 'btn-secondary'} d-inline-flex align-items-center`}
               onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? "#0D6EFD" : "white",
        borderColor: "#0D6EFD",
        color: hover ? "white" : "#0D6EFD",
        transition: "all 0.2s ease"
      }}
        >
              <Plus className="me-2" style={{ backgroundColor: "", height: '16px'}} />
              Add Payment
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Payment Method
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Payee Details
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Payee Nature
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Bank Details
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Your Reference
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Payment Reference
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Amount
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Notes to Payee
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Additional Notes
              </th>
              <th className="px-3 py-3 text-start small text-uppercase fw-medium text-muted border-bottom">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <PaymentRow
                key={index}
                row={row}
                rowIndex={index}
                updateRow={updateRow}
                removeRow={removeRow}
                errors={errors}
                isOdd={index % 2 === 1}
              />
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="card-footer border-top">
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`btn ${currentPage === 1 ? 'btn-outline-secondary disabled' : 'btn-outline-primary'}`}
            >
              Previous
            </button>
            
            <div className="d-flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`btn ${page === currentPage ? 'btn-primary' : 'btn-outline-primary'}`}
                  style={{width: '40px', height: '40px'}}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`btn ${currentPage === totalPages ? 'btn-outline-secondary disabled' : 'btn-outline-primary'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsTable;