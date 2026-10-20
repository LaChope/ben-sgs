import { useOccurrence } from "../../context";

export function RecentOccurrencesTable() {
  const { occurrences, isExternalPartner, setSelectedId, setActiveNav } =
    useOccurrence();

  return (
    <div className="card mt-20">
      <div className="card-header-row">
        <h3>Recent Fleet Occurrences &amp; Collaborative Status</h3>
        <button className="btn-link" onClick={() => setActiveNav("INCIDENTS")}>
          Open Investigation Workspace →
        </button>
      </div>
      <table className="modern-table">
        <thead>
          <tr>
            <th>Control ID</th>
            <th>Event Date</th>
            <th>Operator / Aircraft</th>
            <th>Headline &amp; Component</th>
            <th>Flight Phase</th>
            <th>OEM Support Status</th>
            <th>CAA / ECCAIRS</th>
          </tr>
        </thead>
        <tbody>
          {occurrences.map((occ) => (
            <tr
              key={occ.operatorControlNumber}
              onClick={() => {
                setSelectedId(occ.operatorControlNumber);
                setActiveNav("INCIDENTS");
              }}
              className="clickable-row"
            >
              <td className="font-mono">{occ.operatorControlNumber}</td>
              <td>{occ.eventDate}</td>
              <td>
                {isExternalPartner ? (
                  <span className="badge-masked">Anonymized Operator</span>
                ) : (
                  `${occ.aircraft.operatorName} (${occ.aircraft.msn})`
                )}
              </td>
              <td>
                <strong>{occ.headline}</strong>
                <div className="sub-text">{occ.component}</div>
              </td>
              <td>{occ.flightPhase}</td>
              <td>
                <span className="status-chip oem">{occ.eventState}</span>
              </td>
              <td>
                <span className="status-chip reg">
                  {occ.regulatoryState === "SUBMITTED_TO_CAA"
                    ? occ.authorityReport?.eccairsReference
                    : occ.regulatoryState.replace(/_/g, " ")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
