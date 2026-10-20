import { useOccurrence } from "../../../context";

export function ContextualActionPanel() {
  const {
    currentPersona,
    activeRole,
    selectedOcc,
    camoNotes,
    setCamoNotes,
    safetyNotes,
    setSafetyNotes,
    classificationForm,
    setClassificationForm,
    assessmentForm,
    setAssessmentForm,
    handleCamoSubmitToOem,
    handleOperatorApplyFix,
    handleSafetyReportDecision,
    handleOemAcknowledge,
    handleOemScreenAndAssign,
    handleOemCsSendResponse,
    handleOemDoAssessment,
  } = useOccurrence();

  return (
    <div className="bg-white border border-slate-200 border-l-4 border-l-slate-900 rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex justify-between items-center text-xs text-slate-500 mb-3 pb-2 border-b border-slate-100">
        <strong className="text-slate-800 font-semibold">
          Active Workspace: {currentPersona.orgName} —{" "}
          {currentPersona.department}
        </strong>
        <span className="font-medium">{currentPersona.userTitle}</span>
      </div>

      {/* CAMO ACTIONS */}
      {activeRole === "OPERATOR_CAMO" &&
        selectedOcc.oemState === "PENDING_CAMO_REVIEW" && (
          <div className="flex flex-col gap-2.5 mt-2">
            <label className="text-xs font-semibold text-slate-700">
              Escalate to Airframe OEM Customer Support:
            </label>
            <textarea
              rows={2}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={camoNotes}
              onChange={(e) => setCamoNotes(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer self-start shadow-xs border-0 mt-1"
              onClick={handleCamoSubmitToOem}
            >
              Transmit Technical Request to OEM
            </button>
          </div>
        )}

      {(activeRole === "OPERATOR_CAMO" || activeRole === "OPERATOR_OPS") &&
        selectedOcc.oemState === "RESPONSE_SENT_TO_CAMO" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 mt-2">
            <div>
              <strong className="font-semibold block text-emerald-900 text-sm">
                OEM Engineering Disposition Received:
              </strong>
              <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
                {selectedOcc.technicalRequest?.assessment?.correctiveAction}
              </p>
            </div>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs border-0"
              onClick={handleOperatorApplyFix}
            >
              Execute Maintenance Action &amp; Close Case
            </button>
          </div>
        )}

      {/* SAFETY DEPT ACTIONS */}
      {activeRole === "OPERATOR_SAFETY" &&
        selectedOcc.regulatoryState === "PENDING_SAFETY_REVIEW" && (
          <div className="flex flex-col gap-2.5 mt-2">
            <label className="text-xs font-semibold text-slate-700">
              Safety Management System (SMS) Reportability Evaluation:
            </label>
            <textarea
              rows={2}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={safetyNotes}
              onChange={(e) => setSafetyNotes(e.target.value)}
            />
            <div className="flex gap-2.5 mt-1">
              <button
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer shadow-xs border-0"
                onClick={() => handleSafetyReportDecision(true)}
              >
                Submit Mandatory Report to Czech CAA (ECCAIRS)
              </button>
              <button
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer border-0"
                onClick={() => handleSafetyReportDecision(false)}
              >
                Log as Internal SMS Event Only
              </button>
            </div>
          </div>
        )}

      {/* OEM CUSTOMER SUPPORT ACTIONS */}
      {activeRole === "OEM_CS" &&
        selectedOcc.oemState === "SUBMITTED_TO_OEM_CS" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 mt-2">
            <div>
              <strong className="font-semibold block text-emerald-900 text-sm">
                Incoming TechRequest ({selectedOcc.technicalRequest?.requestID}
                ):
              </strong>
              <p className="mt-1 text-xs text-emerald-800 italic">
                "{selectedOcc.technicalRequest?.camoNotes}"
              </p>
            </div>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs border-0"
              onClick={handleOemAcknowledge}
            >
              Acknowledge Receipt to Operator CAMO
            </button>
          </div>
        )}

      {activeRole === "OEM_CS" &&
        selectedOcc.oemState === "ACKNOWLEDGED_BY_OEM" && (
          <div className="flex flex-col gap-3 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Classification Severity:
                </label>
                <input
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={classificationForm.occClassification}
                  onChange={(e) =>
                    setClassificationForm({
                      ...classificationForm,
                      occClassification: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Assign Design Office Lead:
                </label>
                <input
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={classificationForm.occLeaderFocalPoint}
                  onChange={(e) =>
                    setClassificationForm({
                      ...classificationForm,
                      occLeaderFocalPoint: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Closure Date:
                </label>
                <input
                  type="date"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={classificationForm.garaTargetClosureDate}
                  onChange={(e) =>
                    setClassificationForm({
                      ...classificationForm,
                      garaTargetClosureDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer self-start shadow-xs border-0 mt-1"
              onClick={handleOemScreenAndAssign}
            >
              Complete Screening &amp; Route to Design Office
            </button>
          </div>
        )}

      {activeRole === "OEM_CS" && selectedOcc.oemState === "ASSESSED_BY_DO" && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 mt-2">
          <div>
            <strong className="font-semibold block text-emerald-900 text-sm">
              Design Office Disposition Ready for Release:
            </strong>
            <p className="mt-1 text-xs text-emerald-800">
              {selectedOcc.technicalRequest?.assessment?.correctiveAction}
            </p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs border-0"
            onClick={handleOemCsSendResponse}
          >
            Release Official Technical Response to Operator
          </button>
        </div>
      )}

      {/* OEM DESIGN OFFICE ACTIONS */}
      {activeRole === "OEM_DO" &&
        selectedOcc.oemState === "SCREENED_AND_ASSIGNED" && (
          <div className="flex flex-col gap-3 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Root-Cause Investigation Findings:
                </label>
                <textarea
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={assessmentForm.investigationDetails}
                  onChange={(e) =>
                    setAssessmentForm({
                      ...assessmentForm,
                      investigationDetails: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Mandatory Corrective Action / SB:
                </label>
                <textarea
                  rows={2}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={assessmentForm.correctiveAction}
                  onChange={(e) =>
                    setAssessmentForm({
                      ...assessmentForm,
                      correctiveAction: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer self-start shadow-xs border-0 mt-1"
              onClick={handleOemDoAssessment}
            >
              Sign &amp; Publish Engineering Disposition
            </button>
          </div>
        )}
    </div>
  );
}
