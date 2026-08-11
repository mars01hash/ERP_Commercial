"use client";

import { useState } from "react";
import { InsurancePolicy } from "../types/commercial";

interface InsuranceViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const samplePolicies: InsurancePolicy[] = [
  {
    id: "INS-2026-0042",
    coverNoteNo: "CN-GREEN-2026-8819",
    policyNo: "POL-MAR-99120",
    insuranceCompany: "Green Delta Insurance Co. Ltd.",
    policyType: "Marine Cargo",
    sumInsuredUsd: 214600,
    premiumRatePercent: 0.25, // 0.25% premium
    premiumBdt: 63608.75, // sumInsuredUsd * 118.5 * 0.25%
    voyageFromTo: "Ningbo, China → Chattogram, BD",
    issueDate: "2026-07-10",
    validUntil: "2026-10-30",
    status: "Covered",
  },
  {
    id: "INS-2026-0038",
    coverNoteNo: "CN-PIONEER-2026-441",
    policyNo: "POL-INL-77401",
    insuranceCompany: "Pioneer Insurance Co. Ltd.",
    policyType: "Inland Transport",
    sumInsuredUsd: 182900,
    premiumRatePercent: 0.15,
    premiumBdt: 32510.9,
    voyageFromTo: "Chattogram Port → Gazipur Factory",
    issueDate: "2026-08-01",
    validUntil: "2026-09-30",
    status: "Pending Premium",
  },
  {
    id: "INS-2026-0049",
    coverNoteNo: "CN-EASTERN-2026-901",
    policyNo: "POL-OPEN-5520",
    insuranceCompany: "Eastern Insurance Co. Ltd.",
    policyType: "Export Open Cover",
    sumInsuredUsd: 1500000,
    premiumRatePercent: 0.20,
    premiumBdt: 355500.0,
    voyageFromTo: "Chattogram → Global Ports",
    issueDate: "2026-01-01",
    validUntil: "2026-12-31",
    status: "Covered",
  },
];

export default function InsuranceView({ notify, setModal }: InsuranceViewProps) {
  const [policies, setPolicies] = useState<InsurancePolicy[]>(samplePolicies);

  return (
    <div className="insurance-module">
      <div className="panel insurance-panel">
        <div className="panel-head">
          <div>
            <span>CARGO & TRANSPORT RISK PROTECTION</span>
            <h3>Marine & Cargo Insurance Policy Desk</h3>
          </div>
          <button className="primary" onClick={() => setModal(true)}>
            + Issue New Cover Note
          </button>
        </div>

        <div className="metric-row-3">
          <div>
            <span>Total Sum Insured</span>
            <h3>$1,897,500</h3>
            <small className="blue-text">3 Active Policy Cover Notes</small>
          </div>
          <div>
            <span>Total Insurance Premium</span>
            <h3>BDT 451,619</h3>
            <small className="up">Average Rate: 0.20%</small>
          </div>
          <div>
            <span>Open Claims Pending</span>
            <h3>0 Claims</h3>
            <small className="up">Clean Risk Profile</small>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>COVER NOTE & POLICY NO</th>
                <th>INSURANCE COMPANY</th>
                <th>POLICY TYPE</th>
                <th>SUM INSURED (USD)</th>
                <th>PREMIUM RATE (%)</th>
                <th>PREMIUM AMOUNT (BDT)</th>
                <th>VOYAGE / ROUTE</th>
                <th>VALID UNTIL</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.coverNoteNo}</strong>
                    <span>Pol: {p.policyNo}</span>
                  </td>
                  <td>
                    <strong>{p.insuranceCompany}</strong>
                    <span>Issue: {p.issueDate}</span>
                  </td>
                  <td>
                    <span className="pill info">{p.policyType}</span>
                  </td>
                  <td>
                    <strong>${p.sumInsuredUsd.toLocaleString()}</strong>
                  </td>
                  <td>
                    <strong>{p.premiumRatePercent}%</strong>
                  </td>
                  <td>
                    <strong>BDT {p.premiumBdt.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span>{p.voyageFromTo}</span>
                  </td>
                  <td>
                    <strong>{p.validUntil}</strong>
                  </td>
                  <td>
                    <span className={`pill ${p.status === "Covered" ? "success" : "warning"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`Insurance Certificate generated for ${p.coverNoteNo}`)}
                    >
                      Certificate
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
