import { useOccurrence } from "../../../context";

export function ComplianceTab() {
  const { selectedOcc, isExternalPartner } = useOccurrence();

  return (
    <div className="tab-body">
      <div className="card mb-16">
        <h3>Regulation (EU) 376/2014 &amp; Czech CAA Status</h3>
        {selectedOcc.authorityReport ? (
          <div className="kv-list">
            <div className="kv-row">
              <span>ECCAIRS Filing ID</span>
              <strong>{selectedOcc.authorityReport.eccairsReference}</strong>
            </div>
            <div className="kv-row">
              <span>Submission Timestamp</span>
              <strong>{selectedOcc.authorityReport.submissionDate}</strong>
            </div>
            <div className="kv-row">
              <span>Safety Manager Assessment</span>
              <strong>
                {selectedOcc.authorityReport.safetyEvaluationNotes}
              </strong>
            </div>
          </div>
        ) : (
          <p className="empty-state-text">
            Pending Safety Management System (SMS) reportability decision.
          </p>
        )}
      </div>

      <div className="card">
        <h3>Cross-Organization Activity &amp; Custody Timeline</h3>
        <div className="timeline">
          {selectedOcc.auditTrail.map((item, idx) => (
            <div key={idx} className="timeline-row">
              <div className="timeline-time">{item.timestamp}</div>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <strong>
                  {isExternalPartner &&
                  item.organizationName.includes("Alpha Air")
                    ? "Partner Airline"
                    : item.organizationName}
                </strong>
                <p>{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
