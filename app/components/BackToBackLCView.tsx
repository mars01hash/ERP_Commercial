"use client";

import { useState } from "react";
import { BackToBackLCItem } from "../types/commercial";

interface BackToBackLCViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialB2BLCs: BackToBackLCItem[] = [
  {
    id: "BTB-2026-0118",
    btbLcNo: "BTB-0286-99120",
    linkedMasterLcNo: "MLC-2026-0048 (H&M)",
    supplier: "Ningbo Textile Co. Ltd.",
    openingBank: "Standard Chartered Dhaka",
    proformaInvoiceNo: "PI-NGB-2026-881",
    itemCategory: "Fabric",
    valueUsd: 214600,
    marginPercent: 0,
    tenorDays: 90,
    paymentTerm: "Usance 90 Days",
    expiryDate: "2026-10-18",
    status: "Issued",
    loanType: "EDF",
  },
  {
    id: "BTB-2026-0119",
    btbLcNo: "BTB-0286-99125",
    linkedMasterLcNo: "MLC-2026-0048 (H&M)",
    supplier: "YKK Bangladesh Ltd.",
    openingBank: "Standard Chartered Dhaka",
    proformaInvoiceNo: "PI-YKK-99201",
    itemCategory: "Trims & Accessories",
    valueUsd: 38420,
    marginPercent: 5,
    tenorDays: 30,
    paymentTerm: "Sight",
    expiryDate: "2026-09-30",
    status: "Draft",
  },
  {
    id: "BTB-2026-0107",
    btbLcNo: "BTB-0884-77192",
    linkedMasterLcNo: "SC-2026-0031 (C&A)",
    supplier: "Shaoxing Global Knit Fabric",
    openingBank: "Eastern Bank PLC",
    proformaInvoiceNo: "PI-SG-2026-4410",
    itemCategory: "Fabric",
    valueUsd: 182900,
    marginPercent: 0,
    tenorDays: 120,
    paymentTerm: "Usance 120 Days",
    expiryDate: "2026-09-06",
    status: "Amendment due",
    loanType: "LTR",
  },
  {
    id: "BTB-2026-0098",
    btbLcNo: "BTB-0774-10294",
    linkedMasterLcNo: "MLC-2026-0041 (NEXT)",
    supplier: "Huntsman Dyes & Chemicals",
    openingBank: "HSBC Bangladesh",
    proformaInvoiceNo: "PI-HUNT-0918",
    itemCategory: "Dyes & Chemicals",
    valueUsd: 42150,
    marginPercent: 10,
    tenorDays: 60,
    paymentTerm: "Usance 60 Days",
    expiryDate: "2026-08-25",
    status: "Retired",
    loanType: "UP Loan",
  },
];

export default function BackToBackLCView({ notify, setModal }: BackToBackLCViewProps) {
  const [b2bList, setB2bList] = useState<BackToBackLCItem[]>(initialB2BLCs);
  const [filterCat, setFilterCat] = useState<string>("All");

  const filteredList = b2bList.filter((item) => filterCat === "All" || item.itemCategory === filterCat);

  return (
    <div className="b2b-module">
      <div className="panel b2b-panel">
        <div className="panel-head">
          <div>
            <span>IMPORT FINANCE & SOURCING</span>
            <h3>Back-to-Back (B2B) LC Register</h3>
          </div>
          <div className="actions">
            <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
              <option value="All">All Material Categories</option>
              <option value="Fabric">Fabric</option>
              <option value="Trims & Accessories">Trims & Accessories</option>
              <option value="Yarn">Yarn</option>
              <option value="Dyes & Chemicals">Dyes & Chemicals</option>
            </select>
            <button className="primary" onClick={() => setModal(true)}>
              + Open B2B LC
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>B2B LC NO & ID</th>
                <th>LINKED MASTER LC</th>
                <th>SUPPLIER & PI REF</th>
                <th>CATEGORY</th>
                <th>TENOR & PAYMENT</th>
                <th>VALUE (USD)</th>
                <th>EXPIRY</th>
                <th>LOAN / STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.btbLcNo}</strong>
                    <span>{item.id}</span>
                  </td>
                  <td>
                    <strong>{item.linkedMasterLcNo}</strong>
                    <span>Bank: {item.openingBank}</span>
                  </td>
                  <td>
                    <strong>{item.supplier}</strong>
                    <span>Ref: {item.proformaInvoiceNo}</span>
                  </td>
                  <td>
                    <span className="pill info">{item.itemCategory}</span>
                  </td>
                  <td>
                    <strong>{item.paymentTerm}</strong>
                    <span>Tenor: {item.tenorDays} Days</span>
                  </td>
                  <td>
                    <strong>${item.valueUsd.toLocaleString()}</strong>
                    <span>Margin: {item.marginPercent}%</span>
                  </td>
                  <td>
                    <strong>{item.expiryDate}</strong>
                  </td>
                  <td>
                    <span className={`pill ${item.status === "Issued" ? "success" : item.status === "Retired" ? "info" : "warning"}`}>
                      {item.status}
                    </span>
                    {item.loanType && <span className="loan-tag">{item.loanType}</span>}
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`Retirement loan status generated for ${item.btbLcNo}`)}
                    >
                      Loan Schedule
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
