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
    masterlc: "Add New Export Master LC",
    backtoback: "Open Back-to-Back (B2B) LC",
    imports: "Add Inbound Import Shipment",
    customs: "Apply for BGMEA UD / Customs File",
    exports: "Create Export Execution File",
    shipping: "Create Forwarder Booking Request",
    documents: "Generate Bank Document Set",
    banking: "Record Bank Negotiation Submission",
    incentive: "Prepare Cash Incentive Claim",
    masters: "Add Commercial Master Entity",
  };

  const modalTitle = titleMap[page] || "Create Commercial Transaction Record";

  return (
    <div className="overlay" onMouseDown={onClose}>
      <div className="modal trade-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span>COMMERCIAL WORKFLOW ENTRY</span>
            <h2>{modalTitle}</h2>
          </div>
          <button onClick={onClose}>×</button>
        </div>

        <div className="form-grid">
          <label className="wide">
            Transaction / Instrument Title *
            <input
              autoFocus
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Master LC No. 0286IMPE260045 or Fabric Import"
            />
          </label>

          <label>
            Buyer / Supplier / Bank *
            <input
              value={form.party}
              onChange={(e) => setForm({ ...form, party: e.target.value })}
              placeholder="Select or enter party name"
            />
          </label>

          <label>
            Reference Number (PO, PI, BL, EXP)
            <input
              value={form.ref}
              onChange={(e) => setForm({ ...form, ref: e.target.value })}
              placeholder="e.g. PO 7844501 or PI-NGB-99"
            />
          </label>

          <label>
            Value (USD / BDT) or Quantity
            <input
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="$ 125,000.00"
            />
          </label>

          <label>
            Key Expiry / Target Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </label>

          <label className="wide">
            Operational Remarks & Instructions
            <textarea placeholder="Enter special UCP 600 conditions, bank guidelines, or shipping cut-offs..."></textarea>
          </label>
        </div>

        <div className="modal-foot">
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="secondary" onClick={() => notify("Transaction draft saved locally.")}>
            Save Draft
          </button>
          <button className="primary" onClick={onAddRecord}>
            Create Record
          </button>
        </div>
      </div>
    </div>
  );
}
