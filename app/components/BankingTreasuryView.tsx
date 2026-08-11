"use client";

import { useState } from "react";
import { BankingProceedsItem } from "../types/commercial";

interface BankingTreasuryViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialProceeds: BankingTreasuryViewProps extends any ? BankingProceedsItem[] : never = [
  {
    id: "NEG-2026-0078",
    billNo: "FDBC-SCB-8834",
    expNo: "EXP-2026-700219",
    buyer: "Primark Stores Ltd",
    negotiatingBank: "Standard Chartered Bank",
    billAmountUsd: 143650,
    realizedAmountUsd: 143650,
    erqRetentionUsd: 21547.5, // 15% ERQ
    bankChargesUsd: 420,
    ltrAdjustmentUsd: 38400,
    netBdtReceived: 13980400, // Exchange rate BDT 118.5
    tenorDays: 90,
    maturityDate: "2026-11-06",
    status: "Accepted",
  },
  {
    id: "PRC-2026-0085",
    billNo: "FDBC-HSBC-9912",
    expNo: "EXP-2026-681940",
    buyer: "H&M Hennes & Mauritz",
    negotiatingBank: "HSBC Bangladesh",
    billAmountUsd: 208410,
    realizedAmountUsd: 0,
    erqRetentionUsd: 0,
    bankChargesUsd: 0,
    ltrAdjustmentUsd: 0,
    netBdtReceived: 0,
    tenorDays: 60,
    maturityDate: "2026-09-14",
    status: "Awaiting credit",
  },
  {
    id: "FCR-2026-0049",
    billNo: "FDBC-EBL-4410",
    expNo: "EXP-2026-551029",
    buyer: "C&A Buying GmbH",
    negotiatingBank: "Eastern Bank PLC",
    billAmountUsd: 116844,
    realizedAmountUsd: 116844,
    erqRetentionUsd: 17526.6,
    bankChargesUsd: 380,
    ltrAdjustmentUsd: 29000,
    netBdtReceived: 11394200,
    tenorDays: 30,
    maturityDate: "2026-08-10",
    status: "Realized",
  },
];

export default function BankingTreasuryView({ notify, setModal }: BankingTreasuryViewProps) {
  const [items, setItems] = useState<BankingProceedsItem[]>(initialProceeds);

  return (
    <div className="banking-module">
      <div className="panel banking-panel">
        <div className="panel-head">
          <div>
            <span>COMMERCIAL TREASURY & BANKING</span>
            <h3>Export Proceeds Realization & Negotiation Desk</h3>
          </div>
          <button className="primary" onClick={() => setModal(true)}>
            + Add Bank Submission
          </button>
        </div>

        <div className="metric-row-3">
          <div>
            <span>Total Bills Negotiated</span>
            <h3>$468,904</h3>
            <small className="blue-text">3 Active FDBC/FDBP Bills</small>
          </div>
          <div>
            <span>Realized Export Proceeds</span>
            <h3>$260,494</h3>
            <small className="up">Credited to Bank Account</small>
          </div>
          <div>
            <span>ERQ (Foreign Currency) Retention</span>
            <h3>$39,074</h3>
            <small className="up">15% Retention Quota</small>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>BILL NO & EXP</th>
                <th>BUYER & BANK</th>
                <th>BILL VALUE (USD)</th>
                <th>REALIZED (USD)</th>
                <th>ERQ RETENTION (USD)</th>
                <th>MATURITY DATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.billNo}</strong>
                    <span>{item.expNo}</span>
                  </td>
                  <td>
                    <strong>{item.buyer}</strong>
                    <span>{item.negotiatingBank}</span>
                  </td>
                  <td>
                    <strong>${item.billAmountUsd.toLocaleString()}</strong>
                    <span>Tenor: {item.tenorDays} Days</span>
                  </td>
                  <td>
                    <strong className={item.realizedAmountUsd > 0 ? "up" : ""}>
                      ${item.realizedAmountUsd.toLocaleString()}
                    </strong>
                  </td>
                  <td>
                    <strong>${item.erqRetentionUsd.toLocaleString()}</strong>
                  </td>
                  <td>
                    <strong>{item.maturityDate}</strong>
                  </td>
                  <td>
                    <span className={`pill ${item.status === "Realized" ? "success" : item.status === "Accepted" ? "info" : "warning"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`Proceeds allocation statement downloaded for ${item.billNo}`)}
                    >
                      Allocation Statement
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
