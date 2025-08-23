

import React from "react";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
// ✅ Make sure Bootstrap CSS is imported BEFORE your custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentDetailsTable from "./Components/PaymentDetailsTable";
import PaymentForm from "./Components/PaymentForm";

function App() {
  const role = "creator"; // try: creator | manager | approver

  return (
    <Router>
      <div className="app-layout">
         {role !== "batching" && <Sidebar role={role} />}
        
        <Sidebar role={role} />
        <div className="content">
  <div className="container d-flex justify-content-center">
    <div className="col-lg-10">
      <Routes>
        <Route path="/cash/create/payroll" element={<PaymentForm />} />
      </Routes>
    </div>
  </div>
</div>
      </div>
    </Router>



  );
}

{/* import React, { useState, useRef } from 'react';
import CustomPage from './CustomPage';
import SignUpPage from './SignUpPage';
import AccessibilityTools from './AccessibilityTools';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const mainRef = useRef();

  function handleReadout() {
    if (window.speechSynthesis) {
      const text = mainRef.current ? mainRef.current.innerText : document.body.innerText;
      const utter = new window.SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }

  return (
    <>
      <AccessibilityTools onReadout={handleReadout} />
      <div ref={mainRef}>
        {showSignUp ? (
          <SignUpPage onBackToLogin={() => setShowSignUp(false)} />
        ) : (
          <CustomPage onSignUp={() => setShowSignUp(true)} />
        )}
      </div>
    </>
>>>>>>> pavan
*/}




{/*Karthiks component*/}

{/* import "./App.css";
import Header from "./Components/Header";
import AccountTable from "./Components/AccountTable";
import TransactionTable from "./Components/TransactionTable";
import TransactionModal from "./Components/TransactionModal";

import { usersData, exchangeRates } from "./Components/data";
import { handleDownload } from "./utils/downloadUtils";
import useAppState from "./hooks/useAppState"; *

{/* function App() {
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
    */}
 
export default App;
