"use client";

import { useState } from "react";
import { ImportLandedCost } from "../types/commercial";

interface ImportCostingViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialLandedCosts: ImportLandedCost[] = [
  {
    id: "COST-2026-0094",
    impRefNo: "IMP-2026-0094 (Fabric)",
    supplier: "Ningbo Textile Co. Ltd.",
    blNumber: "NGBCTG260814",
    fobValueUsd: 214600,
    freightUsd: 4200,
    insuranceUsd: 536.5,
    customsDutyBdt: 0, // Bonded exempted
    cfCommissionBdt: 45000,
    demurrageBdt: 0,
    totalLandedCostBdt: 25965416, // (FOB+Freight+Ins)*118.5 + charges
    landedCostPerKgBdt: 1392.99, // total / 18,640 kg
    paymentMaturityDate: "2026-10-18",
    paymentStatus: "Pending",
  },
  {
    id: "COST-2026-0091",
    impRefNo: "IMP-2026-0091 (Accessories)",
    supplier: "Shanghai Trim Export",
    blNumber: "AWB-618-44590021",
    fobValueUsd: 38420,
    freightUsd: 3800, // Airfreight
    insuranceUsd: 96.05,
    customsDutyBdt: 0,
    cfCommissionBdt: 18000,
    demurrageBdt: 56800, // Customs hold demurrage
    totalLandedCostBdt: 5084931,
    landedCostPerKgBdt: 2332.53, // total / 2,180 kg
    paymentMaturityDate: "2026-09-30",
    paymentStatus: "Pending",
  },
  {
    id: "COST-2026-0088",
    impRefNo: "IMP-2026-0088 (Yarn)",
    supplier: "Mundra Spinning Mills",
    blNumber: "MUNCTG88211",
    fobValueUsd: 142500,
    freightUsd: 3100,
    insuranceUsd: 356.25,
    customsDutyBdt: 0,
    cfCommissionBdt: 35000,
    demurrageBdt: 0,
    totalLandedCostBdt: 17316715,
    landedCostPerKgBdt: 415.26, // total / 41,700 kg
    paymentMaturityDate: "2026-08-09",
    paymentStatus: "Settled",
  },
];

export default function ImportCostingView({ notify, setModal }: ImportCostingViewProps) {
  const [costs] = useState<ImportLandedCost[]>(initialLandedCosts);

  return (
    <div className="import-costing-module">
      <div className="panel costing-panel">
        <div className="panel-head">
          <div>
            <span>IMPORT LANDED COSTING & SUPPLIER SETTLEMENT</span>
            <h3>Import Cost Breakdown & Payment Maturity Register</h3>
          </div>
          <button className="primary" onClick={() => setModal(true)}>
            + Add Import Cost Sheet
          </button>
        </div>

        <div className="metric-row-3">
          <div>
            <span>Total Landed Material Cost</span>
            <h3>BDT 48.36M</h3>
            <small>3 Active Import Consignments</small>
          </div>
          <div>
            <span>C&F Commission & Port Charges</span>
            <h3>BDT 154,800</h3>
            <small className="warn-text">Including Demurrage Charges</small>
          </div>
          <div>
            <span>Supplier Payment Maturity</span>
            <h3>$253,020 Pending</h3>
            <small className="blue-text">Tenor Usance Maturities</small>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>IMPORT REF & BL</th>
                <th>SUPPLIER</th>
                <th>FOB VALUE (USD)</th>
                <th>FREIGHT & INS</th>
                <th>C&F & PORT (BDT)</th>
                <th>TOTAL LANDED COST (BDT)</th>
                <th>LANDED COST / KG</th>
                <th>PAYMENT MATURITY</th>
                <th>PAYMENT STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {costs.map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.impRefNo}</strong>
                    <span>BL: {c.blNumber}</span>
                  </td>
                  <td>
                    <strong>{c.supplier}</strong>
                  </td>
                  <td>
                    <strong>${c.fobValueUsd.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span>Fr: ${c.freightUsd} · Ins: ${c.insuranceUsd.toFixed(1)}</span>
                  </td>
                  <td>
                    <span>C&F: BDT {c.cfCommissionBdt.toLocaleString()} {c.demurrageBdt > 0 ? `+ Dem: BDT ${c.demurrageBdt}` : ""}</span>
                  </td>
                  <td>
                    <strong>BDT {c.totalLandedCostBdt.toLocaleString()}</strong>
                  </td>
                  <td>
                    <strong className="up">BDT {c.landedCostPerKgBdt.toFixed(2)} / kg</strong>
                  </td>
                  <td>
                    <strong>{c.paymentMaturityDate}</strong>
                  </td>
                  <td>
                    <span className={`pill ${c.paymentStatus === "Settled" ? "success" : "warning"}`}>
                      {c.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`Landed cost audit voucher generated for ${c.id}`)}
                    >
                      Cost Voucher
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
