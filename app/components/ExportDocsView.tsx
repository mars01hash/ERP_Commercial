"use client";

import { useState } from "react";
import { ExportDocSet } from "../types/commercial";

interface ExportDocsViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
  openPreviewModal: (docSet: ExportDocSet) => void;
}

const sampleDocSets: ExportDocSet[] = [
  {
    id: "DOC-2026-0138",
    docSetNo: "SET-HM-2026-088",
    invoiceNo: "INV-EX-88341",
    buyer: "H&M Hennes & Mauritz",
    negotiatingBank: "Standard Chartered Bank",
    expNo: "EXP-2026-700219",
    blNo: "MAEU44892019",
    vesselVoyage: "Maersk Hanoi / V.2608E",
    destPort: "Hamburg, Germany",
    totalCartons: 1420,
    totalPcs: 42400,
    invoiceValueUsd: 156880,
    shipmentDate: "2026-08-11",
    presentationDeadline: "2026-08-25",
    discrepancyStatus: "Clean",
    items: [
      { description: "100% Cotton Mens Core Crew Neck Tee", poNo: "PO-7844501", color: "Black & Navy", qtyPcs: 42400, unitPriceUsd: 3.70, totalUsd: 156880 },
    ],
  },
  {
    id: "DOC-2026-0136",
    docSetNo: "SET-NXT-2026-042",
    invoiceNo: "INV-EX-88297",
    buyer: "NEXT Retail Ltd",
    negotiatingBank: "HSBC Bangladesh",
    expNo: "EXP-2026-681940",
    blNo: "DHL-77004128",
    vesselVoyage: "Airfreight / SQ Cargo",
    destPort: "London Heathrow, UK",
    totalCartons: 380,
    totalPcs: 14800,
    invoiceValueUsd: 92840,
    shipmentDate: "2026-08-10",
    presentationDeadline: "2026-08-24",
    discrepancyStatus: "Minor Discrepancy",
    items: [
      { description: "Girls Knit Leggings 2-Pack", poNo: "PO-NXT-4921", color: "Pink & Heather", qtyPcs: 14800, unitPriceUsd: 6.27, totalUsd: 92840 },
    ],
  },
  {
    id: "DOC-2026-0132",
    docSetNo: "SET-CA-2026-019",
    invoiceNo: "INV-EX-88190",
    buyer: "C&A Buying GmbH",
    negotiatingBank: "Eastern Bank PLC",
    expNo: "EXP-2026-551029",
    blNo: "COSU8831109",
    vesselVoyage: "COSCO Rotterdam / V.09A",
    destPort: "Rotterdam, Netherlands",
    totalCartons: 2100,
    totalPcs: 38400,
    invoiceValueUsd: 246720,
    shipmentDate: "2026-08-04",
    presentationDeadline: "2026-08-18",
    discrepancyStatus: "Major Discrepancy",
    items: [
      { description: "Mens Fleece Jogger Pants", poNo: "PO-45019382", color: "Grey Melange", qtyPcs: 38400, unitPriceUsd: 6.425, totalUsd: 246720 },
    ],
  },
];

export default function ExportDocsView({ notify, setModal, openPreviewModal }: ExportDocsViewProps) {
  const [docSets, setDocSets] = useState<ExportDocSet[]>(sampleDocSets);

  return (
    <div className="export-docs-module">
      <div className="panel docs-panel">
        <div className="panel-head">
          <div>
            <span>EXPORT COMMERCIAL DESK</span>
            <h3>Export Bank & Buyer Document Sets</h3>
          </div>
          <button className="primary" onClick={() => setModal(true)}>
            + Create New Document Set
          </button>
        </div>

        <div className="doc-cards-grid">
          {docSets.map((ds) => (
            <div key={ds.id} className="doc-card">
              <div className="doc-card-head">
                <strong>{ds.docSetNo}</strong>
                <span
                  className={`pill ${
                    ds.discrepancyStatus === "Clean"
                      ? "success"
                      : ds.discrepancyStatus === "Minor Discrepancy"
                      ? "warning"
                      : "danger"
                  }`}
                >
                  {ds.discrepancyStatus}
                </span>
              </div>

              <h4>Invoice: {ds.invoiceNo}</h4>
              <p className="buyer">{ds.buyer}</p>

              <div className="doc-meta-grid">
                <div>
                  <span>EXP Number</span>
                  <strong>{ds.expNo}</strong>
                </div>
                <div>
                  <span>Invoice Value</span>
                  <strong>${ds.invoiceValueUsd.toLocaleString()}</strong>
                </div>
                <div>
                  <span>Cartons / Pcs</span>
                  <strong>{ds.totalCartons} ctn / {ds.totalPcs.toLocaleString()} pcs</strong>
                </div>
                <div>
                  <span>Presentation Deadline</span>
                  <strong>{ds.presentationDeadline}</strong>
                </div>
              </div>

              <div className="doc-card-foot">
                <button
                  className="secondary small-btn"
                  onClick={() => openPreviewModal(ds)}
                >
                  📄 Preview Document Set
                </button>
                <button
                  className="primary small-btn"
                  onClick={() => notify(`UCP 600 discrepancy check passed for ${ds.invoiceNo}.`)}
                >
                  ✓ Run UCP Check
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
