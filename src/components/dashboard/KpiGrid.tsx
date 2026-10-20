import { useOccurrence } from "../../context";

export function KpiGrid() {
  const { occurrences } = useOccurrence();

  const openTechRequestsCount = occurrences.filter(
    (o) => o.oemState !== "CLOSED_APPLIED",
  ).length;

  const eccairsFilingsCount = occurrences.filter(
    (o) => o.regulatoryState === "SUBMITTED_TO_CAA",
  ).length;

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <span className="kpi-label">Active Fleet Occurrences</span>
        <div className="kpi-value">{occurrences.length}</div>
        <span className="kpi-trend">ATA 27 Slat System Cluster Detected</span>
      </div>
      <div className="kpi-card">
        <span className="kpi-label">Open OEM TechRequests</span>
        <div className="kpi-value">{openTechRequestsCount}</div>
        <span className="kpi-trend positive">Avg OEM Ack Time: 17 mins</span>
      </div>
      <div className="kpi-card">
        <span className="kpi-label">ECCAIRS Mandatory Filings</span>
        <div className="kpi-value">{eccairsFilingsCount}</div>
        <span className="kpi-trend">Synced with Czech CAA</span>
      </div>
      <div className="kpi-card">
        <span className="kpi-label">SFHA Design Baseline Alignment</span>
        <div className="kpi-value">100%</div>
        <span className="kpi-trend positive">
          Within S-02.01.01.B (MAJ ≤ 10⁻⁵)
        </span>
      </div>
    </div>
  );
}
