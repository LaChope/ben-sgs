import { useOccurrence } from "../../../context";

export function OemSupportTab() {
  const { selectedOcc, isExternalPartner } = useOccurrence();
  const techReq = selectedOcc.technicalRequest;

  return (
    <div className="tab-body">
      {techReq ? (
        <div className="detail-grid">
          <div className="card">
            <h3>TechRequest &amp; Screening Summary</h3>
            <div className="kv-list">
              <div className="kv-row">
                <span>Request Reference</span>
                <strong>{techReq.requestID}</strong>
              </div>
              <div className="kv-row">
                <span>Submitted By</span>
                <strong>
                  {isExternalPartner
                    ? "Partner CAMO"
                    : techReq.originatingEntity}{" "}
                  ({techReq.submissionDate})
                </strong>
              </div>
              <div className="kv-row">
                <span>OEM Receipt Acknowledgement</span>
                <strong className="text-success">
                  {techReq.ackReceiptTimestamp || "Pending Acknowledgement"}
                </strong>
              </div>
              {techReq.classification && (
                <>
                  <div className="kv-row">
                    <span>Classification Severity</span>
                    <strong>{techReq.classification.occClassification}</strong>
                  </div>
                  <div className="kv-row">
                    <span>Assigned Design Lead</span>
                    <strong>
                      {techReq.classification.occLeaderFocalPoint}
                    </strong>
                  </div>
                  <div className="kv-row">
                    <span>Target Closure Date</span>
                    <strong>
                      {techReq.classification.garaTargetClosureDate}
                    </strong>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card">
            <h3>OEM Design Office Engineering Disposition</h3>
            {techReq.assessment ? (
              <div className="kv-list">
                <div className="kv-row">
                  <span>Investigation Findings</span>
                  <strong>{techReq.assessment.investigationDetails}</strong>
                </div>
                <div className="kv-row">
                  <span>Short-Term Operational Action</span>
                  <strong>{techReq.assessment.shortTermAction}</strong>
                </div>
                <div className="kv-row">
                  <span>Airworthiness Impact</span>
                  <strong>{techReq.assessment.airworthinessImpact}</strong>
                </div>
                <div className="kv-row">
                  <span>Recommended Corrective Action</span>
                  <strong className="text-success">
                    {techReq.assessment.correctiveAction}
                  </strong>
                </div>
                <div className="kv-row">
                  <span>Sign-Off</span>
                  <strong>{techReq.assessment.roLeaderSignature}</strong>
                </div>
              </div>
            ) : (
              <p className="empty-state-text">
                Engineering investigation is currently in progress. Switch to
                OEM Customer Support or Design Office persona to complete
                disposition.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="card">
          <p className="empty-state-text">
            No OEM Technical Request has been initiated for this occurrence yet.
            Switch to the CAMO role to escalate to the manufacturer.
          </p>
        </div>
      )}
    </div>
  );
}
