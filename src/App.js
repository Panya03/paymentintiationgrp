import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TransactionsPage from './components/TransactionsPage';
import BatchesPage from './components/BatchesPage';
import { AccessProvider } from './components/Access';
import { CurrencyProvider } from './components/Currency';
import { seedTransactions, seedBatches } from './demoData';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';

export default function App() {
  const [role, setRole] = useState('maker');
  const [globalFilter, setGlobalFilter] = useState(null);
  const [preferences, setPreferences] = useState({
    compactView: false,
    stickyHeaders: true,
    autoRefresh: false,
    showOriginalCurrency: true
  });
  const userId = 'user-123';

  // Auto-refresh functionality
  useEffect(() => {
    if (!preferences.autoRefresh) return;

    const interval = setInterval(() => {
      console.log('Auto-refreshing data...');
      // In real app, you'd refetch data here
      // setData(await fetchLatestData());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [preferences.autoRefresh]);

  const transactions = useMemo(() => {
    let filtered = (Array.isArray(seedTransactions) ? seedTransactions : [])
      .filter(t => t.ownerId === userId);

    // Apply global filters
    if (globalFilter) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      switch (globalFilter) {
        case 'today':
          filtered = filtered.filter(t => {
            const txDate = new Date(t.date);
            return txDate >= today;
          });
          break;
        case 'pending':
          filtered = filtered.filter(t => t.status === 'PENDING_AUTH');
          break;
        case 'completed':
          filtered = filtered.filter(t => {
            const txDate = new Date(t.date);
            return t.status === 'AUTHORIZED' && txDate >= weekAgo;
          });
          break;
        case 'rejected':
          filtered = filtered.filter(t => t.status === 'REJECTED');
          break;
        case 'draft':
          filtered = filtered.filter(t => t.status === 'DRAFT');
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [userId, globalFilter]);

  const batches = useMemo(() => {
    let filtered = (Array.isArray(seedBatches) ? seedBatches : [])
      .filter(b => b.ownerId === userId);

    // Apply global filters to batches
    if (globalFilter) {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      switch (globalFilter) {
        case 'today':
          filtered = filtered.filter(b => {
            const batchDate = new Date(b.createdAt);
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return batchDate >= today;
          });
          break;
        case 'pending':
          filtered = filtered.filter(b => b.status === 'BATCHED');
          break;
        case 'completed':
          filtered = filtered.filter(b => {
            const batchDate = new Date(b.createdAt);
            return b.status === 'AUTHORIZED' && batchDate >= weekAgo;
          });
          break;
        case 'rejected':
          filtered = filtered.filter(b => b.status === 'REJECTED');
          break;
        case 'draft':
          // Batches don't typically have draft status, so empty array
          filtered = [];
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [userId, globalFilter]);

  const handleFilterChange = (filterType) => {
    setGlobalFilter(filterType);
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));

    // Apply preference changes to the DOM
    if (key === 'compactView') {
      document.body.classList.toggle('compact-view', value);
    }
    if (key === 'stickyHeaders') {
      document.body.classList.toggle('no-sticky-headers', !value);
    }
  };

  return (
    <CurrencyProvider>
      <AccessProvider role={role} userId={userId}>
        <Layout
          sidebar={
            <Sidebar
              role={role}
              setRole={setRole}
              onFilterChange={handleFilterChange}
              onPreferenceChange={handlePreferenceChange}
            />
          }
        >
          <div className="page-wrap">
            <div className="card-panel p-3">
              {globalFilter && (
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                  <small>
                    <strong>Active Filter:</strong> {
                      {
                        today: "Today's items",
                        pending: "Pending authorization",
                        completed: "Completed this week",
                        rejected: "Rejected items",
                        draft: "Draft status"
                      }[globalFilter]
                    }
                  </small>
                  <button
                    type="button"
                    className="btn-close btn-close-sm"
                    onClick={() => setGlobalFilter(null)}
                  ></button>
                </div>
              )}

              <Tabs defaultActiveKey="batches" className="mb-3">
                <Tab eventKey="transactions" title={`Transactions (${transactions.length})`}>
                  <TransactionsPage
                    data={transactions}
                    preferences={preferences}
                  />
                </Tab>
                <Tab eventKey="batches" title={`Batches (${batches.length})`}>
                  <BatchesPage
                    data={batches}
                    preferences={preferences}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </Layout>
      </AccessProvider>
    </CurrencyProvider>
  );
}
