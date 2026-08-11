"use client";

import { PageKey } from "../types/commercial";

interface SidebarProps {
  page: PageKey;
  sidebar: boolean;
  setSidebar: (open: boolean) => void;
  navigate: (key: PageKey) => void;
}

const navGroups: { label: string; items: { key: PageKey; label: string; icon: string; badge?: string }[] }[] = [
  {
    label: "OVERVIEW",
    items: [
      { key: "dashboard", label: "Commercial Overview", icon: "◫" },
      { key: "potracker", label: "PO Lifecycle Tracker", icon: "🎯", badge: "HOT" },
      { key: "orders", label: "Order Handover", icon: "▦", badge: "6" },
      { key: "calculators", label: "Trade Calculators", icon: "🧮", badge: "NEW" },
    ],
  },
  {
    label: "IMPORT & SOURCING",
    items: [
      { key: "masterlc", label: "Master LC / Contract", icon: "▤", badge: "12" },
      { key: "backtoback", label: "Back-to-Back LC", icon: "⇄", badge: "8" },
      { key: "pimanagement", label: "PI Management", icon: "📑", badge: "NEW" },
      { key: "imports", label: "Import Shipments", icon: "↓" },
      { key: "importcosting", label: "Import Landed Costing", icon: "💰", badge: "NEW" },
      { key: "customs", label: "Customs & Bond (UD)", icon: "♜", badge: "3" },
    ],
  },
  {
    label: "EXPORT & LOGISTICS",
    items: [
      { key: "exports", label: "Export Orders", icon: "↑" },
      { key: "shipping", label: "Shipment Booking", icon: "◇", badge: "5" },
      { key: "etdeta", label: "ETD / ETA Tracker", icon: "⚓", badge: "LIVE" },
      { key: "documents", label: "Export Document Desk", icon: "▱", badge: "9" },
      { key: "insurance", label: "Cargo Insurance", icon: "🛡", badge: "NEW" },
    ],
  },
  {
    label: "FINANCE & CONTROL",
    items: [
      { key: "banking", label: "Bank & Proceeds Desk", icon: "▣" },
      { key: "incentive", label: "Cash Incentive Claim", icon: "◎" },
      { key: "grouplc", label: "Group LC Pooling", icon: "🏢", badge: "NEW" },
      { key: "compliance", label: "Compliance & Alerts", icon: "△", badge: "7" },
      { key: "reports", label: "Reports & Analytics", icon: "⌁" },
    ],
  },
  {
    label: "CONFIGURATION",
    items: [
      { key: "masters", label: "Commercial Masters", icon: "⊞" },
      { key: "settings", label: "Workflow Settings", icon: "⚙" },
    ],
  },
];

export default function Sidebar({ page, sidebar, setSidebar, navigate }: SidebarProps) {
  return (
    <aside className={`sidebar ${sidebar ? "open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">T</div>
        <div>
          <strong>Threadline</strong>
          <span>GARMENTS ERP</span>
        </div>
        <button className="close-side" onClick={() => setSidebar(false)} aria-label="Close sidebar">
          ×
        </button>
      </div>

      <div className="company">
        <div className="company-logo">NB</div>
        <div>
          <strong>Northern Basics Ltd.</strong>
          <span>Unit 02 · Gazipur Commercial</span>
        </div>
        <span className="chev">⌄</span>
      </div>

      <nav>
        {navGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <p>{group.label}</p>
            {group.items.map((item) => (
              <button
                key={item.key}
                className={page === item.key ? "nav-item active" : "nav-item"}
                onClick={() => navigate(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <em>{item.badge}</em>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-help">
        <span>?</span>
        <div>
          <strong>Commercial Help Desk</strong>
          <small>Bangladesh RMG & BGMEA Guide</small>
        </div>
      </div>

      <div className="user-card">
        <div className="avatar">MR</div>
        <div>
          <strong>Mahin Rahman</strong>
          <span>Head of Commercial</span>
        </div>
        <button aria-label="User options">⋮</button>
      </div>
    </aside>
  );
}
