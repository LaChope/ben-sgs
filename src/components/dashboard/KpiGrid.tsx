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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
          Active Fleet Occurrences
        </span>
        <div className="text-3xl font-bold my-1 text-slate-900">
          {occurrences.length}
        </div>
        <span className="text-xs text-slate-600">
          ATA 27 Slat System Cluster Detected
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
          Open OEM TechRequests
        </span>
        <div className="text-3xl font-bold my-1 text-slate-900">
          {openTechRequestsCount}
        </div>
        <span className="text-xs text-emerald-600 font-semibold">
          Avg OEM Ack Time: 17 mins
        </span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
          ECCAIRS Mandatory Filings
        </span>
        <div className="text-3xl font-bold my-1 text-slate-900">
          {eccairsFilingsCount}
        </div>
        <span className="text-xs text-slate-600">Synced with Czech CAA</span>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
          SFHA Design Baseline Alignment
        </span>
        <div className="text-3xl font-bold my-1 text-slate-900">100%</div>
        <span className="text-xs text-emerald-600 font-semibold">
          Within S-02.01.01.B (MAJ ≤ 10⁻⁵)
        </span>
      </div>
    </div>
  );
}
