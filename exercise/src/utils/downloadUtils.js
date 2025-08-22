export const handleDownload = (type, filteredTransactions) => {
  let content = "Date,Description,Debit,Credit,Balance\n";
  filteredTransactions().forEach(t => {
    content += `${t.date},${t.description},${t.debit},${t.credit},${t.balance}\n`;
  });

  if (type === "pdf") {
    import("jspdf").then(jsPDFModule => {
      const jsPDF = jsPDFModule.default;
      const doc = new jsPDF();
      doc.text("Date, Description, Debit, Credit, Balance", 10, 10);
      let y = 20;
      filteredTransactions().forEach(t => {
        doc.text(`${t.date}, ${t.description}, ${t.debit}, ${t.credit}, ${t.balance}`, 10, y);
        y += 10;
      });
      doc.save("statement.pdf");
    });
  } else {
    const blob = new Blob([content], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "statement.csv";
    link.click();
  }
};
