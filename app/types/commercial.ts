export type PageKey =
  | "dashboard" | "orders" | "masterlc" | "backtoback" | "imports" | "customs"
  | "exports" | "shipping" | "documents" | "banking" | "incentive" | "compliance"
  | "reports" | "masters" | "settings" | "calculators"
  | "pimanagement" | "insurance" | "importcosting" | "grouplc" | "etdeta" | "potracker"
  | "advancepay" | "expenses" | "tasks" | "aiassistant";

export type RecordStatus =
  | "Active" | "Draft" | "Pending review" | "Ready" | "Missing docs" | "Amendment due"
  | "Issued" | "On water" | "Customs hold" | "Cleared" | "Assessment" | "Pending approval"
  | "Action required" | "Documents open" | "Planning" | "Bank pending" | "Booking confirmed"
  | "VGM pending" | "Space requested" | "QC review" | "Ready to dispatch" | "Discrepancy"
  | "Accepted" | "Awaiting credit" | "Realized" | "Audit running" | "Certificate pending"
  | "High risk" | "Critical" | "Settled" | "Covered";

export interface POTransitionRecord {
  id: string;
  poNumber: string;
  styleName: string;
  buyer: string;
  quantityPcs: number;
  fobPriceUsd: number;
  totalValueUsd: number;
  currentStageIndex: number; // 0 to 7 (8 stages)
  currentStageName:
    | "Commercial Intake"
    | "Master LC Tagged"
    | "BGMEA UD Registered"
    | "B2B LC Opened"
    | "Inbound Cleared"
    | "Shipment Booked"
    | "Export Invoiced"
    | "Proceeds Realized";
  shipmentDate: string;
  linkedMasterLc: string;
  linkedUdNo: string;
  linkedB2bLcs: string[];
  linkedContainerNo: string;
  linkedInvoiceNo: string;
  realizedAmountUsd: number;
  stageHistory: { stage: string; timestamp: string; note: string }[];
}

export interface RecordRow {
  id: string;
  title: string;
  party: string;
  ref: string;
  amount: string;
  date: string;
  status: RecordStatus | string;
  type?: string;
  buyer?: string;
  bank?: string;
  lcNumber?: string;
  expiryDate?: string;
  shipmentDate?: string;
  valueUsd?: number;
  entitlementPercent?: number;
  hsCode?: string;
  portOfDischarge?: string;
  containerNo?: string;
  blNumber?: string;
  expNumber?: string;
  udNumber?: string;
  items?: { name: string; qty: string; rate: string; total: string }[];
  amendments?: { no: number; date: string; change: string; status: string }[];
  history?: { stage: string; actor: string; timestamp: string; note: string }[];
}

export interface MasterLCItem {
  id: string;
  lcNo: string;
  salesContractNo: string;
  buyer: string;
  issuingBank: string;
  advisingBank: string;
  type: "At Sight" | "Usance 60 Days" | "Usance 90 Days" | "Transferable";
  valueUsd: number;
  utilizedUsd: number;
  b2bEntitlementUsd: number;
  b2bUtilizedUsd: number;
  packingCreditLimitUsd: number;
  issueDate: string;
  shipmentDate: string;
  expiryDate: string;
  status: "Active" | "Amendment due" | "Expired" | "Exhausted";
  linkedOrdersCount: number;
  amendments: { no: number; date: string; amountAdded: number; revisedExpiry: string; reason: string }[];
}

export interface BackToBackLCItem {
  id: string;
  btbLcNo: string;
  linkedMasterLcNo: string;
  supplier: string;
  openingBank: string;
  proformaInvoiceNo: string;
  itemCategory: "Yarn" | "Fabric" | "Trims & Accessories" | "Dyes & Chemicals";
  valueUsd: number;
  marginPercent: number;
  tenorDays: number;
  paymentTerm: "Sight" | "Usance 90 Days" | "Usance 120 Days" | "DA" | "DP";
  expiryDate: string;
  status: "Issued" | "Draft" | "Amendment due" | "Retired" | "Overdue";
  loanType?: "LTR" | "EDF" | "UP Loan";
}

export interface ProformaInvoice {
  id: string;
  piNo: string;
  partyName: string;
  piType: "Import Supplier PI" | "Export Buyer PI";
  category: "Fabric" | "Yarn" | "Trims & Accessories" | "Garments Export";
  piValueUsd: number;
  hsCode: string;
  validUntil: string;
  linkedLcNo: string;
  paymentTerms: string;
  status: "Active" | "Linked to LC" | "Expired" | "Cancelled";
  items: { description: string; qty: number; unit: string; rateUsd: number; totalUsd: number }[];
}

export interface InsurancePolicy {
  id: string;
  coverNoteNo: string;
  policyNo: string;
  insuranceCompany: string;
  policyType: "Marine Cargo" | "Inland Transport" | "Export Open Cover";
  sumInsuredUsd: number;
  premiumRatePercent: number;
  premiumBdt: number;
  voyageFromTo: string;
  issueDate: string;
  validUntil: string;
  status: "Covered" | "Pending Premium" | "Claim Raised" | "Expired";
}

export interface ImportLandedCost {
  id: string;
  impRefNo: string;
  supplier: string;
  blNumber: string;
  fobValueUsd: number;
  freightUsd: number;
  insuranceUsd: number;
  customsDutyBdt: number;
  cfCommissionBdt: number;
  demurrageBdt: number;
  totalLandedCostBdt: number;
  landedCostPerKgBdt: number;
  paymentMaturityDate: string;
  paymentStatus: "Pending" | "Settled" | "Overdue";
}

export interface GroupLCPool {
  id: string;
  groupLcNo: string;
  holdingGroup: string;
  buyer: string;
  issuingBank: string;
  totalPooledValueUsd: number;
  allocatedValueUsd: number;
  expiryDate: string;
  unitAllocations: { unitName: string; allocatedUsd: number; b2bUtilizedUsd: number }[];
  status: "Active" | "Fully Allocated" | "Expired";
}

export interface ETDMilestone {
  id: string;
  bookingRef: string;
  vesselVoyage: string;
  carrier: string;
  containerNo: string;
  blNumber: string;
  pol: string;
  pod: string;
  etdPlanned: string;
  etdActual: string;
  etaPlanned: string;
  etaActual: string;
  status: "Booking Confirmed" | "Vessel Departed" | "Transshipment" | "Arrived at Port" | "Customs Cleared";
}

export interface CustomsUDItem {
  id: string;
  udNo: string;
  bgmeaRefNo: string;
  linkedMasterLcNo: string;
  buyer: string;
  exportEntitlementPcs: number;
  fabricEntitlementKg: number;
  yarnEntitlementKg: number;
  usedFabricKg: number;
  usedYarnKg: number;
  issueDate: string;
  expiryDate: string;
  status: "Active" | "Pending approval" | "Amendment required" | "Closed";
}

export interface ExportDocSet {
  id: string;
  docSetNo: string;
  invoiceNo: string;
  buyer: string;
  negotiatingBank: string;
  expNo: string;
  blNo: string;
  vesselVoyage: string;
  destPort: string;
  totalCartons: number;
  totalPcs: number;
  invoiceValueUsd: number;
  shipmentDate: string;
  presentationDeadline: string;
  discrepancyStatus: "Clean" | "Minor Discrepancy" | "Major Discrepancy" | "Under Bank QC";
  items: { description: string; poNo: string; color: string; qtyPcs: number; unitPriceUsd: number; totalUsd: number }[];
  packingDetails?: {
    cartonFrom: number;
    cartonTo: number;
    pcsPerCarton: number;
    netWeightKg: number;
    grossWeightKg: number;
    cbm: number;
    cartonMeasurementCm: string;
  }[];
}

export interface BankingProceedsItem {
  id: string;
  billNo: string;
  expNo: string;
  buyer: string;
  negotiatingBank: string;
  billAmountUsd: number;
  realizedAmountUsd: number;
  erqRetentionUsd: number;
  bankChargesUsd: number;
  ltrAdjustmentUsd: number;
  netBdtReceived: number;
  tenorDays: number;
  maturityDate: string;
  status: "Accepted" | "Awaiting credit" | "Realized" | "Overdue";
}

export interface CashIncentiveClaimItem {
  id: string;
  claimNo: string;
  quarter: "Q1 2026" | "Q2 2026" | "Q3 2026" | "Q4 2026";
  incentiveType: "4% RMG Subsidy" | "1% Additional Special Incentive" | "Euro Zone Special Incentive";
  expCount: number;
  claimAmountBdt: number;
  submittingBank: string;
  caAuditFirm: string;
  caCertificateStatus: "Certified" | "Pending audit" | "Queries raised";
  bbSanctionStatus: "Submitted" | "Audit running" | "Sanctioned" | "Disbursed";
  submissionDate: string;
}

export interface CommercialMaster {
  category: "Banks" | "Buyers" | "Suppliers" | "Ports" | "HS Codes" | "Forwarders";
  code: string;
  name: string;
  country: string;
  details: string;
  status: "Active" | "Inactive";
}

export interface AdvancePaymentItem {
  id: string;
  refNo: string;
  supplier: string;
  piNumber: string;
  beneficiaryBank: string;
  swiftCode: string;
  remittanceAmountUsd: number;
  paymentPercent: number;
  exchangeRateBdt: number;
  totalBdtDebited: number;
  paymentDate: string;
  status: "SWIFT Executed" | "Pending Remittance" | "Returned";
}

export interface CreditFacilityItem {
  id: string;
  bankName: string;
  facilityType: "Master LC" | "Back-to-Back LC" | "LTR / PAD" | "Negotiation Limit";
  sanctionedLimitUsd: number;
  utilizedLimitUsd: number;
  availableLimitUsd: number;
  marginPercent: number;
  expiryDate: string;
  status: "Active" | "Near Expiry" | "Exhausted";
}

export interface CommercialExpenseItem {
  id: string;
  voucherNo: string;
  expenseCategory: "Ocean Freight" | "C&F Agency Fees" | "Customs Duty" | "Port Demurrage" | "Insurance Premium" | "Dispute Claim";
  vendorParty: string;
  linkedRefNo: string;
  amountUsd: number;
  amountBdt: number;
  approvalStatus: "Approved" | "Pending Review" | "Under Dispute";
  paymentStatus: "Paid" | "Pending Settlement" | "Overdue";
  dueDate: string;
}

export interface WorkflowTaskItem {
  id: string;
  taskTitle: string;
  category: "LC Exception" | "Maker-Checker Approval" | "Discrepancy Waiver" | "Vessel Rollover" | "Audit Warning";
  severity: "Critical" | "High" | "Medium" | "Low";
  assignedOfficer: string;
  linkedEntityRef: string;
  slaDeadline: string;
  status: "Open" | "In Review" | "Resolved" | "Escalated";
  auditLogNotes: string;
}

export interface AiAnalysisItem {
  id: string;
  targetDocument: string;
  docType: "Master LC" | "Proforma Invoice" | "Bill of Lading" | "Customs UD";
  aiConfidenceScore: number;
  detectedMismatchesCount: number;
  riskSummary: string;
  aiRecommendations: string[];
  analyzedTimestamp: string;
}

