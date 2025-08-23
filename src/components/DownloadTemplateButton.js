import React from "react";
import { Download } from "lucide-react";

const columns = [
  { header: "payment_method", example: "NEFT|RTGS|IMPS|SWIFT" },
  { header: "payee_name", example: "John Doe" },
  { header: "payee_nature", example: "Vendor|Employee|Contractor" },
  { header: "bank_name", example: "HDFC Bank" },
  { header: "account_number", example: "1234567890" },
  { header: "ifsc_or_swift", example: "HDFC0001234|ABCDUS33" },
  { header: "your_reference", example: "INV-2025-001" },
  { header: "payment_reference", example: "Salary May" },
  { header: "amount", example: "2500.00" },
  { header: "currency", example: "INR" },
  { header: "notes_to_payee", example: "" },
  { header: "additional_notes", example: "" },
];

export default function DownloadTemplateButton() {
  const handleDownload = () => {
    
    const header = columns.map(c => c.header).join(",");
    const example = columns.map(c => `"${c.example}"`).join(",");
    const csv = "\uFEFF" + header + "\n" + example + "\n"; 

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "payment-details-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="btn btn-outline-primary d-inline-flex align-items-center me-2"
      title="Download CSV template for bulk upload"
    >
      <Download size={16} className="me-2" />
      Download template
    </button>
  );
}
