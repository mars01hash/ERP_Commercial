"use client";

import { useState } from "react";

export default function TradeCalculators({ notify }: { notify: (s: string) => void }) {
  // Calculator 1: B2B Entitlement
  const [mlcValue, setMlcValue] = useState<number>(500000);
  const [b2bRatio, setB2bRatio] = useState<number>(75); // 75% standard entitlement limit
  const [fabricRatio, setFabricRatio] = useState<number>(55); // 55% fabric
  const [trimsRatio, setTrimsRatio] = useState<number>(15); // 15% trims
  const [dyesRatio, setDyesRatio] = useState<number>(5); // 5% dyes/wash

  const maxB2B = (mlcValue * b2bRatio) / 100;
  const fabricEntitlement = (mlcValue * fabricRatio) / 100;
  const trimsEntitlement = (mlcValue * trimsRatio) / 100;
  const dyesEntitlement = (mlcValue * dyesRatio) / 100;
  const pcEntitlement = mlcValue - maxB2B;

  // Calculator 2: BGMEA UD Raw Material Wastage Calculator
  const [orderPcs, setOrderPcs] = useState<number>(24000);
  const [gsm, setGsm] = useState<number>(180);
  const [lengthCm, setLengthCm] = useState<number>(72);
  const [chestCm, setChestCm] = useState<number>(54);
  const [wastagePercent, setWastagePercent] = useState<number>(8); // 8% BGMEA approved wastage

  // Weight per piece in kg: (2 * Length * Chest * GSM) / 10,000,000 * (1 + wastage%)
  const rawWeightPerPieceKg = (2 * lengthCm * chestCm * gsm) / 10000000;
  const grossWeightPerPieceKg = rawWeightPerPieceKg * (1 + wastagePercent / 100);
  const totalFabricRequiredKg = grossWeightPerPieceKg * orderPcs;
  const totalYarnRequiredKg = totalFabricRequiredKg * 1.05; // 5% yarn-to-fabric loss

  // Calculator 3: LC Expiry & Presentation Deadline Calculator
  const [shipDate, setShipDate] = useState<string>("2026-09-15");
  const [presentationDays, setPresentationDays] = useState<number>(15);
  const [expiryDate, setExpiryDate] = useState<string>("2026-10-05");

  const calcDeadline = () => {
    if (!shipDate) return "N/A";
    const d = new Date(shipDate);
    d.setDate(d.getDate() + Number(presentationDays));
    return d.toISOString().split("T")[0];
  };

  const deadlineStr = calcDeadline();
  const isExpiredBeforeDeadline = expiryDate && deadlineStr !== "N/A" ? new Date(expiryDate) < new Date(deadlineStr) : false;

  return (
    <div className="calculators-page">
      <div className="calc-grid">
        {/* Calculator 1 */}
        <div className="panel calc-card">
          <div className="calc-head">
            <span className="calc-badge">EXPORT & IMPORT FINANCE</span>
            <h3>Master LC to Back-to-Back LC Entitlement Calculator</h3>
            <p>Calculate maximum permissible B2B LCs against Master LC value under Bangladesh Bank trade guidelines.</p>
          </div>

          <div className="calc-form">
            <label>
              Master LC / Sales Contract Value (USD)
              <input
                type="number"
                value={mlcValue}
                onChange={(e) => setMlcValue(Number(e.target.value) || 0)}
              />
            </label>

            <div className="calc-row">
              <label>
                Max B2B Limit (%)
                <input
                  type="number"
                  value={b2bRatio}
                  onChange={(e) => setB2bRatio(Number(e.target.value) || 0)}
                />
              </label>
              <label>
                Fabric Entitlement (%)
                <input
                  type="number"
                  value={fabricRatio}
                  onChange={(e) => setFabricRatio(Number(e.target.value) || 0)}
                />
              </label>
            </div>

            <div className="calc-row">
              <label>
                Trims & Accessories (%)
                <input
                  type="number"
                  value={trimsRatio}
                  onChange={(e) => setTrimsRatio(Number(e.target.value) || 0)}
                />
              </label>
              <label>
                Dyes & Chemicals (%)
                <input
                  type="number"
                  value={dyesRatio}
                  onChange={(e) => setDyesRatio(Number(e.target.value) || 0)}
                />
              </label>
            </div>
          </div>

          <div className="calc-result">
            <div className="result-row highlight">
              <span>Total B2B Entitlement (Cap)</span>
              <strong>${maxB2B.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
            </div>
            <div className="result-grid-mini">
              <div>
                <span>Fabric Limit</span>
                <b>${fabricEntitlement.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b>
              </div>
              <div>
                <span>Trims Limit</span>
                <b>${trimsEntitlement.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b>
              </div>
              <div>
                <span>Dyes/Chemicals</span>
                <b>${dyesEntitlement.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b>
              </div>
              <div>
                <span>Packing Credit (PC) Margin</span>
                <b>${pcEntitlement.toLocaleString(undefined, { maximumFractionDigits: 2 })}</b>
              </div>
            </div>
            <button className="secondary small-btn" onClick={() => notify("B2B Entitlement schedule copied to clipboard.")}>
              📋 Copy Summary
            </button>
          </div>
        </div>

        {/* Calculator 2 */}
        <div className="panel calc-card">
          <div className="calc-head">
            <span className="calc-badge violet">BGMEA / BKMEA UD STANDARDS</span>
            <h3>Raw Material Consumption & Wastage Calculator</h3>
            <p>Determine required yarn and knit/woven fabric in kg for BGMEA Utilization Declaration (UD) submission.</p>
          </div>

          <div className="calc-form">
            <div className="calc-row">
              <label>
                Order Quantity (Pcs)
                <input
                  type="number"
                  value={orderPcs}
                  onChange={(e) => setOrderPcs(Number(e.target.value) || 0)}
                />
              </label>
              <label>
                Fabric GSM (g/m²)
                <input
                  type="number"
                  value={gsm}
                  onChange={(e) => setGsm(Number(e.target.value) || 0)}
                />
              </label>
            </div>

            <div className="calc-row">
              <label>
                Body Length (cm)
                <input
                  type="number"
                  value={lengthCm}
                  onChange={(e) => setLengthCm(Number(e.target.value) || 0)}
                />
              </label>
              <label>
                Half Chest (cm)
                <input
                  type="number"
                  value={chestCm}
                  onChange={(e) => setChestCm(Number(e.target.value) || 0)}
                />
              </label>
            </div>

            <label>
              BGMEA Approved Wastage Allowance (%)
              <input
                type="number"
                value={wastagePercent}
                onChange={(e) => setWastagePercent(Number(e.target.value) || 0)}
              />
            </label>
          </div>

          <div className="calc-result">
            <div className="result-row highlight">
              <span>Total Fabric Consumption (Kg)</span>
              <strong>{totalFabricRequiredKg.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg</strong>
            </div>
            <div className="result-grid-mini">
              <div>
                <span>Raw Wt / Pc</span>
                <b>{(rawWeightPerPieceKg * 1000).toFixed(1)} g</b>
              </div>
              <div>
                <span>Gross Wt / Dozen</span>
                <b>{(grossWeightPerPieceKg * 12).toFixed(2)} kg</b>
              </div>
              <div>
                <span>Total Yarn Req (kg)</span>
                <b>{totalYarnRequiredKg.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg</b>
              </div>
              <div>
                <span>Wastage Qty</span>
                <b>{(totalFabricRequiredKg * (wastagePercent / 100)).toFixed(1)} kg</b>
              </div>
            </div>
            <button className="secondary small-btn" onClick={() => notify("UD Fabric calculation saved to draft.")}>
              💾 Save to UD Draft
            </button>
          </div>
        </div>

        {/* Calculator 3 */}
        <div className="panel calc-card">
          <div className="calc-head">
            <span className="calc-badge amber">UCP 600 COMPLIANCE</span>
            <h3>Bank Presentation & Expiry Cushion Checker</h3>
            <p>Verify compliance with UCP 600 Article 14(c) presentation period and LC expiry buffer.</p>
          </div>

          <div className="calc-form">
            <label>
              Bill of Lading (BL) / Shipment Date
              <input
                type="date"
                value={shipDate}
                onChange={(e) => setShipDate(e.target.value)}
              />
            </label>

            <div className="calc-row">
              <label>
                Presentation Days Period
                <input
                  type="number"
                  value={presentationDays}
                  onChange={(e) => setPresentationDays(Number(e.target.value) || 0)}
                />
              </label>
              <label>
                Master LC Expiry Date
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="calc-result">
            <div className={`result-row ${isExpiredBeforeDeadline ? "danger-alert" : "highlight"}`}>
              <span>Max Bank Presentation Deadline</span>
              <strong>{deadlineStr}</strong>
            </div>
            <div className="result-grid-mini">
              <div>
                <span>LC Expiry Date</span>
                <b>{expiryDate || "Not Set"}</b>
              </div>
              <div>
                <span>Status Risk</span>
                <b className={isExpiredBeforeDeadline ? "danger-text" : "up"}>
                  {isExpiredBeforeDeadline ? "CRITICAL RISK" : "COMPLIANT"}
                </b>
              </div>
            </div>
            {isExpiredBeforeDeadline && (
              <p className="danger-note">
                ⚠️ Warning: Presentation deadline exceeds LC Expiry Date! Obtain LC amendment for expiry extension before shipping.
              </p>
            )}
            <button className="secondary small-btn" onClick={() => notify("Presentation deadline calculated.")}>
              📅 Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
