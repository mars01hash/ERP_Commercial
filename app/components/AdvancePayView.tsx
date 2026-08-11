"use client";

import { useState } from "react";
import { AdvancePaymentItem, CreditFacilityItem } from "../types/commercial";

interface AdvancePayViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialPayments: AdvancePaymentItem[] = [
  {
    id: "TT-2026-0041",
    refNo: "OUT-SWIFT-99104",
    supplier: "Shaoxing Huatex Fabric Ltd",
    piNumber: "PI-HTX-2026-881",
    beneficiaryBank: "Bank of China Hangzhou",
    swiftCode: "BKCHCNBJ500",
    remittanceAmountUsd: 48500,
    paymentPercent: 30, // 30% advance against PI
    exchangeRateBdt: 118.5,
    totalBdtDebited: 5747250,
    paymentDate: "2026-08-04",
    status: "SWIFT Executed",
  },
  {
    id: "TT-2026-0045",
    refNo: "OUT-SWIFT-99118",
    supplier: "YKK Bangladesh PTE Ltd",
    piNumber: "PI-YKK-DAC-4019",
    beneficiaryBank: "Standard Chartered Dhaka",
    swiftCode: "SCBLBDDX",
    remittanceAmountUsd: 18200,
    paymentPercent: 100, // 100% advance local BTB TT
    exchangeRateBdt: 118.5,
    totalBdtDebited: 2156700,
    paymentDate: "2026-08-09",
    status: "SWIFT Executed",
  },
  {
    id: "TT-2026-0048",
    refNo: "OUT-SWIFT-99122",
    supplier: "Ningbo Dyes & Chemicals Co",
    piNumber: "PI-NDC-2026-112",
    beneficiaryBank: "Industrial & Commercial Bank of China",
    swiftCode: "ICBKCNBJ",
    remittanceAmountUsd: 29400,
    paymentPercent: 20,
    exchangeRateBdt: 118.5,
    totalBdtDebited: 3483900,
    paymentDate: "2026-08-11",
    status: "Pending Remittance",
  },
];

const initialFacilities: CreditFacilityItem[] = [
  {
    id: "FAC-01",
    bankName: "Standard Chartered Bank (Dhaka)",
    facilityType: "Master LC",
    sanctionedLimitUsd: 5000000,
    utilizedLimitUsd: 3120000,
    availableLimitUsd: 1880000,
    marginPercent: 0,
    expiryDate: "2026-12-31",
    status: "Active",
  },
  {
    id: "FAC-02",
    bankName: "HSBC Bangladesh",
    facilityType: "Back-to-Back LC",
    sanctionedLimitUsd: 3500000,
    utilizedLimitUsd: 2640000,
    availableLimitUsd: 860000,
    marginPercent: 5,
    expiryDate: "2026-11-30",
    status: "Active",
  },
  {
    id: "FAC-03",
    bankName: "Eastern Bank PLC",
    facilityType: "LTR / PAD",
    sanctionedLimitUsd: 1500000,
    utilizedLimitUsd: 1380000,
    availableLimitUsd: 120000,
    marginPercent: 10,
    expiryDate: "2026-09-30",
    status: "Near Expiry",
  },
  {
    id: "FAC-04",
    bankName: "Pubali Bank PLC",
    facilityType: "Negotiation Limit",
    sanctionedLimitUsd: 2000000,
    utilizedLimitUsd: 1450000,
    availableLimitUsd: 550000,
    marginPercent: 0,
    expiryDate: "2026-10-15",
    status: "Active",
  },
];

export default function AdvancePayView({ notify, setModal }: AdvancePayViewProps) {
  const [payments] = useState<AdvancePaymentItem[]>(initialPayments);
  const [facilities] = useState<CreditFacilityItem[]>(initialFacilities);
  const [activeTab, setActiveTab] = useState<"tt" | "credit">("tt");

  return (
    <div className="advance-pay-module space-y-6">
      <div className="sub-tabs flex gap-2 border-b border-gray-800 pb-3">
        <button
          className={`tab-btn ${activeTab === "tt" ? "active" : ""}`}
          onClick={() => setActiveTab("tt")}
        >
          💳 TT & Advance Remittance Register
        </button>
        <button
          className={`tab-btn ${activeTab === "credit" ? "active" : ""}`}
          onClick={() => setActiveTab("credit")}
        >
          🏛️ Lien Bank Credit Limits & Facilities
        </button>
      </div>

      {activeTab === "tt" ? (
        <div className="panel flex flex-col gap-4">
          <div className="panel-head flex justify-between items-center">
            <div>
              <span>TELEGRAPHIC TRANSFER & REMITTANCE DESK</span>
              <h3>Advance Payment & Outward SWIFT Tracking</h3>
            </div>
            <button className="primary" onClick={() => setModal(true)}>
              + Issue TT Request
            </button>
          </div>

          <div className="table-wrap">
            <table className="record-table">
              <thead>
                <tr>
                  <th>REF NO</th>
                  <th>SUPPLIER / BENEFICIARY</th>
                  <th>PI NUMBER</th>
                  <th>BENEFICIARY BANK & SWIFT</th>
                  <th>ADVANCE %</th>
                  <th>AMOUNT (USD)</th>
                  <th>BDT DEBITED</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td className="font-mono text-cyan-400">{p.refNo}</td>
                    <td>
                      <strong>{p.supplier}</strong>
                    </td>
                    <td className="font-mono">{p.piNumber}</td>
                    <td>
                      <div>{p.beneficiaryBank}</div>
                      <small className="text-gray-400 font-mono">{p.swiftCode}</small>
                    </td>
                    <td>
                      <span className="badge info">{p.paymentPercent}% Advance</span>
                    </td>
                    <td className="font-bold">${p.remittanceAmountUsd.toLocaleString()}</td>
                    <td className="font-mono">৳{p.totalBdtDebited.toLocaleString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          p.status === "SWIFT Executed" ? "success" : "warning"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-sm"
                        onClick={() => notify(`SWIFT MT103 advice downloaded for ${p.refNo}`)}
                      >
                        📄 SWIFT MT103
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="panel flex flex-col gap-4">
          <div className="panel-head flex justify-between items-center">
            <div>
              <span>LIEN BANK FACILITIES & CREDIT DESK</span>
              <h3>Sanctioned vs Utilized Bank Credit Limits</h3>
            </div>
            <button className="secondary" onClick={() => notify("Credit facility report exported.")}>
              📊 Export Limits
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map((f) => {
              const utilPercent = Math.round((f.utilizedLimitUsd / f.sanctionedLimitUsd) * 100);
              return (
                <div key={f.id} className="card-box panel p-4 border border-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs text-amber-400 uppercase tracking-wide font-semibold">
                        {f.facilityType}
                      </span>
                      <h4 className="font-bold text-lg text-gray-100">{f.bankName}</h4>
                    </div>
                    <span
                      className={`badge ${
                        f.status === "Active"
                          ? "success"
                          : f.status === "Near Expiry"
                          ? "warning"
                          : "danger"
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>

                  <div className="my-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Sanctioned Limit:</span>
                      <strong className="text-gray-200">${f.sanctionedLimitUsd.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Utilized Balance:</span>
                      <span className="text-red-400 font-mono">${f.utilizedLimitUsd.toLocaleString()} ({utilPercent}%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Available Headroom:</span>
                      <span className="text-emerald-400 font-mono">${f.availableLimitUsd.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden my-2">
                    <div
                      className={`h-full ${
                        utilPercent > 85 ? "bg-red-500" : utilPercent > 70 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${utilPercent}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-800">
                    <span>Margin: {f.marginPercent}%</span>
                    <span>Facility Expiry: {f.expiryDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
