"use client";

import { PageKey } from "../types/commercial";

interface TradeModalsProps {
  modal: boolean;
  page: PageKey;
  form: { title: string; party: string; ref: string; amount: string; date: string };
  setForm: (f: TradeModalsProps["form"]) => void;
  onClose: () => void;
  onAddRecord: () => void;
  notify: (msg: string) => void;
}

export default function TradeModals({
  modal,
  page,
  form,
  setForm,
  onClose,
  onAddRecord,
  notify,
}: TradeModalsProps) {
  if (!modal) return null;

  const titleMap: Record<string, string> = {
    masterlc: "Add New Export Master LC / Sales Contract",
    backtoback: "Open Back-to-Back (B2B) Import LC",
    pimanagement: "Register Proforma Invoice (PI)",
    advancepay: "Issue Outward TT Advance Remittance",
    imports: "Add Inbound Import Shipment File",
    importcosting: "Calculate Import Landed Cost Sheet",
    customs: "Apply for BGMEA UD / Customs Bond File",
    exports: "Create Export Order Execution File",
    shipping: "Create Forwarder Shipment Booking Request",
    etdeta: "Log Vessel Departure / Arrival Milestone",
    documents: "Prepare Bank Export Document Set",
    insurance: "Issue Marine Cargo Insurance Policy",
    banking: "Record Bank Negotiation & Proceeds Submission",
    incentive: "Prepare Post-Export Cash Incentive Claim",
    expenses: "Log Commercial Freight / Demurrage Expense",
    tasks: "Create Workflow Task & Exception SLA Case",
    grouplc: "Register Group LC Pool Allocation",
    masters: "Add Commercial Master Entity Reference",
  };

  const modalTitle = titleMap[page] || "Create Commercial Transaction Record";

  return (
    <div className="overlay fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="modal trade-modal bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]" onMouseDown={(e) => e.stopPropagation()}>
        
        {/* Modal Header with Light Gradient */}
        <div className="modal-head px-6 py-4 bg-gradient-to-r from-slate-50 via-sky-50 to-blue-50 border-b border-sky-100 flex justify-between items-center">
          <div>
            <span className="text-xs text-sky-700 font-mono tracking-widest uppercase font-bold">
              GARMENTS COMMERCIAL WORKFLOW ENTRY
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">{modalTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center text-lg shadow-sm transition"
          >
            ×
          </button>
        </div>

        {/* Modal Body / Form Grid */}
        <div className="modal-body p-6 overflow-y-auto space-y-4">
          <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <label className="md:col-span-2 flex flex-col gap-1 text-xs text-slate-700 font-semibold">
              <span>Transaction / Instrument Title <span className="text-rose-500">*</span></span>
              <input
                autoFocus
                className="bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={
                  page === "masterlc"
                    ? "e.g. Master LC No. 0286IMPE260045"
                    : page === "backtoback"
                    ? "e.g. BTB LC No. 0286-99120 (Knit Fabric)"
                    : page === "advancepay"
                    ? "e.g. Advance TT Payment for Shaoxing Fabric"
                    : page === "expenses"
                    ? "e.g. Ocean Freight Voucher VCH-FRT-0041"
                    : "e.g. Core Crew Tee Export File"
                }
              />
              <span className="text-[10px] text-slate-500">Provide a distinct identifier for tracking in logs and reports.</span>
            </label>

            <label className="flex flex-col gap-1 text-xs text-slate-700 font-semibold">
              <span>Primary Buyer / Supplier / Bank <span className="text-rose-500">*</span></span>
              <input
                className="bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition"
                value={form.party}
                onChange={(e) => setForm({ ...form, party: e.target.value })}
                placeholder={
                  page === "masterlc"
                    ? "H&M Hennes & Mauritz"
                    : page === "backtoback" || page === "advancepay"
                    ? "Shaoxing Huatex Fabric Ltd"
                    : page === "banking"
                    ? "Standard Chartered Bank"
                    : "Enter party or vendor name"
                }
              />
            </label>

            <label className="flex flex-col gap-1 text-xs text-slate-700 font-semibold">
              <span>Reference Number (PO, PI, BL, EXP, UD)</span>
              <input
                className="bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition font-mono"
                value={form.ref}
                onChange={(e) => setForm({ ...form, ref: e.target.value })}
                placeholder="e.g. PO 7844501 / PI-HTX-881 / BL NGBCTG260"
              />
            </label>

            <label className="flex flex-col gap-1 text-xs text-slate-700 font-semibold">
              <span>Value (USD / BDT) or Quantity</span>
              <input
                className="bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition font-bold"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="$ 150,000.00"
              />
              <span className="text-[10px] text-slate-500">Specify currency symbol ($ or ৳) for clear auditing.</span>
            </label>

            <label className="flex flex-col gap-1 text-xs text-slate-700 font-semibold">
              <span>Key Expiry / Target / Shipment Date</span>
              <input
                type="date"
                className="bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition font-mono"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>

            <label className="md:col-span-2 flex flex-col gap-1 text-xs text-slate-700 font-semibold">
              <span>Operational Remarks & UCP 600 Special Conditions</span>
              <textarea
                rows={3}
                className="bg-white border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:border-sky-600 focus:ring-2 focus:ring-sky-100 outline-none transition font-mono leading-relaxed resize-none"
                placeholder="Enter specific bank clauses, presentation deadlines, BGMEA UD wastage limits, or container cut-off notes..."
              ></textarea>
            </label>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-foot px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button
            className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-semibold shadow-sm transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold shadow-sm transition"
              onClick={() => notify("Transaction draft saved locally to workflow cache.")}
            >
              💾 Save Draft
            </button>

            <button
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-sky-200 transition"
              onClick={onAddRecord}
            >
              ✓ Confirm & Register Record
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
