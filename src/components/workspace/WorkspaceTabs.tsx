import { useOccurrence } from "../../context";

export function WorkspaceTabs() {
  const { activeTab, setActiveTab } = useOccurrence();

  return (
    <div className="workspace-tabs">
      <button
        className={activeTab === "OVERVIEW" ? "active" : ""}
        onClick={() => setActiveTab("OVERVIEW")}
      >
        Operational Context &amp; Discrepancy
      </button>
      <button
        className={activeTab === "OEM_SUPPORT" ? "active" : ""}
        onClick={() => setActiveTab("OEM_SUPPORT")}
      >
        OEM TechRequest &amp; Engineering
      </button>
      <button
        className={activeTab === "SFHA_BASELINE" ? "active" : ""}
        onClick={() => setActiveTab("SFHA_BASELINE")}
      >
        SFHA Safety Baseline Comparison
      </button>
      <button
        className={activeTab === "COMPLIANCE" ? "active" : ""}
        onClick={() => setActiveTab("COMPLIANCE")}
      >
        Regulatory Filing &amp; Activity Log
      </button>
    </div>
  );
}
