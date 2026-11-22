import React, { useState } from "react";
import { useOccurrence } from "../../context";
import { exportOccurrencePdf } from "../../utils/pdfExport";

type RegisterMode = "OPEN" | "CLOSED" | "OEM" | "CAA";
type ReportedFilter = "ALL" | "YES" | "NO";

export function RecentOccurrencesTable() {
  const {
    filteredOccurrences,
    isExternalPartner,
    setSelectedId,
    setActiveNav,
    handleUpdateOemFields,
    handleOperatorApplyFix,
    handleSafetyReportDecision,
  } = useOccurrence();

  const [mode, setMode] = useState<RegisterMode>("OPEN");
  const [reportedFilter, setReportedFilter] = useState<ReportedFilter>("ALL");

  // Inline OEM edit state
  const [editingOcn, setEditingOcn] = useState<string | null>(null);
  const [invText, setInvText] = useState("");
  const [corrText, setCorrText] = useState("");
  const [airText, setAirText] = useState("");

  const openList = filteredOccurrences.filter(
    (o) => o.oemState !== "CLOSED_APPLIED",
  );
  const closedList = filteredOccurrences.filter(
    (o) => o.oemState === "CLOSED_APPLIED",
  );
  const caaYesCount = filteredOccurrences.filter(
    (o) => o.regulatoryState === "SUBMITTED_TO_CAA",
  ).length;
  const caaNoCount = filteredOccurrences.length - caaYesCount;

  const rows =
    mode === "OPEN"
      ? openList
      : mode === "CLOSED"
        ? closedList
        : mode === "CAA"
          ? filteredOccurrences.filter((o) => {
              const isRep = o.regulatoryState === "SUBMITTED_TO_CAA";
              if (reportedFilter === "YES") return isRep;
              if (reportedFilter === "NO") return !isRep;
              return true;
            })
          : filteredOccurrences;

  const openInvestigation = (ocn: string) => {
    setSelectedId(ocn);
    setActiveNav("INVESTIGATION");
  };

  const startEditOem = (ocn: string) => {
    const occ = filteredOccurrences.find((o) => o.operatorControlNumber === ocn);
    if (!occ) return;
    setEditingOcn(ocn);
    setInvText(
      occ.technicalRequest?.assessment?.investigationDetails ||
        occ.investigation.summary ||
        "",
    );
    setCorrText(
      occ.appliedCorrectiveAction ||
        occ.technicalRequest?.assessment?.correctiveAction ||
        "",
    );
    setAirText(
      occ.technicalRequest?.assessment?.airworthinessImpact ||
        "Within SFHA S-02.01.01.B envelope (MAJ ≤ 10⁻⁵).",
    );
  };

  const saveOem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOcn) return;
    handleUpdateOemFields(editingOcn, {
      investigationDetails: invText,
      correctiveAction: corrText,
      airworthinessImpact: airText,
    });
    setEditingOcn(null);
  };

  const showInvestigation = mode === "OEM" || mode === "CAA";
  const showCorrective = mode === "CLOSED" || mode === "OEM" || mode === "CAA";
  const showAirworthiness = mode === "OEM" || mode === "CAA";
  const showReportedCol = mode === "CAA";

  const headerAccent =
    mode === "OPEN"
      ? "bg-blue-50 border-blue-200 text-blue-950"
      : mode === "CLOSED"
        ? "bg-emerald-50 border-emerald-200 text-emerald-950"
        : mode === "CAA"
          ? "bg-rose-50/70 border-rose-200 text-rose-950"
          : "bg-slate-50 border-slate-200 text-slate-900";

  return (
    <div className="mt-6 flex flex-col gap-4">
      {/* Mode Switcher Bar */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="inline-flex bg-slate-200/70 p-1 rounded-xl gap-1">
          {(
            [
              { id: "OPEN", label: `Open OCC (${openList.length})` },
              { id: "CLOSED", label: `Closed (${closedList.length})` },
              { id: "OEM", label: `OEM (${filteredOccurrences.length})` },
              { id: "CAA", label: `CAA (${caaYesCount} Reported)` },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setMode(t.id);
                setEditingOcn(null);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border-0 ${
                mode === t.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "bg-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {mode === "CAA" ? (
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase px-2">
              Reported Event:
            </span>
            {(
              [
                { id: "ALL", label: `All (${filteredOccurrences.length})` },
                { id: "YES", label: `Yes (${caaYesCount})` },
                { id: "NO", label: `No (${caaNoCount})` },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setReportedFilter(f.id)}
                className={`px-2.5 py-1 rounded text-xs font-semibold border-0 cursor-pointer transition-colors ${
                  reportedFilter === f.id
                    ? f.id === "YES"
                      ? "bg-rose-600 text-white"
                      : f.id === "NO"
                        ? "bg-slate-700 text-white"
                        : "bg-slate-900 text-white"
                    : "bg-transparent text-slate-600 hover:bg-slate-100"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        ) : (
          <button
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 bg-transparent border-0 cursor-pointer p-0"
            onClick={() => setActiveNav("INVESTIGATION")}
          >
            Open Investigation Workspace →
          </button>
        )}
      </div>

      {/* Inline OEM Engineering Editor */}
      {mode === "OEM" && editingOcn && (
        <form
          onSubmit={saveOem}
          className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 shadow-xs flex flex-col gap-3.5"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-emerald-950 m-0">
              Update OEM Disposition —{" "}
              <span className="font-mono">{editingOcn}</span>
            </h3>
            <button
              type="button"
              onClick={() => setEditingOcn(null)}
              className="text-xs text-slate-600 hover:text-slate-900 bg-transparent border-0 cursor-pointer font-semibold"
            >
              Cancel ✕
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Investigation
              </label>
              <textarea
                rows={2}
                required
                className="w-full border border-emerald-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                value={invText}
                onChange={(e) => setInvText(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Corrective Action
              </label>
              <textarea
                rows={2}
                required
                className="w-full border border-emerald-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                value={corrText}
                onChange={(e) => setCorrText(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Impact on Airworthiness
              </label>
              <textarea
                rows={2}
                required
                className="w-full border border-emerald-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                value={airText}
                onChange={(e) => setAirText(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-4 rounded-lg border-0 cursor-pointer shadow-xs"
            >
              Publish OEM Assessment
            </button>
          </div>
        </form>
      )}

      {/* Unified Register Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div
          className={`border-b px-5 py-3 flex justify-between items-center ${headerAccent}`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider m-0">
            {mode === "OPEN" && "Open OCC — Active Fleet Occurrences"}
            {mode === "CLOSED" &&
              "Closed — Resolved Occurrences & Corrective Actions"}
            {mode === "OEM" &&
              "OEM — Investigation, Corrective Action & Airworthiness Impact"}
            {mode === "CAA" && "CAA — Regulatory Oversight & Reported Events"}
          </h3>
          <span className="text-xs opacity-75">
            {rows.length} {rows.length === 1 ? "occurrence" : "occurrences"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 font-semibold uppercase tracking-wider">
                {showReportedCol && (
                  <th className="py-2.5 px-3 whitespace-nowrap">
                    Reported Event
                  </th>
                )}
                <th className="py-2.5 px-3 whitespace-nowrap">OP</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Event Date</th>
                <th className="py-2.5 px-3 whitespace-nowrap">ATA</th>
                <th className="py-2.5 px-3 whitespace-nowrap">
                  A/C Registration
                </th>
                <th className="py-2.5 px-3 whitespace-nowrap">A/C Make</th>
                <th className="py-2.5 px-3 whitespace-nowrap">A/C Model</th>
                <th className="py-2.5 px-3 whitespace-nowrap">A/C Series</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Engine Make</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Engine Model</th>
                <th className="py-2.5 px-3 min-w-[210px]">Discrepancy</th>
                {showInvestigation && (
                  <th className="py-2.5 px-3 min-w-[180px]">Investigation</th>
                )}
                {showCorrective && (
                  <th className="py-2.5 px-3 min-w-[190px]">
                    Corrective Action
                  </th>
                )}
                {showAirworthiness && (
                  <th className="py-2.5 px-3 min-w-[180px]">
                    Impact on Airworthiness
                  </th>
                )}
                <th className="py-2.5 px-3 whitespace-nowrap text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={16}
                    className="py-8 text-center text-slate-500 italic"
                  >
                    No occurrences match this view.
                  </td>
                </tr>
              ) : (
                rows.map((occ) => {
                  const isReported = occ.regulatoryState === "SUBMITTED_TO_CAA";
                  const investigation =
                    occ.technicalRequest?.assessment?.investigationDetails ||
                    occ.investigation.summary;
                  const correctiveAction =
                    occ.appliedCorrectiveAction ||
                    occ.technicalRequest?.assessment?.correctiveAction;
                  const airworthinessImpact =
                    occ.technicalRequest?.assessment?.airworthinessImpact;

                  return (
                    <tr
                      key={occ.operatorControlNumber}
                      onClick={() => openInvestigation(occ.operatorControlNumber)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors align-top"
                    >
                      {showReportedCol && (
                        <td
                          className="py-3 px-3 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex flex-col gap-1 items-start">
                            <div className="inline-flex rounded-md border border-slate-200 overflow-hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSafetyReportDecision(
                                    true,
                                    occ.operatorControlNumber,
                                  )
                                }
                                className={`px-2 py-0.5 text-[11px] font-bold border-0 cursor-pointer ${
                                  isReported
                                    ? "bg-rose-600 text-white"
                                    : "bg-white text-slate-500 hover:bg-slate-100"
                                }`}
                              >
                                Yes
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleSafetyReportDecision(
                                    false,
                                    occ.operatorControlNumber,
                                  )
                                }
                                className={`px-2 py-0.5 text-[11px] font-bold border-0 cursor-pointer ${
                                  !isReported
                                    ? "bg-slate-700 text-white"
                                    : "bg-white text-slate-500 hover:bg-slate-100"
                                }`}
                              >
                                No
                              </button>
                            </div>
                            {isReported &&
                              occ.authorityReport?.eccairsReference && (
                                <span className="font-mono text-[10px] text-rose-700 font-semibold">
                                  {occ.authorityReport.eccairsReference}
                                </span>
                              )}
                          </div>
                        </td>
                      )}
                      <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
                        {isExternalPartner ? (
                          <span className="bg-purple-100 text-purple-700 py-0.5 px-2 rounded-sm text-[11px] font-semibold">
                            Anonymized
                          </span>
                        ) : (
                          occ.aircraft.operatorName
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                        {occ.eventDate}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-800 font-mono font-semibold px-2 py-0.5 rounded">
                          {occ.ataChapter}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-slate-800 whitespace-nowrap">
                        {isExternalPartner ? "MASKED" : occ.aircraft.registration}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {occ.aircraft.acMake}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap font-semibold">
                        {occ.aircraft.acModel}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {occ.aircraft.acSeries}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                        {occ.aircraft.engineMake}
                      </td>
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap font-mono">
                        {occ.aircraft.engineModel}
                      </td>
                      <td className="py-3 px-3 text-slate-600 leading-relaxed max-w-xs">
                        <div className="font-semibold text-slate-900 mb-0.5">
                          {occ.headline}
                        </div>
                        <div className="line-clamp-2">{occ.discrepancy}</div>
                      </td>
                      {showInvestigation && (
                        <td className="py-3 px-3 text-slate-700 leading-relaxed max-w-xs">
                          {investigation || (
                            <span className="text-slate-400 italic">
                              Pending
                            </span>
                          )}
                        </td>
                      )}
                      {showCorrective && (
                        <td className="py-3 px-3 text-emerald-900 leading-relaxed max-w-xs font-medium">
                          {correctiveAction || (
                            <span className="text-slate-400 italic font-normal">
                              Pending
                            </span>
                          )}
                        </td>
                      )}
                      {showAirworthiness && (
                        <td className="py-3 px-3 text-slate-700 leading-relaxed max-w-xs">
                          {airworthinessImpact || (
                            <span className="text-slate-400 italic">
                              Pending
                            </span>
                          )}
                        </td>
                      )}
                      <td
                        className="py-3 px-3 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col gap-1 items-end">
                          {mode === "OEM" && (
                            <button
                              type="button"
                              onClick={() =>
                                startEditOem(occ.operatorControlNumber)
                              }
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-2.5 py-1 rounded text-[11px] border-0 cursor-pointer"
                            >
                              Edit OEM
                            </button>
                          )}
                          {mode === "OEM" &&
                            occ.oemState !== "CLOSED_APPLIED" &&
                            correctiveAction && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleOperatorApplyFix(
                                    occ.operatorControlNumber,
                                  )
                                }
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded text-[11px] border-0 cursor-pointer"
                              >
                                Mark Closed
                              </button>
                            )}
                          <button
                            type="button"
                            onClick={() =>
                              exportOccurrencePdf(occ, isExternalPartner)
                            }
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1 rounded text-[11px] border-0 cursor-pointer"
                          >
                            ↓ PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
