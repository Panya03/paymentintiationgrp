import React, { useMemo, useState } from 'react';
import { Badge, Button, Dropdown, Form, InputGroup, Table, Modal } from 'react-bootstrap';
import { useAccess } from './Access';
import { useCurrency } from './Currency';
import BatchViewDrawer from './BatchViewDrawer';

// CSV helpers (local)
function toCsv(rows, headers) {
    function escapeCell(v) {
        if (v === null || v === undefined) return '';
        const s = String(v);
        if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
        return s;
    }
    const headerLine = headers.map(h => escapeCell(h.label)).join(',');
    const lines = rows.map(r =>
        headers
            .map(h => {
                const raw = typeof h.format === 'function' ? h.format(r[h.key], r) : r[h.key];
                return escapeCell(raw);
            })
            .join(',')
    );
    return [headerLine, ...lines].join('\n');
}

function downloadText(filename, text) {
    const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

export default function BatchesPage({ data, preferences = {} }) {
    const { can } = useAccess();
    const { displayCcy, convertFromCny } = useCurrency();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [showConfirm, setShowConfirm] = useState(null); // { action, batch }

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        let rows = (Array.isArray(data) ? data : []).filter(b =>
            [b.id, b.createdBy, b.status]
                .filter(Boolean)
                .some(x => String(x).toLowerCase().includes(q))
        );
        if (statusFilter !== 'ALL') rows = rows.filter(b => b.status === statusFilter);
        return rows;
    }, [data, search, statusFilter]);

    function exportCsv() {
        const headers = [
            { key: 'id', label: 'Batch Reference' },
            { key: 'createdBy', label: 'Batched By' },
            {
                key: 'createdAt',
                label: 'Batched On',
                format: (v) => {
                    const d = new Date(v);
                    if (Number.isNaN(d.getTime())) return '';
                    const y = d.getFullYear();
                    const m = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    const hh = String(d.getHours()).padStart(2, '0');
                    const mm = String(d.getMinutes()).padStart(2, '0');
                    const ss = String(d.getSeconds()).padStart(2, '0');
                    return `'${y}-${m}-${day} ${hh}:${mm}:${ss}`;
                }
            },
            { key: 'count', label: '# Payments' },
            {
                key: 'largest',
                label: `Largest Amt (${displayCcy})`,
                format: (v) => `'${displayCcy} ${convertFromCny(Number(v), displayCcy).toFixed(2)}`
            },
            {
                key: 'total',
                label: `Total Debit (${displayCcy})`,
                format: (v) => `'${displayCcy} ${convertFromCny(Number(v), displayCcy).toFixed(2)}`
            },
            {
                key: 'status',
                label: 'Batch Status',
                format: (v) => {
                    const map = {
                        BATCHED: 'Batched for Authorization',
                        AUTHORIZED: 'Batch Fully Authorized',
                        REJECTED: 'Batch Rejected by Authorizer'
                    };
                    return map[v] || v;
                }
            }
        ];
        const csv = toCsv(filtered, headers);
        const ts = new Date();
        const stamp =
            `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(2, '0')}-${String(ts.getDate()).padStart(2, '0')}_` +
            `${String(ts.getHours()).padStart(2, '0')}-${String(ts.getMinutes()).padStart(2, '0')}-${String(ts.getSeconds()).padStart(2, '0')}`;
        downloadText(`batches_${stamp}.csv`, csv);
    }

    // Action handlers
    function askAction(action, batch) {
        setShowConfirm({ action, batch });
    }

    function doBatchAction() {
        const { action, batch } = showConfirm;

        switch (action) {
            case 'Authorize':
                alert(`✅ Batch ${batch.id} has been authorized successfully!\n\nAll ${batch.count} transactions in this batch are now approved for processing.`);
                // In real app: updateBatchStatus(batch.id, 'AUTHORIZED')
                break;
            case 'Reject':
                alert(`❌ Batch ${batch.id} has been rejected.\n\nReason: Pending review and correction.\nThe batch will be returned to the maker.`);
                // In real app: updateBatchStatus(batch.id, 'REJECTED')
                break;
            case 'Delete':
                alert(`🗑️ Batch ${batch.id} has been deleted.\n\nAll transactions in this batch have been removed from the system.`);
                // In real app: deleteBatch(batch.id)
                break;
            default:
                alert(`${action} completed for batch ${batch.id}`);
        }

        setShowConfirm(null);
    }

    function downloadBatchReport(batch) {
        // Generate a detailed CSV report for this specific batch
        const reportData = [
            {
                'Batch Reference': batch.id,
                'Created By': batch.createdBy,
                'Created On': new Date(batch.createdAt).toLocaleString(),
                'Number of Payments': batch.count,
                'Status': batch.status,
                'Original Currency': batch.currency,
                'Largest Payment': `${batch.currency} ${batch.largest.toFixed(2)}`,
                'Total Amount': `${batch.currency} ${batch.total.toFixed(2)}`,
                'Average Payment': `${batch.currency} ${(batch.total / batch.count).toFixed(2)}`
            }
        ];

        const headers = [
            { key: 'Batch Reference', label: 'Batch Reference' },
            { key: 'Created By', label: 'Created By' },
            { key: 'Created On', label: 'Created On' },
            { key: 'Number of Payments', label: 'Number of Payments' },
            { key: 'Status', label: 'Status' },
            { key: 'Original Currency', label: 'Original Currency' },
            { key: 'Largest Payment', label: 'Largest Payment' },
            { key: 'Total Amount', label: 'Total Amount' },
            { key: 'Average Payment', label: 'Average Payment' }
        ];

        const csv = toCsv(reportData, headers);
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        downloadText(`batch_report_${batch.id}_${timestamp}.csv`, csv);

        // Show success message
        alert(`📊 Batch report for ${batch.id} has been downloaded successfully!`);
    }

    function ActionMenu({ batch }) {
        return (
            <Dropdown align="end">
                <Dropdown.Toggle size="sm" variant="light">⋮</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelectedBatch(batch)}>
                        👁️ View Batch
                    </Dropdown.Item>
                    {can.authorize && batch.status === 'BATCHED' && (
                        <Dropdown.Item onClick={() => askAction('Authorize', batch)}>
                            ✅ Authorize Batch
                        </Dropdown.Item>
                    )}
                    {can.reject && batch.status === 'BATCHED' && (
                        <Dropdown.Item
                            className="text-warning"
                            onClick={() => askAction('Reject', batch)}
                        >
                            ❌ Reject Batch
                        </Dropdown.Item>
                    )}
                    {can.delete && batch.status !== 'AUTHORIZED' && (
                        <Dropdown.Item
                            className="text-danger"
                            onClick={() => askAction('Delete', batch)}
                        >
                            🗑️ Delete Batch
                        </Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => downloadBatchReport(batch)}>
                        📊 Download Report
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    return (
        <>
            <div className="d-flex flex-wrap filters-row mb-2 justify-content-between">
                <InputGroup>
                    <InputGroup.Text>Search</InputGroup.Text>
                    <Form.Control
                        placeholder="Batch ref, created by..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </InputGroup>
                <div className="d-flex gap-2">
                    <Form.Select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        style={{ maxWidth: 260 }}
                    >
                        <option value="ALL">All statuses</option>
                        <option value="BATCHED">Batched for Authorization</option>
                        <option value="AUTHORIZED">Batch Fully Authorized</option>
                        <option value="REJECTED">Batch Rejected by Authorizer</option>
                    </Form.Select>
                    {can.export && (
                        <Button variant="outline-secondary" size="sm" onClick={exportCsv}>
                            Export List
                        </Button>
                    )}
                </div>
            </div>

            <div className="table-scroll">
                <Table
                    hover
                    responsive
                    size={preferences.compactView ? "sm" : undefined}
                    className={`align-middle ${preferences.compactView ? 'table-compact' : ''}`}
                >
                    <thead className={`table-light ${!preferences.stickyHeaders ? 'position-static' : ''}`}>
                        <tr>
                            <th>Batch Reference & Name</th>
                            <th>Batched by & On</th>
                            <th className="text-center"># Payments</th>
                            <th className="text-end">Largest Amt</th>
                            <th className="text-end">Total Debit</th>
                            <th>Batch Status</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(b => (
                            <tr key={b.id}>
                                <td
                                    className="text-primary fw-medium text-decoration-underline btn-link"
                                    onClick={() => setSelectedBatch(b)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {b.id}
                                </td>
                                <td>
                                    <div className="fw-medium">{b.createdBy}</div>
                                    <div className={`text-muted ${preferences.compactView ? 'small' : 'small'}`}>
                                        {preferences.compactView
                                            ? new Date(b.createdAt).toLocaleDateString()
                                            : new Date(b.createdAt).toLocaleString()
                                        }
                                    </div>
                                </td>
                                <td className="text-center">
                                    <Badge bg="info" pill>{b.count}</Badge>
                                </td>
                                <td className="money">
                                    {displayCcy} {convertFromCny(Number(b.largest), displayCcy).toFixed(2)}
                                    {preferences.showOriginalCurrency && displayCcy !== 'CNY' && (
                                        <div className="small-muted">CNY {Number(b.largest).toFixed(2)}</div>
                                    )}
                                </td>
                                <td className="money">
                                    <div className="fw-medium">
                                        {displayCcy} {convertFromCny(Number(b.total), displayCcy).toFixed(2)}
                                    </div>
                                    {preferences.showOriginalCurrency && displayCcy !== 'CNY' && (
                                        <div className="small-muted">CNY {Number(b.total).toFixed(2)}</div>
                                    )}
                                </td>
                                <td><BatchBadge status={b.status} /></td>
                                <td className="text-end"><ActionMenu batch={b} /></td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center text-muted py-4">
                                    No batches found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <div className="mt-3 small text-muted">
                Showing {filtered.length} of {data?.length || 0} batches
                {preferences.autoRefresh && (
                    <span className="ms-3">
                        🔄 Auto-refresh enabled
                    </span>
                )}
            </div>

            {/* Batch details modal */}
            <BatchViewDrawer
                item={selectedBatch}
                onHide={() => setSelectedBatch(null)}
            />

            {/* Confirmation modal for batch actions */}
            <Modal show={!!showConfirm} onHide={() => setShowConfirm(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Confirm {showConfirm?.action}
                        {showConfirm?.action === 'Delete' && <span className="text-danger ms-2">⚠️</span>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showConfirm?.action === 'Authorize' && (
                        <div>
                            <p>Are you sure you want to <strong>authorize</strong> batch <code>{showConfirm?.batch?.id}</code>?</p>
                            <div className="alert alert-info">
                                <small>
                                    <strong>This will:</strong>
                                    <ul className="mb-0 mt-1">
                                        <li>Approve all {showConfirm?.batch?.count} transactions in this batch</li>
                                        <li>Process payments totaling {displayCcy} {convertFromCny(showConfirm?.batch?.total || 0, displayCcy).toFixed(2)}</li>
                                        <li>Mark the batch as "Fully Authorized"</li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                    )}
                    {showConfirm?.action === 'Reject' && (
                        <div>
                            <p>Are you sure you want to <strong>reject</strong> batch <code>{showConfirm?.batch?.id}</code>?</p>
                            <div className="alert alert-warning">
                                <small>
                                    <strong>This will:</strong>
                                    <ul className="mb-0 mt-1">
                                        <li>Reject all {showConfirm?.batch?.count} transactions in this batch</li>
                                        <li>Return the batch to the maker for review</li>
                                        <li>Prevent payment processing until corrections are made</li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                    )}
                    {showConfirm?.action === 'Delete' && (
                        <div>
                            <p>Are you sure you want to <strong className="text-danger">permanently delete</strong> batch <code>{showConfirm?.batch?.id}</code>?</p>
                            <div className="alert alert-danger">
                                <small>
                                    <strong>⚠️ This action cannot be undone!</strong>
                                    <ul className="mb-0 mt-1">
                                        <li>All {showConfirm?.batch?.count} transactions will be removed</li>
                                        <li>Payment data totaling {displayCcy} {convertFromCny(showConfirm?.batch?.total || 0, displayCcy).toFixed(2)} will be lost</li>
                                        <li>This action is irreversible</li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(null)}>
                        Cancel
                    </Button>
                    <Button
                        variant={
                            showConfirm?.action === 'Delete' ? 'danger' :
                                showConfirm?.action === 'Reject' ? 'warning' :
                                    'primary'
                        }
                        onClick={doBatchAction}
                    >
                        {showConfirm?.action === 'Delete' && '🗑️ '}
                        {showConfirm?.action === 'Reject' && '❌ '}
                        {showConfirm?.action === 'Authorize' && '✅ '}
                        Yes, {showConfirm?.action}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function BatchBadge({ status }) {
    const map = {
        BATCHED: { variant: 'warning', text: 'Batched for Authorization' },
        AUTHORIZED: { variant: 'success', text: 'Batch Fully Authorized' },
        REJECTED: { variant: 'danger', text: 'Batch Rejected by Authorizer' }
    };
    const { variant, text } = map[status] || { variant: 'secondary', text: status };
    return <Badge bg={variant}>{text}</Badge>;
}
