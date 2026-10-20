import { useOccurrence } from "../../context";

export function WorkflowStepper() {
  const { selectedOcc } = useOccurrence();
  const oemState = selectedOcc.oemState;

  const isStep2Completed = oemState !== "PENDING_CAMO_REVIEW";
  const isStep2Active = !isStep2Completed;

  const isStep3Completed = [
    "ACKNOWLEDGED_BY_OEM",
    "SCREENED_AND_ASSIGNED",
    "ASSESSED_BY_DO",
    "RESPONSE_SENT_TO_CAMO",
    "CLOSED_APPLIED",
  ].includes(oemState);
  const isStep3Active = oemState === "SUBMITTED_TO_OEM_CS";

  const isStep4Completed = [
    "ASSESSED_BY_DO",
    "RESPONSE_SENT_TO_CAMO",
    "CLOSED_APPLIED",
  ].includes(oemState);
  const isStep4Active = oemState === "SCREENED_AND_ASSIGNED";

  const isStep5Completed = oemState === "CLOSED_APPLIED";
  const isStep5Active = oemState === "RESPONSE_SENT_TO_CAMO";

  return (
    <div className="workflow-stepper">
      <div className="step completed">
        <div className="step-circle">✓</div>
        <span>Ops Logged</span>
      </div>
      <div className="step-line" />
      <div
        className={`step ${isStep2Completed ? "completed" : isStep2Active ? "active" : ""}`}
      >
        <div className="step-circle">2</div>
        <span>CAMO TechRequest</span>
      </div>
      <div className="step-line" />
      <div
        className={`step ${isStep3Completed ? "completed" : isStep3Active ? "active" : ""}`}
      >
        <div className="step-circle">3</div>
        <span>OEM Ack &amp; Screening</span>
      </div>
      <div className="step-line" />
      <div
        className={`step ${isStep4Completed ? "completed" : isStep4Active ? "active" : ""}`}
      >
        <div className="step-circle">4</div>
        <span>Design Office Disposition</span>
      </div>
      <div className="step-line" />
      <div
        className={`step ${isStep5Completed ? "completed" : isStep5Active ? "active" : ""}`}
      >
        <div className="step-circle">5</div>
        <span>Fleet Resolution</span>
      </div>
    </div>
  );
}
