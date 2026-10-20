import { useOccurrence } from "../../../context";

export function OverviewTab() {
  const { selectedOcc, isExternalPartner } = useOccurrence();

  return (
    <div className="tab-body">
      <div className="detail-grid">
        <div className="card">
          <h3>Aircraft &amp; Operational Context</h3>
          <div className="kv-list">
            <div className="kv-row">
              <span>Operator</span>
              <strong>
                {isExternalPartner ? (
                  <span className="badge-masked">
                    Protected Partner Identity
                  </span>
                ) : (
                  selectedOcc.aircraft.operatorName
                )}
              </strong>
            </div>
            <div className="kv-row">
              <span>Aircraft MSN / Model</span>
              <strong>
                {isExternalPartner
                  ? `Anonymized (${selectedOcc.aircraft.acModel})`
                  : `${selectedOcc.aircraft.msn} (${selectedOcc.aircraft.acModel})`}
              </strong>
            </div>
            <div className="kv-row">
              <span>Airframe Hours / Cycles</span>
              <strong>
                {isExternalPartner
                  ? "Masked"
                  : `${selectedOcc.aircraft.flightHours} FH / ${selectedOcc.aircraft.flightCycles} FC`}
              </strong>
            </div>
            <div className="kv-row">
              <span>Flight Phase &amp; Location</span>
              <strong>
                {selectedOcc.flightPhase} • {selectedOcc.eventArea}
              </strong>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>System &amp; Failure Signature</h3>
          <div className="kv-list">
            <div className="kv-row">
              <span>Affected Components</span>
              <strong>{selectedOcc.component}</strong>
            </div>
            <div className="kv-row">
              <span>Observed Failure Mode</span>
              <strong>{selectedOcc.failureMode}</strong>
            </div>
            <div className="kv-row">
              <span>Flight Deck Detection</span>
              <strong className="ecam-warning">
                {selectedOcc.detectionMethod}
              </strong>
            </div>
            <div className="kv-row">
              <span>Functional Effect</span>
              <strong>{selectedOcc.functionalEffect}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-16">
        <h3>Maintenance &amp; Operational Discrepancy Log</h3>
        <pre className="logbook-box">{selectedOcc.discrepancy}</pre>
      </div>
    </div>
  );
}
