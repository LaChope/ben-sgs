import { useOccurrence } from "../../context";

export function KpiGrid() {
  const { occurrences } = useOccurrence();

  const openCount = occurrences.filter(
    (o) => o.oemState !== "CLOSED_APPLIED",
  ).length;

  const closedCount = occurrences.filter(
    (o) => o.oemState === "CLOSED_APPLIED",
  ).length;

  const eccairsFilingsCount = occurrences.filter(
    (o) => o.regulatoryState === "SUBMITTED_TO_CAA",
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-white border border-slate-200 border-t-4 border-t-blue-500 rounded-xl p-5 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
          Open Occurrences (Open OCC)
        </span>
        <div className="text-3xl font-bold my-1 text-slate-900">{openCount}</div>
        <span className="text-xs text-blue-600 font-semibold">
          Active Fleet Investigation &amp; OEM Support
        </span>
      </div>

      <div className="bg-white border border-slate-200 border-t-4 border-t-emerald-500 rounded-xl p-5 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
          Closed Occurrences
        </span>
        <div className="text-3xl font-bold my-1 text-slate-900">
          {closedCount}
        </div>
        <span className="text-xs text-emerald-600 font-semibold">
          Corrective Action Applied &amp; Verified
        </span>
      </div>

      <div className="bg-white border border-slate-200 border-t-4 border-t-rose-500 rounded-xl p-5 shadow-xs">
        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">
          CAA Reported Events (ECCAIRS)
        </span>
        <div className="text-3xl font-bold my-1 text-slate-900">
          {eccairsFilingsCount} / {occurrences.length}
        </div>
        <span className="text-xs text-slate-600">
          Synced with Reg (EU) 376/2014
        </span>
      </div>

      <div className="bg-white border border-slate-200 border-t-4 border-t-slate-700 rounded-xl p-5 shadow-xs">
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
