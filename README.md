# Garments Commercial ERP

An enterprise-grade commercial operations and trade finance management platform engineered specifically for **Ready-Made Garments (RMG) export manufacturers, commercial departments, buying houses, and trade finance desks in Bangladesh**.

Built on **Next.js 16 / Vinext**, **React 19**, **Tailwind CSS v4**, **Drizzle ORM**, and **Cloudflare D1 (SQLite)**, this application provides an end-to-end control tower across the complete RMG commercial lifecycle—from order intake and Master LCs to customs bond tracking, export documentation, bank proceeds realization, and government cash incentive claims.

---

## Key Modules & Core Features

### 1. 📊 Commercial Control Tower (Dashboard)
- **Executive Dashboard**: Real-time overview of active Master LCs, Back-to-Back (B2B) utilization, export proceeds realization, import customs clearances, and bank maturities.
- **Risk Control & Exception Alerts**: Automated monitoring for LC expiries within 30 days, BL description discrepancies, demurrage free-time expiration, and document presentation deadlines.

### 2. 🔄 PO-Based Commercial Transition Desk (`PoTrackerView`)
Tracks Purchase Orders step-by-step across an **8-stage commercial pipeline**:
1. **Commercial Intake**: Order handover from merchandising.
2. **Master LC Tagged**: Allocation under buyer Master LC / Sales Contract.
3. **BGMEA UD Registered**: Registration of fabric & yarn raw material entitlements.
4. **B2B LC Opened**: Supplier import LC issuance for fabrics, yarn, and trims.
5. **Inbound Cleared**: Port arrival and Customs Bill of Entry clearance.
6. **Shipment Booked**: Vessel/container booking and SI/VGM cut-off tracking.
7. **Export Invoiced**: Commercial invoice and export shipping document set generated.
8. **Proceeds Realized**: Bank realization into ERQ and net BDT account credit.

### 3. 📜 Master LC & Sales Contracts (`MasterLCView`)
- Track buyer export instruments (At Sight, Usance 60/90 Days, Transferable).
- Monitor total LC value, B2B entitlement caps (e.g., 75%), utilized B2B amounts, and Packing Credit (PC) limits.
- Manage amendments (amount additions, expiry extensions, order scale-ups).

### 4. 📦 Back-to-Back (B2B) LC Register (`BackToBackLCView`)
- Manage supplier import LCs for Yarn, Fabric, Trims & Accessories, and Dyes/Chemicals.
- Track margin percentages, tenor days (Usance 90/120 Days, Sight, DA, DP), and payment maturity dates.
- Link LCs to specific financing modes including **LTR**, **EDF**, and **UP Loans**.

### 5. 📄 Proforma Invoice (PI) Management Desk (`PiManagementView`)
- Register import supplier PIs and export buyer PIs.
- Itemized breakdowns of fabric, yarn, and accessories with HS Code categorization.
- Link PIs directly to Master LCs and B2B LCs.

### 6. 💸 Import Landed Cost & Settlement (`ImportCostingView`)
- Comprehensive landed cost calculation engine: `FOB Value + Freight + Insurance + Customs Duty + C&F Commission + Demurrage`.
- Automatic unit costing output in **BDT per KG**.
- Supplier payment maturity schedule and payment settlement status tracking.

### 7. 🏢 Group LC Pooling & Unit Allocation (`GroupLcView`)
- Centralized group LC pooling for conglomerate holding companies.
- Inter-factory allocation of Master LC limits across multiple group manufacturing units.

### 8. 🚢 ETD / ETA Departure & Arrival Board (`EtdEtaTracker`)
- Feeder and mother vessel tracking by container number, BL/AWB, carrier, and voyage.
- Planned vs. Actual ETD (Port of Loading) and ETA (Port of Discharge) milestone management.

### 9. 🛃 Customs & BGMEA Bond Desk (`CustomsBondView`)
- Monitor BGMEA Utilization Declarations (UD) and Utilization Permissions (UP).
- Track export piece entitlements, fabric (kg), and yarn (kg) entitlement limits versus actual consumption.

### 10. 📑 Export Document Desk & Live Preview (`ExportDocsView`, `ExportDocPreviewModal`)
- Prepare bank-compliant export document sets (Commercial Invoices, Packing Lists, Bills of Exchange, EXP Forms, BLs).
- Discrepancy checker (Clean vs Discrepant) with presentation deadline countdowns.
- Interactive modal for live previewing generated Commercial Invoices and Packing Lists.

### 11. 🛡️ Marine & Transport Insurance (`InsuranceView`)
- Track cover notes, marine cargo policies, inland transit cover, and export open cover policies.
- Calculate premium rates (%) and total premium in BDT.

### 12. 🏦 Banking Proceeds & Treasury (`BankingTreasuryView`)
- Manage document negotiation with advising and negotiating banks.
- Track realization details: ERQ retention, bank charges, LTR loan adjustments, and net BDT proceeds.

### 13. 💰 Cash Incentive Claims (`CashIncentiveView`)
- Post-export government cash subsidy management (4% RMG subsidy, 1% special incentive, Euro Zone incentive).
- Track Chartered Accountant (CA) firm audit status and Bangladesh Bank sanction & disbursement stages.

### 14. 🧮 Garments Commercial Trade Calculators (`TradeCalculators`)
Interactive decision-support tools built into the ERP:
1. **Master LC to B2B Entitlement Calculator**: Computes permissible B2B limits (Fabric %, Trims %, Dyes %) and Packing Credit (PC) entitlements.
2. **BGMEA UD Raw Material Wastage Calculator**: Computes garment weight (GSM, chest, length), approved BGMEA wastage %, total fabric (kg), and required yarn (kg).
3. **LC Expiry & Presentation Deadline Validator**: Validates whether shipment dates and presentation days fit within Master LC expiry dates.

### 15. 💳 TT Remittances & Bank Credit Facilities (`AdvancePayView`)
- Manage Telegraphic Transfer (TT) advance supplier remittances and SWIFT MT103 advice tracking.
- Lien Bank credit facility dashboard tracking sanctioned vs. utilized limits across Master LCs, B2B LCs, LTR/PAD loans, and Negotiation limits.

### 16. 💵 Commercial Expenses & Dispute Claims (`ExpensesClaimsView`)
- Track shipping line ocean freight, C&F agency fees, port demurrage charges, and customs duties.
- Manage buyer short-payment disputes, carrier damage claims, debit/credit notes, and settlement workflows.

### 17. 📋 Workflow Command & Exception SLA (`WorkflowTasksView`)
- Configurable maker-checker-approver approval queues with SLA deadline escalation.
- Exception management for late LCs, document presentation discrepancies, and vessel rollover SLA tracking with full audit trail logs.

### 18. ⚡ AI Document Intelligence & Decision Assistant (`AiAssistantView`)
- Optical scan discrepancy checking comparing Master LCs, PIs, Commercial Invoices, and Bills of Lading.
- Predictive delay engine forecasting shipment departure delays, customs hold risks, and demurrage exposure.
- Decision assistance & automated AI email generator for buyer LC amendments, carrier demurrage waivers, and bank presentation letters.

### 19. 🗂️ Commercial Master Reference Data (`MastersView`)
- Centralized reference directories for Banks, Buyers, Suppliers, Seaports/Airports, HS Codes, and Freight Forwarders.

---

## Tech Stack & Architecture

- **Frontend & App Framework**: [Next.js 16](https://nextjs.org/) / [Vinext](https://github.com/cloudflare/vinext) running on Vite 8.
- **UI Components & Icons**: React 19, Lucide-style SVG icon system, custom dark glassmorphism design system.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`), custom CSS tokens (`app/globals.css`).
- **Database & ORM**: [Drizzle ORM](https://orm.drizzle.team/) with SQLite dialect for Cloudflare D1.
- **Runtime Target**: Cloudflare Workers / Edge runtime (`vite.config.ts`, `.openai/hosting.json`).
- **Authentication**: Optional Sign in with ChatGPT integration (`app/chatgpt-auth.ts`).

---

## Database Schema Overview (`db/schema.ts`)

The database is built on Drizzle ORM and manages 15 core SQLite tables:

| Table Name | Description |
| :--- | :--- |
| `master_lcs` | Export Master LCs, sales contract details, buyer, issuing/advising banks, B2B limits, and expiry dates. |
| `back_to_back_lcs` | Import B2B LCs, supplier details, proforma invoices, margin %, tenor days, and loan types. |
| `proforma_invoices` | Supplier import PIs & buyer export PIs, HS codes, payment terms, and LC links. |
| `insurance_policies` | Cover note numbers, marine policy types, sum insured (USD), premium rates, and validity. |
| `import_landed_costs` | Import landed cost components (FOB, freight, duty, demurrage) and BDT/KG calculations. |
| `group_lc_pools` | Group LC pooling records, holding company allocation, and unit-level balances. |
| `customs_uds` | BGMEA UD/UP registrations, export entitlements (pcs), and fabric/yarn kg limits. |
| `export_doc_sets` | Shipping document sets, invoice values, EXP numbers, carton counts, and discrepancy flags. |
| `banking_proceeds` | Export bill negotiation, realized amounts (USD), ERQ retention, bank fees, and net BDT credit. |
| `cash_incentive_claims` | Government cash incentive claims, CA audit firm certificates, and Bangladesh Bank sanction status. |
| `commercial_masters` | Master reference data for banks, buyers, suppliers, ports, HS codes, and forwarders. |
| `advance_payments` | TT remittances, beneficiary banks, SWIFT MT103 advice, and exchange rate debit tracking. |
| `bank_credit_facilities` | Lien bank credit facilities (B2B limits, PAD, LTR, LIM, negotiation headroom, expiries). |
| `commercial_expenses` | Ocean freight, C&F agency fees, port demurrage, customs duty, and dispute claim tracking. |
| `workflow_tasks` | Maker-checker tasks, exception resolution SLA, severity levels, and audit trail logs. |

---

## Getting Started

### Prerequisites

- **Node.js**: `>=22.13.0`
- **Package Manager**: `npm`

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd ERP_Commercial

# Install dependencies
npm install
```

---

## Diagnostic & Development Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite / Vinext development server. |
| `npx vinext build` | Builds the production bundle for Cloudflare Workers / Edge runtime. |
| `npm run start` | Starts the production Vinext application server. |
| `node --test tests/rendered-html.test.mjs` | Executes the automated HTML rendering verification test. |
| `npx eslint .` | Runs ESLint code quality checks across the codebase. |
| `npm run db:generate` | Generates Drizzle ORM database migration files from `db/schema.ts`. |
| `npm run validate:artifact` | Validates the deployable build manifest and ESM exports. |

---

## Project Structure

```
ERP_Commercial/
├── app/                        # Next.js / Vinext App Router code
│   ├── components/             # 19 Specialized Commercial React Components
│   │   ├── BackToBackLCView.tsx
│   │   ├── BankingTreasuryView.tsx
│   │   ├── CashIncentiveView.tsx
│   │   ├── CustomsBondView.tsx
│   │   ├── EtdEtaTracker.tsx
│   │   ├── ExportDocPreviewModal.tsx
│   │   ├── ExportDocsView.tsx
│   │   ├── GroupLcView.tsx
│   │   ├── ImportCostingView.tsx
│   │   ├── InsuranceView.tsx
│   │   ├── MasterLCView.tsx
│   │   ├── MastersView.tsx
│   │   ├── PiManagementView.tsx
│   │   ├── PoTrackerView.tsx
│   │   ├── RecordDrawer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Topbar.tsx
│   │   ├── TradeCalculators.tsx
│   │   └── TradeModals.tsx
│   ├── types/
│   │   └── commercial.ts       # TypeScript interfaces & types for all commercial entities
│   ├── chatgpt-auth.ts         # Optional Sign-in with ChatGPT auth helpers
│   ├── globals.css             # Comprehensive dark theme design system & styling
│   ├── layout.tsx              # Root app layout & font configurations
│   └── page.tsx                # Commercial Control Tower main view & routing controller
├── db/
│   ├── index.ts                # Drizzle ORM Cloudflare D1 client configuration
│   └── schema.ts               # 11 Drizzle SQLite database table definitions
├── drizzle/                    # Generated SQL database migrations
├── scripts/                    # Build, CI, environment, and verification shell scripts
├── tests/                      # Automated node unit & render tests
│   └── rendered-html.test.mjs
├── .openai/
│   └── hosting.json            # OpenAI / Cloudflare D1 & R2 binding configuration
├── drizzle.config.ts           # Drizzle Kit configuration
├── next.config.ts              # Next.js compatibility config
├── package.json                # Project dependencies and script definitions
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite & Cloudflare plugin configuration
```

---

## License

Private / Enterprise Proprietary Software.

