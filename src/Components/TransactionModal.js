function TransactionModal({ modalTx, setShowTxModal }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
    }} onClick={() => setShowTxModal(false)}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        minWidth: "300px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        position: "relative"
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>Transaction Details</h3>
        <p><strong>Date:</strong> {modalTx.date}</p>
        <p><strong>Description:</strong> {modalTx.description}</p>
        <p><strong>Debit:</strong> {modalTx.debit !== "-" ? `$${modalTx.debit}` : "-"}</p>
        <p><strong>Credit:</strong> {modalTx.credit !== "-" ? `$${modalTx.credit}` : "-"}</p>
        <p><strong>Balance:</strong> {`$${modalTx.balance}`}</p>
        <button style={{ position: "absolute", top: 10, right: 10 }} onClick={() => setShowTxModal(false)}>Close</button>
      </div>
    </div>
  );
}

export default TransactionModal;
