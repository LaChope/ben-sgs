import React, { useState } from "react";
import { useOccurrence } from "../../context";

export function NewOccurrenceModal() {
  const { showNewModal, setShowNewModal, handleCreateOccurrence } =
    useOccurrence();

  const [headline, setHeadline] = useState("");
  const [component, setComponent] = useState("Actuator Type B FIN 6085CM");
  const [flightPhase, setFlightPhase] = useState("Takeoff");
  const [discrepancy, setDiscrepancy] = useState("");

  if (!showNewModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim()) return;

    handleCreateOccurrence({
      headline,
      component,
      flightPhase,
      discrepancy,
    });

    setHeadline("");
    setDiscrepancy("");
  };

  const handleClose = () => {
    setShowNewModal(false);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-slate-900 m-0 pb-3 border-b border-slate-100">
          Report Operational Occurrence
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 mt-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Occurrence Headline
            </label>
            <input
              required
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g., F/CTL SLATS FAULT during approach extension"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Primary Component (FIN / Part)
              </label>
              <input
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={component}
                onChange={(e) => setComponent(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Flight Phase
              </label>
              <select
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={flightPhase}
                onChange={(e) => setFlightPhase(e.target.value)}
              >
                <option>Takeoff</option>
                <option>Climb</option>
                <option>Cruise</option>
                <option>Approach</option>
                <option>Landing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Technical Discrepancy &amp; AMM References
            </label>
            <textarea
              rows={3}
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Enter flight deck effects and maintenance troubleshooting steps..."
              value={discrepancy}
              onChange={(e) => setDiscrepancy(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2.5 mt-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors cursor-pointer border-0"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-lg transition-colors cursor-pointer border-0 shadow-xs"
            >
              Submit Occurrence Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
