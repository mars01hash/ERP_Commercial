"use client";

import { useState } from "react";
import { CommercialExpenseItem } from "../types/commercial";

interface ExpensesClaimsViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialExpenses: CommercialExpenseItem[] = [
  {
    id: "EXP-2026-9012",
    voucherNo: "VCH-FRT-0041",
    expenseCategory: "Ocean Freight",
    vendorParty: "Kuehne+Nagel Bangladesh",
    linkedRefNo: "BKG-2026-0204 (1×40HC)",
    amountUsd: 2850,
    amountBdt: 337725,
    approvalStatus: "Approved",
    paymentStatus: "Paid",
    dueDate: "2026-08-15",
  },
  {
    id: "EXP-2026-9018",
    voucherNo: "VCH-CF-0089",
    expenseCategory: "C&F Agency Fees",
    vendorParty: "M/S Bengal Clearing Agency",
    linkedRefNo: "IMP-2026-0094 (Bill C-181092)",
    amountUsd: 0,
    amountBdt: 48500,
    approvalStatus: "Approved",
    paymentStatus: "Pending Settlement",
    dueDate: "2026-08-20",
  },
  {
    id: "EXP-2026-9022",
    voucherNo: "VCH-DEM-0012",
    expenseCategory: "Port Demurrage",
    vendorParty: "Chittagong Port Authority",
    linkedRefNo: "IMP-2026-0091 (Air Cargo DAC)",
    amountUsd: 0,
    amountBdt: 115200,
    approvalStatus: "Approved",
    paymentStatus: "Pending Settlement",
    dueDate: "2026-08-14",
  },
  {
    id: "EXP-2026-9030",
    voucherNo: "CLM-DISP-004",
    expenseCategory: "Dispute Claim",
    vendorParty: "H&M Hennes & Mauritz",
    linkedRefNo: "EXP-2026-0138 (Carton Shortage)",
    amountUsd: 1450,
    amountBdt: 171825,
    approvalStatus: "Under Dispute",
    paymentStatus: "Overdue",
    dueDate: "2026-08-01",
  },
];

export default function ExpensesClaimsView({ notify, setModal }: ExpensesClaimsViewProps) {
  const [expenses] = useState<CommercialExpenseItem[]>(initialExpenses);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const filtered = expenses.filter(
    (e) => filterCategory === "All" || e.expenseCategory === filterCategory
  );

  const totalUsd = expenses.reduce((acc, curr) => acc + curr.amountUsd, 0);
  const totalBdt = expenses.reduce((acc, curr) => acc + curr.amountBdt, 0);

  return (
    <div className="expenses-claims-module space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="panel p-5 bg-gradient-to-br from-white via-sky-50/50 to-white border border-sky-100 flex flex-col justify-between shadow-sm">
          <span className="text-xs text-sky-700 font-bold uppercase tracking-wider">Total Commercial Outflow</span>
          <h3 className="text-2xl font-extrabold text-sky-900 mt-2">${totalUsd.toLocaleString()} USD</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">Ocean freight & international claims</p>
        </div>
        <div className="panel p-5 bg-gradient-to-br from-white via-amber-50/40 to-white border border-amber-100 flex flex-col justify-between shadow-sm">
          <span className="text-xs text-amber-700 font-bold uppercase tracking-wider">Total Local Expenses</span>
          <h3 className="text-2xl font-extrabold text-amber-900 mt-2">৳{totalBdt.toLocaleString()} BDT</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">C&F, Port charges & demurrage</p>
        </div>
        <div className="panel p-5 bg-gradient-to-br from-white via-rose-50/40 to-white border border-rose-100 flex flex-col justify-between shadow-sm">
          <span className="text-xs text-rose-700 font-bold uppercase tracking-wider">Active Dispute Claims</span>
          <h3 className="text-2xl font-extrabold text-rose-900 mt-2">1 Open Claim</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">$1,450 USD short-payment claim under negotiation</p>
        </div>
      </div>

      <div className="panel p-6 flex flex-col gap-4">
        <div className="panel-head flex justify-between items-center">
          <div>
            <span>COMMERCIAL EXPENSES & DISPUTE DESK</span>
            <h3>Freight, Port, C&F, Demurrage & Claims Register</h3>
          </div>
          <div className="flex gap-2">
            <select
              className="bg-white border border-slate-300 text-xs rounded-lg px-3 py-1.5 text-slate-700 font-medium"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Ocean Freight">Ocean Freight</option>
              <option value="C&F Agency Fees">C&F Agency Fees</option>
              <option value="Port Demurrage">Port Demurrage</option>
              <option value="Dispute Claim">Dispute Claim</option>
            </select>
            <button className="primary" onClick={() => setModal(true)}>
              + New Expense Voucher
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="record-table">
            <thead>
              <tr>
                <th>VOUCHER / CLAIM NO</th>
                <th>CATEGORY</th>
                <th>VENDOR / PARTY</th>
                <th>LINKED REF</th>
                <th>USD AMOUNT</th>
                <th>BDT AMOUNT</th>
                <th>APPROVAL</th>
                <th>PAYMENT</th>
                <th>DUE DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono text-sky-700 font-bold">{item.voucherNo}</td>
                  <td>
                    <span className="badge info">{item.expenseCategory}</span>
                  </td>
                  <td>
                    <strong className="text-slate-900">{item.vendorParty}</strong>
                  </td>
                  <td className="font-mono text-xs">{item.linkedRefNo}</td>
                  <td className="font-bold text-slate-900">
                    {item.amountUsd > 0 ? `$${item.amountUsd.toLocaleString()}` : "—"}
                  </td>
                  <td className="font-mono">৳{item.amountBdt.toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.approvalStatus === "Approved" ? "success" : "warning"
                      }`}
                    >
                      {item.approvalStatus}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item.paymentStatus === "Paid"
                          ? "success"
                          : item.paymentStatus === "Pending Settlement"
                          ? "warning"
                          : "danger"
                      }`}
                    >
                      {item.paymentStatus}
                    </span>
                  </td>
                  <td className="font-mono">{item.dueDate}</td>
                  <td>
                    <button
                      className="btn-sm secondary"
                      onClick={() => notify(`Voucher details loaded for ${item.voucherNo}`)}
                    >
                      📄 Voucher
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
