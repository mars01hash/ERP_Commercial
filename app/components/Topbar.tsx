"use client";

import { PageKey } from "../types/commercial";

interface TopbarProps {
  metaEyebrow: string;
  query: string;
  setQuery: (q: string) => void;
  notifications: boolean;
  setNotifications: (open: boolean) => void;
  setSidebar: (open: boolean) => void;
  setModal: (open: boolean) => void;
  navigate: (key: PageKey) => void;
}

export default function Topbar({
  metaEyebrow,
  query,
  setQuery,
  notifications,
  setNotifications,
  setSidebar,
  setModal,
  navigate,
}: TopbarProps) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={() => setSidebar(true)} aria-label="Open navigation menu">
        ☰
      </button>

      <div className="crumb">
        <span>Northern Basics Commercial</span>
        <b>/</b>
        <strong>{metaEyebrow}</strong>
      </div>

      <div className="top-actions">
        <label className="global-search">
          ⌕
          <input
            placeholder="Search LC, invoice, BL, EXP..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>

        <button
          className="icon-button"
          onClick={() => setNotifications(!notifications)}
          title="Notifications & Action Alerts"
        >
          ♢<i>7</i>
        </button>

        <button className="quick" onClick={() => setModal(true)}>
          ＋ Quick Add
        </button>
      </div>

      {notifications && (
        <div className="notification-pop">
          <div>
            <strong>Commercial Priority Alerts</strong>
            <button onClick={() => setNotifications(false)}>×</button>
          </div>
          <p onClick={() => { setNotifications(false); navigate("compliance"); }}>
            <b className="danger-text">Critical Exception</b> BL description mismatch on DOC-2026-0132 (H&M).
          </p>
          <p onClick={() => { setNotifications(false); navigate("documents"); }}>
            <b className="warn-text">Due Today</b> Courier dispatch for NEXT Retail document set DOC-2026-0136.
          </p>
          <p onClick={() => { setNotifications(false); navigate("customs"); }}>
            <b className="blue-text">UD Entitlement</b> BGMEA UD-2026-0044 approval pending for 7 POs.
          </p>
          <p onClick={() => { setNotifications(false); navigate("imports"); }}>
            <b>Customs Update</b> Import shipment IMP-2026-0088 cleared at Chattogram Port.
          </p>
        </div>
      )}
    </header>
  );
}
