import { useOccurrence } from "../../context";

export function CaseQueue() {
  const { filteredOccurrences, selectedOcc, setSelectedId, isExternalPartner } =
    useOccurrence();

  return (
    <div className="w-[340px] bg-white border-r border-slate-200 flex flex-col overflow-y-auto shrink-0">
      <div className="p-4 border-b border-slate-200">
        <h3 className="font-semibold text-sm text-slate-900 m-0">
          Case Queue ({filteredOccurrences.length})
        </h3>
      </div>
      <div className="flex flex-col">
        {filteredOccurrences.map((occ) => {
          const isSelected =
            occ.operatorControlNumber === selectedOcc.operatorControlNumber;
          return (
            <div
              key={occ.operatorControlNumber}
              className={`p-4 border-b border-slate-100 cursor-pointer transition-colors border-l-4 ${
                isSelected
                  ? "bg-blue-50/70 border-l-blue-600"
                  : "border-l-transparent hover:bg-slate-50"
              }`}
              onClick={() => setSelectedId(occ.operatorControlNumber)}
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-mono font-bold text-blue-600">
                  {occ.operatorControlNumber}
                </span>
                <span className="text-slate-400">{occ.eventDate}</span>
              </div>
              <div className="font-semibold text-sm text-slate-900 mb-1 line-clamp-1">
                {occ.headline}
              </div>
              <div className="text-xs text-slate-500 mb-2">
                {isExternalPartner
                  ? "Partner A320-214"
                  : `${occ.aircraft.operatorName} • ${occ.aircraft.msn}`}
              </div>
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-600">
                  {occ.eventState}
                </span>
                {occ.regulatoryState === "SUBMITTED_TO_CAA" && (
                  <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-rose-100 text-rose-700">
                    ECCAIRS Filed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
