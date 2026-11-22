import { useOccurrence } from "../../context";
import { exportOccurrencePdf } from "../../utils/pdfExport";

export function CaseBanner() {
  const { selectedOcc, isExternalPartner } = useOccurrence();

  return (
    <div className="flex justify-between items-start gap-4">
      <div>
        <div className="font-mono text-xs text-slate-500 mb-1">
          {selectedOcc.aircraft.acMake} {selectedOcc.aircraft.acModel}-
          {selectedOcc.aircraft.acSeries} •{" "}
          {isExternalPartner ? "MASKED" : selectedOcc.aircraft.registration} •
          ATA {selectedOcc.ataChapter} • {selectedOcc.operatorControlNumber}
        </div>
        <h2 className="text-xl font-bold text-slate-900 m-0">
          {selectedOcc.headline}
        </h2>
      </div>
      <div className="shrink-0 flex items-center gap-2">
        <button
          type="button"
          onClick={() => exportOccurrencePdf(selectedOcc, isExternalPartner)}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-3 py-1.5 rounded-lg border-0 cursor-pointer transition-colors"
        >
          ↓ Download PDF
        </button>
        <span
          className={`font-bold text-xs px-3 py-1 rounded-full inline-block ${
            selectedOcc.oemState === "CLOSED_APPLIED"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {selectedOcc.eventState}
        </span>
      </div>
    </div>
  );
}
