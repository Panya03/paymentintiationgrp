import React from 'react';
import { Button, Modal, Badge } from 'react-bootstrap';
import { useCurrency } from './Currency';

export default function BatchViewDrawer({ item, onHide }) {
    const { displayCcy, convertFromCny } = useCurrency();
    const show = !!item;
    if (!show) return null;

    const batch = item;

    const statusMap = {
        BATCHED: { variant: 'warning', text: 'Batched for Authorization' },
        AUTHORIZED: { variant: 'success', text: 'Batch Fully Authorized' },
        REJECTED: { variant: 'danger', text: 'Batch Rejected by Authorizer' }
    };

    const statusInfo = statusMap[batch.status] || { variant: 'secondary', text: batch.status };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    Batch Payment Summary
                    <Badge bg={statusInfo.variant} className="ms-2">
                        {statusInfo.text}
                    </Badge>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="summary-grid">
                    <div>
                        <div className="label">Batch Reference</div>
                        <div className="value">{batch.id}</div>
                    </div>
                    <div>
                        <div className="label">Created By</div>
                        <div className="value">{batch.createdBy}</div>
                    </div>
                    <div>
                        <div className="label">Created On</div>
                        <div className="value">{new Date(batch.createdAt).toLocaleString()}</div>
                    </div>
                    <div>
                        <div className="label">Batch Status</div>
                        <div className="value">
                            <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>
                        </div>
                    </div>
                    <div>
                        <div className="label">Number of Payments</div>
                        <div className="value">
                            <Badge bg="info" pill className="fs-6">{batch.count}</Badge>
                            <span className="ms-2 text-muted">transactions</span>
                        </div>
                    </div>
                    <div>
                        <div className="label">Original Currency</div>
                        <div className="value">{batch.currency}</div>
                    </div>
                    <div>
                        <div className="label">Largest Payment</div>
                        <div className="value">
                            <div className="fw-bold">
                                {displayCcy} {convertFromCny(batch.largest, displayCcy).toFixed(2)}
                            </div>
                            {displayCcy !== 'CNY' && (
                                <div className="small text-muted">Original: CNY {batch.largest.toFixed(2)}</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="label">Total Debit Amount</div>
                        <div className="value">
                            <div className="fw-bold text-primary fs-5">
                                {displayCcy} {convertFromCny(batch.total, displayCcy).toFixed(2)}
                            </div>
                            {displayCcy !== 'CNY' && (
                                <div className="small text-muted">Original: CNY {batch.total.toFixed(2)}</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="label">Average Payment</div>
                        <div className="value">
                            <div className="fw-bold">
                                {displayCcy} {convertFromCny(batch.total / batch.count, displayCcy).toFixed(2)}
                            </div>
                            {displayCcy !== 'CNY' && (
                                <div className="small text-muted">
                                    Original: CNY {(batch.total / batch.count).toFixed(2)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Full width sections */}
                    <div className="full">
                        <div className="label">Batch Summary</div>
                        <div className="value">
                            This batch contains <strong>{batch.count}</strong> payment transactions
                            with a total value of <strong>{displayCcy} {convertFromCny(batch.total, displayCcy).toFixed(2)}</strong>.
                            {batch.status === 'AUTHORIZED' && ' All payments have been processed and authorized.'}
                            {batch.status === 'BATCHED' && ' This batch is pending authorization.'}
                            {batch.status === 'REJECTED' && ' This batch has been rejected and requires review.'}
                        </div>
                    </div>

                    {batch.status === 'AUTHORIZED' && (
                        <div className="full">
                            <div className="label">Processing Information</div>
                            <div className="value">
                                <div className="row">
                                    <div className="col-6">
                                        <small className="text-muted">Authorized On:</small>
                                        <div>{new Date(batch.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted">Batch ID:</small>
                                        <div className="font-monospace">{batch.id}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="me-auto small text-muted">
                    Batch created {new Date(batch.createdAt).toLocaleDateString()} by {batch.createdBy}
                </div>
                <Button variant="outline-primary" size="sm">
                    View Transactions
                </Button>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
