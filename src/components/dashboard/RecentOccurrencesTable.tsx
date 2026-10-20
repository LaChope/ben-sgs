import { useOccurrence } from "../../context";

export function RecentOccurrencesTable() {
  const { occurrences, isExternalPartner, setSelectedId, setActiveNav } =
    useOccurrence();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-semibold text-slate-900">
          Recent Fleet Occurrences &amp; Collaborative Status
        </h3>
        <button
          className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-transparent border-0 cursor-pointer p-0 transition-colors"
          onClick={() => setActiveNav("INCIDENTS")}
        >
          Open Investigation Workspace →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Control ID</th>
              <th className="py-3 px-4">Event Date</th>
              <th className="py-3 px-4">Operator / Aircraft</th>
              <th className="py-3 px-4">Headline &amp; Component</th>
              <th className="py-3 px-4">Flight Phase</th>
              <th className="py-3 px-4">OEM Support Status</th>
              <th className="py-3 px-4">CAA / ECCAIRS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {occurrences.map((occ) => (
              <tr
                key={occ.operatorControlNumber}
                onClick={() => {
                  setSelectedId(occ.operatorControlNumber);
                  setActiveNav("INCIDENTS");
                }}
                className="hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <td className="py-3 px-4 font-mono font-medium text-slate-800">
                  {occ.operatorControlNumber}
                </td>
                <td className="py-3 px-4 text-slate-600">{occ.eventDate}</td>
                <td className="py-3 px-4 text-slate-700">
                  {isExternalPartner ? (
                    <span className="bg-purple-100 text-purple-700 py-0.5 px-2 rounded-sm text-xs font-semibold">
                      Anonymized Operator
                    </span>
                  ) : (
                    `${occ.aircraft.operatorName} (${occ.aircraft.msn})`
                  )}
                </td>
                <td className="py-3 px-4">
                  <strong className="text-slate-900 font-semibold block">
                    {occ.headline}
                  </strong>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {occ.component}
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-700">{occ.flightPhase}</td>
                <td className="py-3 px-4">
                  <span className="bg-slate-100 text-slate-700 py-0.5 px-2.5 rounded-full text-xs font-semibold">
                    {occ.eventState}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-slate-100 text-slate-700 py-0.5 px-2.5 rounded-full text-xs font-semibold">
                    {occ.regulatoryState === "SUBMITTED_TO_CAA"
                      ? occ.authorityReport?.eccairsReference
                      : occ.regulatoryState.replace(/_/g, " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
