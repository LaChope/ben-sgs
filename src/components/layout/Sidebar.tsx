import { useOccurrence } from "../../context";

export function Sidebar() {
  const { activeNav, setActiveNav, occurrences } = useOccurrence();

  const openCount = occurrences.filter(
    (o) => o.oemState !== "CLOSED_APPLIED",
  ).length;

  const navBtnClass = (isActive: boolean) =>
    `w-full flex items-center gap-2.5 p-2.5 px-3.5 rounded-lg text-left text-sm font-medium transition-colors cursor-pointer border-0 ${
      isActive
        ? "bg-blue-600 text-white font-semibold shadow-xs"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-[250px] bg-slate-900 text-slate-50 flex flex-col p-4 border-r border-slate-800 shrink-0">
      <div className="flex items-center gap-3 px-2 pb-6 border-b border-slate-800">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-lg text-white shadow-xs">
          ✈
        </div>
        <div>
          <div className="font-bold text-base tracking-tight text-white leading-tight">
            AeroFed
          </div>
          <div className="text-xs text-slate-400">Safety Data Exchange</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5 mt-5 flex-1">
        <button
          className={navBtnClass(activeNav === "DASHBOARD")}
          onClick={() => setActiveNav("DASHBOARD")}
        >
          <span>📊</span> Fleet Overview
          <span className="ml-auto bg-white/15 text-white px-2 py-0.5 rounded-full text-[11px] font-semibold">
            {openCount}
          </span>
        </button>

        <button
          className={navBtnClass(activeNav === "REPORT")}
          onClick={() => setActiveNav("REPORT")}
        >
          <span>📋</span> Report Occurrence
        </button>

        <button
          className={navBtnClass(activeNav === "INVESTIGATION")}
          onClick={() => setActiveNav("INVESTIGATION")}
        >
          <span>🔬</span> Investigation
          <span className="ml-auto bg-white/15 text-white px-2 py-0.5 rounded-full text-[11px] font-semibold">
            {occurrences.length}
          </span>
        </button>
      </nav>

      <div className="border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2.5 text-xs text-slate-400">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] shrink-0" />
          <div>
            <strong className="text-slate-200 block font-semibold">
              Federated Node Active
            </strong>
            <p className="mt-0.5 text-slate-400 text-[11px] leading-tight">
              EASA / EU 376/2014 Compliant Governance
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
