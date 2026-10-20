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

    // Reset local form
    setHeadline("");
    setDiscrepancy("");
  };

  const handleClose = () => {
    setShowNewModal(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>Report Operational Occurrence</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Occurrence Headline</label>
          <input
            required
            placeholder="e.g., F/CTL SLATS FAULT during approach extension"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <div className="form-row-2">
            <div>
              <label>Primary Affected Component (FIN / Part)</label>
              <input
                value={component}
                onChange={(e) => setComponent(e.target.value)}
              />
            </div>
            <div>
              <label>Flight Phase</label>
              <select
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
          <label>Technical Discrepancy &amp; AMM References</label>
          <textarea
            rows={3}
            placeholder="Enter flight deck effects and maintenance troubleshooting steps..."
            value={discrepancy}
            onChange={(e) => setDiscrepancy(e.target.value)}
          />
          <div className="modal-actions">
            <button
              type="button"
              className="btn-action secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-action primary">
              Submit Occurrence Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
