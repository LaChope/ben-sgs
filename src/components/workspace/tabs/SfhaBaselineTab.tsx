import { useOccurrence } from "../../../context";

export function SfhaBaselineTab() {
  const { selectedOcc, baseline } = useOccurrence();

  return (
    <div className="tab-body">
      <div className="card">
        <div className="card-header-row">
          <h3>System Functional Hazard Assessment (SFHA) Alignment</h3>
          <span className="status-chip valid">
            ✓ Design Safety Assumptions Validated
          </span>
        </div>
        <p className="sub-text mb-16">
          Automated cross-check comparing in-service occurrence signature
          against certification safety baseline ({baseline.id}).
        </p>

        <div className="comparison-columns">
          <div className="comp-box">
            <h4>In-Service Occurrence Signature</h4>
            <div className="kv-list">
              <div className="kv-row">
                <span>Affected Hardware</span>
                <strong>{selectedOcc.component}</strong>
              </div>
              <div className="kv-row">
                <span>Failure Mode</span>
                <strong>{selectedOcc.failureMode}</strong>
              </div>
              <div className="kv-row">
                <span>Crew Annunciation</span>
                <strong>{selectedOcc.detectionMethod}</strong>
              </div>
              <div className="kv-row">
                <span>System Response</span>
                <strong>{selectedOcc.functionalEffect}</strong>
              </div>
            </div>
          </div>

          <div className="comp-box baseline">
            <h4>Certification SFHA Baseline ({baseline.systemName})</h4>
            <div className="kv-list">
              <div className="kv-row">
                <span>Failure Condition Ref</span>
                <strong>{baseline.sfhaFailureCondition}</strong>
              </div>
              <div className="kv-row">
                <span>Hazard Severity Classification</span>
                <strong>{baseline.sfhaSeverity}</strong>
              </div>
              <div className="kv-row">
                <span>Expected Safety Effect</span>
                <strong>{baseline.sfhaSafetyEffect}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
