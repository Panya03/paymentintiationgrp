import { useState } from "react";
import { transactionsData } from "../Components/data";

export default function useTransactions() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredTransactions = () => {
    return transactionsData.filter(t => {
      const txDate = new Date(t.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || txDate >= from) && (!to || txDate <= to);
    });
  };

  return {
    fromDate, toDate, setFromDate, setToDate,
    filteredTransactions
  };
}
