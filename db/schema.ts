import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// 1. Master LC & Sales Contracts
export const masterLcs = sqliteTable("master_lcs", {
  id: text("id").primaryKey(),
  lcNo: text("lc_no").notNull(),
  salesContractNo: text("sales_contract_no").notNull(),
  buyer: text("buyer").notNull(),
  issuingBank: text("issuing_bank").notNull(),
  advisingBank: text("advising_bank").notNull(),
  type: text("type").notNull().default("At Sight"),
  valueUsd: real("value_usd").notNull(),
  utilizedUsd: real("utilized_usd").notNull().default(0),
  b2bEntitlementUsd: real("b2b_entitlement_usd").notNull(),
  b2bUtilizedUsd: real("b2b_utilized_usd").notNull().default(0),
  packingCreditLimitUsd: real("packing_credit_limit_usd").notNull().default(0),
  issueDate: text("issue_date").notNull(),
  shipmentDate: text("shipment_date").notNull(),
  expiryDate: text("expiry_date").notNull(),
  status: text("status").notNull().default("Active"),
  linkedOrdersCount: integer("linked_orders_count").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 2. Back-to-Back (B2B) LCs
export const backToBackLcs = sqliteTable("back_to_back_lcs", {
  id: text("id").primaryKey(),
  btbLcNo: text("btb_lc_no").notNull(),
  linkedMasterLcNo: text("linked_master_lc_no").notNull(),
  supplier: text("supplier").notNull(),
  openingBank: text("opening_bank").notNull(),
  proformaInvoiceNo: text("proforma_invoice_no").notNull(),
  itemCategory: text("item_category").notNull(),
  valueUsd: real("value_usd").notNull(),
  marginPercent: real("margin_percent").notNull().default(0),
  tenorDays: integer("tenor_days").notNull().default(90),
  paymentTerm: text("payment_term").notNull().default("Usance 90 Days"),
  expiryDate: text("expiry_date").notNull(),
  status: text("status").notNull().default("Issued"),
  loanType: text("loan_type"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 3. Proforma Invoices (PI Management)
export const proformaInvoices = sqliteTable("proforma_invoices", {
  id: text("id").primaryKey(),
  piNo: text("pi_no").notNull(),
  partyName: text("party_name").notNull(),
  piType: text("pi_type").notNull(), // Import Supplier PI vs Export Buyer PI
  category: text("category").notNull(),
  piValueUsd: real("pi_value_usd").notNull(),
  hsCode: text("hs_code").notNull(),
  validUntil: text("valid_until").notNull(),
  linkedLcNo: text("linked_lc_no"),
  paymentTerms: text("payment_terms").notNull(),
  status: text("status").notNull().default("Active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 4. Marine & Cargo Insurance
export const insurancePolicies = sqliteTable("insurance_policies", {
  id: text("id").primaryKey(),
  coverNoteNo: text("cover_note_no").notNull(),
  policyNo: text("policy_no").notNull(),
  insuranceCompany: text("insurance_company").notNull(),
  policyType: text("policy_type").notNull(),
  sumInsuredUsd: real("sum_insured_usd").notNull(),
  premiumRatePercent: real("premium_rate_percent").notNull(),
  premiumBdt: real("premium_bdt").notNull(),
  voyageFromTo: text("voyage_from_to").notNull(),
  issueDate: text("issue_date").notNull(),
  validUntil: text("valid_until").notNull(),
  status: text("status").notNull().default("Covered"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 5. Import Landed Costing
export const importLandedCosts = sqliteTable("import_landed_costs", {
  id: text("id").primaryKey(),
  impRefNo: text("imp_ref_no").notNull(),
  supplier: text("supplier").notNull(),
  blNumber: text("bl_number").notNull(),
  fobValueUsd: real("fob_value_usd").notNull(),
  freightUsd: real("freight_usd").notNull().default(0),
  insuranceUsd: real("insurance_usd").notNull().default(0),
  customsDutyBdt: real("customs_duty_bdt").notNull().default(0),
  cfCommissionBdt: real("cf_commission_bdt").notNull().default(0),
  demurrageBdt: real("demurrage_bdt").notNull().default(0),
  totalLandedCostBdt: real("total_landed_cost_bdt").notNull(),
  landedCostPerKgBdt: real("landed_cost_per_kg_bdt").notNull(),
  paymentMaturityDate: text("payment_maturity_date").notNull(),
  paymentStatus: text("payment_status").notNull().default("Pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 6. Group LC Pooling
export const groupLcPools = sqliteTable("group_lc_pools", {
  id: text("id").primaryKey(),
  groupLcNo: text("group_lc_no").notNull(),
  holdingGroup: text("holding_group").notNull(),
  buyer: text("buyer").notNull(),
  issuingBank: text("issuing_bank").notNull(),
  totalPooledValueUsd: real("total_pooled_value_usd").notNull(),
  allocatedValueUsd: real("allocated_value_usd").notNull().default(0),
  expiryDate: text("expiry_date").notNull(),
  status: text("status").notNull().default("Active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 7. Customs & BGMEA UD/UP
export const customsUds = sqliteTable("customs_uds", {
  id: text("id").primaryKey(),
  udNo: text("ud_no").notNull(),
  bgmeaRefNo: text("bgmea_ref_no").notNull(),
  linkedMasterLcNo: text("linked_master_lc_no").notNull(),
  buyer: text("buyer").notNull(),
  exportEntitlementPcs: integer("export_entitlement_pcs").notNull(),
  fabricEntitlementKg: real("fabric_entitlement_kg").notNull(),
  yarnEntitlementKg: real("yarn_entitlement_kg").notNull(),
  usedFabricKg: real("used_fabric_kg").notNull().default(0),
  usedYarnKg: real("used_yarn_kg").notNull().default(0),
  issueDate: text("issue_date").notNull(),
  expiryDate: text("expiry_date").notNull(),
  status: text("status").notNull().default("Active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 8. Export Document Sets
export const exportDocSets = sqliteTable("export_doc_sets", {
  id: text("id").primaryKey(),
  docSetNo: text("doc_set_no").notNull(),
  invoiceNo: text("invoice_no").notNull(),
  buyer: text("buyer").notNull(),
  negotiatingBank: text("negotiating_bank").notNull(),
  expNo: text("exp_no").notNull(),
  blNo: text("bl_no").notNull(),
  vesselVoyage: text("vessel_voyage").notNull(),
  destPort: text("dest_port").notNull(),
  totalCartons: integer("total_cartons").notNull(),
  totalPcs: integer("total_pcs").notNull(),
  invoiceValueUsd: real("invoice_value_usd").notNull(),
  shipmentDate: text("shipment_date").notNull(),
  presentationDeadline: text("presentation_deadline").notNull(),
  discrepancyStatus: text("discrepancy_status").notNull().default("Clean"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 9. Banking Proceeds & Negotiation
export const bankingProceeds = sqliteTable("banking_proceeds", {
  id: text("id").primaryKey(),
  billNo: text("bill_no").notNull(),
  expNo: text("exp_no").notNull(),
  buyer: text("buyer").notNull(),
  negotiatingBank: text("negotiating_bank").notNull(),
  billAmountUsd: real("bill_amount_usd").notNull(),
  realizedAmountUsd: real("realized_amount_usd").notNull().default(0),
  erqRetentionUsd: real("erq_retention_usd").notNull().default(0),
  bankChargesUsd: real("bank_charges_usd").notNull().default(0),
  ltrAdjustmentUsd: real("ltr_adjustment_usd").notNull().default(0),
  netBdtReceived: real("net_bdt_received").notNull().default(0),
  tenorDays: integer("tenor_days").notNull().default(60),
  maturityDate: text("maturity_date").notNull(),
  status: text("status").notNull().default("Awaiting credit"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 10. Cash Incentive Claims
export const cashIncentiveClaims = sqliteTable("cash_incentive_claims", {
  id: text("id").primaryKey(),
  claimNo: text("claim_no").notNull(),
  quarter: text("quarter").notNull(),
  incentiveType: text("incentive_type").notNull(),
  expCount: integer("exp_count").notNull(),
  claimAmountBdt: real("claim_amount_bdt").notNull(),
  submittingBank: text("submitting_bank").notNull(),
  caAuditFirm: text("ca_audit_firm").notNull(),
  caCertificateStatus: text("ca_certificate_status").notNull().default("Pending audit"),
  bbSanctionStatus: text("bb_sanction_status").notNull().default("Submitted"),
  submissionDate: text("submission_date").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 11. Commercial Master Reference Data
export const commercialMasters = sqliteTable("commercial_masters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(), // Banks, Buyers, Suppliers, Ports, HS Codes
  code: text("code").notNull(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  details: text("details").notNull().default(""),
  status: text("status").notNull().default("Active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 12. TT & Advance Remittance Payments
export const advancePayments = sqliteTable("advance_payments", {
  id: text("id").primaryKey(),
  refNo: text("ref_no").notNull(),
  supplier: text("supplier").notNull(),
  piNumber: text("pi_number").notNull(),
  beneficiaryBank: text("beneficiary_bank").notNull(),
  swiftCode: text("swift_code").notNull(),
  remittanceAmountUsd: real("remittance_amount_usd").notNull(),
  paymentPercent: real("payment_percent").notNull(),
  exchangeRateBdt: real("exchange_rate_bdt").notNull(),
  totalBdtDebited: real("total_bdt_debited").notNull(),
  paymentDate: text("payment_date").notNull(),
  status: text("status").notNull().default("SWIFT Executed"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 13. Lien Bank & Credit Facilities
export const bankCreditFacilities = sqliteTable("bank_credit_facilities", {
  id: text("id").primaryKey(),
  bankName: text("bank_name").notNull(),
  facilityType: text("facility_type").notNull(), // Master LC, B2B LC, LTR/PAD, Negotiation Limit
  sanctionedLimitUsd: real("sanctioned_limit_usd").notNull(),
  utilizedLimitUsd: real("utilized_limit_usd").notNull().default(0),
  availableLimitUsd: real("available_limit_usd").notNull(),
  marginPercent: real("margin_percent").notNull().default(0),
  expiryDate: text("expiry_date").notNull(),
  status: text("status").notNull().default("Active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 14. Freight, C&F & Dispute Claims
export const commercialExpenses = sqliteTable("commercial_expenses", {
  id: text("id").primaryKey(),
  voucherNo: text("voucher_no").notNull(),
  expenseCategory: text("expense_category").notNull(), // Freight, C&F, Customs Duty, Demurrage, Survey Claim
  vendorParty: text("vendor_party").notNull(),
  linkedRefNo: text("linked_ref_no").notNull(),
  amountUsd: real("amount_usd").notNull().default(0),
  amountBdt: real("amount_bdt").notNull(),
  approvalStatus: text("approval_status").notNull().default("Approved"),
  paymentStatus: text("payment_status").notNull().default("Pending Settlement"),
  dueDate: text("due_date").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

// 15. Workflow Tasks, Exceptions & SLA Audit Logs
export const workflowTasks = sqliteTable("workflow_tasks", {
  id: text("id").primaryKey(),
  taskTitle: text("task_title").notNull(),
  category: text("category").notNull(), // LC Exception, Maker-Checker Approval, Discrepancy Waiver, Vessel Rollover
  severity: text("severity").notNull(), // Critical, High, Medium, Low
  assignedOfficer: text("assigned_officer").notNull(),
  linkedEntityRef: text("linked_entity_ref").notNull(),
  slaDeadline: text("sla_deadline").notNull(),
  status: text("status").notNull().default("In Review"),
  auditLogNotes: text("audit_log_notes").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

