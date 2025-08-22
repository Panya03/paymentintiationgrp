import React from "react";
function TransactionTable({ selectedAccount, fromDate, toDate, setFromDate, setToDate, filteredTransactions, handleDownload, setModalTx, setShowTxModal }) {
  const [txSearch, setTxSearch] = React.useState("");
  return (
    <div className="transactions">
      <h2>Transactions</h2>
      {selectedAccount ? (
        <>
          <div className="top-bar">
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /> to
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            <button onClick={() => { setFromDate(""); setToDate(""); }}>Clear Dates</button>
            <button onClick={() => handleDownload("csv")}>Download CSV</button>
            <button onClick={() => handleDownload("pdf")}>Download PDF</button>
            <input
              type="text"
              placeholder="Search transactions..."
              value={txSearch}
              onChange={e => setTxSearch(e.target.value)}
              style={{ marginLeft: "1rem" }}
            />
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions().filter(t => t.description.toLowerCase().includes(txSearch.toLowerCase())).length > 0 ? (
                filteredTransactions().filter(t => t.description.toLowerCase().includes(txSearch.toLowerCase())).map((t, index) => (
                  <tr key={index}>
                    <td>{t.date}</td>
                    <td>{t.description}</td>
                    <td style={{ color: t.debit !== "-" ? "green" : undefined }}>{t.debit !== "-" ? `$${t.debit}` : "-"}</td>
                    <td style={{ color: t.credit !== "-" ? "red" : undefined }}>{t.credit !== "-" ? `$${t.credit}` : "-"}</td>
                    <td>{`$${t.balance}`}</td>
                    <td>
                      <button
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        title="View Details"
                        onClick={() => { setModalTx(t); setShowTxModal(true); }}
                      >
                        <span role="img" aria-label="eye">👁️</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ color: "gray", fontStyle: "italic" }}>
                    No transactions found for the selected date range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p style={{ color: "gray", fontStyle: "italic" }}>
          Select an account to view transactions.
        </p>
      )}
    </div>
  );
}

export default TransactionTable;
