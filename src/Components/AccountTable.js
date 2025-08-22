function AccountTable({ filteredAccounts, exchangeRates, currency, setCurrency, setSelectedAccount }) {
  return (
    <div className="account-overview">
      <h2>Account Position</h2>
      <table>
        <thead>
          <tr>
            <th>Account Name</th>
            <th>Account No.</th>
            <th>Type</th>
            <th>Currency</th>
            <th>Balance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.map((acc, index) => (
            <tr key={index}>
              <td>{acc.name}</td>
              <td>{acc.number}</td>
              <td>{acc.type}</td>
              <td>
                <select
                  value={currency[acc.number] || acc.currency}
                  onChange={(e) =>
                    setCurrency({ ...currency, [acc.number]: e.target.value })
                  }
                >
                  {Object.keys(exchangeRates).map(cur => (
                    <option key={cur}>{cur}</option>
                  ))}
                </select>
              </td>
              <td>
                {exchangeRates[currency[acc.number] || acc.currency].symbol}
                {(acc.balance * exchangeRates[currency[acc.number] || acc.currency].rate).toLocaleString()}
              </td>
              <td>
                <button onClick={() => setSelectedAccount(acc)}>View Transactions</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountTable;
