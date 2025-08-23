import React from 'react';
import ValidationMessage from './ValidationMessage';

// Instruction Details Component
const InstructionDetails = ({ instructionDetails, updateInstructionDetails, errors }) => {
  const currencies = ['', 'USD', 'EUR', 'GBP', 'SGD', 'HKD', 'JPY'];
  const debitAccounts = ['', '1234567890 - USD Operating Account', '0987654321 - EUR Business Account', '1122334455 - GBP Current Account'];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="h5 fw-semibold text-dark mb-4">Instruction Details</h3>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-medium text-dark mb-1">
              Payment Currency *
            </label>
            <select
              className={`form-select ${errors.paymentCurrency ? 'is-invalid' : ''}`}
              value={instructionDetails.paymentCurrency}
              onChange={(e) => updateInstructionDetails('paymentCurrency', e.target.value)}
            >
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency || 'Select Currency'}
                </option>
              ))}
            </select>
            <ValidationMessage message={errors.paymentCurrency} />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-medium text-dark mb-1">
              Debit Account *
            </label>
            <select
              className={`form-select ${errors.debitAccount ? 'is-invalid' : ''}`}
              value={instructionDetails.debitAccount}
              onChange={(e) => updateInstructionDetails('debitAccount', e.target.value)}
            >
              {debitAccounts.map((account, index) => (
                <option key={index} value={account}>
                  {account || 'Choose a debit account'}
                </option>
              ))}
            </select>
            <ValidationMessage message={errors.debitAccount} />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-medium text-dark mb-1">
              Value Date *
            </label>
            <input
              type="date"
              className={`form-control ${errors.valueDate ? 'is-invalid' : ''}`}
              value={instructionDetails.valueDate}
              onChange={(e) => updateInstructionDetails('valueDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            <ValidationMessage message={errors.valueDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionDetails;