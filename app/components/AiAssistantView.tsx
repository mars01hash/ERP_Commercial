"use client";

import { useState } from "react";
import { AiAnalysisItem } from "../types/commercial";

interface AiAssistantViewProps {
  notify: (msg: string) => void;
}

const sampleAnalyses: AiAnalysisItem[] = [
  {
    id: "AI-2026-0091",
    targetDocument: "Master LC # 0286IMPE260045 (HSBC Hong Kong)",
    docType: "Master LC",
    aiConfidenceScore: 98.4,
    detectedMismatchesCount: 2,
    riskSummary: "Presentation period (14 days) is tighter than shipment deadline buffer (21 days). Partial shipment clause requires strict container-wise packing match.",
    aiRecommendations: [
      "Request buyer amendment to extend document presentation period from 14 days to 21 days.",
      "Ensure Commercial Invoice port description matches SWIFT Field 44E exactly ('CHATTOGRAM CY' instead of 'CHITTAGONG PORT').",
    ],
    analyzedTimestamp: "2026-08-11 23:45",
  },
  {
    id: "AI-2026-0088",
    targetDocument: "Supplier Proforma Invoice PI-HTX-2026-881 (Shaoxing Huatex)",
    docType: "Proforma Invoice",
    aiConfidenceScore: 96.2,
    detectedMismatchesCount: 1,
    riskSummary: "Fabric GSM (180 GSM) has a +3% variance against Merchandising handover specification (175 GSM). BGMEA UD entitlement ratio remains valid.",
    aiRecommendations: [
      "Confirm fabric weight tolerance with Merchandising lead before opening B2B LC.",
      "Ensure HS Code 6006.22 (Dyed Cotton Knit Fabric) is declared on Bill of Entry.",
    ],
    analyzedTimestamp: "2026-08-10 14:20",
  },
];

export default function AiAssistantView({ notify }: AiAssistantViewProps) {
  const [analyses] = useState<AiAnalysisItem[]>(sampleAnalyses);
  const [draftingPrompt, setDraftingPrompt] = useState("Request LC expiry amendment from H&M buyer");
  const [draftResult, setDraftResult] = useState("");

  const generateEmailDraft = () => {
    setDraftResult(
      `SUBJECT: Urgent Amendment Request - Master LC 0286IMPE260045 / PO 7844501\n\nDear H&M Commercial Team,\n\nWe kindly request an amendment for Master LC 0286IMPE260045 regarding PO 7844501 (Mens Core Crew Neck Tee):\n\n1. Latest Shipment Date: Extend to October 31, 2026\n2. Presentation Period: Extend to 21 days after shipment date\n\nThis will ensure full compliance with bank presentation guidelines. Please confirm SWIFT issuance at your earliest convenience.\n\nBest regards,\nMahin Rahman\nHead of Commercial, Northern Basics Ltd.`
    );
    notify("AI email draft generated successfully.");
  };

  return (
    <div className="ai-assistant-module space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="panel p-4 flex flex-col justify-between border-l-4 border-cyan-500">
          <span className="text-xs text-gray-400 font-semibold uppercase">Document Intelligence Engine</span>
          <h3 className="text-xl font-bold text-gray-100 mt-1">98.4% Optical Scan Precision</h3>
          <p className="text-xs text-gray-400 mt-1">Automated SWIFT, LC, PI & BL discrepancy extraction</p>
        </div>
        <div className="panel p-4 flex flex-col justify-between border-l-4 border-amber-500">
          <span className="text-xs text-gray-400 font-semibold uppercase">Predictive Delay AI</span>
          <h3 className="text-xl font-bold text-amber-400 mt-1">Low Demurrage Risk</h3>
          <p className="text-xs text-gray-400 mt-1">Predicted customs clearance lead time: 2.4 days</p>
        </div>
        <div className="panel p-4 flex flex-col justify-between border-l-4 border-emerald-500">
          <span className="text-xs text-gray-400 font-semibold uppercase">Lien Bank Optimization</span>
          <h3 className="text-xl font-bold text-emerald-400 mt-1">Standard Chartered Recommended</h3>
          <p className="text-xs text-gray-400 mt-1">Lowest negotiation commission rate (0.125%)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Document Intelligence Analyses */}
        <div className="panel flex flex-col gap-4">
          <div className="panel-head flex justify-between items-center">
            <div>
              <span>AI DOCUMENT INTELLIGENCE & DISCREPANCY AUDIT</span>
              <h3>Automated LC Clause & PI Mismatch Checker</h3>
            </div>
          </div>

          <div className="space-y-4">
            {analyses.map((item) => (
              <div key={item.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="badge info">{item.docType} Scan</span>
                  <span className="text-xs font-mono text-cyan-400">
                    Confidence: {item.aiConfidenceScore}%
                  </span>
                </div>
                <h4 className="font-bold text-gray-200">{item.targetDocument}</h4>
                <p className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-800/50">
                  ⚠️ {item.riskSummary}
                </p>
                <div className="space-y-1 pt-2">
                  <span className="text-xs text-gray-400 font-semibold block">AI RECOMMENDATIONS:</span>
                  {item.aiRecommendations.map((rec, i) => (
                    <div key={i} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Decision Assistance & Email Drafter */}
        <div className="panel flex flex-col gap-4">
          <div className="panel-head">
            <div>
              <span>AI DECISION ASSISTANCE & CORRESPONDENCE GENERATOR</span>
              <h3>Automated Buyer, Bank & Supplier Email Drafter</h3>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs text-gray-400 font-semibold">Select Correspondence Intent:</label>
            <select
              className="bg-gray-900 border border-gray-700 text-sm rounded p-2 text-gray-200"
              value={draftingPrompt}
              onChange={(e) => setDraftingPrompt(e.target.value)}
            >
              <option value="Request LC expiry amendment from H&M buyer">
                Request LC Expiry Amendment (H&M Buyer)
              </option>
              <option value="Urgent Shipping Line Container Demurrage Waiver">
                Urgent Container Demurrage Waiver (Maersk)
              </option>
              <option value="Bank Negotiation Cover Schedule Cover Letter">
                Bank Export Negotiation Cover Schedule Letter
              </option>
            </select>

            <button className="primary" onClick={generateEmailDraft}>
              ⚡ Generate AI Email Draft
            </button>

            {draftResult && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400 font-semibold">AI GENERATED DRAFT:</span>
                  <button
                    className="btn-sm"
                    onClick={() => {
                      navigator.clipboard?.writeText(draftResult);
                      notify("Email draft copied to clipboard!");
                    }}
                  >
                    📋 Copy Text
                  </button>
                </div>
                <textarea
                  className="w-full h-56 bg-gray-950 border border-gray-800 text-xs font-mono text-gray-200 p-3 rounded leading-relaxed"
                  value={draftResult}
                  readOnly
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
