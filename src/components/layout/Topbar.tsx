import type { StakeholderRole } from "../../types";
import { PERSONAS } from "../../constants/personas";
import { useOccurrence } from "../../context";

export function Topbar() {
  const {
    searchQuery,
    setSearchQuery,
    setShowNewModal,
    activeRole,
    setActiveRole,
    currentPersona,
  } = useOccurrence();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <input
          type="text"
          className="search-input"
          placeholder="Search occurrences by ID, ATA chapter, component (e.g. 6085CM)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        <button className="btn-create" onClick={() => setShowNewModal(true)}>
          + Report Occurrence
        </button>

        <div className="persona-selector">
          <div
            className="persona-indicator"
            style={{ backgroundColor: currentPersona.themeColor }}
          />
          <div className="persona-details">
            <span className="persona-label">
              Logged in Organization / Role:
            </span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as StakeholderRole)}
              className="persona-dropdown"
            >
              {PERSONAS.map((p) => (
                <option key={p.role} value={p.role}>
                  {p.orgName} — {p.department}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
