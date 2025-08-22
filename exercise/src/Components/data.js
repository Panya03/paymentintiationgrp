export const usersData = [
  {
    name: "Shraddha",
    accounts: [
      { name: "Savings Acc.", number: "XXXX1234", type: "Savings", currency: "USD", balance: 5000, bankingSegment: "Personal Banking" },
      { name: "Checking Acc.", number: "XXXX5678", type: "Checking", currency: "USD", balance: 2300, bankingSegment: "Personal Banking" },
      { name: "NRI Account", number: "XXXX9999", type: "NRI", currency: "INR", balance: 150000, bankingSegment: "NRI Banking" },
    ],
  },
  {
    name: "Virat",
    accounts: [
      { name: "Wealth Savings", number: "XXXX1111", type: "Savings", currency: "USD", balance: 75000, bankingSegment: "Priority Banking" },
      { name: "Wealth Investment", number: "XXXX3333", type: "Investment", currency: "USD", balance: 120000, bankingSegment: "Priority Banking" },
      { name: "Business Account", number: "XXXX2222", type: "Business", currency: "GBP", balance: 50000, bankingSegment: "Business Banking" },
    ],
  },
  {
    name: "Amit",
    accounts: [
      { name: "Personal Savings", number: "XXXX4444", type: "Savings", currency: "EUR", balance: 9000, bankingSegment: "Personal Banking" },
      { name: "Business Checking", number: "XXXX5555", type: "Checking", currency: "USD", balance: 12000, bankingSegment: "Business Banking" },
    ],
  },
];

export const transactionsData = [
  { date: "2025-08-01", description: "ATM Withdrawal", debit: 200, credit: "-", balance: 4800 },
  { date: "2025-07-28", description: "Salary Credit", debit: "-", credit: 3000, balance: 5000 },
  { date: "2025-07-20", description: "Utility Bill Payment", debit: 150, credit: "-", balance: 2000 },
  { date: "2025-07-15", description: "Transfer from John", debit: "-", credit: 800, balance: 2150 },
  { date: "2025-07-10", description: "Online Shopping", debit: 120, credit: "-", balance: 1350 },
  { date: "2025-06-30", description: "Interest Credit", debit: "-", credit: 50, balance: 1400 },
  { date: "2025-06-25", description: "Mobile Recharge", debit: 20, credit: "-", balance: 1350 },
  { date: "2025-06-20", description: "Transfer to Amit", debit: 500, credit: "-", balance: 850 },
  { date: "2025-06-15", description: "Cheque Deposit", debit: "-", credit: 1000, balance: 1850 },
  { date: "2025-06-10", description: "Dining", debit: 60, credit: "-", balance: 1790 },
  { date: "2025-06-05", description: "Business Income", debit: "-", credit: 5000, balance: 6790 },
  { date: "2025-05-30", description: "Travel Expense", debit: 300, credit: "-", balance: 6490 },
  { date: "2025-05-25", description: "Gift Received", debit: "-", credit: 200, balance: 6690 },
  { date: "2025-05-20", description: "Loan EMI", debit: 1000, credit: "-", balance: 5690 },
  { date: "2025-05-15", description: "Transfer from Virat", debit: "-", credit: 1500, balance: 7190 },
];

export const exchangeRates = {
  USD: { rate: 1, symbol: "$" },
  EUR: { rate: 0.92, symbol: "€" },
  GBP: { rate: 0.79, symbol: "£" },
  INR: { rate: 83, symbol: "₹" },
};
