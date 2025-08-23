import React from "react";
import { ArrowLeft, Edit, DollarSign, FileText, Calendar } from "lucide-react";
import StatusChip from "./StatusChip"; // your Bootstrap version

const ViewDraft = ({ draft, onBackToDrafts, onEditDraft }) => {
  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-primary border-bottom px-4 py-3">
        <div className="d-flex align-items-center">
          <button
            onClick={onBackToDrafts}
            className="btn btn-primary me-3 p-2"
            style={{ background: "rgba(255,255,255,0.15)", border: "none" }}
            title="Back"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>

          <div className="d-flex align-items-center">
            <div
              className="bg-white rounded d-flex align-items-center justify-content-center me-3"
              style={{ width: 32, height: 32 }}
            >
              <span className="text-primary fw-bold" style={{ fontSize: 12 }}>
                SC
              </span>
            </div>
            <span className="text-white fw-semibold" style={{ fontSize: 20 }}>
              Standard Chartered
            </span>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <button
                onClick={onBackToDrafts}
                className="btn btn-link p-0 text-decoration-none"
              >
                Payment Instruction Drafts
              </button>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {draft.name}
            </li>
          </ol>
        </nav>

        {/* Draft Header Card */}
        <div className="card shadow-sm border mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="h4 fw-bold text-dark mb-2">{draft.name}</h1>
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <StatusChip status={draft.status} />
                  <span className="text-secondary small">
                    Created: {draft.createdDate}
                  </span>
                  <span className="text-secondary small">
                    Last Modified: {draft.lastModified}
                  </span>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button
                  onClick={() => onEditDraft(draft)}
                  className="btn btn-primary d-inline-flex align-items-center"
                >
                  <Edit size={16} className="me-2" />
                  Edit Draft
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="row g-3 mt-4">
              <div className="col-12 col-md-4">
                <div className="card bg-light h-100">
                  <div className="card-body d-flex align-items-center">
                    <DollarSign size={20} className="text-muted me-2" />
                    <div>
                      <div className="text-secondary small">Total Amount</div>
                      <div className="fs-5 fw-bold text-dark">
                        {draft.currency} {Number(draft.totalAmount).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card bg-light h-100">
                  <div className="card-body d-flex align-items-center">
                    <FileText size={20} className="text-muted me-2" />
                    <div>
                      <div className="text-secondary small">Payment Count</div>
                      <div className="fs-5 fw-bold text-dark">
                        {draft.paymentCount} payment
                        {draft.paymentCount !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card bg-light h-100">
                  <div className="card-body d-flex align-items-center">
                    <Calendar size={20} className="text-muted me-2" />
                    <div>
                      <div className="text-secondary small">Value Date</div>
                      <div className="fs-5 fw-bold text-dark">
                        {draft?.instructionDetails?.valueDate || "Not set"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Summary Cards */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDraft;
