import React from 'react';
import { Trash2, Info } from 'lucide-react';
import ValidationMessage from './ValidationMessage';

// Payment Row Component
const PaymentRow = ({ row, rowIndex, updateRow, removeRow, errors, isOdd }) => {
  const paymentMethods = ['', 'Wire Transfer', 'ACH', 'Check', 'Online Transfer'];
  const payeeDetails = ['', 'ABC Corporation Ltd.', 'XYZ Trading Co.', 'Global Services Inc.', 'Tech Solutions LLC'];
  const payeeNatures = ['', 'Corporate', 'Individual', 'Government', 'Non-Profit'];
  const bankDetails = ['', 'Chase Bank - 123456789', 'Bank of America - 987654321', 'Wells Fargo - 456789123'];

  const rowErrors = errors[rowIndex] || {};

  return (
    <tr className={isOdd ? 'table-light' : ''}>
      <td className="px-3 py-3 border-bottom">
        <select
          className={`form-select form-select-sm ${rowErrors.paymentMethod ? 'is-invalid' : ''}`}
          value={row.paymentMethod}
          onChange={(e) => updateRow(rowIndex, 'paymentMethod', e.target.value)}
        >
          {paymentMethods.map((method, index) => (
            <option key={index} value={method}>
              {method || 'Select Method'}
            </option>
          ))}
        </select>
        <ValidationMessage message={rowErrors.paymentMethod} />
      </td>

      <td className="px-3 py-3 border-bottom">
        <select
          className={`form-select form-select-sm ${rowErrors.payeeDetails ? 'is-invalid' : ''}`}
          value={row.payeeDetails}
          onChange={(e) => updateRow(rowIndex, 'payeeDetails', e.target.value)}
        >
          {payeeDetails.map((payee, index) => (
            <option key={index} value={payee}>
              {payee || 'Select Payee'}
            </option>
          ))}
        </select>
        <ValidationMessage message={rowErrors.payeeDetails} />
      </td>

      <td className="px-3 py-3 border-bottom">
        <select
          className={`form-select form-select-sm ${rowErrors.payeeNature ? 'is-invalid' : ''}`}
          value={row.payeeNature}
          onChange={(e) => updateRow(rowIndex, 'payeeNature', e.target.value)}
        >
          {payeeNatures.map((nature, index) => (
            <option key={index} value={nature}>
              {nature || 'Select Nature'}
            </option>
          ))}
        </select>
        <ValidationMessage message={rowErrors.payeeNature} />
      </td>

      <td className="px-3 py-3 border-bottom">
        <select
          className={`form-select form-select-sm ${rowErrors.bankDetails ? 'is-invalid' : ''}`}
          value={row.bankDetails}
          onChange={(e) => updateRow(rowIndex, 'bankDetails', e.target.value)}
        >
          {bankDetails.map((bank, index) => (
            <option key={index} value={bank}>
              {bank || 'Select Bank'}
            </option>
          ))}
        </select>
        <ValidationMessage message={rowErrors.bankDetails} />
      </td>

      <td className="px-3 py-3 border-bottom">
        <div className="d-flex align-items-center">
          <input
            type="text"
            className={`form-control form-control-sm ${rowErrors.yourReference ? 'is-invalid' : ''}`}
            value={row.yourReference}
            onChange={(e) => updateRow(rowIndex, 'yourReference', e.target.value)}
            placeholder="Reference"
          />
          <Info className="ms-2 text-muted" style={{width: '16px', height: '16px'}} title="Your internal reference for this payment" />
        </div>
        <ValidationMessage message={rowErrors.yourReference} />
      </td>

      <td className="px-3 py-3 border-bottom">
        <input
          type="text"
          className={`form-control form-control-sm ${rowErrors.paymentReference ? 'is-invalid' : ''}`}
          value={row.paymentReference}
          onChange={(e) => updateRow(rowIndex, 'paymentReference', e.target.value)}
          placeholder={`Pay ${row.payeeDetails || 'Recipient'}`}
        />
        <ValidationMessage message={rowErrors.paymentReference} />
      </td>

      <td className="px-3 py-3 border-bottom">
        <input
          type="number"
          step="0.01"
          min="0"
          className={`form-control form-control-sm ${rowErrors.amount ? 'is-invalid' : ''}`}
          value={row.amount}
          onChange={(e) => updateRow(rowIndex, 'amount', e.target.value)}
          placeholder="0.00"
        />
        <ValidationMessage message={rowErrors.amount} />
      </td>

      <td className="px-3 py-3 border-bottom">
        <input
          type="text"
          className="form-control form-control-sm"
          value={row.notesToPayee}
          onChange={(e) => updateRow(rowIndex, 'notesToPayee', e.target.value)}
          placeholder="Optional notes"
        />
      </td>

      <td className="px-3 py-3 border-bottom">
        <input
          type="text"
          className="form-control form-control-sm"
          value={row.additionalNotes}
          onChange={(e) => updateRow(rowIndex, 'additionalNotes', e.target.value)}
          placeholder="Additional notes"
        />
      </td>

      <td className="px-3 py-3 border-bottom">
        <button
          onClick={() => removeRow(rowIndex)}
          className="btn btn-outline-danger btn-sm p-1"
          title="Remove row"
        >
          <Trash2 style={{width: '16px', height: '16px'}} />
        </button>
      </td>
    </tr>
  );
};

export default PaymentRow;