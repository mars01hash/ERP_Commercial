"use client";

import { useState } from "react";
import { GroupLCPool } from "../types/commercial";

interface GroupLcViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialGroupPools: GroupLCPool[] = [
  {
    id: "GRP-2026-0012",
    groupLcNo: "GRP-HM-GLOBAL-2026",
    holdingGroup: "Northern Group Holdings Ltd.",
    buyer: "H&M Hennes & Mauritz",
    issuingBank: "HSBC Hong Kong",
    totalPooledValueUsd: 4500000,
    allocatedValueUsd: 3284500,
    expiryDate: "2026-11-30",
    status: "Active",
    unitAllocations: [
      { unitName: "Northern Basics Ltd. (Unit 02 · Gazipur)", allocatedUsd: 1284500, b2bUtilizedUsd: 742100 },
      { unitName: "Northern Apparels (Unit 01 · Savar)", allocatedUsd: 1200000, b2bUtilizedUsd: 680000 },
      { unitName: "Northern SEZ Knitwear (Chittagong EPZ)", allocatedUsd: 800000, b2bUtilizedUsd: 450000 },
    ],
  },
  {
    id: "GRP-2026-0008",
    groupLcNo: "GRP-CA-GLOBAL-881",
    holdingGroup: "Northern Group Holdings Ltd.",
    buyer: "C&A Buying GmbH",
    issuingBank: "ING Bank N.V.",
    totalPooledValueUsd: 2500000,
    allocatedValueUsd: 1842750,
    expiryDate: "2026-10-15",
    status: "Active",
    unitAllocations: [
      { unitName: "Northern Basics Ltd. (Unit 02 · Gazipur)", allocatedUsd: 842750, b2bUtilizedUsd: 512900 },
      { unitName: "Northern Apparels (Unit 01 · Savar)", allocatedUsd: 1000000, b2bUtilizedUsd: 610000 },
    ],
  },
];

export default function GroupLcView({ notify, setModal }: GroupLcViewProps) {
  const [pools] = useState<GroupLCPool[]>(initialGroupPools);

  return (
    <div className="group-lc-module">
      <div className="panel group-panel">
        <div className="panel-head">
          <div>
            <span>HOLDING & GROUP TRADE FINANCE</span>
            <h3>Group LC Pooling & Inter-Factory Allocation Desk</h3>
          </div>
          <button className="primary" onClick={() => setModal(true)}>
            + Register Group LC Pool
          </button>
        </div>

        <div className="metric-row-3">
          <div>
            <span>Total Group Pooled Value</span>
            <h3>$7.00M</h3>
            <small className="blue-text">Across 2 Holding Master LCs</small>
          </div>
          <div>
            <span>Allocated to Business Units</span>
            <h3>$5.13M</h3>
            <small className="up">$1.87M Unallocated Reserve</small>
          </div>
          <div>
            <span>Participating Units</span>
            <h3>3 Factories</h3>
            <small>Gazipur, Savar & Chittagong EPZ</small>
          </div>
        </div>

        <div className="group-cards-list">
          {pools.map((pool) => (
            <div key={pool.id} className="group-card">
              <div className="card-top">
                <div>
                  <span className="pill info">{pool.id}</span>
                  <h3 className="group-title">Group LC Ref: {pool.groupLcNo}</h3>
                  <p className="sub">Buyer: {pool.buyer} · Issuing Bank: {pool.issuingBank}</p>
                </div>
                <div className="pool-value">
                  <span>Total Pooled Capacity</span>
                  <strong>${pool.totalPooledValueUsd.toLocaleString()}</strong>
                </div>
              </div>

              {/* Allocation Bar */}
              <div className="lc-util-bar">
                <div className="bar-info">
                  <span>Allocated Capacity (${pool.allocatedValueUsd.toLocaleString()})</span>
                  <b>{Math.round((pool.allocatedValueUsd / pool.totalPooledValueUsd) * 100)}% Allocated</b>
                </div>
                <div className="track">
                  <div className="fill" style={{ width: `${Math.round((pool.allocatedValueUsd / pool.totalPooledValueUsd) * 100)}%` }}></div>
                </div>
              </div>

              {/* Unit Allocation Table */}
              <div className="unit-table">
                <h4>Unit Allocation Breakdown</h4>
                <table>
                  <thead>
                    <tr>
                      <th>BUSINESS UNIT / FACTORY</th>
                      <th>ALLOCATED EXPORT LC</th>
                      <th>B2B LC UTILIZED</th>
                      <th>REMAINING CAPACITY</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pool.unitAllocations.map((unit, idx) => (
                      <tr key={idx}>
                        <td>
                          <strong>{unit.unitName}</strong>
                        </td>
                        <td>
                          <strong>${unit.allocatedUsd.toLocaleString()}</strong>
                        </td>
                        <td>
                          <span>${unit.b2bUtilizedUsd.toLocaleString()}</span>
                        </td>
                        <td>
                          <strong className="up">${(unit.allocatedUsd - unit.b2bUtilizedUsd).toLocaleString()}</strong>
                        </td>
                        <td>
                          <button
                            className="secondary small-btn"
                            onClick={() => notify(`Reallocated limit for ${unit.unitName}`)}
                          >
                            Reallocate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
