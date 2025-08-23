import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function ViewDrawer({ item, onHide }) {
    const show = !!item;
    if (!show) return null;
    const tx = item;
    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Manual Payroll Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="summary-grid">
                    <div>
                        <div className="label">Payment Reference</div>
                        <div className="value">{tx.id}</div>
                    </div>
                    <div>
                        <div className="label">User Reference</div>
                        <div className="value">{tx.reference}</div>
                    </div>
                    <div>
                        <div className="label">Pay From</div>
                        <div className="value">{tx.payFrom}</div>
                    </div>
                    <div>
                        <div className="label">Pay To</div>
                        <div className="value">{tx.payeeName} — {tx.bank}</div>
                    </div>
                    <div>
                        <div className="label">Payment Date</div>
                        <div className="value">{new Date(tx.date).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <div className="label">Payment Type</div>
                        <div className="value">PAY (Payroll)</div>
                    </div>
                    <div>
                        <div className="label">Gross Amount</div>
                        <div className="value">{tx.currency} {tx.amount.toFixed(2)}</div>
                    </div>
                    <div>
                        <div className="label">Charges To Be Paid By</div>
                        <div className="value">PAYER</div>
                    </div>
                    <div className="full">
                        <div className="label">UTR Number</div>
                        <div className="value">{tx.utr || '—'}</div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}