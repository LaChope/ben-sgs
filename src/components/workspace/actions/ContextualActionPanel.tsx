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
    <div className="contextual-action-panel">
      <div className="action-panel-header">
        <strong>
          Active Workspace: {currentPersona.orgName} —{" "}
          {currentPersona.department}
        </strong>
        <span>{currentPersona.userTitle}</span>
      </div>

      {/* CAMO ACTIONS */}
      {activeRole === "OPERATOR_CAMO" &&
        selectedOcc.oemState === "PENDING_CAMO_REVIEW" && (
          <div className="action-form">
            <label>Escalate to Airframe OEM Customer Support:</label>
            <textarea
              rows={2}
              value={camoNotes}
              onChange={(e) => setCamoNotes(e.target.value)}
            />
            <button
              className="btn-action primary"
              onClick={handleCamoSubmitToOem}
            >
              Transmit Technical Request to OEM
            </button>
          </div>
        )}

      {(activeRole === "OPERATOR_CAMO" || activeRole === "OPERATOR_OPS") &&
        selectedOcc.oemState === "RESPONSE_SENT_TO_CAMO" && (
          <div className="action-form highlight-box">
            <div>
              <strong>OEM Engineering Disposition Received:</strong>
              <p>
                {selectedOcc.technicalRequest?.assessment?.correctiveAction}
              </p>
            </div>
            <button
              className="btn-action success"
              onClick={handleOperatorApplyFix}
            >
              Execute Maintenance Action &amp; Close Case
            </button>
          </div>
        )}

      {/* SAFETY DEPT ACTIONS */}
      {activeRole === "OPERATOR_SAFETY" &&
        selectedOcc.regulatoryState === "PENDING_SAFETY_REVIEW" && (
          <div className="action-form">
            <label>
              Safety Management System (SMS) Reportability Evaluation:
            </label>
            <textarea
              rows={2}
              value={safetyNotes}
              onChange={(e) => setSafetyNotes(e.target.value)}
            />
            <div className="button-group">
              <button
                className="btn-action danger"
                onClick={() => handleSafetyReportDecision(true)}
              >
                Submit Mandatory Report to Czech CAA (ECCAIRS)
              </button>
              <button
                className="btn-action secondary"
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
          <div className="action-form highlight-box">
            <div>
              <strong>
                Incoming TechRequest ({selectedOcc.technicalRequest?.requestID}
                ):
              </strong>
              <p>"{selectedOcc.technicalRequest?.camoNotes}"</p>
            </div>
            <button
              className="btn-action success"
              onClick={handleOemAcknowledge}
            >
              Acknowledge Receipt to Operator CAMO
            </button>
          </div>
        )}

      {activeRole === "OEM_CS" &&
        selectedOcc.oemState === "ACKNOWLEDGED_BY_OEM" && (
          <div className="action-form">
            <div className="form-row-3">
              <div>
                <label>Classification Severity:</label>
                <input
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
                <label>Assign Design Office Lead:</label>
                <input
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
                <label>Target Closure Date:</label>
                <input
                  type="date"
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
              className="btn-action primary"
              onClick={handleOemScreenAndAssign}
            >
              Complete Screening &amp; Route to Design Office
            </button>
          </div>
        )}

      {activeRole === "OEM_CS" && selectedOcc.oemState === "ASSESSED_BY_DO" && (
        <div className="action-form highlight-box">
          <div>
            <strong>Design Office Disposition Ready for Release:</strong>
            <p>{selectedOcc.technicalRequest?.assessment?.correctiveAction}</p>
          </div>
          <button
            className="btn-action primary"
            onClick={handleOemCsSendResponse}
          >
            Release Official Technical Response to Operator
          </button>
        </div>
      )}

      {/* OEM DESIGN OFFICE ACTIONS */}
      {activeRole === "OEM_DO" &&
        selectedOcc.oemState === "SCREENED_AND_ASSIGNED" && (
          <div className="action-form">
            <div className="form-row-2">
              <div>
                <label>Root-Cause Investigation Findings:</label>
                <textarea
                  rows={2}
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
                <label>Mandatory Corrective Action / SB:</label>
                <textarea
                  rows={2}
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
              className="btn-action success"
              onClick={handleOemDoAssessment}
            >
              Sign &amp; Publish Engineering Disposition
            </button>
          </div>
        )}
    </div>
  );
}
