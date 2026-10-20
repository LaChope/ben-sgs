import { useOccurrence } from "../../context";

export function CaseBanner() {
  const { selectedOcc } = useOccurrence();

  return (
    <div className="flex justify-between items-start gap-4">
      <div>
        <div className="font-mono text-xs text-slate-500 mb-1">
          {selectedOcc.aircraft.program} / {selectedOcc.aircraft.acModel} /{" "}
          {selectedOcc.operatorControlNumber}
        </div>
        <h2 className="text-xl font-bold text-slate-900 m-0">
          {selectedOcc.headline}
        </h2>
      </div>
      <div className="shrink-0">
        <span className="bg-blue-100 text-blue-700 font-bold text-xs px-3 py-1 rounded-full inline-block">
          {selectedOcc.eventState}
        </span>
      </div>
    </div>
  );
}
