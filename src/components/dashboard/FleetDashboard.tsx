import { KpiGrid } from "./KpiGrid";
import { RecentOccurrencesTable } from "./RecentOccurrencesTable";

export function FleetDashboard() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Fleet Safety &amp; Airworthiness Intelligence</h2>
        <p>
          Real-time federated monitoring across A320-214 operators, OEM design
          offices, and Czech CAA
        </p>
      </div>

      <KpiGrid />
      <RecentOccurrencesTable />
    </div>
  );
}
