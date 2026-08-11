"use client";

import { useState } from "react";
import { MasterLCItem } from "../types/commercial";

interface MasterLCViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialMasterLCs: MasterLCItem[] = [
  {
    id: "MLC-2026-0048",
    lcNo: "0286IMPE260045",
    salesContractNo: "SC-9921",
    buyer: "H&M Hennes & Mauritz",
    issuingBank: "HSBC Hong Kong",
    advisingBank: "Standard Chartered Dhaka",
    type: "At Sight",
    valueUsd: 1284500,
    utilizedUsd: 1084200,
    b2bEntitlementUsd: 963375, // 75%
    b2bUtilizedUsd: 742100,
    packingCreditLimitUsd: 321125,
    issueDate: "2026-05-10",
    shipmentDate: "2026-10-31",
    expiryDate: "2026-11-25",
    status: "Active",
    linkedOrdersCount: 7,
    amendments: [
      { no: 1, date: "2026-06-15", amountAdded: 150000, revisedExpiry: "2026-11-15", reason: "Quantity increase for PO 7844501" },
      { no: 2, date: "2026-07-20", amountAdded: 134500, revisedExpiry: "2026-11-25", reason: "Shipment date extension" },
    ],
  },
  {
    id: "SC-2026-0031",
    lcNo: "SC-8842",
    salesContractNo: "SC-8842",
    buyer: "C&A Buying GmbH",
    issuingBank: "ING Bank N.V.",
    advisingBank: "Eastern Bank PLC",
    type: "Usance 60 Days",
    valueUsd: 842750,
    utilizedUsd: 624100,
    b2bEntitlementUsd: 632062,
    b2bUtilizedUsd: 512900,
    packingCreditLimitUsd: 210688,
    issueDate: "2026-04-12",
    shipmentDate: "2026-09-18",
    expiryDate: "2026-10-12",
    status: "Amendment due",
    linkedOrdersCount: 4,
    amendments: [
      { no: 1, date: "2026-05-30", amountAdded: 42750, revisedExpiry: "2026-10-12", reason: "Include additional colorway" },
    ],
  },
  {
    id: "MLC-2026-0041",
    lcNo: "77401988",
    salesContractNo: "SC-7740",
    buyer: "NEXT Retail Ltd",
    issuingBank: "Barclays Bank UK",
    advisingBank: "HSBC Bangladesh",
    type: "At Sight",
    valueUsd: 595200,
    utilizedUsd: 351200,
    b2bEntitlementUsd: 446400,
    b2bUtilizedUsd: 298000,
    packingCreditLimitUsd: 148800,
    issueDate: "2026-06-01",
    shipmentDate: "2026-11-10",
    expiryDate: "2026-12-04",
    status: "Active",
    linkedOrdersCount: 3,
    amendments: [],
  },
  {
    id: "MLC-2026-0039",
    lcNo: "PRM-991042",
    salesContractNo: "SC-PRM-19",
    buyer: "Primark Stores Ltd",
    issuingBank: "Bank of Ireland",
    advisingBank: "Pubali Bank PLC",
    type: "Usance 90 Days",
    valueUsd: 1450000,
    utilizedUsd: 1450000,
    b2bEntitlementUsd: 1087500,
    b2bUtilizedUsd: 1080000,
    packingCreditLimitUsd: 362500,
    issueDate: "2026-02-14",
    shipmentDate: "2026-07-28",
    expiryDate: "2026-08-30",
    status: "Exhausted",
    linkedOrdersCount: 9,
    amendments: [
      { no: 1, date: "2026-03-20", amountAdded: 250000, revisedExpiry: "2026-08-30", reason: "Order quantity scale up" },
    ],
  },
];

export default function MasterLCView({ notify, setModal }: MasterLCViewProps) {
  const [lcs, setLcs] = useState<MasterLCItem[]>(initialMasterLCs);
  const [selectedLc, setSelectedLc] = useState<MasterLCItem | null>(lcs[0]);
  const [amendmentModal, setAmendmentModal] = useState<boolean>(false);
  const [newAmendAmount, setNewAmendAmount] = useState<string>("");
  const [newAmendReason, setNewAmendReason] = useState<string>("");

  const addAmendment = () => {
    if (!selectedLc || !newAmendAmount) return notify("Please specify amendment value.");
    const val = Number(newAmendAmount);
    const updated = lcs.map((item) => {
      if (item.id === selectedLc.id) {
        const nextNo = item.amendments.length + 1;
        const newAmend = {
          no: nextNo,
          date: new Date().toISOString().split("T")[0],
          amountAdded: val,
          revisedExpiry: item.expiryDate,
          reason: newAmendReason || "General amendment",
        };
        const updatedItem = {
          ...item,
          valueUsd: item.valueUsd + val,
          b2bEntitlementUsd: (item.valueUsd + val) * 0.75,
          amendments: [newAmend, ...item.amendments],
        };
        setSelectedLc(updatedItem);
        return updatedItem;
      }
      return item;
    });
    setLcs(updated);
    setAmendmentModal(false);
    setNewAmendAmount("");
    setNewAmendReason("");
    notify(`Amendment #${selectedLc.amendments.length + 1} added to LC ${selectedLc.lcNo}`);
  };

  return (
    <div className="master-lc-module">
      <div className="module-grid">
        {/* Left Column: Master LC List */}
        <div className="panel lc-list-panel">
          <div className="panel-head">
            <div>
              <span>EXPORT LC & SALES CONTRACTS</span>
              <h3>Active Master LC Portfolio</h3>
            </div>
            <button className="primary" onClick={() => setModal(true)}>
              + Add Master LC
            </button>
          </div>

          <div className="lc-cards">
            {lcs.map((lc) => (
              <div
                key={lc.id}
                className={`lc-card ${selectedLc?.id === lc.id ? "selected" : ""}`}
                onClick={() => setSelectedLc(lc)}
              >
                <div className="card-top">
                  <span className="lc-id">{lc.id}</span>
                  <span className={`pill ${lc.status === "Active" ? "success" : lc.status === "Amendment due" ? "warning" : "info"}`}>
                    {lc.status}
                  </span>
                </div>

                <h4>LC No. {lc.lcNo}</h4>
                <p className="party">{lc.buyer}</p>

                <div className="lc-value-block">
                  <div>
                    <span>LC Value</span>
                    <strong>${lc.valueUsd.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span>B2B Entitlement</span>
                    <strong>${lc.b2bEntitlementUsd.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="lc-util-bar">
                  <div className="bar-info">
                    <span>Utilization</span>
                    <b>{Math.round((lc.utilizedUsd / lc.valueUsd) * 100)}%</b>
                  </div>
                  <div className="track">
                    <div className="fill" style={{ width: `${Math.round((lc.utilizedUsd / lc.valueUsd) * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed LC Inspector */}
        {selectedLc && (
          <div className="panel lc-detail-panel">
            <div className="detail-header">
              <div>
                <span className="eyebrow">SELECTED INSTRUMENT DETAILS</span>
                <h2>{selectedLc.buyer}</h2>
                <p className="sub font-mono">LC No: {selectedLc.lcNo} · {selectedLc.type}</p>
              </div>
              <button className="secondary" onClick={() => setAmendmentModal(true)}>
                + Record Amendment
              </button>
            </div>

            <div className="metric-row-3">
              <div>
                <span>Total Instrument Value</span>
                <h3>${selectedLc.valueUsd.toLocaleString()}</h3>
                <small className="up">75% Max B2B Limit</small>
              </div>
              <div>
                <span>B2B LC Entitlement</span>
                <h3>${selectedLc.b2bEntitlementUsd.toLocaleString()}</h3>
                <small className="blue-text">${(selectedLc.b2bEntitlementUsd - selectedLc.b2bUtilizedUsd).toLocaleString()} Available</small>
              </div>
              <div>
                <span>Packing Credit (PC) Cap</span>
                <h3>${selectedLc.packingCreditLimitUsd.toLocaleString()}</h3>
                <small>Working Capital Fund</small>
              </div>
            </div>

            <div className="info-grid-2">
              <div>
                <span>Issuing Bank</span>
                <strong>{selectedLc.issuingBank}</strong>
              </div>
              <div>
                <span>Advising Bank</span>
                <strong>{selectedLc.advisingBank}</strong>
              </div>
              <div>
                <span>Shipment Deadline</span>
                <strong>{selectedLc.shipmentDate}</strong>
              </div>
              <div>
                <span>LC Expiry Date</span>
                <strong>{selectedLc.expiryDate}</strong>
              </div>
              <div>
                <span>Linked Sales Contract</span>
                <strong>{selectedLc.salesContractNo}</strong>
              </div>
              <div>
                <span>Linked Export POs</span>
                <strong>{selectedLc.linkedOrdersCount} Orders Active</strong>
              </div>
            </div>

            {/* Amendments History */}
            <div className="amendments-section">
              <div className="section-title">
                <h4>Amendment Log ({selectedLc.amendments.length})</h4>
              </div>

              {selectedLc.amendments.length === 0 ? (
                <p className="text-muted">No amendments issued yet.</p>
              ) : (
                <div className="amend-list">
                  {selectedLc.amendments.map((am) => (
                    <div key={am.no} className="amend-item">
                      <div className="amend-no">#{am.no}</div>
                      <div>
                        <strong>+${am.amountAdded.toLocaleString()}</strong>
                        <p>{am.reason}</p>
                        <span>Date: {am.date} · Revised Expiry: {am.revisedExpiry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Amendment Modal */}
      {amendmentModal && selectedLc && (
        <div className="overlay" onMouseDown={() => setAmendmentModal(false)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span>MASTER LC AMENDMENT RECORD</span>
                <h2>Amend LC No. {selectedLc.lcNo}</h2>
              </div>
              <button onClick={() => setAmendmentModal(false)}>×</button>
            </div>

            <div className="form-grid">
              <label className="wide">
                Additional Value Increment (USD) *
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={newAmendAmount}
                  onChange={(e) => setNewAmendAmount(e.target.value)}
                />
              </label>

              <label className="wide">
                Reason for Amendment *
                <textarea
                  placeholder="e.g. Order quantity scale up for PO 883192"
                  value={newAmendReason}
                  onChange={(e) => setNewAmendReason(e.target.value)}
                ></textarea>
              </label>
            </div>

            <div className="modal-foot">
              <button className="secondary" onClick={() => setAmendmentModal(false)}>
                Cancel
              </button>
              <button className="primary" onClick={addAmendment}>
                Save Amendment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
