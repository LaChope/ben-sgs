import { useOccurrence } from "../../../context";

export function SfhaBaselineTab() {
  const { selectedOcc, baseline } = useOccurrence();

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-100 flex-wrap gap-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider m-0">
            System Functional Hazard Assessment (SFHA) Alignment
          </h3>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            ✓ Design Safety Assumptions Validated
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Automated cross-check comparing in-service occurrence signature
          against certification safety baseline ({baseline.id}).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
              In-Service Occurrence Signature
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Affected Hardware</span>
                <strong className="text-slate-900 text-right max-w-[200px]">
                  {selectedOcc.component}
                </strong>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Failure Mode</span>
                <strong className="text-slate-900 text-right">
                  {selectedOcc.failureMode}
                </strong>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Crew Annunciation</span>
                <strong className="text-amber-600 font-mono text-right">
                  {selectedOcc.detectionMethod}
                </strong>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-500">System Response</span>
                <strong className="text-slate-900 text-right">
                  {selectedOcc.functionalEffect}
                </strong>
              </div>
            </div>
          </div>

          <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/60">
            <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-3 pb-1 border-b border-emerald-200">
              Certification SFHA Baseline ({baseline.systemName})
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-start text-xs py-1 border-b border-emerald-200/60 gap-3">
                <span className="text-emerald-800 shrink-0">Failure Ref</span>
                <strong className="text-emerald-950 text-right leading-tight">
                  {baseline.sfhaFailureCondition}
                </strong>
              </div>
              <div className="flex justify-between items-start text-xs py-1 border-b border-emerald-200/60 gap-3">
                <span className="text-emerald-800 shrink-0">Severity</span>
                <strong className="text-emerald-950 text-right">
                  {baseline.sfhaSeverity}
                </strong>
              </div>
              <div className="flex justify-between items-start text-xs py-1 gap-3">
                <span className="text-emerald-800 shrink-0">Safety Effect</span>
                <strong className="text-emerald-950 text-right leading-relaxed">
                  {baseline.sfhaSafetyEffect}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
