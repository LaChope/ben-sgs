import React, { useState } from "react";
import { useOccurrence } from "../../context";
import type { EccairsTaxonomy } from "../../types";
import { exportOccurrencePdf } from "../../utils/pdfExport";

export function ReportOccurrenceView() {
  const {
    occurrences,
    setSelectedId,
    isExternalPartner,
    handleCreateOccurrence,
    setActiveNav,
  } = useOccurrence();

  const [submitBanner, setSubmitBanner] = useState<string | null>(null);

  const [headline, setHeadline] = useState("");
  const [eventDate, setEventDate] = useState(
    new Date().toISOString().substring(0, 10),
  );
  const [ataChapter, setAtaChapter] = useState("27-84");
  const [operatorName, setOperatorName] = useState("Alpha Air (OP-A)");
  const [registration, setRegistration] = useState("OK-NEO");
  const [acMake, setAcMake] = useState("Airbus");
  const [acModel, setAcModel] = useState("A320");
  const [acSeries, setAcSeries] = useState("214");
  const [engineMake, setEngineMake] = useState("CFM International");
  const [engineModel, setEngineModel] = useState("CFM56-5B4/P");
  const [component, setComponent] = useState("Actuator Type B FIN 6085CM");
  const [flightPhase, setFlightPhase] = useState("Takeoff");
  const [discrepancy, setDiscrepancy] = useState("");
  const [reportToCaa, setReportToCaa] = useState(true);
  const [notifyOem, setNotifyOem] = useState(true);

  const [taxonomy, setTaxonomy] = useState<EccairsTaxonomy>({
    reportingCapacity: "Organization / Operator",
    stateOfOccurrence: "Czech Republic",
    occurrenceClass: "Major Incident",
    occurrenceCategory: "SCF-NP: System/Component Failure (Non-Powerplant)",
    technicalSubcategory: "ATA 27 - High Lift / Slat Drive System",
    ammReference: "AMM 27-51-34 / AMM 27-84-49",
  });

  const handleTaxonomySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) return;

    handleCreateOccurrence({
      headline,
      eventDate,
      ataChapter,
      operatorName,
      registration,
      acMake,
      acModel,
      acSeries,
      engineMake,
      engineModel,
      component,
      flightPhase,
      discrepancy,
      eccairsTaxonomy: taxonomy,
      reportToCaa,
      notifyOem,
    });

    setSubmitBanner(
      `Occurrence "${headline}" submitted via ECCAIRS Taxonomy${reportToCaa ? " (Reported to CAA)" : ""}${notifyOem ? " & OEM Notified" : ""}.`,
    );
    setHeadline("");
    setDiscrepancy("");
  };

  return (
    <div className="p-6 sm:p-8 overflow-y-auto flex-1">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Report Occurrence — ECCAIRS Taxonomy
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Submit standardized occurrence reports (Reg EU 376/2014) and export
          PDF reports across Fleet Overview, OEM, and CAA
        </p>
      </div>

      {submitBanner && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl px-4 py-3 text-xs font-medium flex justify-between items-center">
          <span>✓ {submitBanner}</span>
          <button
            type="button"
            onClick={() => setSubmitBanner(null)}
            className="text-emerald-700 hover:text-emerald-950 font-bold bg-transparent border-0 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
        <form
          onSubmit={handleTaxonomySubmit}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-5"
        >
          {/* Section 1: ECCAIRS Taxonomy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">
              1. ECCAIRS Classification &amp; Regional Context
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Reporting Capacity
                </label>
                <select
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={taxonomy.reportingCapacity}
                  onChange={(e) =>
                    setTaxonomy({
                      ...taxonomy,
                      reportingCapacity: e.target
                        .value as EccairsTaxonomy["reportingCapacity"],
                    })
                  }
                >
                  <option value="Organization / Operator">
                    Organization / Operator
                  </option>
                  <option value="Personal / Individual">
                    Personal / Individual
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  State / Region of Occurrence
                </label>
                <select
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={taxonomy.stateOfOccurrence}
                  onChange={(e) =>
                    setTaxonomy({
                      ...taxonomy,
                      stateOfOccurrence: e.target.value,
                    })
                  }
                >
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Austria">Austria</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Occurrence Class
                </label>
                <select
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={taxonomy.occurrenceClass}
                  onChange={(e) =>
                    setTaxonomy({
                      ...taxonomy,
                      occurrenceClass: e.target
                        .value as EccairsTaxonomy["occurrenceClass"],
                    })
                  }
                >
                  <option value="Accident">Accident</option>
                  <option value="Serious Incident">Serious Incident</option>
                  <option value="Major Incident">Major Incident</option>
                  <option value="Significant Incident">
                    Significant Incident
                  </option>
                  <option value="Occurrence without Safety Effect">
                    Occurrence without Safety Effect
                  </option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  ECCAIRS Occurrence Category
                </label>
                <select
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={taxonomy.occurrenceCategory}
                  onChange={(e) =>
                    setTaxonomy({
                      ...taxonomy,
                      occurrenceCategory: e.target.value,
                    })
                  }
                >
                  <option value="SCF-NP: System/Component Failure (Non-Powerplant)">
                    SCF-NP: System/Component Failure (Non-Powerplant)
                  </option>
                  <option value="SCF-PP: System/Component Failure (Powerplant)">
                    SCF-PP: System/Component Failure (Powerplant)
                  </option>
                  <option value="LOC-I: Loss of Control - Inflight">
                    LOC-I: Loss of Control - Inflight
                  </option>
                  <option value="F-NI: Fire/Smoke (Non-Impact)">
                    F-NI: Fire/Smoke (Non-Impact)
                  </option>
                  <option value="ATM: Air Traffic Management / CNS">
                    ATM: Air Traffic Management / CNS
                  </option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Technical Subcategory
                </label>
                <input
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={taxonomy.technicalSubcategory}
                  onChange={(e) =>
                    setTaxonomy({
                      ...taxonomy,
                      technicalSubcategory: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section 2: Aircraft & Engine Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">
              2. Aircraft, Engine &amp; ATA Identification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Operator (OP)
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  ATA Chapter
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900 font-mono"
                  value={ataChapter}
                  onChange={(e) => setAtaChapter(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  A/C Registration
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900 font-mono"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  A/C Make
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={acMake}
                  onChange={(e) => setAcMake(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  A/C Model
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={acModel}
                  onChange={(e) => setAcModel(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  A/C Series
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={acSeries}
                  onChange={(e) => setAcSeries(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Flight Phase
                </label>
                <select
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={flightPhase}
                  onChange={(e) => setFlightPhase(e.target.value)}
                >
                  <option>Taxi</option>
                  <option>Takeoff</option>
                  <option>Climb</option>
                  <option>Cruise</option>
                  <option>Approach</option>
                  <option>Landing</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Engine Make
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={engineMake}
                  onChange={(e) => setEngineMake(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Engine Model
                </label>
                <input
                  required
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900 font-mono"
                  value={engineModel}
                  onChange={(e) => setEngineModel(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Event & Discrepancy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">
              3. Discrepancy &amp; Technical References
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Occurrence Headline *
                </label>
                <input
                  required
                  placeholder="e.g. F/CTL SLATS FAULT during approach extension"
                  className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Component &amp; AMM Reference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="Component / FIN"
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
                    value={component}
                    onChange={(e) => setComponent(e.target.value)}
                  />
                  <input
                    placeholder="AMM Ref"
                    className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900 font-mono"
                    value={taxonomy.ammReference}
                    onChange={(e) =>
                      setTaxonomy({ ...taxonomy, ammReference: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Discrepancy Details *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe flight deck alerts, system behavior, and maintenance findings..."
              className="w-full border border-slate-300 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={discrepancy}
              onChange={(e) => setDiscrepancy(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap gap-4 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={reportToCaa}
                  onChange={(e) => setReportToCaa(e.target.checked)}
                />
                Report to CAA (ECCAIRS = Yes)
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={notifyOem}
                  onChange={(e) => setNotifyOem(e.target.checked)}
                />
                Contact / Notify OEM Support
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-lg transition-colors cursor-pointer border-0 shadow-xs"
            >
              Submit ECCAIRS Occurrence Report
            </button>
          </div>
        </form>

        {/* Right rail: Active PDF Reports */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-2 border-b border-slate-100">
            Submitted Reports &amp; PDF Downloads
          </h3>
          <div className="flex flex-col gap-3">
            {occurrences.map((occ) => (
              <div
                key={occ.operatorControlNumber}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors bg-slate-50/50"
              >
                <div className="flex justify-between items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] font-bold text-slate-800">
                    {occ.operatorControlNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      occ.oemState === "CLOSED_APPLIED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {occ.oemState === "CLOSED_APPLIED" ? "CLOSED" : "OPEN"}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-900 line-clamp-1">
                  {occ.headline}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {occ.aircraft.registration} • ATA {occ.ataChapter} •{" "}
                  {occ.eccairsTaxonomy.stateOfOccurrence}
                </div>
                <div className="flex gap-2 mt-2.5">
                  <button
                    type="button"
                    onClick={() => exportOccurrencePdf(occ, isExternalPartner)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold py-1.5 px-2.5 rounded-md border-0 cursor-pointer transition-colors"
                  >
                    ↓ Download PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(occ.operatorControlNumber);
                      setActiveNav("INVESTIGATION");
                    }}
                    className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold py-1.5 px-2.5 rounded-md border-0 cursor-pointer transition-colors"
                  >
                    Investigate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
