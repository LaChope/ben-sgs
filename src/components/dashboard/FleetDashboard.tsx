import { KpiGrid } from "./KpiGrid";
import { RecentOccurrencesTable } from "./RecentOccurrencesTable";

export function FleetDashboard() {
  return (
    <div className="p-6 sm:p-8 overflow-y-auto flex-1">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Fleet Safety &amp; Airworthiness Intelligence
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Real-time federated monitoring across A320-214 operators, OEM design
          offices, and Czech CAA
        </p>
      </div>

      <KpiGrid />
      <RecentOccurrencesTable />
    </div>
  );
}
