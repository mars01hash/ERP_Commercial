"use client";

import { useState } from "react";
import { RecordRow } from "../types/commercial";

interface RecordDrawerProps {
  drawer: RecordRow | null;
  onClose: () => void;
  notify: (msg: string) => void;
}

export default function RecordDrawer({ drawer, onClose, notify }: RecordDrawerProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "finance" | "docs" | "timeline">("summary");

  if (!drawer) return null;

  const statusClass = (s: string) => {
    const st = s.toLowerCase();
    if (/(active|ready|cleared|realized|accepted|confirmed|issued)/.test(st)) return "success";
    if (/(critical|high risk|hold|discrepancy|missing)/.test(st)) return "danger";
    if (/(pending|due|assessment|awaiting|requested|draft|planning|open|running|required)/.test(st)) return "warning";
    return "info";
  };

  return (
    <div className="drawer-overlay" onMouseDown={onClose}>
      <aside className="drawer rich-drawer" onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawer-top">
          <span className={`pill ${statusClass(drawer.status)}`}>{drawer.status}</span>
          <button onClick={onClose} aria-label="Close drawer">×</button>
        </div>

        <p className="drawer-id">{drawer.id}</p>
        <h2>{drawer.title}</h2>
        <p className="drawer-party">{drawer.party}</p>

        {/* Financial banner */}
        <div className="drawer-value">
          <span>Transaction Recorded Value</span>
          <strong>{drawer.amount}</strong>
          <small className="sub-text">Reference: {drawer.ref}</small>
        </div>

        {/* Tabs */}
        <div className="drawer-tabs">
          <button className={activeTab === "summary" ? "active" : ""} onClick={() => setActiveTab("summary")}>
            Overview
          </button>
          <button className={activeTab === "finance" ? "active" : ""} onClick={() => setActiveTab("finance")}>
            Financial Ledger
          </button>
          <button className={activeTab === "docs" ? "active" : ""} onClick={() => setActiveTab("docs")}>
            Documents
          </button>
          <button className={activeTab === "timeline" ? "active" : ""} onClick={() => setActiveTab("timeline")}>
            Workflow Audit
          </button>
        </div>

        {activeTab === "summary" && (
          <div className="drawer-tab-content">
            <div className="detail-grid">
              <div>
                <span>Reference Ref</span>
                <strong>{drawer.ref}</strong>
              </div>
              <div>
                <span>Key Target Date</span>
                <strong>{drawer.date}</strong>
              </div>
              <div>
                <span>Commercial Desk Owner</span>
                <strong>Unit 02 Commercial Team</strong>
              </div>
              <div>
                <span>Compliance Verification</span>
                <strong className="up">BGMEA / UCP 600 Verified</strong>
              </div>
            </div>

            <h3>Operational Overview</h3>
            <p className="drawer-desc">
              Record <strong>{drawer.id}</strong> is registered under party <strong>{drawer.party}</strong>.
              All trade documents, LC entitlements, and bank notifications are linked to this transaction file.
            </p>
          </div>
        )}

        {activeTab === "finance" && (
          <div className="drawer-tab-content">
            <div className="fin-ledger-card">
              <div className="ledger-row">
                <span>Gross Value</span>
                <strong>{drawer.amount}</strong>
              </div>
              <div className="ledger-row">
                <span>Margin Allocation</span>
                <strong>0% (100% Entitled)</strong>
              </div>
              <div className="ledger-row">
                <span>Bank Commission & Stamp</span>
                <strong>$450.00</strong>
              </div>
              <div className="ledger-row highlight">
                <span>Net Exposure Balance</span>
                <strong className="up">{drawer.amount}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="drawer-tab-content">
            <div className="doc-checklist">
              <div className="chk-item done">
                <i>✓</i>
                <div>
                  <strong>Master LC / Sales Contract Copy</strong>
                  <span>Verified by Commercial Desk</span>
                </div>
              </div>
              <div className="chk-item done">
                <i>✓</i>
                <div>
                  <strong>Proforma Invoice & Packing List</strong>
                  <span>Supplier Attested</span>
                </div>
              </div>
              <div className="chk-item pending">
                <i>◷</i>
                <div>
                  <strong>BGMEA Utilization Declaration (UD)</strong>
                  <span>Pending approval</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="drawer-tab-content">
            <div className="timeline">
              <div className="done">
                <i>✓</i>
                <p>
                  <b>Record Created</b>
                  <span>Verified against merchandising handover</span>
                </p>
              </div>
              <div className="done">
                <i>✓</i>
                <p>
                  <b>Commercial QC Check</b>
                  <span>Completed by Nabila Rahman</span>
                </p>
              </div>
              <div>
                <i>3</i>
                <p>
                  <b>Bank / Customs Processing</b>
                  <span>Current operational stage · SLA 2 days</span>
                </p>
              </div>
              <div>
                <i>4</i>
                <p>
                  <b>Final Realization & Close</b>
                  <span>Pending stage 3 completion</span>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="drawer-actions">
          <button className="secondary" onClick={() => notify("Commercial Checklist exported.")}>
            Checklist
          </button>
          <button
            className="primary"
            onClick={() => {
              notify(`Record ${drawer.id} advanced to next stage.`);
              onClose();
            }}
          >
            Advance Stage →
          </button>
        </div>
      </aside>
    </div>
  );
}
