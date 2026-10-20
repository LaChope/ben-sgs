import { useOccurrence } from "../../context";

export function CaseBanner() {
  const { selectedOcc } = useOccurrence();

  return (
    <div className="case-banner-top">
      <div>
        <div className="breadcrumb">
          {selectedOcc.aircraft.program} / {selectedOcc.aircraft.acModel} /{" "}
          {selectedOcc.operatorControlNumber}
        </div>
        <h2>{selectedOcc.headline}</h2>
      </div>
      <div className="case-status-box">
        <span className="state-pill">{selectedOcc.eventState}</span>
      </div>
    </div>
  );
}
