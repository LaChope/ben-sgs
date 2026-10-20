import { useOccurrence } from "../../../context";

export function OverviewTab() {
  const { selectedOcc, isExternalPartner } = useOccurrence();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            Aircraft &amp; Operational Context
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Operator
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
                Aircraft MSN / Model
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {isExternalPartner
                  ? `Anonymized (${selectedOcc.aircraft.acModel})`
                  : `${selectedOcc.aircraft.msn} (${selectedOcc.aircraft.acModel})`}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Airframe Hours / Cycles
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {isExternalPartner
                  ? "Masked"
                  : `${selectedOcc.aircraft.flightHours} FH / ${selectedOcc.aircraft.flightCycles} FC`}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5">
              <span className="text-slate-500 text-xs font-medium">
                Flight Phase &amp; Location
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {selectedOcc.flightPhase} • {selectedOcc.eventArea}
              </strong>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
            System &amp; Failure Signature
          </h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Affected Components
              </span>
              <strong className="text-slate-900 font-semibold text-right max-w-[280px]">
                {selectedOcc.component}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Observed Failure Mode
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {selectedOcc.failureMode}
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
                Functional Effect
              </span>
              <strong className="text-slate-900 font-semibold text-right">
                {selectedOcc.functionalEffect}
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
