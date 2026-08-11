"use client";

import { useState } from "react";
import { CommercialMaster } from "../types/commercial";

interface MastersViewProps {
  notify: (msg: string) => void;
}

const initialMasters: CommercialMaster[] = [
  { category: "Banks", code: "HSBC-BD", name: "HSBC Bangladesh", country: "Bangladesh / HK", details: "Advising & Issuing Bank · SWIFT: HSBCBDDH", status: "Active" },
  { category: "Banks", code: "SCB-BD", name: "Standard Chartered Bank", country: "Bangladesh / UK", details: "Negotiating & Opening Bank · SWIFT: SCBLBDDX", status: "Active" },
  { category: "Banks", code: "EBL-BD", name: "Eastern Bank PLC", country: "Bangladesh", details: "Local B2B & ERQ Account Bank · SWIFT: EBLBDDH", status: "Active" },
  { category: "Buyers", code: "BUY-HM", name: "H&M Hennes & Mauritz", country: "Sweden", details: "Payment Terms: At Sight LC · Annual Volume $15M+", status: "Active" },
  { category: "Buyers", code: "BUY-CA", name: "C&A Buying GmbH", country: "Germany", details: "Payment Terms: 60 Days Sales Contract / LC", status: "Active" },
  { category: "Buyers", code: "BUY-NXT", name: "NEXT Retail Ltd", country: "United Kingdom", details: "Payment Terms: At Sight LC · Fast Track Clearance", status: "Active" },
  { category: "Suppliers", code: "SUP-NGB", name: "Ningbo Textile Co. Ltd.", country: "China", details: "Woven & Knit Fabrics · Contact: Sales Division 02", status: "Active" },
  { category: "Suppliers", code: "SUP-YKK", name: "YKK Bangladesh Ltd.", country: "Bangladesh / Japan", details: "Zippers & Fasteners · EPZ Dhaka Unit", status: "Active" },
  { category: "Ports", code: "PORT-CGP", name: "Chattogram Sea Port (CGP)", country: "Bangladesh", details: "Main Export/Import Sea Terminal · Code: BDCGP", status: "Active" },
  { category: "Ports", code: "PORT-DAC", name: "Hazrat Shahjalal Int'l Airport (DAC)", country: "Bangladesh", details: "Air Cargo Terminal · Code: BDDAC", status: "Active" },
  { category: "HS Codes", code: "HS-6006.22", name: "Knit Fabric (Dyed Cotton)", country: "Global WCO", details: "Duty Rate 0% under Bonded Warehouse License", status: "Active" },
  { category: "HS Codes", code: "HS-6109.10", name: "T-Shirts & Singlets (Knit)", country: "Global WCO", details: "Export Category · RMG Entitlement Tag", status: "Active" },
];

export default function MastersView({ notify }: MastersViewProps) {
  const [masters] = useState<CommercialMaster[]>(initialMasters);
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const filtered = masters.filter((m) => selectedCat === "All" || m.category === selectedCat);

  return (
    <div className="masters-module">
      <div className="panel masters-panel">
        <div className="panel-head">
          <div>
            <span>MASTER DATA MANAGEMENT</span>
            <h3>Commercial Entities & Reference Masters</h3>
          </div>
          <div className="actions">
            <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
              <option value="All">All Categories ({masters.length})</option>
              <option value="Banks">Banks & Branches</option>
              <option value="Buyers">Buyers & Buying Houses</option>
              <option value="Suppliers">Raw Material Suppliers</option>
              <option value="Ports">Ports & Destinations</option>
              <option value="HS Codes">HS Codes & Duty</option>
            </select>
            <button className="primary" onClick={() => notify("Master entity editor opened.")}>
              + Add Master Record
            </button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>CODE</th>
                <th>ENTITY / NAME</th>
                <th>COUNTRY / ORIGIN</th>
                <th>OPERATIONAL DETAILS</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <span className="pill info">{item.category}</span>
                  </td>
                  <td>
                    <strong>{item.code}</strong>
                  </td>
                  <td>
                    <strong>{item.name}</strong>
                  </td>
                  <td>
                    <strong>{item.country}</strong>
                  </td>
                  <td>
                    <span>{item.details}</span>
                  </td>
                  <td>
                    <span className="pill success">{item.status}</span>
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`Editing master record for ${item.name}`)}
                    >
                      Edit
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
