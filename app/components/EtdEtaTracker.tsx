"use client";

import { useState } from "react";
import { ETDMilestone } from "../types/commercial";

interface EtdEtaTrackerProps {
  notify: (msg: string) => void;
  setModal: (open: boolean) => void;
}

const initialMilestones: ETDMilestone[] = [
  {
    id: "TRK-2026-0042",
    bookingRef: "BKG-2026-0204",
    vesselVoyage: "Maersk Hanoi / V.2608E",
    carrier: "Maersk Line",
    containerNo: "MSKU-9940128 (40HC)",
    blNumber: "MAEU44892019",
    pol: "Chattogram Port (BDCGP)",
    pod: "Rotterdam (NLRTM)",
    etdPlanned: "2026-08-14",
    etdActual: "2026-08-14",
    etaPlanned: "2026-09-08",
    etaActual: "2026-09-09",
    status: "Vessel Departed",
  },
  {
    id: "TRK-2026-0038",
    bookingRef: "BKG-2026-0201",
    vesselVoyage: "ONE Matrix / V.042A",
    carrier: "ONE Line",
    containerNo: "TGHU-8819024 (40HC)",
    blNumber: "ONEY8830192",
    pol: "Chattogram Port (BDCGP)",
    pod: "Hamburg (DEHAM)",
    etdPlanned: "2026-08-18",
    etdActual: "Pending",
    etaPlanned: "2026-09-15",
    etaActual: "Pending",
    status: "Booking Confirmed",
  },
  {
    id: "TRK-2026-0049",
    bookingRef: "BKG-2026-0198",
    vesselVoyage: "Singapore Airlines Cargo SQ-442",
    carrier: "SQ Cargo",
    containerNo: "12 Air Pallets (PMC)",
    blNumber: "AWB-618-994012",
    pol: "Dhaka Airport (BDDAC)",
    pod: "London Heathrow (GBLHR)",
    etdPlanned: "2026-08-13",
    etdActual: "2026-08-13",
    etaPlanned: "2026-08-14",
    etaActual: "2026-08-14",
    status: "Arrived at Port",
  },
];

export default function EtdEtaTracker({ notify, setModal }: EtdEtaTrackerProps) {
  const [milestones] = useState<ETDMilestone[]>(initialMilestones);

  return (
    <div className="etd-eta-module">
      <div className="panel etd-panel">
        <div className="panel-head">
          <div>
            <span>LOGISTICS MILESTONE TRACKER</span>
            <h3>ETD / ETA Departure, Arrival & Transport Document Board</h3>
          </div>
          <button className="primary" onClick={() => setModal(true)}>
            + Log Shipping Milestone
          </button>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>BOOKING & CONTAINER NO</th>
                <th>CARRIER & VESSEL / FLIGHT</th>
                <th>BL / AWB NUMBER</th>
                <th>PORT OF LOADING (POL)</th>
                <th>PORT OF DISCHARGE (POD)</th>
                <th>PLANNED ETD / ETA</th>
                <th>ACTUAL ETD / ETA</th>
                <th>MILESTONE STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((m) => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.bookingRef}</strong>
                    <span>Container: {m.containerNo}</span>
                  </td>
                  <td>
                    <strong>{m.carrier}</strong>
                    <span>Vessel: {m.vesselVoyage}</span>
                  </td>
                  <td>
                    <strong>{m.blNumber}</strong>
                  </td>
                  <td>
                    <span>{m.pol}</span>
                  </td>
                  <td>
                    <span>{m.pod}</span>
                  </td>
                  <td>
                    <strong>ETD: {m.etdPlanned}</strong>
                    <span>ETA: {m.etaPlanned}</span>
                  </td>
                  <td>
                    <strong className="up">ETD: {m.etdActual}</strong>
                    <span>ETA: {m.etaActual}</span>
                  </td>
                  <td>
                    <span className={`pill ${m.status === "Vessel Departed" || m.status === "Arrived at Port" ? "success" : "info"}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="secondary small-btn"
                      onClick={() => notify(`Vessel tracking link generated for ${m.vesselVoyage}`)}
                    >
                      Track Vessel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
