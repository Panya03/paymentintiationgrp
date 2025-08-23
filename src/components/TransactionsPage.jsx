import React, { useMemo, useState } from 'react';
import { Button, Dropdown, Form, InputGroup, Modal, Table, Badge } from 'react-bootstrap';
import { useAccess } from './Access';
import ViewDrawer from './ViewDrawer';
import { useCurrency } from './Currency';

// CSV helpers (local)
function toCsv(rows, headers) {
    const escapeCell = (v) => {
        if (v === null || v === undefined) return '';
        const s = String(v);
        return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
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

export default function TransactionsPage({ data, preferences = {} }) {
    const { can } = useAccess();
    const { displayCcy, convertFromCny } = useCurrency();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [sortBy, setSortBy] = useState({ key: 'date', dir: 'desc' });
    const [selected, setSelected] = useState(null);
    const [showConfirm, setShowConfirm] = useState(null);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        let rows = (Array.isArray(data) ? data : []).filter(t =>
            [t.id, t.payeeName, t.bank, t.currency, t.reference, t.payFrom]
                .filter(Boolean)
                .some(x => String(x).toLowerCase().includes(q))
        );
        if (statusFilter !== 'ALL') rows = rows.filter(t => t.status === statusFilter);
        rows.sort((a, b) => {
            const { key, dir } = sortBy;
            const va = a[key];
            const vb = b[key];
            if (va < vb) return dir === 'asc' ? -1 : 1;
            if (va > vb) return dir === 'asc' ? 1 : -1;
            return 0;
        });
        return rows;
    }, [data, search, statusFilter, sortBy]);

    function ask(action, tx) {
        setShowConfirm({ action, tx });
    }

    function doAction() {
        if (showConfirm?.action && showConfirm?.tx?.id) {
            const { action, tx } = showConfirm;

            switch (action) {
                case 'Edit':
                    alert(`✏️ Opening editor for transaction ${tx.id}\n\nIn a real application, this would open a form to edit transaction details.`);
                    break;
                case 'Authorize':
                    alert(`✅ Transaction ${tx.id} has been authorized successfully!\n\nThe payment is now approved for processing.`);
                    // In real app: updateTransactionStatus(tx.id, 'AUTHORIZED')
                    break;
                case 'Reject':
                    alert(`❌ Transaction ${tx.id} has been rejected.\n\nReason: Requires additional review.\nThe transaction will be returned to the maker.`);
                    // In real app: updateTransactionStatus(tx.id, 'REJECTED')
                    break;
                case 'Delete':
                    alert(`🗑️ Transaction ${tx.id} has been deleted permanently.\n\nThe payment has been removed from the system.`);
                    // In real app: deleteTransaction(tx.id)
                    break;
                default:
                    alert(`${action} completed for transaction ${tx.id}`);
            }
        }
        setShowConfirm(null);
    }

    function exportCsv() {
        const headers = [
            { key: 'id', label: 'Payment Ref' },
            { key: 'payFrom', label: 'Pay From' },
            { key: 'payeeName', label: 'Pay To' },
            { key: 'bank', label: 'Bank' },
            {
                key: 'amount',
                label: `Gross Amount (${displayCcy})`,
                format: (v) => `'${displayCcy} ${convertFromCny(Number(v), displayCcy).toFixed(2)}`
            },
            {
                key: 'date',
                label: 'Payment Date',
                format: (v) => {
                    const d = new Date(v);
                    if (Number.isNaN(d.getTime())) return '';
                    const y = d.getFullYear();
                    const m = String(d.getMonth() + 1).padStart(2, '0');
                    const day = String(d.getDate()).padStart(2, '0');
                    return `'${y}-${m}-${day}`;
                }
            },
            { key: 'status', label: 'Status' },
            { key: 'reference', label: 'Reference' }
        ];
        const csv = toCsv(filtered, headers);
        const ts = new Date();
        const stamp =
            `${ts.getFullYear()}-${String(ts.getMonth() + 1).padStart(2, '0')}-${String(ts.getDate()).padStart(2, '0')}_` +
            `${String(ts.getHours()).padStart(2, '0')}-${String(ts.getMinutes()).padStart(2, '0')}-${String(ts.getSeconds()).padStart(2, '0')}`;
        downloadText(`transactions_${stamp}.csv`, csv);
        alert(`📊 Transaction list exported successfully!\n\nFile: transactions_${stamp}.csv\nRecords: ${filtered.length}`);
    }

    function createNewTransaction() {
        alert('🆕 Opening new transaction form...\n\nIn a real application, this would open a form to create a new payment transaction.');
    }

    function ActionMenu({ tx }) {
        return (
            <Dropdown align="end">
                <Dropdown.Toggle size="sm" variant="light">⋮</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSelected(tx)}>
                        👁️ View
                    </Dropdown.Item>
                    {can.edit && tx.status === 'DRAFT' && (
                        <Dropdown.Item onClick={() => ask('Edit', tx)}>
                            ✏️ Edit
                        </Dropdown.Item>
                    )}
                    {can.authorize && tx.status === 'PENDING_AUTH' && (
                        <Dropdown.Item onClick={() => ask('Authorize', tx)}>
                            ✅ Authorize
                        </Dropdown.Item>
                    )}
                    {can.reject && tx.status === 'PENDING_AUTH' && (
                        <Dropdown.Item className="text-warning" onClick={() => ask('Reject', tx)}>
                            ❌ Reject
                        </Dropdown.Item>
                    )}
                    {can.delete && tx.status !== 'AUTHORIZED' && (
                        <Dropdown.Item className="text-danger" onClick={() => ask('Delete', tx)}>
                            🗑️ Delete
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    return (
        <>
            <div className="d-flex flex-wrap filters-row mb-2 justify-content-between">
                <div className="d-flex gap-2">
                    <InputGroup>
                        <InputGroup.Text>Search</InputGroup.Text>
                        <Form.Control
                            placeholder="ID, Payee, Bank, Ref..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </InputGroup>
                    <Form.Select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        style={{ maxWidth: 220 }}
                    >
                        <option value="ALL">All statuses</option>
                        <option value="DRAFT">Draft</option>
                        <option value="PENDING_AUTH">Pending Authorization</option>
                        <option value="AUTHORIZED">Authorized</option>
                        <option value="REJECTED">Rejected</option>
                    </Form.Select>
                </div>
                <div className="d-flex gap-2">
                    {can.create && (
                        <Button variant="primary" size="sm" onClick={createNewTransaction}>
                            New Transaction
                        </Button>
                    )}
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
                            <SortableTh label="Payment Ref" k="id" sortBy={sortBy} setSortBy={setSortBy} />
                            <th>Pay From</th>
                            <th>Pay To</th>
                            <th>Bank</th>
                            <th>Gross Amount</th>
                            <SortableTh label="Payment Date" k="date" sortBy={sortBy} setSortBy={setSortBy} />
                            <th>Status</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(tx => (
                            <tr key={tx.id}>
                                <td
                                    className="text-primary text-decoration-underline btn-link"
                                    onClick={() => setSelected(tx)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {tx.id}
                                </td>
                                <td className={preferences.compactView ? 'compact-text' : ''}>
                                    {preferences.compactView
                                        ? tx.payFrom.length > 25 ? tx.payFrom.substring(0, 25) + '...' : tx.payFrom
                                        : tx.payFrom
                                    }
                                </td>
                                <td>{tx.payeeName}</td>
                                <td className={preferences.compactView ? 'compact-text' : ''}>
                                    {preferences.compactView
                                        ? tx.bank.length > 20 ? tx.bank.substring(0, 20) + '...' : tx.bank
                                        : tx.bank
                                    }
                                </td>
                                <td className="money">
                                    {displayCcy} {convertFromCny(tx.amount, displayCcy).toFixed(2)}
                                    {preferences.showOriginalCurrency && displayCcy !== 'CNY' && (
                                        <div className="small-muted">CNY {tx.amount.toFixed(2)}</div>
                                    )}
                                </td>
                                <td>{new Date(tx.date).toLocaleDateString()}</td>
                                <td><StatusBadge status={tx.status} /></td>
                                <td className="text-end"><ActionMenu tx={tx} /></td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center text-muted py-4">
                                    No transactions found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            <div className="mt-3 small text-muted">
                Showing {filtered.length} of {data?.length || 0} transactions
                {preferences.autoRefresh && (
                    <span className="ms-3">
                        🔄 Auto-refresh enabled
                    </span>
                )}
            </div>

            <ViewDrawer item={selected} onHide={() => setSelected(null)} />

            {/* Confirmation modal for transaction actions */}
            <Modal show={!!showConfirm} onHide={() => setShowConfirm(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Confirm {showConfirm?.action}
                        {showConfirm?.action === 'Delete' && <span className="text-danger ms-2">⚠️</span>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showConfirm?.action === 'Edit' && (
                        <div>
                            <p>Open transaction <code>{showConfirm?.tx?.id}</code> for editing?</p>
                            <div className="alert alert-info">
                                <small>
                                    <strong>Transaction Details:</strong>
                                    <ul className="mb-0 mt-1">
                                        <li>Amount: {displayCcy} {convertFromCny(showConfirm?.tx?.amount || 0, displayCcy).toFixed(2)}</li>
                                        <li>Payee: {showConfirm?.tx?.payeeName}</li>
                                        <li>Status: {showConfirm?.tx?.status}</li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                    )}
                    {showConfirm?.action === 'Authorize' && (
                        <div>
                            <p>Are you sure you want to <strong>authorize</strong> transaction <code>{showConfirm?.tx?.id}</code>?</p>
                            <div className="alert alert-success">
                                <small>
                                    <strong>This will:</strong>
                                    <ul className="mb-0 mt-1">
                                        <li>Approve payment of {displayCcy} {convertFromCny(showConfirm?.tx?.amount || 0, displayCcy).toFixed(2)} to {showConfirm?.tx?.payeeName}</li>
                                        <li>Mark transaction as "Authorized"</li>
                                        <li>Allow payment processing to proceed</li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                    )}
                    {showConfirm?.action === 'Reject' && (
                        <div>
                            <p>Are you sure you want to <strong>reject</strong> transaction <code>{showConfirm?.tx?.id}</code>?</p>
                            <div className="alert alert-warning">
                                <small>
                                    <strong>This will:</strong>
                                    <ul className="mb-0 mt-1">
                                        <li>Reject payment of {displayCcy} {convertFromCny(showConfirm?.tx?.amount || 0, displayCcy).toFixed(2)} to {showConfirm?.tx?.payeeName}</li>
                                        <li>Return transaction to maker for review</li>
                                        <li>Prevent payment processing</li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                    )}
                    {showConfirm?.action === 'Delete' && (
                        <div>
                            <p>Are you sure you want to <strong className="text-danger">permanently delete</strong> transaction <code>{showConfirm?.tx?.id}</code>?</p>
                            <div className="alert alert-danger">
                                <small>
                                    <strong>⚠️ This action cannot be undone!</strong>
                                    <ul className="mb-0 mt-1">
                                        <li>Payment of {displayCcy} {convertFromCny(showConfirm?.tx?.amount || 0, displayCcy).toFixed(2)} to {showConfirm?.tx?.payeeName} will be cancelled</li>
                                        <li>Transaction record will be permanently removed</li>
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
                        onClick={doAction}
                    >
                        {showConfirm?.action === 'Delete' && '🗑️ '}
                        {showConfirm?.action === 'Reject' && '❌ '}
                        {showConfirm?.action === 'Authorize' && '✅ '}
                        {showConfirm?.action === 'Edit' && '✏️ '}
                        Yes, {showConfirm?.action}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// Helper Components
function SortableTh({ label, k, sortBy, setSortBy }) {
    const dir = sortBy.key === k ? sortBy.dir : undefined;
    const nextDir = dir === 'asc' ? 'desc' : 'asc';
    return (
        <th role="button" onClick={() => setSortBy({ key: k, dir: nextDir })}>
            <span className="me-1">{label}</span>
            {dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : ''}
        </th>
    );
}

function StatusBadge({ status }) {
    const map = {
        DRAFT: 'secondary',
        PENDING_AUTH: 'warning',
        AUTHORIZED: 'success',
        REJECTED: 'danger'
    };
    return <Badge bg={map[status] || 'secondary'}>{status.replace('_', ' ')}</Badge>;
}
