import React, { useMemo } from "react";
import FilterSections from "./FilterSections";
import BatchTable from "./BatchTable";

import * as XLSX from "xlsx";
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import HeaderRow from "./HeaderRow";

export default function FilterImplementation() {
     const [filters, setFilters] = React.useState({
        searchTerm: "",
        batchId: "",
        paymentPeriod: "",
        amountRange: ""
    });

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(5);

    const batches = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  batchId: `bqjw${i + 1}`,
  batchName: `Batch ${i + 1}`,
  createdBy: i % 2 === 0 ? "Ayush" : "Daksh",
  numPayments: Math.floor(Math.random() * 20) + 1,
  amount: Math.floor(Math.random() * 100000) + 1000,
  currency: i % 3 === 0 ? "INR" : "USD",
  period: i % 2 === 0 ? "Jan 2025" : "Feb 2025",
  executionDate: `2025-0${(i % 9) + 1}-15`,
}));

  const filteredBatches = useMemo(() => {
    return batches.filter((batch) =>{
         const { searchTerm, batchId, paymentPeriod, amountRange } = filters;

         if (
        searchTerm &&
        !(
          batch.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          batch.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
        return false;


      if (batchId && !batch.batchId.toLowerCase().includes(batchId.toLowerCase()))
        return false;


      if (paymentPeriod && !batch.period.toLowerCase().includes(paymentPeriod.toLowerCase()))
        return false;

     
      if (amountRange) {
  const min = parseFloat(amountRange);
  if (!isNaN(min) && batch.amount < min) return false;
}

      return true;
    });
}, [filters, batches]);

  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage);
  const paginatedBatches = filteredBatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const exportAsPdf = () => {
    const doc = new jsPDF();
    doc.text("Batch Report", 14, 10);
    autoTable(doc, {
      head: [["Batch ID", "Name", "Created By", "Payments", "Amount", "Period"]],
      body: filteredBatches.map((b) => [
        b.batchId,
        b.batchName,
        b.createdBy,
        b.numPayments,
        b.amount,
        b.period,
      ]),
    });
    doc.save("batches.pdf");
  };

  const exportAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredBatches);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Batches");
    XLSX.writeFile(workbook, "batches.xlsx");
  };

  const paginationProps = {
    currentPage,
    totalPages,
    setCurrentPage
  };

  return (
    <div>
   
      <HeaderRow exportAsPdf={exportAsPdf} exportAsExcel={exportAsExcel} />


      <FilterSections filters={filters} setFilters={setFilters} />
      <BatchTable batches={paginatedBatches} pagination={paginationProps} />
    </div>
  );
}