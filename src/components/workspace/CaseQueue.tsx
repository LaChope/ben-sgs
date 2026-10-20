import { useOccurrence } from "../../context";

export function CaseQueue() {
  const { filteredOccurrences, selectedOcc, setSelectedId, isExternalPartner } =
    useOccurrence();

  return (
    <div className="incident-list-col">
      <div className="list-col-header">
        <h3>Case Queue ({filteredOccurrences.length})</h3>
      </div>
      <div className="incident-cards">
        {filteredOccurrences.map((occ) => (
          <div
            key={occ.operatorControlNumber}
            className={`incident-item ${
              occ.operatorControlNumber === selectedOcc.operatorControlNumber
                ? "active"
                : ""
            }`}
            onClick={() => setSelectedId(occ.operatorControlNumber)}
          >
            <div className="incident-item-top">
              <span className="incident-id">{occ.operatorControlNumber}</span>
              <span className="incident-date">{occ.eventDate}</span>
            </div>
            <div className="incident-title">{occ.headline}</div>
            <div className="incident-sub">
              {isExternalPartner
                ? "Partner A320-214"
                : `${occ.aircraft.operatorName} • ${occ.aircraft.msn}`}
            </div>
            <div className="incident-badges">
              <span className="mini-badge">{occ.eventState}</span>
              {occ.regulatoryState === "SUBMITTED_TO_CAA" && (
                <span className="mini-badge caa">ECCAIRS Filed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
