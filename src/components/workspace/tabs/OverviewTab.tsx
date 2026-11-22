import { useOccurrence } from "../../../context";

export function OverviewTab() {
  const { selectedOcc, isExternalPartner } = useOccurrence();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            Aircraft, Engine &amp; Operational Context
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Operator (OP)
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {isExternalPartner ? (
                  <span className="bg-purple-100 text-purple-700 py-0.5 px-2 rounded-sm text-xs font-semibold">
                    Protected Partner Identity
                  </span>
                ) : (
                  selectedOcc.aircraft.operatorName
                )}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                A/C Registration / MSN
              </span>
              <strong className="text-slate-900 font-mono text-xs font-semibold text-right">
                {isExternalPartner
                  ? "MASKED"
                  : `${selectedOcc.aircraft.registration} (${selectedOcc.aircraft.msn})`}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                A/C Make / Model / Series
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {selectedOcc.aircraft.acMake} {selectedOcc.aircraft.acModel}-
                {selectedOcc.aircraft.acSeries}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Engine Make / Model
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {selectedOcc.aircraft.engineMake} (
                <span className="font-mono text-xs">
                  {selectedOcc.aircraft.engineModel}
                </span>
                )
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="text-slate-500 text-xs font-medium">
                ATA Chapter &amp; Flight Phase
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                ATA {selectedOcc.ataChapter} • {selectedOcc.flightPhase} •{" "}
                {selectedOcc.eventArea}
              </strong>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            ECCAIRS Taxonomy &amp; Failure Signature
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                ECCAIRS Class / Region
              </span>
              <strong className="text-slate-900 font-semibold text-right text-xs">
                {selectedOcc.eccairsTaxonomy.occurrenceClass} •{" "}
                {selectedOcc.eccairsTaxonomy.stateOfOccurrence}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Category
              </span>
              <strong className="text-slate-900 font-semibold text-right text-xs max-w-[260px]">
                {selectedOcc.eccairsTaxonomy.occurrenceCategory}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Affected Components
              </span>
              <strong className="text-slate-900 font-semibold text-right text-xs max-w-[260px]">
                {selectedOcc.component}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Flight Deck Detection
              </span>
              <strong className="text-amber-600 font-mono text-xs font-bold text-right">
                {selectedOcc.detectionMethod}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="text-slate-500 text-xs font-medium">
                STPA Investigation Status
              </span>
              <strong className="text-blue-700 font-semibold text-right text-xs">
                {selectedOcc.investigation.methodology} —{" "}
                {selectedOcc.investigation.status}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
          Maintenance &amp; Operational Discrepancy Log
        </h3>
        <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto m-0">
          {selectedOcc.discrepancy}
        </pre>
      </div>
    </div>
  );
}
