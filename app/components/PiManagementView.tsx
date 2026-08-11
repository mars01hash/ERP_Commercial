"use client";

import { useState } from "react";
import { ProformaInvoice } from "../types/commercial";

interface PiManagementViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const samplePIs: ProformaInvoice[] = [
  {
    id: "PI-2026-0091",
    piNo: "PI-NGB-2026-881",
    partyName: "Ningbo Textile Co. Ltd.",
    piType: "Import Supplier PI",
    category: "Fabric",
    piValueUsd: 214600,
    hsCode: "HS 6006.22",
    validUntil: "2026-09-30",
    linkedLcNo: "BTB-0286-99120",
    paymentTerms: "Usance 90 Days",
    status: "Linked to LC",
    items: [
      { description: "95% Cotton 5% Elastane Single Jersey (Dyed)", qty: 28400, unit: "Kg", rateUsd: 6.85, totalUsd: 194540 },
      { description: "1x1 Rib Cotton Elastane (Dyed)", qty: 2600, unit: "Kg", rateUsd: 7.715, totalUsd: 20060 },
    ],
  },
  {
    id: "PI-2026-0094",
    piNo: "PI-YKK-99201",
    partyName: "YKK Bangladesh Ltd.",
    piType: "Import Supplier PI",
    category: "Trims & Accessories",
    piValueUsd: 38420,
    hsCode: "HS 9607.11",
    validUntil: "2026-09-15",
    linkedLcNo: "BTB-0286-99125",
    paymentTerms: "At Sight",
    status: "Active",
    items: [
      { description: "Nylon Reversible Zipper #5 Auto Lock 65cm", qty: 42400, unit: "Pcs", rateUsd: 0.72, totalUsd: 30528 },
      { description: "Metal Eyelet & Flat Drawcord with Rubber Tip", qty: 38400, unit: "Sets", rateUsd: 0.205, totalUsd: 7892 },
    ],
  },
  {
    id: "PI-2026-0082",
    piNo: "PI-HM-EXP-441",
    partyName: "H&M Hennes & Mauritz",
    piType: "Export Buyer PI",
    category: "Garments Export",
    piValueUsd: 303400,
    hsCode: "HS 6109.10",
    validUntil: "2026-10-15",
    linkedLcNo: "0286IMPE260045",
    paymentTerms: "At Sight LC",
    status: "Linked to LC",
    items: [
      { description: "100% Cotton Mens Core Crew Neck Tee", qty: 82000, unit: "Pcs", rateUsd: 3.70, totalUsd: 303400 },
    ],
  },
];

export default function PiManagementView({ notify, setModal }: PiManagementViewProps) {
  const [pis] = useState<ProformaInvoice[]>(samplePIs);
  const [filterType, setFilterType] = useState<string>("All");

  const filtered = pis.filter((p) => filterType === "All" || p.piType === filterType);

  return (
    <div className="pi-module">
      <div className="panel pi-panel">
        <div className="panel-head">
          <div>
            <span>PROFORMA INVOICE MANAGEMENT</span>
            <h3>Proforma Invoice (PI) Entry & Sourcing Register</h3>
          </div>
          <div className="actions">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="All">All PI Types</option>
              <option value="Import Supplier PI">Import Supplier PIs</option>
              <option value="Export Buyer PI">Export Buyer PIs</option>
            </select>
            <button className="primary" onClick={() => setModal(true)}>
              + Add New PI Record
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PI NO & REF</th>
                <th>PI TYPE</th>
                <th>PARTY / COMPANY</th>
                <th>MATERIAL CATEGORY</th>
                <th>HS CODE</th>
                <th>PI VALUE (USD)</th>
                <th>VALID UNTIL</th>
                <th>LINKED LC</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pi) => (
                <tr key={pi.id}>
                  <td>
                    <strong>{pi.piNo}</strong>
                    <span>{pi.id}</span>
                  </td>
                  <td>
                    <span className={`pill ${pi.piType === "Import Supplier PI" ? "warning" : "success"}`}>
                      {pi.piType}
                    </span>
                  </td>
                  <td>
                    <strong>{pi.partyName}</strong>
                    <span>Terms: {pi.paymentTerms}</span>
                  </td>
                  <td>
                    <span className="pill info">{pi.category}</span>
                  </td>
                  <td>
                    <strong>{pi.hsCode}</strong>
                  </td>
                  <td>
                    <strong>${pi.piValueUsd.toLocaleString()}</strong>
                  </td>
                  <td>
                    <strong>{pi.validUntil}</strong>
                  </td>
                  <td>
                    <strong>{pi.linkedLcNo || "Unlinked"}</strong>
                  </td>
                  <td>
                    <span className={`pill ${pi.status === "Linked to LC" ? "success" : "info"}`}>
                      {pi.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`PI Specification sheet exported for ${pi.piNo}`)}
                    >
                      PI Spec Sheet
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
