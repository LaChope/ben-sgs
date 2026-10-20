import { useOccurrence } from "../../../context";

export function ComplianceTab() {
  const { selectedOcc, isExternalPartner } = useOccurrence();

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
          Regulation (EU) 376/2014 &amp; Czech CAA Status
        </h3>
        {selectedOcc.authorityReport ? (
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                ECCAIRS Filing ID
              </span>
              <strong className="text-slate-900 font-mono text-xs">
                {selectedOcc.authorityReport.eccairsReference}
              </strong>
            </div>
            <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
              <span className="text-slate-500 text-xs font-medium">
                Submission Timestamp
              </span>
              <strong className="text-slate-900 text-xs">
                {selectedOcc.authorityReport.submissionDate}
              </strong>
            </div>
            <div className="flex justify-between items-start text-sm py-1.5 gap-4">
              <span className="text-slate-500 text-xs font-medium min-w-[150px]">
                Safety Manager Notes
              </span>
              <strong className="text-slate-900 text-xs text-right leading-relaxed">
                {selectedOcc.authorityReport.safetyEvaluationNotes}
              </strong>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-xs italic m-0 py-4 text-center">
            Pending Safety Management System (SMS) reportability decision.
          </p>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
          Cross-Organization Activity &amp; Custody Timeline
        </h3>
        <div className="flex flex-col gap-4">
          {selectedOcc.auditTrail.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5 text-sm">
              <div className="font-mono text-xs text-slate-400 min-w-[125px] pt-0.5">
                {item.timestamp}
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <div className="flex-1">
                <strong className="text-slate-900 block font-semibold text-xs">
                  {isExternalPartner &&
                  item.organizationName.includes("Alpha Air")
                    ? "Partner Airline"
                    : item.organizationName}
                </strong>
                <p className="text-slate-600 text-xs mt-0.5 leading-relaxed m-0">
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
