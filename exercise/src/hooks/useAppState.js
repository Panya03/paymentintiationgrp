import { useState } from "react";
import { usersData } from "../Components/data";
import useTransactions from "./useTransactions";

function useAppState() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [search, setSearch] = useState("");
  const [bankingType, setBankingType] = useState("Personal Banking");
  const [showTxModal, setShowTxModal] = useState(false);
  const [modalTx, setModalTx] = useState(null);
  const [currency, setCurrency] = useState({});
  const [currentUser, setCurrentUser] = useState(usersData[0]);

  const { fromDate, toDate, setFromDate, setToDate, filteredTransactions } = useTransactions();

  const filteredAccounts = currentUser.accounts
    .filter(acc => acc.bankingSegment === bankingType)
    .filter(acc => acc.name.toLowerCase().includes(search.toLowerCase()));

  const switchUser = (user) => {
    setCurrentUser(user);
    setSelectedAccount(null);
  };

  return {
    selectedAccount, setSelectedAccount,
    search, setSearch,
    bankingType, setBankingType,
    showTxModal, setShowTxModal,
    modalTx, setModalTx,
    currency, setCurrency,
    currentUser, setCurrentUser,
    fromDate, toDate, setFromDate, setToDate, filteredTransactions,
    filteredAccounts,
    switchUser
  };
}

export default useAppState;
