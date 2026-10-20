import { useOccurrence } from "../../context";

export function WorkspaceTabs() {
  const { activeTab, setActiveTab } = useOccurrence();

  const tabs = [
    { id: "OVERVIEW", label: "Operational Context & Discrepancy" },
    { id: "OEM_SUPPORT", label: "OEM TechRequest & Engineering" },
    { id: "SFHA_BASELINE", label: "SFHA Safety Baseline Comparison" },
    { id: "COMPLIANCE", label: "Regulatory Filing & Activity Log" },
  ] as const;

  return (
    <div className="flex gap-6 border-t border-slate-100 mt-4 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors bg-transparent border-t-0 border-l-0 border-r-0 cursor-pointer ${
              isActive
                ? "text-blue-600 border-b-blue-600"
                : "text-slate-500 border-b-transparent hover:text-slate-800"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
