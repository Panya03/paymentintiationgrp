import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useCurrency } from './Currency';
// import { useAccess } from './Access';

export default function Sidebar({ role, setRole, onFilterChange, onPreferenceChange }) {
    const { displayCcy, setDisplayCcy } = useCurrency();
    // const { can } = useAccess();
    const [activeFilter, setActiveFilter] = useState(null);
    const [preferences, setPreferences] = useState({
        compactView: false,
        stickyHeaders: true,
        autoRefresh: false,
        showOriginalCurrency: true
    });

    const handleFilterClick = (filterType) => {
        const newFilter = activeFilter === filterType ? null : filterType;
        setActiveFilter(newFilter);
        onFilterChange?.(newFilter);
    };

    const handlePreferenceChange = (key) => {
        const newPreferences = { ...preferences, [key]: !preferences[key] };
        setPreferences(newPreferences);
        onPreferenceChange?.(key, newPreferences[key]);
    };

    const filterOptions = [
        { key: 'today', label: '📅 Today\'s Transactions', icon: '📅' },
        { key: 'pending', label: '⏳ Pending Authorization', icon: '⏳' },
        { key: 'completed', label: '✅ Completed This Week', icon: '✅' },
        { key: 'rejected', label: '❌ Rejected Items', icon: '❌' },
        { key: 'draft', label: '🔄 Draft Status', icon: '🔄' }
    ];

    return (
        <>
            <div className="sidebar-content">
                {/* Brand section with logo */}
                <div className="sidebar-brand">
                    <div className="brand-logo">
                        <img
                            src="/Standard_Chartered.png"
                            alt="Standard Chartered"
                            className="logo-image"
                            onError={(e) => {
                                // Fallback to text if image fails to load
                                e.target.style.display = 'none';
                                e.target.nextElementSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback text logo */}
                        <div className="logo-fallback" style={{ display: 'none' }}>SC</div>
                    </div>
                    <div className="brand-text">
                        <div className="brand-title">Standard Chartered</div>
                        <div className="brand-subtitle">Payroll Console</div>
                    </div>
                </div>


                {/* Rest of your sidebar content remains the same */}
                <div className="sidebar-section">
                    <div className="section-title">
                        <i className="me-2">👤</i>Session
                    </div>

                    <div className="form-group">
                        <label className="form-label">User Role</label>
                        <select
                            className="form-select form-select-sm"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="viewer">👁️ Viewer</option>
                            <option value="maker">✏️ Maker</option>
                            <option value="checker">✅ Checker</option>
                            <option value="admin">⚡ Admin</option>
                        </select>
                        <div className="form-text">
                            Current permissions: <Badge bg="secondary" className="ms-1">{role}</Badge>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Display Currency</label>
                        <select
                            className="form-select form-select-sm"
                            value={displayCcy}
                            onChange={e => setDisplayCcy(e.target.value)}
                        >
                            <option value="CNY">🇨🇳 Chinese Yuan (CNY)</option>
                            <option value="USD">🇺🇸 US Dollar (USD)</option>
                            <option value="INR">🇮🇳 Indian Rupee (INR)</option>
                        </select>
                    </div>
                </div>

                {/* Quick filters section */}
                <div className="sidebar-section">
                    <div className="section-title">
                        <i className="me-2">🔍</i>Quick Filters
                        {activeFilter && (
                            <button
                                className="btn btn-link btn-sm p-0 ms-auto text-muted"
                                onClick={() => handleFilterClick(null)}
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="d-grid gap-1">
                        {filterOptions.map(filter => (
                            <button
                                key={filter.key}
                                className={`btn btn-sm text-start ${activeFilter === filter.key ? 'btn-primary' : 'btn-outline-secondary'
                                    }`}
                                onClick={() => handleFilterClick(filter.key)}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Preferences section */}
                <div className="sidebar-section">
                    <div className="section-title">
                        <i className="me-2">⚙️</i>Display Preferences
                    </div>

                    <div className="preferences-list">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="pref-compact"
                                checked={preferences.compactView}
                                onChange={() => handlePreferenceChange('compactView')}
                            />
                            <label className="form-check-label" htmlFor="pref-compact">
                                Compact table rows
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="pref-sticky"
                                checked={preferences.stickyHeaders}
                                onChange={() => handlePreferenceChange('stickyHeaders')}
                            />
                            <label className="form-check-label" htmlFor="pref-sticky">
                                Sticky table headers
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="pref-auto-refresh"
                                checked={preferences.autoRefresh}
                                onChange={() => handlePreferenceChange('autoRefresh')}
                            />
                            <label className="form-check-label" htmlFor="pref-auto-refresh">
                                Auto-refresh data (30s)
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="pref-original-currency"
                                checked={preferences.showOriginalCurrency}
                                onChange={() => handlePreferenceChange('showOriginalCurrency')}
                            />
                            <label className="form-check-label" htmlFor="pref-original-currency">
                                Show original currency
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer section */}
                <div className="sidebar-footer">
                    <div className="d-grid gap-1">
                        <button
                            className="btn btn-link btn-sm p-1"
                            onClick={() => window.open('https://example.com/help', '_blank')}
                        >
                            📖 Help & Documentation
                        </button>
                        <button
                            className="btn btn-link btn-sm p-1"
                            onClick={() => window.open('mailto:support@company.com?subject=Payroll Issue', '_blank')}
                        >
                            🐛 Report Issue
                        </button>
                        <button
                            className="btn btn-link btn-sm p-1"
                            onClick={() => alert('Support chat would open here')}
                        >
                            💬 Support Chat
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
