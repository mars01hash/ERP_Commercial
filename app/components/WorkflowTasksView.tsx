"use client";

import { useState } from "react";
import { WorkflowTaskItem } from "../types/commercial";

interface WorkflowTasksViewProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialTasks: WorkflowTaskItem[] = [
  {
    id: "TSK-2026-0811",
    taskTitle: "Resolve LC Expiry Mismatch before Ex-Factory Date",
    category: "LC Exception",
    severity: "Critical",
    assignedOfficer: "Mahin Rahman (Head of Commercial)",
    linkedEntityRef: "SC-2026-0031 (C&A Europe)",
    slaDeadline: "2026-08-14 17:00",
    status: "In Review",
    auditLogNotes: "Buyer agreed verbally to extend expiry date by 15 days via SC Amendment #2.",
  },
  {
    id: "TSK-2026-0809",
    taskTitle: "Maker-Checker Approval: B2B LC Opening for Yarn Import",
    category: "Maker-Checker Approval",
    severity: "High",
    assignedOfficer: "Tanvir Ahmed (Sr. Commercial Executive)",
    linkedEntityRef: "BTB-0286-99120 ($410,000)",
    slaDeadline: "2026-08-12 12:00",
    status: "Open",
    auditLogNotes: "Checked fabric entitlement under BGMEA UD-2026-88192. Entitlement 28,400 kg verified.",
  },
  {
    id: "TSK-2026-0804",
    taskTitle: "Obtain Buyer Discrepancy Waiver for Bill of Lading Typo",
    category: "Discrepancy Waiver",
    severity: "Critical",
    assignedOfficer: "Rezaul Karim (Documentation Manager)",
    linkedEntityRef: "EXP-2026-0138 (H&M Hamburg)",
    slaDeadline: "2026-08-12 18:00",
    status: "In Review",
    auditLogNotes: "Swift message sent to SCB Hong Kong for buyer approval waiver.",
  },
  {
    id: "TSK-2026-0802",
    taskTitle: "Vessel Rollover & SI Cut-Off SLA Alert",
    category: "Vessel Rollover",
    severity: "Medium",
    assignedOfficer: "Farhana Chowdhury (Logistics Coordinator)",
    linkedEntityRef: "BKG-2026-0201 (ONE Matrix)",
    slaDeadline: "2026-08-15 14:00",
    status: "Open",
    auditLogNotes: "Carrier rolled container to next feeder vessel ONE Tradition departing CTG 18 Aug.",
  },
];

export default function WorkflowTasksView({ notify, setModal }: WorkflowTasksViewProps) {
  const [tasks] = useState<WorkflowTaskItem[]>(initialTasks);
  const [filterSeverity, setFilterSeverity] = useState<string>("All");

  const filtered = tasks.filter(
    (t) => filterSeverity === "All" || t.severity === filterSeverity
  );

  return (
    <div className="workflow-tasks-module space-y-6">
      <div className="panel flex flex-col gap-4">
        <div className="panel-head flex justify-between items-center">
          <div>
            <span>WORKFLOW COMMAND CENTER & AUDIT LOGS</span>
            <h3>Maker-Checker Approvals, Exception Cases & SLA Escalations</h3>
          </div>
          <div className="flex gap-2">
            <select
              className="bg-gray-900 border border-gray-700 text-sm rounded px-3 py-1 text-gray-200"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical SLA</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium</option>
            </select>
            <button className="primary" onClick={() => setModal(true)}>
              + Create Workflow Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <div key={t.id} className="panel p-4 border border-gray-800 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs text-cyan-400">{t.id}</span>
                  <span
                    className={`badge ${
                      t.severity === "Critical"
                        ? "danger"
                        : t.severity === "High"
                        ? "warning"
                        : "info"
                    }`}
                  >
                    {t.severity} Severity
                  </span>
                </div>
                <h4 className="font-bold text-gray-100 text-base mb-1">{t.taskTitle}</h4>
                <p className="text-xs text-gray-400 font-mono mb-3">Linked: {t.linkedEntityRef}</p>

                <div className="bg-gray-900 p-3 rounded text-xs text-gray-300 mb-3 border border-gray-800">
                  <strong className="text-gray-400 block mb-1">AUDIT LOG & NOTES:</strong>
                  {t.auditLogNotes}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-gray-400 block">Assigned: {t.assignedOfficer}</span>
                  <span className="text-amber-400 font-mono">SLA: {t.slaDeadline}</span>
                </div>
                <button
                  className="btn-sm primary"
                  onClick={() => notify(`Task ${t.id} updated and logged to audit trail.`)}
                >
                  ✓ Approve / Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
