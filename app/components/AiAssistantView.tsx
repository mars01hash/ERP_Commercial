"use client";

import { useState } from "react";
import { AiAnalysisItem } from "../types/commercial";

interface AiAssistantViewProps {
  notify: (msg: string) => void;
}

const initialAnalyses: AiAnalysisItem[] = [
  {
    id: "AI-2026-001",
    documentType: "Master Export LC Scan (UCP 600)",
    documentRef: "LC No. 0286IMPE260045 (H&M)",
    scanDate: "2026-08-11",
    discrepancyCount: 2,
    confidenceScore: 98.4,
    summaryFindings: "Soft clause detected in Clause 47A requiring Certificate of Inspection signed by buyer's designated surveyor.",
    suggestedAction: "Request H&M Merchandising amendment to delete clause or issue advance authorization letter prior to shipment.",
  },
  {
    id: "AI-2026-002",
    documentType: "Export Document Set vs Proforma Invoice",
    documentRef: "DOC-2026-0132 (NEXT Retail)",
    scanDate: "2026-08-10",
    discrepancyCount: 1,
    confidenceScore: 99.1,
    summaryFindings: "Port of Loading spelling typo: 'Chittagong, Bangladesh' on Bill of Lading vs 'Chattogram' on EXP Form.",
    suggestedAction: "Instruct Freight Forwarder to issue BL Addendum #1 correcting spelling to match EXP Form exactly.",
  },
  {
    id: "AI-2026-003",
    documentType: "BGMEA UD Wastage Entitlement Check",
    documentRef: "UD-2026-88192 (Knitwear Entitlement)",
    scanDate: "2026-08-08",
    discrepancyCount: 0,
    confidenceScore: 100.0,
    summaryFindings: "Entitlement balance fully compliant. Fabric consumption 0.185 kg/dz within BGMEA 5% tolerance limit.",
    suggestedAction: "Proceed with Back-to-Back LC opening for $410,000 USD without custom bond amendment.",
  },
];

export default function AiAssistantView({ notify }: AiAssistantViewProps) {
  const [analyses] = useState<AiAnalysisItem[]>(initialAnalyses);
  const [prompt, setPrompt] = useState<string>("");
  const [draftResult, setDraftResult] = useState<string>("");

  const handleDraftEmail = (type: string) => {
    if (type === "amendment") {
      setDraftResult(
        `SUBJECT: Urgent Request for LC Amendment - LC No. 0286IMPE260045 (H&M)\n\n` +
        `Dear H&M Commercial Team,\n\n` +
        `Thank you for issuing Master LC 0286IMPE260045. Upon AI discrepancy review under UCP 600 guidelines, we noted a soft clause in Field 47A requiring an inspection certificate signed by buyer's local representative.\n\n` +
        `To avoid document negotiation hold at Standard Chartered Bank Dhaka, kindly issue SC Amendment #1 removing this clause or authorizing local release by August 14, 2026.\n\n` +
        `Best regards,\nMahin Rahman (Head of Commercial)`
      );
    } else {
      setDraftResult(
        `SUBJECT: Forwarder Booking Instruction & Container Cut-Off Confirmation\n\n` +
        `Dear Kuehne+Nagel Logistics Team,\n\n` +
        `Please find attached export booking documentation for PO 7844501 (1×40HC container). Cargo ex-factory date is fixed for August 15, 2026.\n\n` +
        `Kindly issue Shipping Order (SO) and confirm Chattogram Port Cut-Off date.\n\n` +
        `Best regards,\nMahin Rahman`
      );
    }
  };

  return (
    <div className="ai-assistant-module space-y-6">
      {/* Top AI Feature Header */}
      <div className="panel p-6 bg-gradient-to-r from-sky-50 via-teal-50 to-blue-50 border border-sky-100 flex justify-between items-center shadow-sm">
        <div>
          <span className="text-xs text-sky-700 font-mono tracking-widest uppercase font-bold">
            ⚡ THREADLINE AI DOCUMENT INTELLIGENCE & PREDICTIVE ANALYTICS
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">UCP 600 Discrepancy Engine & Auto Email Drafter</h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">Scans LC text, PI terms, and Bill of Lading sets to prevent bank rejections and carrier delays.</p>
        </div>
        <button
          className="primary"
          onClick={() => notify("AI Document scanner initialized. Upload document PDF/Image.")}
        >
          🔍 Scan New LC / PI File
        </button>
      </div>

      {/* Discrepancy Analyses Grid */}
      <div className="panel p-6 flex flex-col gap-4">
        <div className="panel-head flex justify-between items-center">
          <div>
            <span>AUTOMATED LC & PI DISCREPANCY AUDITS</span>
            <h3>Recent Document AI Scans & Soft Clause Alerts</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analyses.map((a) => (
            <div key={a.id} className="panel p-5 border border-slate-200 rounded-xl bg-gradient-to-br from-white via-sky-50/20 to-white shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-sky-700 font-bold uppercase tracking-wide">{a.documentType}</span>
                  <span className="badge info">{a.confidenceScore}% Confidence</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{a.documentRef}</h4>
                <p className="text-[11px] text-slate-500 font-mono mb-3">Scanned on: {a.scanDate}</p>

                <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-700 mb-3 border border-slate-200 leading-relaxed">
                  <strong className="text-slate-900 block mb-1">FINDINGS:</strong>
                  {a.summaryFindings}
                </div>

                <div className="bg-sky-50 p-3 rounded-lg text-xs text-sky-900 border border-sky-100 leading-relaxed">
                  <strong className="text-sky-800 block mb-1">RECOMMENDED ACTION:</strong>
                  {a.suggestedAction}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-medium">Discrepancies: {a.discrepancyCount}</span>
                <button
                  className="btn-sm secondary"
                  onClick={() => {
                    handleDraftEmail("amendment");
                    notify("Drafted amendment email with AI assistant.");
                  }}
                >
                  ✉️ Draft Email
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Automated Email Drafter */}
      <div className="panel p-6 flex flex-col gap-4">
        <div className="panel-head flex justify-between items-center">
          <div>
            <span>AUTOMATED COMMERCIAL CORRESPONDENCE DRAFTER</span>
            <h3>AI Letter & Email Generator for Buyers & Banks</h3>
          </div>
          <div className="flex gap-2">
            <button className="secondary" onClick={() => handleDraftEmail("amendment")}>
              Draft LC Amendment Request
            </button>
            <button className="secondary" onClick={() => handleDraftEmail("booking")}>
              Draft Booking Request
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 bg-white border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:border-sky-600 outline-none"
              placeholder="Ask AI e.g. 'Draft an urgent email to H&M requesting a 10-day LC expiry extension for PO 7844501'..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="primary"
              onClick={() => {
                if (!prompt) return notify("Please type an AI instruction.");
                handleDraftEmail("amendment");
                notify("AI generated custom email draft.");
              }}
            >
              ⚡ Generate Draft
            </button>
          </div>

          {draftResult && (
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap relative shadow-inner">
              <button
                className="absolute top-3 right-3 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-xs px-3 py-1 rounded text-sky-400 font-semibold"
                onClick={() => {
                  navigator.clipboard?.writeText(draftResult);
                  notify("Email text copied to clipboard!");
                }}
              >
                📋 Copy Draft
              </button>
              {draftResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
