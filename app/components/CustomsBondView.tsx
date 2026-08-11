"use client";

import { useState } from "react";
import { CustomsUDItem } from "../types/commercial";

interface CustomsBondViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialUDs: CustomsUDItem[] = [
  {
    id: "UD-2026-0044",
    udNo: "BGMEA-UD-2026-88192",
    bgmeaRefNo: "BGMEA/MEM/2026/4891",
    linkedMasterLcNo: "MLC-2026-0048 (H&M)",
    buyer: "H&M Hennes & Mauritz",
    exportEntitlementPcs: 120000,
    fabricEntitlementKg: 28400,
    yarnEntitlementKg: 30000,
    usedFabricKg: 21800,
    usedYarnKg: 22890,
    issueDate: "2026-05-18",
    expiryDate: "2026-11-20",
    status: "Active",
  },
  {
    id: "UD-2026-0038",
    udNo: "BGMEA-UD-2026-77102",
    bgmeaRefNo: "BGMEA/MEM/2026/3810",
    linkedMasterLcNo: "SC-2026-0031 (C&A)",
    buyer: "C&A Buying GmbH",
    exportEntitlementPcs: 85000,
    fabricEntitlementKg: 19500,
    yarnEntitlementKg: 20500,
    usedFabricKg: 18200,
    usedYarnKg: 19100,
    issueDate: "2026-04-22",
    expiryDate: "2026-10-15",
    status: "Amendment required",
  },
  {
    id: "UD-2026-0049",
    udNo: "BKMEA-UD-2026-90412",
    bgmeaRefNo: "BKMEA/MEM/2026/1029",
    linkedMasterLcNo: "MLC-2026-0041 (NEXT)",
    buyer: "NEXT Retail Ltd",
    exportEntitlementPcs: 55000,
    fabricEntitlementKg: 12800,
    yarnEntitlementKg: 13500,
    usedFabricKg: 4200,
    usedYarnKg: 4400,
    issueDate: "2026-06-10",
    expiryDate: "2026-12-10",
    status: "Pending approval",
  },
];

export default function CustomsBondView({ notify, setModal }: CustomsBondViewProps) {
  const [uds, setUds] = useState<CustomsUDItem[]>(initialUDs);
  const [activeTab, setActiveTab] = useState<"ud" | "be" | "bond">("ud");

  return (
    <div className="customs-module">
      <div className="sub-tabs">
        <button className={activeTab === "ud" ? "active" : ""} onClick={() => setActiveTab("ud")}>
          BGMEA / BKMEA Utilization Declaration (UD)
        </button>
        <button className={activeTab === "be" ? "active" : ""} onClick={() => setActiveTab("be")}>
          Customs Bills of Entry (C-Number Desk)
        </button>
        <button className={activeTab === "bond" ? "active" : ""} onClick={() => setActiveTab("bond")}>
          Bonded Warehouse Stock Ledger
        </button>
      </div>

      {activeTab === "ud" && (
        <div className="panel customs-panel">
          <div className="panel-head">
            <div>
              <span>CUSTOMS & REGULATORY COMPLIANCE</span>
              <h3>Utilization Declaration (UD) Register</h3>
            </div>
            <button className="primary" onClick={() => setModal(true)}>
              + Apply for New UD
            </button>
          </div>

          <div className="ud-grid">
            {uds.map((ud) => (
              <div key={ud.id} className="ud-card">
                <div className="ud-head">
                  <strong>{ud.udNo}</strong>
                  <span className={`pill ${ud.status === "Active" ? "success" : ud.status === "Amendment required" ? "warning" : "info"}`}>
                    {ud.status}
                  </span>
                </div>

                <p className="ud-sub">Buyer: {ud.buyer} · Link: {ud.linkedMasterLcNo}</p>
                <small className="ud-ref">BGMEA Ref: {ud.bgmeaRefNo}</small>

                <div className="ud-progress-block">
                  <div className="prog-title">
                    <span>Fabric Entitlement Usage</span>
                    <b>{ud.usedFabricKg.toLocaleString()} / {ud.fabricEntitlementKg.toLocaleString()} kg</b>
                  </div>
                  <div className="track">
                    <div
                      className="fill"
                      style={{ width: `${Math.min(100, Math.round((ud.usedFabricKg / ud.fabricEntitlementKg) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                <div className="ud-foot-grid">
                  <div>
                    <span>Export Pcs</span>
                    <strong>{ud.exportEntitlementPcs.toLocaleString()} pcs</strong>
                  </div>
                  <div>
                    <span>Expiry Date</span>
                    <strong>{ud.expiryDate}</strong>
                  </div>
                </div>

                <div className="ud-actions">
                  <button className="secondary small-btn" onClick={() => notify(`UD Amendment application created for ${ud.udNo}`)}>
                    Apply Amendment
                  </button>
                  <button className="secondary small-btn" onClick={() => notify(`Wastage audit sheet exported for ${ud.udNo}`)}>
                    Audit Sheet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "be" && (
        <div className="panel customs-panel">
          <div className="panel-head">
            <div>
              <span>CHATTOGRAM & DHAKA CUSTOM HOUSE</span>
              <h3>Bill of Entry (B/E) Assessment Register</h3>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>B/E C-NUMBER</th>
                  <th>PORT & CUSTOM HOUSE</th>
                  <th>HS CODE & MATERIAL</th>
                  <th>ASSESSABLE VALUE (BDT)</th>
                  <th>DUTY EXEMPTION</th>
                  <th>FILED DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>C-182940</b></td>
                  <td>Chattogram Custom House</td>
                  <td>HS 6006.22 · Knit Fabric</td>
                  <td>BDT 4,820,000</td>
                  <td>100% Bonded Exempted</td>
                  <td>10 Aug 2026</td>
                  <td><span className="pill warning">Assessment</span></td>
                </tr>
                <tr>
                  <td><b>C-181092</b></td>
                  <td>Dhaka Air Cargo Customs</td>
                  <td>HS 9607.11 · Zippers & Trims</td>
                  <td>BDT 1,140,000</td>
                  <td>100% Bonded Exempted</td>
                  <td>08 Aug 2026</td>
                  <td><span className="pill success">Cleared</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "bond" && (
        <div className="panel customs-panel">
          <div className="panel-head">
            <div>
              <span>CUSTOMS BOND COMMISSIONERATE</span>
              <h3>Bonded Warehouse Balance Ledger</h3>
            </div>
          </div>
          <div className="bond-summary-grid">
            <div className="bond-box">
              <span>Fabric Bond Stock Balance</span>
              <h2>42,850 Kg</h2>
              <small className="up">3 License Warehouses</small>
            </div>
            <div className="bond-box">
              <span>Yarn Stock Balance</span>
              <h2>18,400 Kg</h2>
              <small>Spinning & Dyeing Units</small>
            </div>
            <div className="bond-box">
              <span>Trims & Accessories</span>
              <h2>840,000 Pcs</h2>
              <small>Carton Storage</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
