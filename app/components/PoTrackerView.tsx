"use client";

import { useState } from "react";
import { POTransitionRecord } from "../types/commercial";

interface PoTrackerViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const STAGES = [
  "1. Commercial Intake",
  "2. Master LC Tagged",
  "3. BGMEA UD Registered",
  "4. B2B LC Opened",
  "5. Inbound Cleared",
  "6. Shipment Booked",
  "7. Export Invoiced",
  "8. Proceeds Realized",
];

const initialPOTransitions: POTransitionRecord[] = [
  {
    id: "POT-2026-0042",
    poNumber: "PO-7844501",
    styleName: "Mens Core Crew Neck Tee",
    buyer: "H&M Hennes & Mauritz",
    quantityPcs: 82000,
    fobPriceUsd: 3.70,
    totalValueUsd: 303400,
    currentStageIndex: 6, // 7th Stage: Export Invoiced
    currentStageName: "Export Invoiced",
    shipmentDate: "2026-09-28",
    linkedMasterLc: "0286IMPE260045 ($1.28M)",
    linkedUdNo: "BGMEA-UD-2026-88192",
    linkedB2bLcs: ["BTB-0286-99120 (Fabric)", "BTB-0286-99125 (Trims)"],
    linkedContainerNo: "MSKU-9940128 (40HC)",
    linkedInvoiceNo: "INV-EX-88341 ($156,880)",
    realizedAmountUsd: 0,
    stageHistory: [
      { stage: "Commercial Intake", timestamp: "2026-06-01", note: "Handover accepted from Merchandising" },
      { stage: "Master LC Tagged", timestamp: "2026-06-05", note: "Allocated under HSBC Master LC 0286IMPE260045" },
      { stage: "BGMEA UD Registered", timestamp: "2026-06-15", note: "Fabric entitlement 28,400 kg registered" },
      { stage: "B2B LC Opened", timestamp: "2026-06-20", note: "BTB opened for Ningbo Fabric & YKK Trims" },
      { stage: "Inbound Cleared", timestamp: "2026-08-01", note: "Customs Bill of Entry C-181092 cleared" },
      { stage: "Shipment Booked", timestamp: "2026-08-08", note: "Booking BKG-2026-0204 confirmed with Maersk" },
      { stage: "Export Invoiced", timestamp: "2026-08-11", note: "Commercial Invoice INV-EX-88341 generated" },
    ],
  },
  {
    id: "POT-2026-0038",
    poNumber: "PO-45019382",
    styleName: "Nova Knit Jogger Pants",
    buyer: "C&A Buying GmbH",
    quantityPcs: 38400,
    fobPriceUsd: 6.425,
    totalValueUsd: 246720,
    currentStageIndex: 7, // 8th Stage: Proceeds Realized
    currentStageName: "Proceeds Realized",
    shipmentDate: "2026-08-04",
    linkedMasterLc: "SC-2026-0031 ($842K)",
    linkedUdNo: "BGMEA-UD-2026-77102",
    linkedB2bLcs: ["BTB-0884-77192 (Fleece Fabric)"],
    linkedContainerNo: "TGHU-8819024 (40HC)",
    linkedInvoiceNo: "INV-EX-88190 ($246,720)",
    realizedAmountUsd: 246720,
    stageHistory: [
      { stage: "Commercial Intake", timestamp: "2026-05-10", note: "Order intake completed" },
      { stage: "Master LC Tagged", timestamp: "2026-05-12", note: "Linked to Sales Contract SC-8842" },
      { stage: "BGMEA UD Registered", timestamp: "2026-05-20", note: "BGMEA UD-2026-77102 issued" },
      { stage: "B2B LC Opened", timestamp: "2026-05-28", note: "B2B LC opened for Shaoxing Fabric" },
      { stage: "Inbound Cleared", timestamp: "2026-07-05", note: "Fabric delivered to factory" },
      { stage: "Shipment Booked", timestamp: "2026-07-25", note: "Shipped via COSCO Rotterdam" },
      { stage: "Export Invoiced", timestamp: "2026-08-04", note: "Submitted to Eastern Bank PLC" },
      { stage: "Proceeds Realized", timestamp: "2026-08-10", note: "Full proceeds realized into ERQ account" },
    ],
  },
  {
    id: "POT-2026-0049",
    poNumber: "PO-PR-99412",
    styleName: "Kids Fleece Hooded Set",
    buyer: "Primark Stores Ltd",
    quantityPcs: 44200,
    fobPriceUsd: 6.50,
    totalValueUsd: 287300,
    currentStageIndex: 3, // 4th Stage: B2B LC Opened
    currentStageName: "B2B LC Opened",
    shipmentDate: "2026-10-03",
    linkedMasterLc: "PRM-991042 ($1.45M)",
    linkedUdNo: "BKMEA-UD-2026-90412",
    linkedB2bLcs: ["BTB-0774-10294 (Yarn & Dyes)"],
    linkedContainerNo: "Pending Vessel Booking",
    linkedInvoiceNo: "Pending Shipment",
    realizedAmountUsd: 0,
    stageHistory: [
      { stage: "Commercial Intake", timestamp: "2026-07-01", note: "Order intake registered" },
      { stage: "Master LC Tagged", timestamp: "2026-07-05", note: "Linked to Master LC PRM-991042" },
      { stage: "BGMEA UD Registered", timestamp: "2026-07-15", note: "BKMEA UD approved" },
      { stage: "B2B LC Opened", timestamp: "2026-08-02", note: "Yarn import BTB LC issued" },
    ],
  },
];

export default function PoTrackerView({ notify, setModal }: PoTrackerViewProps) {
  const [poList, setPoList] = useState<POTransitionRecord[]>(initialPOTransitions);
  const [selectedPo, setSelectedPo] = useState<POTransitionRecord>(poList[0]);
  const [searchPo, setSearchPo] = useState("");

  const filteredPos = poList.filter(
    (p) =>
      p.poNumber.toLowerCase().includes(searchPo.toLowerCase()) ||
      p.buyer.toLowerCase().includes(searchPo.toLowerCase()) ||
      p.styleName.toLowerCase().includes(searchPo.toLowerCase())
  );

  const advancePoStage = () => {
    if (selectedPo.currentStageIndex >= 7) {
      return notify(`PO ${selectedPo.poNumber} has already reached the final stage (Proceeds Realized).`);
    }

    const nextIndex = selectedPo.currentStageIndex + 1;
    const nextStageName = STAGES[nextIndex].replace(/^\d+\.\s*/, "") as any;

    const updatedPo = {
      ...selectedPo,
      currentStageIndex: nextIndex,
      currentStageName: nextStageName,
      stageHistory: [
        ...selectedPo.stageHistory,
        {
          stage: nextStageName,
          timestamp: new Date().toISOString().split("T")[0],
          note: `Advanced to ${nextStageName} by Head of Commercial`,
        },
      ],
    };

    const updatedList = poList.map((p) => (p.id === selectedPo.id ? updatedPo : p));
    setPoList(updatedList);
    setSelectedPo(updatedPo);
    notify(`PO ${selectedPo.poNumber} advanced to ${nextStageName}!`);
  };

  return (
    <div className="po-tracker-module">
      <div className="module-grid">
        {/* Left Column: PO List */}
        <div className="panel po-list-panel">
          <div className="panel-head">
            <div>
              <span>PO TRANSITION DASHBOARD</span>
              <h3>Purchase Order Transition List</h3>
            </div>
            <button className="primary" onClick={() => setModal(true)}>
              + Intake New PO
            </button>
          </div>

          <div className="search-box-wrap">
            <input
              placeholder="Search PO Number, Buyer, Style..."
              value={searchPo}
              onChange={(e) => setSearchPo(e.target.value)}
            />
          </div>

          <div className="po-cards-list">
            {filteredPos.map((po) => (
              <div
                key={po.id}
                className={`po-card ${selectedPo.id === po.id ? "selected" : ""}`}
                onClick={() => setSelectedPo(po)}
              >
                <div className="card-top">
                  <strong className="po-num">{po.poNumber}</strong>
                  <span className="pill success">Stage {po.currentStageIndex + 1} / 8</span>
                </div>

                <h4>{po.styleName}</h4>
                <p className="party">{po.buyer}</p>

                <div className="po-metric-row">
                  <div>
                    <span>Quantity</span>
                    <strong>{po.quantityPcs.toLocaleString()} pcs</strong>
                  </div>
                  <div>
                    <span>FOB Value</span>
                    <strong>${po.totalValueUsd.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="po-stage-pill-bar">
                  <span className="current-stage-tag">{po.currentStageName}</span>
                  <small>Ship: {po.shipmentDate}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed 8-Stage Transition Stepper & Inspector */}
        <div className="panel po-detail-panel">
          <div className="detail-header">
            <div>
              <span className="eyebrow">SELECTED PO LIFECYCLE TRACKER</span>
              <h2>{selectedPo.poNumber} — {selectedPo.styleName}</h2>
              <p className="sub">
                Buyer: <b>{selectedPo.buyer}</b> · {selectedPo.quantityPcs.toLocaleString()} pcs @ ${selectedPo.fobPriceUsd} FOB (${selectedPo.totalValueUsd.toLocaleString()})
              </p>
            </div>
            <button className="primary" onClick={advancePoStage}>
              Advance PO Stage →
            </button>
          </div>

          {/* 8-Stage Visual Stepper */}
          <div className="stepper-wrap">
            <div className="stepper-title">
              <h4>Commercial Transition Milestones (8 Stages)</h4>
            </div>

            <div className="stepper">
              {STAGES.map((stg, idx) => {
                const isDone = idx < selectedPo.currentStageIndex;
                const isCurrent = idx === selectedPo.currentStageIndex;

                return (
                  <div key={idx} className={`step-item ${isDone ? "done" : isCurrent ? "active" : ""}`}>
                    <div className="step-circle">{isDone ? "✓" : idx + 1}</div>
                    <span className="step-label">{stg.replace(/^\d+\.\s*/, "")}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Linked Trade Finance Instruments */}
          <div className="linked-instruments-box">
            <h4>Linked Trade Finance & Logistics Documents</h4>
            <div className="inst-grid">
              <div className="inst-card">
                <span>1. Master LC / Contract</span>
                <strong>{selectedPo.linkedMasterLc}</strong>
              </div>
              <div className="inst-card">
                <span>2. BGMEA UD Number</span>
                <strong>{selectedPo.linkedUdNo}</strong>
              </div>
              <div className="inst-card">
                <span>3. Back-to-Back LCs</span>
                <strong>{selectedPo.linkedB2bLcs.join(", ") || "None"}</strong>
              </div>
              <div className="inst-card">
                <span>4. Shipping Container / BL</span>
                <strong>{selectedPo.linkedContainerNo}</strong>
              </div>
              <div className="inst-card">
                <span>5. Commercial Invoice</span>
                <strong>{selectedPo.linkedInvoiceNo}</strong>
              </div>
              <div className="inst-card">
                <span>6. Realized Proceeds</span>
                <strong className="up">
                  {selectedPo.realizedAmountUsd > 0
                    ? `$${selectedPo.realizedAmountUsd.toLocaleString()} Realized`
                    : "Awaiting Bank Credit"}
                </strong>
              </div>
            </div>
          </div>

          {/* Transition Audit Log */}
          <div className="transition-audit-section">
            <h4>Milestone Transition Log</h4>
            <div className="audit-timeline">
              {selectedPo.stageHistory.map((h, idx) => (
                <div key={idx} className="audit-item">
                  <div className="audit-dot">✓</div>
                  <div>
                    <strong>{h.stage}</strong>
                    <p>{h.note}</p>
                    <small>Completed on: {h.timestamp}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
