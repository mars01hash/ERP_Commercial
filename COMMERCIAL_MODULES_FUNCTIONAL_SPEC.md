# Garments Commercial ERP — Complete Functional Specifications & Module Guide

An enterprise-level functional specification for the **Garments Commercial ERP** system engineered for Bangladesh Ready-Made Garments (RMG) export manufacturers, buying houses, commercial departments, and trade finance desks.

---

## Table of Contents

1. [Commercial Order Handover](#1-commercial-order-handover)
2. [Master Export LC Management](#2-master-export-lc-management)
3. [Export Sales Contract Management](#3-export-sales-contract-management)
4. [Lien Bank & Credit Limit Management](#4-lien-bank--credit-limit-management)
5. [Import Requirement Planning](#5-import-requirement-planning)
6. [Proforma Invoice (PI) Management](#6-proforma-invoice-pi-management)
7. [Back-to-Back (B2B) LC Management](#7-back-to-back-b2b-lc-management)
8. [Telegraphic Transfer (TT) & Advance Payment](#8-telegraphic-transfer-tt--advance-payment)
9. [Import Shipment Management](#9-import-shipment-management)
10. [Import Document Management](#10-import-document-management)
11. [Import Banking & Document Retirement](#11-import-banking--document-retirement)
12. [Marine & Transport Insurance Management](#12-marine--transport-insurance-management)
13. [Customs Clearance Management](#13-customs-clearance-management)
14. [Bonded Warehouse Management](#14-bonded-warehouse-management)
15. [BGMEA/BKMEA UD/UP Management](#15-bgmeabkmea-udup-management)
16. [Import Registration & Regulatory Documents](#16-import-registration--regulatory-documents)
17. [Export Shipment Planning](#17-export-shipment-planning)
18. [Freight Forwarder & Booking Management](#18-freight-forwarder--booking-management)
19. [Export Commercial Invoice Management](#19-export-commercial-invoice-management)
20. [Packing List & Carton Management](#20-packing-list--carton-management)
21. [EXP Form Management](#21-exp-form-management)
22. [Export Customs Management](#22-export-customs-management)
23. [Export Document Preparation Engine](#23-export-document-preparation-engine)
24. [Bill of Lading & Air Waybill Management](#24-bill-of-lading--air-waybill-management)
25. [Export Document Scrutiny & Bank Presentation](#25-export-document-scrutiny--bank-presentation)
26. [Export Negotiation & Bill Discounting](#26-export-negotiation--bill-discounting)
27. [Export Proceeds Realization & ERQ Treasury](#27-export-proceeds-realization--erq-treasury)
28. [Proceeds Realization Certificate (PRC) Management](#28-proceeds-realization-certificate-prc-management)
29. [Cash Incentive & Subsidy Management](#29-cash-incentive--subsidy-management)
30. [Buying-House & Agent Commission Payment](#30-buying-house--agent-commission-payment)
31. [Freight, C&F & Commercial Expense Management](#31-freight-cf--commercial-expense-management)
32. [Claims & Dispute Management](#32-claims--dispute-management)
33. [Exception & Unexpected Scenario Management](#33-exception--unexpected-scenario-management)
34. [Commercial Task & Workflow Management](#34-commercial-task--workflow-management)
35. [Commercial Document Management System (DMS)](#35-commercial-document-management-system-dms)
36. [Commercial Master Data Management](#36-commercial-master-data-management)
37. [Reports & Business Analytics](#37-reports--business-analytics)
38. [Notifications, SLA & Alert System](#38-notifications-sla--alert-system)
39. [User, Role & Security Management](#39-user-role--security-management)
40. [Audit Trail & Internal Controls](#40-audit-trail--internal-controls)
41. [Financial Accounts Integration](#41-financial-accounts-integration)
42. [Cross-Module ERP Integration](#42-cross-module-erp-integration)
43. [External Integrations & SWIFT Exchange](#43-external-integrations--swift-exchange)
44. [AI & Intelligent Automation Engine](#44-ai--intelligent-automation-engine)
45. [System Administration & Configuration](#45-system-administration--configuration)

---

## 1. Commercial Order Handover
- **Purpose**: Connects Merchandising with Commercial upon buyer order confirmation.
- **Key Functions**:
  - Receive approved buyer orders, styles, PO numbers, order quantities, FOB prices, and Total USD value.
  - Record financing payment mode: Export LC, Sales Contract, Advance Payment, Open Account, or Documentary Collection.
  - Review commercial readiness checklist (missing buyer contracts, missing specs, invalid payment terms).
  - Assign commercial file officer and auto-generate Commercial File Reference (e.g. `OH-260811-06`).
- **Validation Rules**: Mandatory valid buyer, matching order vs PO value, explicit shipment date, duplicate PO handover prevention.

## 2. Master Export LC Management
- **Purpose**: Registration and lifecycle tracking of buyer export Letters of Credit.
- **Key Functions**:
  - Capture LC number, issue date, shipment date, expiry date, issuing bank (foreign), advising/lien bank (local).
  - Record payment terms: At Sight, Usance 60/90 Days, Transferable.
  - Clause Analysis: Automated detection of soft clauses, presentation period limits, partial shipment / transshipment permissions.
  - Amendment Management: Track LC value scale-ups, shipment date extensions, reason codes, and bank amendment fees.
  - Utilization Tracking: Calculates B2B LC Entitlement (default 75% limit) and Packing Credit (PC) headroom.
- **Data Table**: `master_lcs`

## 3. Export Sales Contract Management
- **Purpose**: Managing contract-based export sales when operating outside traditional LCs.
- **Key Functions**:
  - Register externally received buyer sales contracts, terms, delivery windows, and Incoterms (FOB/CFR/CIF).
  - Link multiple POs and styles under a single contract.
  - Convert contract value into export shipping files and monitor contract validity/renewal.

## 4. Lien Bank & Credit Limit Management
- **Purpose**: Managing relationship banks and sanctioned credit facility limits.
- **Key Functions**:
  - Monitor Master LC limits, Back-to-Back LC limits, LTR/PAD loan limits, and Negotiation limits across lien banks (Standard Chartered, HSBC, EBL, Pubali Bank).
  - Track sanctioned vs. utilized amounts, available headroom, margin %, and facility expiry alerts.
- **Data Table**: `bank_credit_facilities`

## 5. Import Requirement Planning
- **Purpose**: Consolidating raw material requirements (Yarn, Fabric, Trims, Dyes) for import against export orders.
- **Key Functions**:
  - Receive bill of materials (BOM) from Merchandising & Procurement.
  - Calculate import requirements based on consumption and approved BGMEA wastage %.
  - Verify entitlement against Master LC / Sales Contract limit before issuance.

## 6. Proforma Invoice (PI) Management
- **Purpose**: Supplier and buyer Proforma Invoice entry and approval.
- **Key Functions**:
  - Register import supplier PIs and export buyer PIs.
  - Capture HS codes, unit rates, total USD value, payment terms, and validity dates.
  - Perform price, quantity, and budget variance checks against comparative statements.
- **Data Table**: `proforma_invoices`

## 7. Back-to-Back (B2B) LC Management
- **Purpose**: Supplier import LC opening against buyer Master LC entitlement.
- **Key Functions**:
  - Issue local and foreign B2B LCs for Yarn, Fabric, Trims, and Chemicals.
  - Calculate maximum permissible entitlement ratio (e.g. 55% fabric, 15% trims, 5% dyes).
  - Track margin %, tenor days (Sight, Usance 90/120 Days), and loan types (**LTR**, **EDF**, **UP Loan**).
  - Manage maturity dates, supplier acceptances, and foreign exchange gain/loss on retirement.
- **Data Table**: `back_to_back_lcs`

## 8. Telegraphic Transfer (TT) & Advance Payment
- **Purpose**: Managing outward SWIFT advance payments and TT remittances.
- **Key Functions**:
  - Register TT payment requests against supplier PIs.
  - Record beneficiary bank, SWIFT/BIC codes, advance %, BDT debited amount, and exchange rate.
  - Store SWIFT MT103 advice confirmation and match against imported raw materials.
- **Data Table**: `advance_payments`

## 9. Import Shipment Management
- **Purpose**: Tracking inbound raw material logistics from dispatch to factory delivery.
- **Key Functions**:
  - Record vessel/flight info, carrier, Master/House BL or AWB, container numbers, and seal numbers.
  - Track ETD (Port of Loading) and ETA (Chittagong Port / Dhaka Airport).
  - Track arrival notice, free-time expiration, container release, and port demurrage risk.

## 10. Import Document Management
- **Purpose**: Managing inbound shipping document sets required for customs and bank retirement.
- **Key Functions**:
  - Check commercial invoices, packing lists, BL/AWB, certificates of origin, inspection certificates, and phytosanitary documents.
  - Verify document consistency and track document retirement from lien bank.

## 11. Import Banking & Document Retirement
- **Purpose**: Processing document arrival notices and import bill retirement.
- **Key Functions**:
  - Receive document arrival notices from lien bank.
  - Verify bill amounts, interest, bank charges, and exchange rates.
  - Create Payment Against Document (PAD) or Payment Creation (LTR/LIM) records.
  - Generate maturity schedule alerts and settle import liabilities.

## 12. Marine & Transport Insurance Management
- **Purpose**: Managing cargo insurance policies, open cover, and risk mitigation.
- **Key Functions**:
  - Issue cover notes for marine cargo and inland transit.
  - Record policy numbers, sum insured (USD), premium rate %, and premium amount (BDT).
  - Register damage/loss claims and survey reports.
- **Data Table**: `insurance_policies`

## 13. Customs Clearance Management
- **Purpose**: Managing C&F agents, Bill of Entry filings, and duty assessments.
- **Key Functions**:
  - Assign C&F agents, record Bill of Entry numbers (e.g. `C-181092`), manifest data, and declared customs values.
  - Calculate duties, VAT/AIT, C&F commissions, and demurrage.
  - Track customs assessment, lab test requirements, physical examination, and gate pass release.

## 14. Bonded Warehouse Management
- **Purpose**: Managing duty-free raw material import entitlement under customs bond license.
- **Key Functions**:
  - Maintain bond license numbers, validity, and approved warehouse storage capacity.
  - Track duty-free bonded imports vs. export consumption to ensure zero negative balance.
  - Calculate input-output coefficients and process inter-bond transfers.

## 15. BGMEA/BKMEA UD/UP Management
- **Purpose**: Registering Utilization Declarations (UD) and Utilization Permissions (UP).
- **Key Functions**:
  - Calculate garment raw material weight: `(2 × Length × Chest × GSM) / 10,000,000 × (1 + Wastage %)`.
  - Track BGMEA UD registration numbers, export entitlement in pieces, fabric (kg), and yarn (kg).
  - Monitor utilized vs. remaining entitlement balances to prevent excess imports.
- **Data Table**: `customs_uds`

## 16. Import Registration & Regulatory Documents
- **Purpose**: Repository and renewal tracking for regulatory licenses.
- **Key Functions**:
  - Store and monitor IRC, ERC, Bond License, VAT/BIN, TIN, Trade License, BGMEA/BKMEA Membership, Fire License, and Factory License.
  - Automated alerts prior to license expiration dates.

## 17. Export Shipment Planning
- **Purpose**: Grouping POs into export shipments and confirming commercial readiness.
- **Key Functions**:
  - Consolidate POs by buyer, destination port, ex-factory date, and shipping window.
  - Verify Master LC validity, UD entitlement balance, and inspection readiness before granting commercial clearance to ship.

## 18. Freight Forwarder & Booking Management
- **Purpose**: Managing carrier bookings, shipping instructions, and cut-off deadlines.
- **Key Functions**:
  - Issue booking requests to freight forwarders (Maersk, MSC, ONE, Kuehne+Nagel).
  - Track cargo cut-off, Shipping Instruction (SI) cut-off, and Verified Gross Mass (VGM) cut-off.
  - Record feeder/mother vessel names, voyage numbers, container allocations, and seal numbers.

## 19. Export Commercial Invoice Management
- **Purpose**: Generating compliant commercial and customs export invoices.
- **Key Functions**:
  - Generate automated export invoices from shipped POs.
  - Compute FOB, CFR, or CIF value, freight, insurance, and net invoice value in USD.
  - Link EXP numbers, packing lists, and Master LC references.

## 20. Packing List & Carton Management
- **Purpose**: Detailed carton, SKU, and weight breakdown for export shipments.
- **Key Functions**:
  - Capture carton number ranges (e.g. Carton 1 to 450), pcs per carton, net weight (kg), gross weight (kg), and total CBM.
  - Generate buyer-specific packing formats and main carton shipping marks.

## 21. EXP Form Management
- **Purpose**: Processing Bangladesh Bank mandatory EXP forms for export shipments.
- **Key Functions**:
  - Submit EXP data to bank portal and capture certified EXP reference numbers.
  - Link EXP numbers to export commercial invoices and track proceeds realization against each EXP.

## 22. Export Customs Management
- **Purpose**: Export customs declaration and Let Export Order (LEO) tracking.
- **Key Functions**:
  - File Bill of Export, record customs export declaration numbers, C&F agent, and HS codes.
  - Track customs seal, port entry, container stuffing supervision, and Let Export Order release.

## 23. Export Document Preparation Engine
- **Purpose**: Generating bank-compliant export document sets.
- **Key Functions**:
  - Automated compilation of Commercial Invoice, Packing List, Bill of Exchange, Certificate of Origin, GSP Certificate, Beneficiary Certificate, and Shipment Advice.
  - Interactive live preview modal (`ExportDocPreviewModal`) for verifying invoices and packing details prior to bank dispatch.
- **Data Table**: `export_doc_sets`

## 24. Bill of Lading & Air Waybill Management
- **Purpose**: Draft checking and final original BL/AWB set tracking.
- **Key Functions**:
  - Verify draft BL details (shipper, consignee, notify party, port of loading/discharge, container/carton counts).
  - Track original BL sets (3/3), sea waybills, telex release, and courier dispatch numbers.

## 25. Export Document Scrutiny & Bank Presentation
- **Purpose**: Quality check of export document sets before submitting to negotiating bank.
- **Key Functions**:
  - LC clause-based document checklist verification.
  - Classify discrepancy severity (Clean vs. Discrepant), request buyer waivers, and track presentation period deadlines (e.g. 21 days from BL date).

## 26. Export Negotiation & Bill Discounting
- **Purpose**: Export bill submission to bank for negotiation or collection.
- **Key Functions**:
  - Record negotiation schedule numbers (e.g. `FDBC-SCB-8834`), bill tenor (Sight / Usance 60/90 Days), and negotiation interest/commission.
  - Track bank acceptance and discounted net cash credited.

## 27. Export Proceeds Realization & ERQ Treasury
- **Purpose**: Tracking bank realization of export bills and foreign exchange retention.
- **Key Functions**:
  - Record realized USD amount, exchange rate (BDT), bank charges, and LTR loan deductions.
  - Credit 15% export proceeds into **Exporter's Retention Quotient (ERQ)** USD account and credit net BDT to main company account.
- **Data Table**: `banking_proceeds`

## 28. Proceeds Realization Certificate (PRC) Management
- **Purpose**: Requesting and storing Bangladesh Bank official PRCs.
- **Key Functions**:
  - Obtain PRC certificates from negotiating bank after full proceeds realization.
  - Link PRC numbers to export invoices and EXP forms for use in government cash incentive claims.

## 29. Cash Incentive & Subsidy Management
- **Purpose**: Processing post-export government cash subsidies.
- **Key Functions**:
  - Manage claims under 4% RMG export subsidy, 1% special incentive, and Euro Zone incentive.
  - Track Chartered Accountant (CA) firm audit certification and Bangladesh Bank sanction & disbursement stages.
- **Data Table**: `cash_incentive_claims`

## 30. Buying-House & Agent Commission Payment
- **Purpose**: Managing local and foreign buying agent commission obligations.
- **Key Functions**:
  - Calculate commission percentages against realized export invoices.
  - Apply statutory withholding tax and issue outward bank remittance instructions.

## 31. Freight, C&F & Commercial Expense Management
- **Purpose**: Auditing and approving commercial operational expenses.
- **Key Functions**:
  - Record shipping line ocean freight, C&F agency fees, Chittagong Port Authority charges, demurrage, and courier expenses.
  - Compare estimated vs. actual expenses and calculate landed cost per shipment.
- **Data Table**: `commercial_expenses`

## 32. Claims & Dispute Management
- **Purpose**: Handling commercial disputes, damaged cargo, and buyer short-payments.
- **Key Functions**:
  - Register import shortage/damage claims, carrier damage claims, and buyer short-payment claims.
  - Issue debit/credit notes and track dispute resolution SLAs.

## 33. Exception & Unexpected Scenario Management
- **Purpose**: Managing irregular operational scenarios and compliance risks.
- **Key Functions**:
  - Automated exception workflows for late LCs, vessel rollovers, customs holds, missing original BLs, and document presentation delays.
  - Classify financial risk exposure and enforce mandatory management approval for workarounds.

## 34. Commercial Task & Workflow Management
- **Purpose**: Configurable maker-checker-approver control tower.
- **Key Functions**:
  - Sequential and parallel approval workflows for LC opening, TT remittances, document dispatch, and expense payments.
  - Enforce SLA deadlines, escalation rules, and immutable task audit notes.
- **Data Table**: `workflow_tasks`

## 35. Commercial Document Management System (DMS)
- **Purpose**: Centralized digital document archive.
- **Key Functions**:
  - Transaction-wise folder structure storing scanned Master LCs, PIs, BLs, Bills of Entry, EXP forms, and PRCs.
  - Version control, OCR text extraction, watermarking, and ZIP export.

## 36. Commercial Master Data Management
- **Purpose**: Maintaining master reference data across commercial entities.
- **Key Functions**:
  - Centralized reference directories for Banks & Branches, Buyers, Suppliers, Seaports/Airports, HS Codes, and Freight Forwarders.
- **Data Table**: `commercial_masters`

## 37. Reports & Business Analytics
- **Purpose**: Executive reporting and operational dashboards.
- **Key Functions**:
  - Master LC exposure, B2B liability position, export proceeds aging, customs clearance lead times, and bank-wise credit facility utilization.
  - Export reports to Excel, PDF, and CSV formats.

## 38. Notifications, SLA & Alert System
- **Purpose**: Real-time proactive alerts across the commercial lifecycle.
- **Key Functions**:
  - Automated notifications for LC expiries within 30 days, B2B maturities, demurrage free-time expiration, SI/VGM cut-offs, and overdue export proceeds.

## 39. User, Role & Security Management
- **Purpose**: Enterprise security and access control.
- **Key Functions**:
  - Multi-company and multi-factory role-based access control (RBAC).
  - Page-level, action-level, and amount-based transaction authorization limits.

## 40. Audit Trail & Internal Controls
- **Purpose**: Maintaining tamper-resistant transaction logs.
- **Key Functions**:
  - Track field-level change history, old vs. new values, user ID, timestamp, and IP address for all Master LC, B2B, and payment edits.

## 41. Financial Accounts Integration
- **Purpose**: Seamless general ledger mapping.
- **Key Functions**:
  - Auto-post import B2B liabilities, export receivables, bank charges, ERQ retentions, and net BDT credits directly to the ERP financial ledger.

## 42. Cross-Module ERP Integration
- **Purpose**: Synchronization with Merchandising, Procurement, Inventory, Production, and Accounts.
- **Key Functions**:
  - Receive PO costings from Merchandising, send cleared raw material quantities to Inventory, and pass realization data to Accounts.

## 43. External Integrations & SWIFT Exchange
- **Purpose**: Connecting with external trade infrastructure.
- **Key Functions**:
  - SWIFT MT700 (LC Opening), MT707 (LC Amendment), and MT103 (Single Customer Remittance) message parsing.
  - Shipping line container tracking APIs and exchange rate feeds.

## 44. AI & Intelligent Automation Engine
- **Purpose**: AI-driven document scrutiny and predictive operational intelligence.
- **Key Functions**:
  - **Optical Scan Discrepancy Auditing**: Scan Master LCs, PIs, and BLs to highlight clause mismatches or port name typos.
  - **Predictive Delay Engine**: Forecast vessel rollover risks, customs clearance lead times, and demurrage exposure.
  - **AI Decision & Email Assistant**: Auto-draft buyer LC amendment requests, carrier demurrage waivers, and bank cover schedule letters.

## 45. System Administration & Configuration
- **Purpose**: Core system setup and maintenance.
- **Key Functions**:
  - Factory configuration, financial year setup, auto-numbering sequence rules, currency exchange rates, SLA rules, and system health logs.

---

## Technical Architecture Summary

```
 ┌─────────────────────────────────────────────────────────────────────────┐
 │                      COMMERCIAL CONTROL TOWER (UI)                      │
 │    Next.js 16 / Vinext · React 19 · Tailwind CSS v4 · Custom CSS        │
 └────────────────────────────────────┬────────────────────────────────────┘
                                      │
 ┌────────────────────────────────────▼────────────────────────────────────┐
 │                     ENTERPRISE ROUTER & CONTROLLER                      │
 │      26 Main Menu Options · 19 Component Views · AI Engine Panel       │
 └────────────────────────────────────┬────────────────────────────────────┘
                                      │
 ┌────────────────────────────────────▼────────────────────────────────────┐
 │                     DRIZZLE ORM DATABASE LAYER                          │
 │         15 SQLite Schema Tables running on Cloudflare D1 Edge          │
 └─────────────────────────────────────────────────────────────────────────┘
```
