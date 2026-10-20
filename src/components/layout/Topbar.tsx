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
    <header className="h-[68px] bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs">
      <div className="flex items-center">
        <input
          type="text"
          className="w-[380px] py-2 px-3.5 border border-slate-300 rounded-lg text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          placeholder="Search occurrences by ID, ATA chapter, component (e.g. 6085CM)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          className="bg-slate-900 hover:bg-slate-800 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors cursor-pointer border-0 shadow-xs"
          onClick={() => setShowNewModal(true)}
        >
          + Report Occurrence
        </button>

        <div className="flex items-center gap-2.5 bg-slate-100 py-1.5 px-3 rounded-lg border border-slate-200">
          <div
            className="w-2.5 h-7 rounded shrink-0"
            style={{ backgroundColor: currentPersona.themeColor }}
          />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Logged in Organization / Role:
            </span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as StakeholderRole)}
              className="bg-transparent font-semibold text-xs text-slate-900 cursor-pointer p-0 focus:outline-none border-0"
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
