"use client";

import { useMemo, useState } from "react";
import { ExportDocSet, PageKey, RecordRow } from "./types/commercial";

// Specialized Commercial Components
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import MasterLCView from "./components/MasterLCView";
import BackToBackLCView from "./components/BackToBackLCView";
import CustomsBondView from "./components/CustomsBondView";
import ExportDocsView from "./components/ExportDocsView";
import BankingTreasuryView from "./components/BankingTreasuryView";
import CashIncentiveView from "./components/CashIncentiveView";
import TradeCalculators from "./components/TradeCalculators";
import MastersView from "./components/MastersView";
import ExportDocPreviewModal from "./components/ExportDocPreviewModal";
import TradeModals from "./components/TradeModals";
import RecordDrawer from "./components/RecordDrawer";

// 25-Point Commercial Components
import PiManagementView from "./components/PiManagementView";
import InsuranceView from "./components/InsuranceView";
import ImportCostingView from "./components/ImportCostingView";
import GroupLcView from "./components/GroupLcView";
import EtdEtaTracker from "./components/EtdEtaTracker";
import PoTrackerView from "./components/PoTrackerView";

const pageMeta: Record<PageKey, { eyebrow: string; title: string; desc: string; action: string }> = {
  dashboard: { eyebrow: "COMMERCIAL CONTROL TOWER", title: "Good morning, Mahin", desc: "Here’s what needs your attention across imports, exports, and banking today.", action: "+ New transaction" },
  orders: { eyebrow: "ORDER HANDOVER", title: "Commercial order intake", desc: "Review merchandising handovers and confirm commercial readiness.", action: "+ Add handover" },
  potracker: { eyebrow: "PO TRANSITION DESK", title: "PO-Based Commercial Transition Tracker", desc: "Track Purchase Orders across 8 commercial stages from Merchandising Handover to Bank Realization.", action: "+ Intake New PO" },
  calculators: { eyebrow: "TRADE FINANCE TOOLS", title: "Garments Commercial Calculators", desc: "Calculate B2B entitlements, BGMEA UD raw material wastage, and bank presentation deadlines.", action: "+ New calculation" },
  masterlc: { eyebrow: "EXPORT FINANCE", title: "Master LC & sales contracts", desc: "Track buyer instruments, amendments, utilization and expiry exposure.", action: "+ New Master LC" },
  backtoback: { eyebrow: "IMPORT FINANCE", title: "Back-to-Back LC register", desc: "Manage supplier LCs against export entitlement and margin limits.", action: "+ Open BTB LC" },
  pimanagement: { eyebrow: "PROFORMA INVOICES", title: "PI Management Desk", desc: "Proforma Invoice entry, itemized fabric/yarn pricing, HS codes and LC linkage.", action: "+ New PI Record" },
  imports: { eyebrow: "INBOUND LOGISTICS", title: "Import shipment tracker", desc: "Follow materials from supplier dispatch through factory delivery.", action: "+ Import shipment" },
  importcosting: { eyebrow: "IMPORT COSTING", title: "Import Landed Cost & Settlement", desc: "Calculate landed cost (FOB + Freight + Duty + Demurrage) and supplier payment maturity.", action: "+ New Cost Sheet" },
  customs: { eyebrow: "CUSTOMS & BOND", title: "Bond and customs desk", desc: "Monitor bills of entry, BGMEA UD/UP, bond balance and clearances.", action: "+ Apply for UD" },
  exports: { eyebrow: "EXPORT EXECUTION", title: "Export order pipeline", desc: "Prepare commercial files by buyer, PO, destination and ship date.", action: "+ Export file" },
  shipping: { eyebrow: "OUTBOUND LOGISTICS", title: "Shipment booking board", desc: "Coordinate forwarders, vessel schedules, containers and cut-offs.", action: "+ Booking request" },
  etdeta: { eyebrow: "MILESTONE TRACKER", title: "ETD / ETA Departure & Arrival Board", desc: "Track feeder/mother vessels, container numbers, BL/AWB, and actual ETD/ETA.", action: "+ Log Milestone" },
  documents: { eyebrow: "DOCUMENTATION", title: "Export document desk", desc: "Prepare, check and dispatch compliant bank and buyer document sets.", action: "+ Document set" },
  insurance: { eyebrow: "RISK PROTECTION", title: "Marine & Transport Insurance", desc: "Manage cover notes, insurance policy numbers, marine premium rates, and open cover policies.", action: "+ Issue Cover Note" },
  banking: { eyebrow: "TREASURY", title: "Banking & export proceeds", desc: "Track document negotiation, discrepancies, maturity and realization.", action: "+ Bank submission" },
  incentive: { eyebrow: "POST-EXPORT", title: "Cash incentive claims", desc: "Manage claim preparation, audit, certificates and disbursement.", action: "+ New claim" },
  grouplc: { eyebrow: "GROUP TRADE FINANCE", title: "Group LC Pooling & Unit Allocation", desc: "Holding company LC pooling and inter-factory allocation across manufacturing units.", action: "+ Register Group Pool" },
  compliance: { eyebrow: "RISK CONTROL", title: "Compliance command center", desc: "Resolve expiry, discrepancy, regulatory and document exceptions.", action: "+ Create task" },
  reports: { eyebrow: "DECISION SUPPORT", title: "Commercial reports", desc: "Analyze exposure, buyer-wise trends, bank-wise credit facilities, and document status.", action: "Export report" },
  masters: { eyebrow: "MASTER DATA", title: "Commercial masters", desc: "Maintain banks, buyers, suppliers, ports, HS codes and document rules.", action: "+ Add master" },
  settings: { eyebrow: "ADMINISTRATION", title: "Workflow settings", desc: "Configure approvals, numbering, SLA, notifications and user access.", action: "Save changes" },
};

const datasets: Partial<Record<PageKey, RecordRow[]>> = {
  orders: [
    { id: "OH-260811-06", title: "Nova Knit Jogger", party: "C&A Europe", ref: "PO 45019382 · 38,400 pcs", amount: "$246,720", date: "Handover 11 Aug", status: "Pending review" },
    { id: "OH-260811-04", title: "Core Crew Tee", party: "H&M", ref: "PO 7844501 · 82,000 pcs", amount: "$303,400", date: "Ship 28 Sep", status: "Ready" },
    { id: "OH-260810-11", title: "Kids Fleece Set", party: "Primark", ref: "PO PR-99412 · 44,200 pcs", amount: "$287,300", date: "Ship 03 Oct", status: "Missing docs" },
  ],
  imports: [
    { id: "IMP-2026-0094", title: "1×40HC · Fabric", party: "Ningbo → Chattogram", ref: "BL NGBCTG260814 · SEA", amount: "18,640 kg", date: "ETA 18 Aug 2026", status: "On water" },
    { id: "IMP-2026-0091", title: "6 pallets · Accessories", party: "Shanghai → DAC", ref: "AWB 618-44590021 · AIR", amount: "2,180 kg", date: "ETA 12 Aug 2026", status: "Customs hold" },
    { id: "IMP-2026-0088", title: "2×40HC · Yarn", party: "Mundra → Chattogram", ref: "BL MUNCTG88211 · SEA", amount: "41,700 kg", date: "Arrived 09 Aug", status: "Cleared" },
  ],
  exports: [
    { id: "EXP-2026-0142", title: "Core Crew Tee · 7 POs", party: "H&M · Hamburg", ref: "42,400 pcs · FOB Chattogram", amount: "$156,880", date: "Ex-factory 19 Aug", status: "Documents open" },
    { id: "EXP-2026-0145", title: "Nova Knit Jogger · 3 POs", party: "C&A · Rotterdam", ref: "18,200 pcs · FOB Chattogram", amount: "$116,844", date: "Ex-factory 24 Aug", status: "Planning" },
    { id: "EXP-2026-0138", title: "Kids Fleece Set · 5 POs", party: "Primark · Felixstowe", ref: "22,100 pcs · FOB Chattogram", amount: "$143,650", date: "Shipped 08 Aug", status: "Bank pending" },
  ],
  shipping: [
    { id: "BKG-2026-0204", title: "1×40HC · Maersk Hanoi", party: "Maersk · Kuehne+Nagel", ref: "CTG → Rotterdam · CY/CY", amount: "18,200 pcs", date: "SI cut-off 17 Aug 14:00", status: "Booking confirmed" },
    { id: "BKG-2026-0201", title: "2×40HC · ONE Matrix", party: "ONE · DHL Global Forwarding", ref: "CTG → Hamburg · CY/CY", amount: "42,400 pcs", date: "VGM cut-off 15 Aug", status: "VGM pending" },
    { id: "BKG-2026-0198", title: "Airfreight · SQ Cargo", party: "DB Schenker", ref: "DAC → LHR · 12 pallets", amount: "6,800 pcs", date: "Cargo 13 Aug 18:00", status: "Space requested" },
  ],
  compliance: [
    { id: "ALT-260811-01", title: "LC expiry within 30 days", party: "C&A Buying GmbH", ref: "SC-2026-0031 · Amendment required", amount: "$312,400 unshipped", date: "Resolve by 15 Aug", status: "High risk" },
    { id: "ALT-260811-02", title: "BL description mismatch", party: "COSCO Shipping", ref: "DOC-2026-0132 · Carton qty", amount: "$208,410 at risk", date: "Resolve today", status: "Critical" },
    { id: "ALT-260811-04", title: "Import demurrage exposure", party: "APL Bangladesh", ref: "IMP-2026-0091 · 2 free days left", amount: "$480/day", date: "Free time ends 13 Aug", status: "Action required" },
  ],
};

const statusClass = (status: string) => {
  const s = status.toLowerCase();
  if (/(active|ready|cleared|realized|accepted|confirmed|issued)/.test(s)) return "success";
  if (/(critical|high risk|hold|discrepancy|missing)/.test(s)) return "danger";
  if (/(pending|due|assessment|awaiting|requested|draft|planning|open|running|required)/.test(s)) return "warning";
  return "info";
};

function MiniBars() {
  const bars = [38, 54, 46, 68, 62, 78, 72, 85, 76, 92, 86, 96];
  return (
    <div className="bars" aria-label="Monthly export trend">
      {bars.map((h, i) => (
        <div key={i} className={i === 11 ? "bar active" : "bar"} style={{ height: `${h}%` }}>
          <span>{["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][i]}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All status");
  const [modal, setModal] = useState(false);
  const [previewDocSet, setPreviewDocSet] = useState<ExportDocSet | null>(null);
  const [drawer, setDrawer] = useState<RecordRow | null>(null);
  const [toast, setToast] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [records, setRecords] = useState(datasets);
  const [form, setForm] = useState({ title: "", party: "", ref: "", amount: "", date: "" });

  const meta = pageMeta[page];
  const rows = useMemo(() => records[page] || [], [records, page]);
  const statuses = useMemo(() => ["All status", ...Array.from(new Set(rows.map((r) => r.status)))], [rows]);
  const filtered = rows.filter(
    (r) =>
      (filter === "All status" || r.status === filter) &&
      Object.values(r).join(" ").toLowerCase().includes(query.toLowerCase())
  );

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const navigate = (key: PageKey) => {
    setPage(key);
    setQuery("");
    setFilter("All status");
    setSidebar(false);
  };

  const addRecord = () => {
    if (!form.title || !form.party) return notify("Please complete the required title and party fields.");
    const newRow: RecordRow = {
      id: `NEW-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      title: form.title,
      party: form.party,
      ref: form.ref || "Manual entry",
      amount: form.amount || "—",
      date: form.date || "Created today",
      status: "Draft",
    };
    setRecords((prev) => ({ ...prev, [page]: [newRow, ...(prev[page] || [])] }));
    setModal(false);
    setForm({ title: "", party: "", ref: "", amount: "", date: "" });
    notify("Commercial record created successfully.");
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <Sidebar page={page} sidebar={sidebar} setSidebar={setSidebar} navigate={navigate} />

      {/* Main Container */}
      <main className="main">
        {/* Topbar */}
        <Topbar
          metaEyebrow={meta.eyebrow}
          query={query}
          setQuery={setQuery}
          notifications={notifications}
          setNotifications={setNotifications}
          setSidebar={setSidebar}
          setModal={setModal}
          navigate={navigate}
        />

        <div className="content">
          <section className="page-head">
            <div>
              <p>{meta.eyebrow}</p>
              <h1>{meta.title}</h1>
              <span>{meta.desc}</span>
            </div>
            <div className="head-actions">
              <button className="secondary" onClick={() => notify("Current view data exported to CSV.")}>
                ⇩ Export Data
              </button>
              <button
                className="primary"
                onClick={() => (page === "settings" ? notify("Workflow settings saved.") : setModal(true))}
              >
                {meta.action}
              </button>
            </div>
          </section>

          {/* Dynamic Page Views */}
          {page === "dashboard" ? (
            <Dashboard navigate={navigate} notify={notify} />
          ) : page === "potracker" ? (
            <PoTrackerView notify={notify} setModal={setModal} />
          ) : page === "calculators" ? (
            <TradeCalculators notify={notify} />
          ) : page === "masterlc" ? (
            <MasterLCView notify={notify} setModal={setModal} />
          ) : page === "backtoback" ? (
            <BackToBackLCView notify={notify} setModal={setModal} />
          ) : page === "pimanagement" ? (
            <PiManagementView notify={notify} setModal={setModal} />
          ) : page === "importcosting" ? (
            <ImportCostingView notify={notify} setModal={setModal} />
          ) : page === "customs" ? (
            <CustomsBondView notify={notify} setModal={setModal} />
          ) : page === "documents" ? (
            <ExportDocsView notify={notify} setModal={setModal} openPreviewModal={(ds) => setPreviewDocSet(ds)} />
          ) : page === "insurance" ? (
            <InsuranceView notify={notify} setModal={setModal} />
          ) : page === "etdeta" ? (
            <EtdEtaTracker notify={notify} setModal={setModal} />
          ) : page === "banking" ? (
            <BankingTreasuryView notify={notify} setModal={setModal} />
          ) : page === "incentive" ? (
            <CashIncentiveView notify={notify} setModal={setModal} />
          ) : page === "grouplc" ? (
            <GroupLcView notify={notify} setModal={setModal} />
          ) : page === "reports" ? (
            <Reports notify={notify} />
          ) : page === "masters" ? (
            <MastersView notify={notify} />
          ) : page === "settings" ? (
            <Settings notify={notify} />
          ) : (
            <RecordsPage
              rows={filtered}
              allRows={rows}
              query={query}
              setQuery={setQuery}
              filter={filter}
              setFilter={setFilter}
              statuses={statuses}
              page={page}
              setDrawer={setDrawer}
              notify={notify}
            />
          )}
        </div>
      </main>

      {/* Modals & Drawers */}
      <TradeModals
        modal={modal}
        page={page}
        form={form}
        setForm={setForm}
        onClose={() => setModal(false)}
        onAddRecord={addRecord}
        notify={notify}
      />

      <ExportDocPreviewModal
        docSet={previewDocSet}
        onClose={() => setPreviewDocSet(null)}
        notify={notify}
      />

      <RecordDrawer drawer={drawer} onClose={() => setDrawer(null)} notify={notify} />

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          <span>✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}

function Dashboard({ navigate, notify }: { navigate: (p: PageKey) => void; notify: (s: string) => void }) {
  return (
    <>
      <section className="metric-grid">
        <article>
          <div className="metric-icon green">↗</div>
          <p>Export Shipment Value · Aug</p>
          <h2>$2.84M</h2>
          <span className="up">↑ 12.6%</span>
          <small>vs. last month</small>
        </article>
        <article>
          <div className="metric-icon blue">▤</div>
          <p>Open LC Exposure</p>
          <h2>$4.18M</h2>
          <span>32 active instruments</span>
          <div className="micro-progress">
            <i style={{ width: "68%" }}></i>
          </div>
        </article>
        <article>
          <div className="metric-icon amber">◷</div>
          <p>Proceeds Outstanding</p>
          <h2>$684.2K</h2>
          <span className="warn-text">8 bills overdue</span>
          <small>of $1.92M total</small>
        </article>
        <article>
          <div className="metric-icon red">!</div>
          <p>Action Required</p>
          <h2>17</h2>
          <span className="danger-text">4 critical exceptions</span>
          <small>across 6 workflows</small>
        </article>
      </section>

      <section className="dash-grid">
        <article className="panel export-chart">
          <div className="panel-head">
            <div>
              <span>EXPORT PERFORMANCE</span>
              <h3>Monthly shipment value</h3>
            </div>
            <button onClick={() => notify("Period changed to last 12 months.")}>Last 12 months⌄</button>
          </div>
          <div className="chart-summary">
            <div>
              <h2>$18.6M</h2>
              <span className="up">↑ 8.4% YoY</span>
            </div>
            <div className="legend">
              <i></i> Export value
            </div>
          </div>
          <div className="chart-wrap">
            <div className="axis">
              <span>$3M</span>
              <span>$2M</span>
              <span>$1M</span>
              <span>$0</span>
            </div>
            <MiniBars />
          </div>
        </article>

        <article className="panel attention">
          <div className="panel-head">
            <div>
              <span>PRIORITY QUEUE</span>
              <h3>Needs your attention</h3>
            </div>
            <button className="link" onClick={() => navigate("compliance")}>
              View all →
            </button>
          </div>
          <div className="attention-list">
            <button onClick={() => navigate("documents")}>
              <i className="dot red"></i>
              <div>
                <strong>BL description mismatch</strong>
                <span>DOC-2026-0132 · COSCO Shipping</span>
              </div>
              <em>Critical</em>
            </button>
            <button onClick={() => navigate("masterlc")}>
              <i className="dot amber"></i>
              <div>
                <strong>LC amendment required</strong>
                <span>SC-2026-0031 · expires in 18 days</span>
              </div>
              <em>Today</em>
            </button>
            <button onClick={() => navigate("customs")}>
              <i className="dot violet"></i>
              <div>
                <strong>UD approval pending</strong>
                <span>UD-2026-0044 · 7 export POs</span>
              </div>
              <em>2 days</em>
            </button>
            <button onClick={() => navigate("banking")}>
              <i className="dot blue"></i>
              <div>
                <strong>Proceeds overdue</strong>
                <span>FDBC-8831 · $78,640</span>
              </div>
              <em>5 days</em>
            </button>
          </div>
        </article>

        <article className="panel pipeline">
          <div className="panel-head">
            <div>
              <span>SHIPMENT PIPELINE</span>
              <h3>August export plan</h3>
            </div>
            <button className="link" onClick={() => navigate("shipping")}>
              Open board →
            </button>
          </div>
          <div className="pipeline-row">
            <div>
              <strong>18</strong>
              <span>Planning</span>
            </div>
            <b>→</b>
            <div>
              <strong>12</strong>
              <span>Booking</span>
            </div>
            <b>→</b>
            <div>
              <strong>9</strong>
              <span>Docs ready</span>
            </div>
            <b>→</b>
            <div className="highlight">
              <strong>24</strong>
              <span>Shipped</span>
            </div>
          </div>
          <div className="pipeline-foot">
            <span>
              <i className="green-dot"></i>63 shipments
            </span>
            <span>Target $3.1M</span>
            <strong>91.6% projected</strong>
          </div>
        </article>

        <article className="panel utilization">
          <div className="panel-head">
            <div>
              <span>LC UTILIZATION</span>
              <h3>Top active instruments</h3>
            </div>
            <button className="link" onClick={() => navigate("masterlc")}>
              Manage →
            </button>
          </div>
          {[
            ["H&M · MLC-0048", "$1.08M / $1.28M", 84],
            ["C&A · SC-0031", "$624K / $843K", 74],
            ["NEXT · MLC-0041", "$351K / $595K", 59],
          ].map((x) => (
            <div className="util-row" key={String(x[0])}>
              <div>
                <strong>{x[0]}</strong>
                <span>{x[1]}</span>
              </div>
              <div className="util-bar">
                <i style={{ width: `${x[2]}%` }}></i>
              </div>
              <b>{x[2]}%</b>
            </div>
          ))}
        </article>
      </section>
    </>
  );
}

function RecordsPage({
  rows,
  allRows,
  query,
  setQuery,
  filter,
  setFilter,
  statuses,
  page,
  setDrawer,
  notify,
}: {
  rows: RecordRow[];
  allRows: RecordRow[];
  query: string;
  setQuery: (s: string) => void;
  filter: string;
  setFilter: (s: string) => void;
  statuses: string[];
  page: PageKey;
  setDrawer: (r: RecordRow) => void;
  notify: (s: string) => void;
}) {
  const totals = allRows.reduce((a, r) => a + (Number(r.amount.replace(/[^0-9.]/g, "")) || 0), 0);
  return (
    <>
      <section className="list-kpis">
        <div>
          <span>Total records</span>
          <strong>{allRows.length * 7 + 3}</strong>
          <small>Current fiscal year</small>
        </div>
        <div>
          <span>Active / in process</span>
          <strong>{Math.max(8, allRows.length * 4)}</strong>
          <small className="blue-text">Operational pipeline</small>
        </div>
        <div>
          <span>Recorded value</span>
          <strong>${totals > 999 ? (totals / 1000).toFixed(2) + "M" : totals.toFixed(1) + "K"}</strong>
          <small>Across visible records</small>
        </div>
        <div>
          <span>Needs attention</span>
          <strong>{page === "compliance" ? 7 : 3}</strong>
          <small className="danger-text">Within next 7 days</small>
        </div>
      </section>

      <section className="panel data-panel">
        <div className="table-toolbar">
          <div className="tabs">
            <button className="active">
              All records <span>{allRows.length}</span>
            </button>
            <button>My tasks</button>
            <button>Due soon</button>
          </div>
          <div className="filters">
            <label>
              ⌕
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search records..." />
            </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <button onClick={() => notify("Advanced filters opened.")}>☷ Filters</button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>RECORD / TRANSACTION</th>
                <th>PARTY & REFERENCE</th>
                <th>VALUE / QUANTITY</th>
                <th>KEY DATE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} onClick={() => setDrawer(row)}>
                  <td onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <strong>{row.title}</strong>
                    <span>{row.id}</span>
                  </td>
                  <td>
                    <strong>{row.party}</strong>
                    <span>{row.ref}</span>
                  </td>
                  <td>
                    <strong>{row.amount}</strong>
                  </td>
                  <td>
                    <strong>{row.date}</strong>
                  </td>
                  <td>
                    <span className={`pill ${statusClass(row.status)}`}>{row.status}</span>
                  </td>
                  <td>
                    <button>›</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="empty">
              <span>⌕</span>
              <h3>No matching records</h3>
              <p>Try changing your search or status filter.</p>
            </div>
          )}
        </div>
        <div className="table-foot">
          <span>Showing {rows.length} of {allRows.length} demo records</span>
          <div>
            <button disabled>‹</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>›</button>
          </div>
        </div>
      </section>
    </>
  );
}

function Reports({ notify }: { notify: (s: string) => void }) {
  const [reportTab, setReportTab] = useState<"general" | "buyer" | "bank">("general");

  const cards = [
    ["LC exposure report", "Instrument-wise liability, utilization and expiry", "▤", "Finance"],
    ["Import lead-time analysis", "Supplier dispatch to factory delivery performance", "↓", "Logistics"],
    ["Export shipment register", "Buyer, PO, destination and EXP-wise shipment data", "↑", "Export"],
    ["Proceeds aging report", "Outstanding, overdue and realized export proceeds", "▣", "Banking"],
    ["Customs & bond position", "UD/UP, bond ledger and entitlement position", "♜", "Compliance"],
    ["Commercial KPI pack", "Monthly executive summary with trend analysis", "⌁", "Management"],
  ];

  return (
    <>
      <div className="sub-tabs">
        <button className={reportTab === "general" ? "active" : ""} onClick={() => setReportTab("general")}>
          General Commercial Packs
        </button>
        <button className={reportTab === "buyer" ? "active" : ""} onClick={() => setReportTab("buyer")}>
          Buyer-Wise Commercial Exposure Report
        </button>
        <button className={reportTab === "bank" ? "active" : ""} onClick={() => setReportTab("bank")}>
          Bank-Wise Credit & LC Facility Report
        </button>
      </div>

      {reportTab === "general" && (
        <>
          <section className="report-hero">
            <div>
              <span>MONTHLY COMMERCIAL PACK</span>
              <h2>August 2026 management report</h2>
              <p>Live summary of shipments, LC exposure, proceeds and operational exceptions.</p>
              <button onClick={() => notify("Management pack is being generated.")}>Generate management pack →</button>
            </div>
            <div className="report-stat">
              <span>Data freshness</span>
              <strong>11 Aug · 10:42</strong>
              <i>All systems synced</i>
            </div>
          </section>

          <section className="report-grid">
            {cards.map((c) => (
              <article key={c[0]}>
                <div className="report-icon">{c[2]}</div>
                <span>{c[3]}</span>
                <h3>{c[0]}</h3>
                <p>{c[1]}</p>
                <div>
                  <button onClick={() => notify(`${c[0]} opened.`)}>Open report</button>
                  <button onClick={() => notify(`${c[0]} exported.`)}>⇩</button>
                </div>
              </article>
            ))}
          </section>
        </>
      )}

      {reportTab === "buyer" && (
        <div className="panel report-sub-panel">
          <div className="panel-head">
            <div>
              <span>BUYER FINANCIAL ANALYSIS</span>
              <h3>Buyer-Wise Order, LC Exposure & Proceeds Realization</h3>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>BUYER NAME</th>
                  <th>COUNTRY</th>
                  <th>ACTIVE MASTER LCS</th>
                  <th>TOTAL ORDERS VALUE</th>
                  <th>REALIZED PROCEEDS</th>
                  <th>OUTSTANDING BILLS</th>
                  <th>PAYMENT RISK RATING</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>H&M Hennes & Mauritz</strong></td>
                  <td>Sweden</td>
                  <td>2 LCs ($1.87M)</td>
                  <td>$2,140,500</td>
                  <td>$1,450,000</td>
                  <td>$208,410</td>
                  <td><span className="pill success">Low Risk</span></td>
                </tr>
                <tr>
                  <td><strong>C&A Buying GmbH</strong></td>
                  <td>Germany</td>
                  <td>1 Contract ($842K)</td>
                  <td>$980,000</td>
                  <td>$610,000</td>
                  <td>$116,844</td>
                  <td><span className="pill success">Low Risk</span></td>
                </tr>
                <tr>
                  <td><strong>NEXT Retail Ltd</strong></td>
                  <td>UK</td>
                  <td>1 LC ($595K)</td>
                  <td>$640,000</td>
                  <td>$480,000</td>
                  <td>$92,840</td>
                  <td><span className="pill success">Low Risk</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {reportTab === "bank" && (
        <div className="panel report-sub-panel">
          <div className="panel-head">
            <div>
              <span>BANKING & CREDIT CONTROL</span>
              <h3>Bank-Wise Credit Facility, LC Exposure & Bill Negotiation</h3>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>BANK NAME</th>
                  <th>SWIFT CODE</th>
                  <th>SANCTIONED LC LIMIT</th>
                  <th>ACTIVE B2B LC EXPOSURE</th>
                  <th>FDBC BILLS PENDING</th>
                  <th>ERQ RETENTION BALANCE</th>
                  <th>FACILITY HEALTH</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Standard Chartered Bank</strong></td>
                  <td>SCBLBDDX</td>
                  <td>$5,000,000</td>
                  <td>$1,214,600</td>
                  <td>$143,650</td>
                  <td>$21,547</td>
                  <td><span className="pill success">Optimum</span></td>
                </tr>
                <tr>
                  <td><strong>HSBC Bangladesh</strong></td>
                  <td>HSBCBDDH</td>
                  <td>$4,500,000</td>
                  <td>$890,000</td>
                  <td>$208,410</td>
                  <td>$31,200</td>
                  <td><span className="pill success">Optimum</span></td>
                </tr>
                <tr>
                  <td><strong>Eastern Bank PLC</strong></td>
                  <td>EBLBDDH</td>
                  <td>$3,000,000</td>
                  <td>$682,900</td>
                  <td>$116,844</td>
                  <td>$17,526</td>
                  <td><span className="pill success">Optimum</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function Settings({ notify }: { notify: (s: string) => void }) {
  const [checks, setChecks] = useState([true, true, false, true, true, false]);
  return (
    <div className="settings-grid">
      <section className="panel settings-nav">
        <button className="active">Workflow & approvals</button>
        <button>Document numbering</button>
        <button>SLA & escalation</button>
        <button>Notifications</button>
        <button>User roles</button>
        <button>Integrations</button>
      </section>
      <section className="panel settings-main">
        <div className="settings-head">
          <h2>Workflow & approvals</h2>
          <p>Configure control points for commercial transactions.</p>
        </div>
        {[
          "Master LC requires manager approval above $500K",
          "BTB LC requires budget availability check",
          "Block shipment when LC validity is insufficient",
          "Require maker-checker for bank documents",
          "Auto-create task 30 days before LC expiry",
          "Allow document release with unresolved discrepancy",
        ].map((x, i) => (
          <div className="setting-row" key={x}>
            <div>
              <strong>{x}</strong>
              <span>{i % 2 ? "Applies to all business units" : "Commercial Unit 02"}</span>
            </div>
            <button
              className={checks[i] ? "switch on" : "switch"}
              onClick={() => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))}
            >
              <i></i>
            </button>
          </div>
        ))}
        <div className="approval-box">
          <h3>Approval threshold</h3>
          <div>
            <label>
              Transaction type
              <select>
                <option>Back-to-Back LC</option>
                <option>Master LC amendment</option>
              </select>
            </label>
            <label>
              Amount above
              <input defaultValue="$ 250,000" />
            </label>
            <label>
              Approver
              <select>
                <option>Head of Commercial</option>
                <option>CFO</option>
              </select>
            </label>
            <button onClick={() => notify("Approval rule added.")}>+ Add rule</button>
          </div>
        </div>
      </section>
    </div>
  );
}
