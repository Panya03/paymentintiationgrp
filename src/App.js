import "./App.css";
import Header from "./Components/Header";
import AccountTable from "./Components/AccountTable";
import TransactionTable from "./Components/TransactionTable";
import TransactionModal from "./Components/TransactionModal";

import { usersData, exchangeRates } from "./Components/data";
import { handleDownload } from "./utils/downloadUtils";
import useAppState from "./hooks/useAppState";

function App() {
  const {
    selectedAccount, setSelectedAccount,
    search, setSearch,
    bankingType, setBankingType,
    showTxModal, setShowTxModal,
    modalTx, setModalTx,
    currency, setCurrency,
    currentUser, switchUser,
    fromDate, toDate, setFromDate, setToDate,
    filteredTransactions, filteredAccounts
  } = useAppState();

  return (
    <div className="app">
      <Header
        bankingType={bankingType}
        setBankingType={setBankingType}
        search={search}
        setSearch={setSearch}
        currentUser={currentUser}
        usersData={usersData}
        switchUser={switchUser}
        setSelectedAccount={setSelectedAccount}
        setShowTxModal={setShowTxModal}
      />

      <AccountTable
        filteredAccounts={filteredAccounts}
        exchangeRates={exchangeRates}
        currency={currency}
        setCurrency={setCurrency}
        setSelectedAccount={setSelectedAccount}
      />

      <TransactionTable
        selectedAccount={selectedAccount}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        filteredTransactions={filteredTransactions}
        handleDownload={(type) => handleDownload(type, filteredTransactions)}
        setModalTx={setModalTx}
        setShowTxModal={setShowTxModal}
      />

      {showTxModal && modalTx && (
        <TransactionModal modalTx={modalTx} setShowTxModal={setShowTxModal} />
      )}
    </div>
  );
}

export default App;
