import { useOccurrence } from "../../context";

export function Sidebar() {
  const { activeNav, setActiveNav, occurrences } = useOccurrence();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">✈</div>
        <div>
          <div className="brand-title">AeroFed</div>
          <div className="brand-sub">Safety Data Exchange</div>
        </div>
      </div>

      <nav className="nav-menu">
        <button
          className={`nav-item ${activeNav === "DASHBOARD" ? "active" : ""}`}
          onClick={() => setActiveNav("DASHBOARD")}
        >
          <span>📊</span> Fleet Safety Overview
        </button>
        <button
          className={`nav-item ${activeNav === "INCIDENTS" ? "active" : ""}`}
          onClick={() => setActiveNav("INCIDENTS")}
        >
          <span>🛠</span> Occurrence Workspace
          <span className="nav-count">{occurrences.length}</span>
        </button>
        <button
          className={`nav-item ${activeNav === "FEDERATED_RADAR" ? "active" : ""}`}
          onClick={() => setActiveNav("FEDERATED_RADAR")}
        >
          <span>🌐</span> Cross-Fleet Hazard Radar
        </button>
        <button
          className={`nav-item ${activeNav === "ECCAIRS" ? "active" : ""}`}
          onClick={() => setActiveNav("ECCAIRS")}
        >
          <span>🏛</span> Regulatory &amp; ECCAIRS
        </button>
      </nav>

      <div className="sidebar-footer">
        <div className="federated-status">
          <span className="status-dot"></span>
          <div>
            <strong>Federated Node Active</strong>
            <p>EASA / EU 376/2014 Compliant Governance</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
