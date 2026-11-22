import React, { useState } from "react";
import { useOccurrence } from "../../../context";
import type {
  StpaInvestigation,
  HazardAnalysisFields,
  RootCauseFields,
} from "../../../types";

const EMPTY_HAZARD: HazardAnalysisFields = {
  failureCondition: "",
  safetyEffect: "",
  severityClassification: "Major (MAJ ≤ 10⁻⁵)",
  barriersAndMitigation: "",
};

const EMPTY_RCA: RootCauseFields = {
  problemStatement: "",
  fiveWhyChain: "",
  fishboneFactors: "",
  verifiedRootCause: "",
};

const METHOD_META: Record<
  StpaInvestigation["methodology"],
  { badge: string; badgeClass: string; subtitle: string }
> = {
  STPA: {
    badge: "STPA — Systems-Theoretic Process Analysis",
    badgeClass: "bg-blue-100 text-blue-800",
    subtitle:
      "Analyze control structures, unsafe control actions (UCAs), and loss scenarios across software, hardware, and human loops.",
  },
  "Hazard Analysis": {
    badge: "FHA / SFHA — Functional Hazard Analysis",
    badgeClass: "bg-amber-100 text-amber-800",
    subtitle:
      "Evaluate functional failure conditions, operational safety effects, severity classification, and existing design barriers.",
  },
  "Root Cause Analysis": {
    badge: "RCA — 5-Why & Fishbone Analysis",
    badgeClass: "bg-purple-100 text-purple-800",
    subtitle:
      "Trace the failure chain via 5-Why questioning and Fishbone (Machine, Material, Method, Environment) contributing factors.",
  },
};

export function InvestigationTab() {
  const { selectedOcc, handleUpdateInvestigation, handleCamoSubmitToOem } =
    useOccurrence();

  const [trackedOcn, setTrackedOcn] = useState(
    selectedOcc.operatorControlNumber,
  );
  const [invForm, setInvForm] = useState<StpaInvestigation>(
    selectedOcc.investigation,
  );
  const [saved, setSaved] = useState(false);

  if (trackedOcn !== selectedOcc.operatorControlNumber) {
    setTrackedOcn(selectedOcc.operatorControlNumber);
    setInvForm(selectedOcc.investigation);
    setSaved(false);
  }

  const hazardData: HazardAnalysisFields = {
    ...EMPTY_HAZARD,
    failureCondition: selectedOcc.functionalEffect,
    safetyEffect: selectedOcc.safetyEffect,
    ...invForm.hazardAnalysis,
  };

  const rcaData: RootCauseFields = {
    ...EMPTY_RCA,
    problemStatement: selectedOcc.failureMode,
    ...invForm.rootCause,
  };

  const updateHazard = (patch: Partial<HazardAnalysisFields>) => {
    setSaved(false);
    setInvForm({
      ...invForm,
      hazardAnalysis: { ...hazardData, ...patch },
    });
  };

  const updateRca = (patch: Partial<RootCauseFields>) => {
    setSaved(false);
    setInvForm({
      ...invForm,
      rootCause: { ...rcaData, ...patch },
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdateInvestigation(selectedOcc.operatorControlNumber, {
      ...invForm,
      hazardAnalysis: hazardData,
      rootCause: rcaData,
    });
    setSaved(true);
  };

  const meta = METHOD_META[invForm.methodology];

  return (
    <form
      onSubmit={handleSave}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4"
    >
      <div className="flex flex-wrap justify-between items-start gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider m-0">
              Technical Investigation
            </h3>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${meta.badgeClass}`}
            >
              {meta.badge}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 mb-0">{meta.subtitle}</p>
        </div>

        {selectedOcc.oemState === "PENDING_CAMO_REVIEW" && (
          <button
            type="button"
            onClick={() =>
              handleCamoSubmitToOem(selectedOcc.operatorControlNumber)
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-3.5 rounded-lg border-0 cursor-pointer shadow-xs shrink-0"
          >
            Contact OEM Support
          </button>
        )}
      </div>

      {/* Common Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Investigation Methodology
          </label>
          <select
            className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900 font-semibold"
            value={invForm.methodology}
            onChange={(e) => {
              setSaved(false);
              setInvForm({
                ...invForm,
                methodology: e.target.value as StpaInvestigation["methodology"],
              });
            }}
          >
            <option value="STPA">
              STPA (Systems-Theoretic Process Analysis)
            </option>
            <option value="Hazard Analysis">Hazard Analysis (FHA / SFHA)</option>
            <option value="Root Cause Analysis">
              Root Cause Analysis (5-Why / Fishbone)
            </option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Investigation Status
          </label>
          <select
            className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900"
            value={invForm.status}
            onChange={(e) => {
              setSaved(false);
              setInvForm({
                ...invForm,
                status: e.target.value as StpaInvestigation["status"],
              });
            }}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Hazard / SFHA Reference
          </label>
          <input
            className="w-full border border-slate-300 rounded-lg p-2 text-xs bg-white text-slate-900 font-mono"
            value={invForm.hazardReference}
            onChange={(e) => {
              setSaved(false);
              setInvForm({ ...invForm, hazardReference: e.target.value });
            }}
          />
        </div>
      </div>

      {/* METHOD 1: STPA */}
      {invForm.methodology === "STPA" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50/40 border border-blue-100 rounded-xl p-4">
          <div>
            <label className="text-xs font-semibold text-blue-950 block mb-1">
              STPA Step 1 — Control Structure
            </label>
            <textarea
              rows={2}
              placeholder="Controller → Actuator → Controlled Process → Feedback..."
              className="w-full border border-blue-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={invForm.controlStructure}
              onChange={(e) => {
                setSaved(false);
                setInvForm({ ...invForm, controlStructure: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-blue-950 block mb-1">
              STPA Step 2 — Unsafe Control Action (UCA)
            </label>
            <textarea
              rows={2}
              placeholder="Identify unsafe control action (not provided, provided incorrectly, wrong timing)..."
              className="w-full border border-blue-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={invForm.unsafeControlAction}
              onChange={(e) => {
                setSaved(false);
                setInvForm({
                  ...invForm,
                  unsafeControlAction: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-blue-950 block mb-1">
              STPA Step 3 — Loss Scenario
            </label>
            <textarea
              rows={2}
              placeholder="How the UCA or inadequate feedback leads to a hazard / loss..."
              className="w-full border border-blue-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={invForm.lossScenario}
              onChange={(e) => {
                setSaved(false);
                setInvForm({ ...invForm, lossScenario: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-blue-950 block mb-1">
              STPA Step 4 — Causal Factors &amp; Safety Constraints
            </label>
            <textarea
              rows={2}
              placeholder="Component degradation, control flaws, new safety constraints..."
              className="w-full border border-blue-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={invForm.causalFactors}
              onChange={(e) => {
                setSaved(false);
                setInvForm({ ...invForm, causalFactors: e.target.value });
              }}
            />
          </div>
        </div>
      )}

      {/* METHOD 2: HAZARD ANALYSIS (FHA / SFHA) */}
      {invForm.methodology === "Hazard Analysis" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-amber-50/50 border border-amber-200 rounded-xl p-4">
          <div>
            <label className="text-xs font-semibold text-amber-950 block mb-1">
              Functional Failure Condition
            </label>
            <textarea
              rows={2}
              placeholder="e.g. S-02.01.01.B — Total loss of Slat movement during takeoff/approach..."
              className="w-full border border-amber-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={hazardData.failureCondition}
              onChange={(e) =>
                updateHazard({ failureCondition: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-950 block mb-1">
              Operational &amp; Safety Effect
            </label>
            <textarea
              rows={2}
              placeholder="Impact on aircraft handling, crew workload, and safety margins..."
              className="w-full border border-amber-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={hazardData.safetyEffect}
              onChange={(e) => updateHazard({ safetyEffect: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-950 block mb-1">
              Hazard Severity &amp; Probability Target
            </label>
            <select
              className="w-full border border-amber-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={hazardData.severityClassification}
              onChange={(e) =>
                updateHazard({ severityClassification: e.target.value })
              }
            >
              <option value="Catastrophic (CAT ≤ 10⁻⁹)">
                Catastrophic (CAT ≤ 10⁻⁹)
              </option>
              <option value="Hazardous (HAZ ≤ 10⁻⁷)">
                Hazardous (HAZ ≤ 10⁻⁷)
              </option>
              <option value="Major (MAJ ≤ 10⁻⁵)">Major (MAJ ≤ 10⁻⁵)</option>
              <option value="Minor (MIN ≤ 10⁻³)">Minor (MIN ≤ 10⁻³)</option>
              <option value="No Safety Effect (NSE)">
                No Safety Effect (NSE)
              </option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-950 block mb-1">
              Existing Design Barriers &amp; Mitigations
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Station torque limiter, Wing Tip Brake, ECAM alert, dual-channel SFCC..."
              className="w-full border border-amber-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={hazardData.barriersAndMitigation}
              onChange={(e) =>
                updateHazard({ barriersAndMitigation: e.target.value })
              }
            />
          </div>
        </div>
      )}

      {/* METHOD 3: ROOT CAUSE ANALYSIS (5-WHY / FISHBONE) */}
      {invForm.methodology === "Root Cause Analysis" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-purple-50/50 border border-purple-200 rounded-xl p-4">
          <div>
            <label className="text-xs font-semibold text-purple-950 block mb-1">
              Problem Statement
            </label>
            <textarea
              rows={2}
              placeholder="Clear statement of the failure mode and observed discrepancy..."
              className="w-full border border-purple-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={rcaData.problemStatement}
              onChange={(e) => updateRca({ problemStatement: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-purple-950 block mb-1">
              5-Why Causal Chain
            </label>
            <textarea
              rows={2}
              placeholder="1. Why did slats lock? → 2. Why did torque limiter trip? → 3. Why did friction spike?..."
              className="w-full border border-purple-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={rcaData.fiveWhyChain}
              onChange={(e) => updateRca({ fiveWhyChain: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-purple-950 block mb-1">
              Fishbone Factors (Machine / Material / Method / Environment)
            </label>
            <textarea
              rows={2}
              placeholder="Machine: Actuator 6085CM | Material: Batch #22B grease | Environment: Cold-soak..."
              className="w-full border border-purple-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={rcaData.fishboneFactors}
              onChange={(e) => updateRca({ fishboneFactors: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-purple-950 block mb-1">
              Verified Root Cause &amp; Containment
            </label>
            <textarea
              rows={2}
              placeholder="Confirmed root cause and immediate fleet containment action..."
              className="w-full border border-purple-200 rounded-lg p-2.5 text-xs bg-white text-slate-900"
              value={rcaData.verifiedRootCause}
              onChange={(e) => updateRca({ verifiedRootCause: e.target.value })}
            />
          </div>
        </div>
      )}

      <div>
        <label className="text-xs font-semibold text-slate-700 block mb-1">
          Executive Investigation Summary (shared with OEM &amp; CAA)
        </label>
        <textarea
          rows={2}
          className="w-full border border-slate-300 rounded-lg p-2.5 text-xs bg-white text-slate-900"
          value={invForm.summary}
          onChange={(e) => {
            setSaved(false);
            setInvForm({ ...invForm, summary: e.target.value });
          }}
        />
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
        <div className="text-xs text-emerald-700 font-semibold">
          {saved && "✓ Investigation saved and synced across Fleet Overview."}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2 px-4 rounded-lg border-0 cursor-pointer shadow-xs"
        >
          Save Investigation Analysis
        </button>
      </div>
    </form>
  );
}
