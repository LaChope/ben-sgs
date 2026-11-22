import { useState } from "react";
import { KpiGrid } from "./KpiGrid";
import { RecentOccurrencesTable } from "./RecentOccurrencesTable";

export function FleetDashboard() {
  const [showRadarBanner, setShowRadarBanner] = useState(true);

  return (
    <div className="p-6 sm:p-8 overflow-y-auto flex-1">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Fleet Overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Unified fleet register across Open OCC, Closed, OEM, and CAA views
        </p>
      </div>

      {/* Compact Cross-Fleet Hazard Radar Banner */}
      {showRadarBanner && (
        <div className="mb-5 p-3.5 px-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start justify-between gap-4">
          <div className="text-xs leading-relaxed">
            <strong className="font-bold text-amber-900">
              🌐 Cross-Fleet Hazard Radar — Emerging Cluster (ATA 27):
            </strong>{" "}
            Multiple <code className="bg-amber-100 px-1 rounded font-mono">F/CTL SLATS LOCKED</code> /{" "}
            <code className="bg-amber-100 px-1 rounded font-mono">SLATS FAULT</code> events linked to Actuator 6085CM torque limiter trips (batch #22B). SFHA S-02.01.01.B barrier functioned as designed; proactive inspection recommended.
          </div>
          <button
            type="button"
            onClick={() => setShowRadarBanner(false)}
            className="text-amber-700 hover:text-amber-950 font-bold text-xs bg-transparent border-0 cursor-pointer shrink-0"
            title="Dismiss alert"
          >
            ✕
          </button>
        </div>
      )}

      <KpiGrid />
      <RecentOccurrencesTable />
    </div>
  );
}
