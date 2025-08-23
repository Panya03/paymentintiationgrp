import React, { useEffect, useState } from "react";
import { ArrowLeft, FileText, Calendar, DollarSign, Edit, Trash2, Plus } from "lucide-react";
import { loadDrafts,deleteDraftFromStorage, persistDrafts,saveDraftToStorage } from "../utils/draftUtils";
import Status from "./Status";

const DraftManagement = ({ onEditDraft, onBackToCreate }) => { 
  const [drafts, setDrafts] = useState([]);                   
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  const onDeleteDraft = (id) => {                              
    const updated = deleteDraftFromStorage(id);
    setDrafts(updated);
    setSelectedDrafts(prev => prev.filter(x => x !== id));
  };

  const handleSelectDraft = (draftId) => {
    setSelectedDrafts(prev =>
      prev.includes(draftId) ? prev.filter(id => id !== draftId) : [...prev, draftId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDrafts.length === drafts.length) setSelectedDrafts([]);
    else setSelectedDrafts(drafts.map(d => d.id));
  };

  const handleBulkDelete = () => {
    if (!selectedDrafts.length) return;
    const ok = window.confirm(`Are you sure you want to delete ${selectedDrafts.length} draft(s)?`);
    if (!ok) return;

    // One-pass bulk delete
    const updated = loadDrafts().filter(d => !selectedDrafts.includes(d.id));
    persistDrafts(updated);
    setDrafts(updated);
    setSelectedDrafts([]);
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div
        className="border-bottom px-3 py-3"
        style={{ backgroundColor: "#003865", borderColor: "#002b4e" }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <button
              onClick={onBackToCreate}
              className="btn btn-link text-white me-3 p-2"
              style={{ textDecoration: "none" }}
            >
              <ArrowLeft size={20} />
            </button>

            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center  me-2"
                style={{ width: 32, height: 32 }}
              >
                <img 
  src="/sc-Photoroom.png" 
  alt="SC Logo" 
  className="me-2" 
  style={{ width: "30px", height: "30px", objectFit: "contain" }} 
/>

              </div>
              <span className="fs-5 fw-semibold text-white">Standard Chartered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xxl py-4">
        <div className="mb-3">
          <h1 className="h4 fw-bold text-dark mb-1">Payment Instruction Drafts</h1>
          <p className="text-muted mb-0">Manage your saved payment instruction drafts</p>
        </div>

        {/* Action Bar */}
        <div className="card mb-4">
          <div className="card-body d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedDrafts.length === drafts.length && drafts.length > 0}
                  onChange={handleSelectAll}
                  id="selectAll"
                />
                <label className="form-check-label" htmlFor="selectAll">
                  Select All
                </label>
              </div>
              {selectedDrafts.length > 0 && (
                <span className="text-muted small">
                  {selectedDrafts.length} item(s) selected
                </span>
              )}
            </div>

            <div className="d-flex align-items-center gap-2">
              {selectedDrafts.length > 0 && (
                <button
                  className="btn btn-danger btn-sm d-flex align-items-center"
                  onClick={handleBulkDelete}
                >
                  <Trash2 size={16} className="me-1" />
                  Delete Selected
                </button>
              )}
              <button
                className="btn btn-primary btn-sm d-flex align-items-center"
                onClick={onBackToCreate}
               
      onMouseEnter={() => setHover1(true)}
      onMouseLeave={() => setHover1(false)}
      style={{
        backgroundColor: hover1 ? "#0D6EFD" : "white",
        borderColor: "#0D6EFD",
        color: hover1 ? "white" : "#0D6EFD",
        transition: "all 0.2s ease"
      }}
    >
                <Plus size={16} className="me-1" />
                New Payment Instruction
              </button>
            </div>
          </div>
        </div>

        {/* Drafts Table */}
        <div className="card">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light position-sticky top-0">
                <tr>
                  <th style={{ width: 40 }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedDrafts.length === drafts.length && drafts.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-uppercase text-muted small">Draft Name</th>
                  <th className="text-uppercase text-muted small">Status</th>
                  <th className="text-uppercase text-muted small">Currency</th>
                  <th className="text-uppercase text-muted small">Total Amount</th>
                  <th className="text-uppercase text-muted small">Payments Count</th>
                  <th className="text-uppercase text-muted small">Created Date</th>
                  <th className="text-uppercase text-muted small">Last Modified</th>
                  <th className="text-uppercase text-muted small">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drafts.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
                      <FileText size={48} className="mb-2 opacity-50" />
                      <p className="fs-6 mb-1">No drafts found</p>
                      <p className="small mb-3">
                        Create your first payment instruction to get started
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={onBackToCreate}
                        onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? "#0D6EFD" : "white",
        borderColor: "#0D6EFD",
        color: hover ? "white" : "#0D6EFD",
        transition: "all 0.2s ease"
      }}
    >
                        Create New Payment Instruction
                      </button>
                    </td>
                  </tr>
                ) : (
                  drafts.map((draft) => (
                    <tr key={draft.id}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedDrafts.includes(draft.id)}
                          onChange={() => handleSelectDraft(draft.id)}
                        />
                      </td>

                      <td>
                        <div className="d-flex align-items-center">
                          <FileText size={18} className="me-2 text-secondary" />
                          <div>
                            <div className="fw-semibold text-dark">{draft.name}</div>
                            <div className="small text-muted">{draft.debitAccount}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        
                        <Status status={draft.status} />
                      </td>

                      <td className="fw-semibold text-dark">{draft.currency}</td>

                      <td className="fw-semibold text-dark">
                        <span className="d-inline-flex align-items-center">
                          <DollarSign size={16} className="me-1 text-secondary" />
                          {Number(draft.totalAmount).toFixed(2)}
                        </span>
                      </td>

                      <td className="text-muted">
                        {draft.paymentCount} payment{draft.paymentCount !== 1 ? "s" : ""}
                      </td>

                      <td className="text-muted small">
                        <span className="d-inline-flex align-items-center">
                          <Calendar size={16} className="me-1 text-secondary" />
                          {draft.createdDate}
                        </span>
                      </td>

                      <td className="text-muted small">{draft.lastModified}</td>

                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <button
                            className="btn btn-link p-2 text-primary"
                            title="Edit Draft"
                            onClick={() => onEditDraft(draft)}
                            style={{ color: "#00539B" }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn btn-link p-2 text-danger"
                            title="Delete Draft"
                            onClick={() => {
                              const ok = window.confirm(`Are you sure you want to delete "${draft.name}"?`);
                              if (ok) onDeleteDraft(draft.id);
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DraftManagement;
