import { useOccurrence } from "../../../context";

export function OemSupportTab() {
  const { selectedOcc, isExternalPartner } = useOccurrence();
  const techReq = selectedOcc.technicalRequest;

  return (
    <div className="flex flex-col gap-5">
      {techReq ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
              TechRequest &amp; Screening Summary
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                <span className="text-slate-500 text-xs font-medium">
                  Request Reference
                </span>
                <strong className="text-slate-900 font-semibold font-mono text-xs">
                  {techReq.requestID}
                </strong>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                <span className="text-slate-500 text-xs font-medium">
                  Submitted By
                </span>
                <strong className="text-slate-900 font-semibold text-right">
                  {isExternalPartner
                    ? "Partner CAMO"
                    : techReq.originatingEntity}{" "}
                  <span className="text-slate-400 font-normal">
                    ({techReq.submissionDate})
                  </span>
                </strong>
              </div>
              <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                <span className="text-slate-500 text-xs font-medium">
                  OEM Receipt Acknowledgement
                </span>
                <strong className="text-emerald-600 font-semibold text-right text-xs">
                  {techReq.ackReceiptTimestamp || "Pending Acknowledgement"}
                </strong>
              </div>
              {techReq.classification && (
                <>
                  <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 text-xs font-medium">
                      Classification Severity
                    </span>
                    <strong className="text-slate-900 font-semibold text-right">
                      {techReq.classification.occClassification}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-sm py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 text-xs font-medium">
                      Assigned Design Lead
                    </span>
                    <strong className="text-slate-900 font-semibold text-right">
                      {techReq.classification.occLeaderFocalPoint}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center text-sm py-1.5">
                    <span className="text-slate-500 text-xs font-medium">
                      Target Closure Date
                    </span>
                    <strong className="text-slate-900 font-semibold text-right">
                      {techReq.classification.garaTargetClosureDate}
                    </strong>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100">
              OEM Design Office Engineering Disposition
            </h3>
            {techReq.assessment ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-start text-sm py-1.5 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-xs font-medium min-w-[140px]">
                    Investigation Findings
                  </span>
                  <strong className="text-slate-900 font-semibold text-right text-xs leading-relaxed">
                    {techReq.assessment.investigationDetails}
                  </strong>
                </div>
                <div className="flex justify-between items-start text-sm py-1.5 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-xs font-medium min-w-[140px]">
                    Short-Term Action
                  </span>
                  <strong className="text-slate-900 font-semibold text-right text-xs leading-relaxed">
                    {techReq.assessment.shortTermAction}
                  </strong>
                </div>
                <div className="flex justify-between items-start text-sm py-1.5 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-xs font-medium min-w-[140px]">
                    Airworthiness Impact
                  </span>
                  <strong className="text-slate-900 font-semibold text-right text-xs leading-relaxed">
                    {techReq.assessment.airworthinessImpact}
                  </strong>
                </div>
                <div className="flex justify-between items-start text-sm py-1.5 border-b border-slate-100 gap-4">
                  <span className="text-slate-500 text-xs font-medium min-w-[140px]">
                    Recommended Action
                  </span>
                  <strong className="text-emerald-700 font-semibold text-right text-xs leading-relaxed">
                    {techReq.assessment.correctiveAction}
                  </strong>
                </div>
                <div className="flex justify-between items-center text-sm py-1.5">
                  <span className="text-slate-500 text-xs font-medium">
                    Sign-Off
                  </span>
                  <strong className="text-slate-900 font-semibold text-right text-xs">
                    {techReq.assessment.roLeaderSignature}
                  </strong>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-xs italic leading-relaxed m-0 py-6 text-center">
                Engineering investigation is currently in progress. Switch to
                OEM Customer Support or Design Office persona to complete
                disposition.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs text-center">
          <p className="text-slate-500 text-sm m-0">
            No OEM Technical Request has been initiated for this occurrence yet.
            Switch to the CAMO role to escalate to the manufacturer.
          </p>
        </div>
      )}
    </div>
  );
}
