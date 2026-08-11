"use client";

import { useState } from "react";
import { ExportDocSet } from "../types/commercial";

interface ExportDocPreviewModalProps {
  docSet: ExportDocSet | null;
  onClose: () => void;
  notify: (msg: string) => void;
}

export default function ExportDocPreviewModal({ docSet, onClose, notify }: ExportDocPreviewModalProps) {
  const [docTab, setDocTab] = useState<"invoice" | "packinglist">("invoice");

  if (!docSet) return null;

  const packingList = docSet.packingDetails || [
    {
      cartonFrom: 1,
      cartonTo: 1420,
      pcsPerCarton: 30,
      netWeightKg: 12720,
      grossWeightKg: 14200,
      cbm: 68.5,
      cartonMeasurementCm: "60 × 40 × 35 cm",
    },
  ];

  return (
    <div className="overlay print-overlay" onMouseDown={onClose}>
      <div className="modal doc-preview-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>BANK PRESENTATION DOCUMENT GENERATOR</span>
            <h2>Export Document Desk</h2>
          </div>
          <div className="modal-actions">
            <div className="tab-pills">
              <button
                className={docTab === "invoice" ? "pill-tab active" : "pill-tab"}
                onClick={() => setDocTab("invoice")}
              >
                Commercial Invoice
              </button>
              <button
                className={docTab === "packinglist" ? "pill-tab active" : "pill-tab"}
                onClick={() => setDocTab("packinglist")}
              >
                Shipment Packing List
              </button>
            </div>
            <button className="secondary" onClick={() => window.print()}>
              🖨 Print Document
            </button>
            <button onClick={onClose}>×</button>
          </div>
        </div>

        <div className="doc-paper">
          {/* Header */}
          <div className="paper-head">
            <div>
              <h1 className="company-title">NORTHERN BASICS LTD.</h1>
              <p className="company-sub">100% Export Oriented Ready Made Garments Industry</p>
              <p className="company-addr">Plot 42-48, Gazipur Industrial Area, Dhaka, Bangladesh</p>
              <p className="company-contact">BIN: 000492810-0101 · Bond License: 104/CUS/BOND/2018</p>
            </div>
            <div className="inv-badge">
              <h2>{docTab === "invoice" ? "COMMERCIAL INVOICE" : "SHIPMENT PACKING LIST"}</h2>
              <p><b>Invoice No:</b> {docSet.invoiceNo}</p>
              <p><b>Date:</b> {docSet.shipmentDate}</p>
              <p><b>EXP No:</b> {docSet.expNo}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="paper-grid">
            <div className="box">
              <strong>BUYER / APPLICANT</strong>
              <p><b>{docSet.buyer}</b></p>
              <p>Global Procurement Division</p>
              <p>Destination: {docSet.destPort}</p>
            </div>
            <div className="box">
              <strong>LOGISTICS & BANKING</strong>
              <p><b>Negotiating Bank:</b> {docSet.negotiatingBank}</p>
              <p><b>BL No:</b> {docSet.blNo}</p>
              <p><b>Vessel / Voyage:</b> {docSet.vesselVoyage}</p>
            </div>
          </div>

          {docTab === "invoice" ? (
            /* Commercial Invoice View */
            <table className="doc-table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>ITEM DESCRIPTION & STYLE</th>
                  <th>PO NO</th>
                  <th>COLOR</th>
                  <th className="num">QUANTITY (PCS)</th>
                  <th className="num">FOB RATE (USD)</th>
                  <th className="num">TOTAL AMOUNT (USD)</th>
                </tr>
              </thead>
              <tbody>
                {docSet.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td><b>{item.description}</b></td>
                    <td>{item.poNo}</td>
                    <td>{item.color}</td>
                    <td className="num">{item.qtyPcs.toLocaleString()}</td>
                    <td className="num">${item.unitPriceUsd.toFixed(2)}</td>
                    <td className="num"><b>${item.totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="num"><b>TOTAL EXPORT VALUE (FOB CHATTOGRAM):</b></td>
                  <td className="num"><b>{docSet.totalPcs.toLocaleString()} pcs</b></td>
                  <td></td>
                  <td className="num"><b>${docSet.invoiceValueUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</b></td>
                </tr>
              </tfoot>
            </table>
          ) : (
            /* Packing List View */
            <div>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th>CTN RANGE</th>
                    <th>STYLE & ITEM DESCRIPTION</th>
                    <th>PO NO</th>
                    <th className="num">TOTAL CTNS</th>
                    <th className="num">PCS/CTN</th>
                    <th className="num">TOTAL PCS</th>
                    <th className="num">NET WT (KG)</th>
                    <th className="num">GROSS WT (KG)</th>
                    <th className="num">CBM (M³)</th>
                  </tr>
                </thead>
                <tbody>
                  {packingList.map((p, idx) => (
                    <tr key={idx}>
                      <td>CTN {p.cartonFrom} - {p.cartonTo}</td>
                      <td><b>{docSet.items[0]?.description || "Garments Export"}</b></td>
                      <td>{docSet.items[0]?.poNo || "PO-REF"}</td>
                      <td className="num">{docSet.totalCartons}</td>
                      <td className="num">{p.pcsPerCarton}</td>
                      <td className="num"><b>{docSet.totalPcs.toLocaleString()}</b></td>
                      <td className="num">{p.netWeightKg.toLocaleString()} kg</td>
                      <td className="num">{p.grossWeightKg.toLocaleString()} kg</td>
                      <td className="num"><b>{p.cbm} m³</b></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="num"><b>TOTAL PACKING SPECIFICATIONS:</b></td>
                    <td className="num"><b>{docSet.totalCartons} ctns</b></td>
                    <td></td>
                    <td className="num"><b>{docSet.totalPcs.toLocaleString()} pcs</b></td>
                    <td className="num"><b>{packingList.reduce((a, b) => a + b.netWeightKg, 0).toLocaleString()} kg</b></td>
                    <td className="num"><b>{packingList.reduce((a, b) => a + b.grossWeightKg, 0).toLocaleString()} kg</b></td>
                    <td className="num"><b>{packingList.reduce((a, b) => a + b.cbm, 0)} m³</b></td>
                  </tr>
                </tfoot>
              </table>

              <div className="carton-mark-box">
                <strong>MAIN CARTON MARKS:</strong>
                <p>BUYER: {docSet.buyer} · PO: {docSet.items[0]?.poNo} · MADE IN BANGLADESH · DESTINATION: {docSet.destPort}</p>
              </div>
            </div>
          )}

          {/* Declaration */}
          <div className="paper-foot">
            <div>
              <strong>BENEFICIARY DECLARATION:</strong>
              <p>We certify that the goods specified above are of Bangladesh origin, manufactured strictly in accordance with Buyer&apos;s purchase order and Master LC terms.</p>
            </div>
            <div className="sig-block">
              <div className="sig-line"></div>
              <span>Authorized Signature & Stamp</span>
              <strong>NORTHERN BASICS LTD.</strong>
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <button className="secondary" onClick={() => notify("Draft doc set downloaded as JSON.")}>
            ⇩ Download Data
          </button>
          <button className="primary" onClick={() => { notify(`${docTab === "invoice" ? "Commercial Invoice" : "Packing List"} verified & ready.`); onClose(); }}>
            ✓ Confirm Bank Presentation Set
          </button>
        </div>
      </div>
    </div>
  );
}
