"use client";

import { useState } from "react";
import { CashIncentiveClaimItem } from "../types/commercial";

interface CashIncentiveViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const sampleClaims: CashIncentiveClaimItem[] = [
  {
    id: "CI-2026-0032",
    claimNo: "CI-Q2-2026-001",
    quarter: "Q2 2026",
    incentiveType: "4% RMG Subsidy",
    expCount: 18,
    claimAmountBdt: 8420000,
    submittingBank: "Eastern Bank PLC",
    caAuditFirm: "A. Qasem & Co. Chartered Accountants",
    caCertificateStatus: "Certified",
    bbSanctionStatus: "Audit running",
    submissionDate: "2026-07-28",
  },
  {
    id: "CI-2026-0035",
    claimNo: "CI-Q2-2026-008",
    quarter: "Q2 2026",
    incentiveType: "1% Additional Special Incentive",
    expCount: 11,
    claimAmountBdt: 5180000,
    submittingBank: "Standard Chartered Bank",
    caAuditFirm: "Hoda Vasi Chowdhury & Co.",
    caCertificateStatus: "Pending audit",
    bbSanctionStatus: "Submitted",
    submissionDate: "2026-08-02",
  },
  {
    id: "CI-2026-0028",
    claimNo: "CI-Q1-2026-014",
    quarter: "Q1 2026",
    incentiveType: "Euro Zone Special Incentive",
    expCount: 22,
    claimAmountBdt: 12400000,
    submittingBank: "HSBC Bangladesh",
    caAuditFirm: "Rahman Rahman Huq (KPMG)",
    caCertificateStatus: "Certified",
    bbSanctionStatus: "Disbursed",
    submissionDate: "2026-04-15",
  },
];

export default function CashIncentiveView({ notify, setModal }: CashIncentiveViewProps) {
  const [claims] = useState<CashIncentiveClaimItem[]>(sampleClaims);

  return (
    <div className="cash-incentive-module">
      <div className="panel incentive-panel">
        <div className="panel-head">
          <div>
            <span>BANGLADESH BANK EXPORT SUBSIDY</span>
            <h3>Government Cash Incentive Claims Desk</h3>
          </div>
          <button className="primary" onClick={() => setModal(true)}>
            + Prepare New Claim File
          </button>
        </div>

        <div className="metric-row-3">
          <div>
            <span>Total Submitted Claims</span>
            <h3>BDT 26.00M</h3>
            <small>Across Q1 & Q2 2026</small>
          </div>
          <div>
            <span>Sanctioned & Disbursed</span>
            <h3>BDT 12.40M</h3>
            <small className="up">Credited by Bangladesh Bank</small>
          </div>
          <div>
            <span>Pending Audit & Sanction</span>
            <h3>BDT 13.60M</h3>
            <small className="warn-text">Under CA & Bank Verification</small>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>CLAIM NO & QUARTER</th>
                <th>INCENTIVE TYPE</th>
                <th>SUBMITTING BANK</th>
                <th>CHARTERED ACCOUNTANT AUDIT</th>
                <th>CLAIM AMOUNT (BDT)</th>
                <th>BANGLADESH BANK STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td>
                    <strong>{claim.claimNo}</strong>
                    <span>Quarter: {claim.quarter} · {claim.expCount} EXPs</span>
                  </td>
                  <td>
                    <span className="pill info">{claim.incentiveType}</span>
                  </td>
                  <td>
                    <strong>{claim.submittingBank}</strong>
                    <span>Submitted: {claim.submissionDate}</span>
                  </td>
                  <td>
                    <strong>{claim.caAuditFirm}</strong>
                    <span className={`pill ${claim.caCertificateStatus === "Certified" ? "success" : "warning"}`}>
                      {claim.caCertificateStatus}
                    </span>
                  </td>
                  <td>
                    <strong>BDT {(claim.claimAmountBdt / 1000000).toFixed(2)}M</strong>
                    <span>({claim.claimAmountBdt.toLocaleString()} BDT)</span>
                  </td>
                  <td>
                    <span className={`pill ${claim.bbSanctionStatus === "Disbursed" ? "success" : claim.bbSanctionStatus === "Audit running" ? "warning" : "info"}`}>
                      {claim.bbSanctionStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`Required 5-point audit checklist generated for ${claim.claimNo}`)}
                    >
                      Audit Checklist
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
