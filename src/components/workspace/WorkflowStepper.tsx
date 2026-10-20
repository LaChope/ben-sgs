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

  const renderStep = (
    stepNum: number | string,
    label: string,
    isCompleted: boolean,
    isActive: boolean,
  ) => {
    let circleClasses = "bg-slate-200 text-slate-600";
    let textClasses = "text-slate-400";

    if (isCompleted) {
      circleClasses = "bg-emerald-500 text-white";
      textClasses = "text-emerald-700 font-semibold";
    } else if (isActive) {
      circleClasses = "bg-blue-600 text-white";
      textClasses = "text-blue-700 font-semibold";
    }

    return (
      <div className={`flex items-center gap-2 text-xs ${textClasses}`}>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${circleClasses}`}
        >
          {isCompleted ? "✓" : stepNum}
        </div>
        <span className="whitespace-nowrap">{label}</span>
      </div>
    );
  };

  return (
    <div className="flex items-center my-5 p-3.5 px-4 bg-slate-50 rounded-lg border border-slate-100 overflow-x-auto">
      {renderStep("✓", "Ops Logged", true, false)}
      <div className="flex-1 min-w-[20px] h-[2px] bg-slate-200 mx-3" />
      {renderStep(2, "CAMO TechRequest", isStep2Completed, isStep2Active)}
      <div className="flex-1 min-w-[20px] h-[2px] bg-slate-200 mx-3" />
      {renderStep(3, "OEM Ack & Screening", isStep3Completed, isStep3Active)}
      <div className="flex-1 min-w-[20px] h-[2px] bg-slate-200 mx-3" />
      {renderStep(
        4,
        "Design Office Disposition",
        isStep4Completed,
        isStep4Active,
      )}
      <div className="flex-1 min-w-[20px] h-[2px] bg-slate-200 mx-3" />
      {renderStep(5, "Fleet Resolution", isStep5Completed, isStep5Active)}
    </div>
  );
}
