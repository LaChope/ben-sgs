import { useOccurrence } from "../../context";

export function EccairsView() {
  const { occurrences } = useOccurrence();

  const submittedOccurrences = occurrences.filter(
    (o) => o.regulatoryState === "SUBMITTED_TO_CAA",
  );

  return (
    <div className="p-6 sm:p-8 overflow-y-auto flex-1">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Czech CAA — Mandatory Occurrence Reporting (ECCAIRS)
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Regulatory oversight feed compliant with Regulation (EU) 376/2014
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">ECCAIRS Reference</th>
                <th className="py-3 px-4">Operator Control ID</th>
                <th className="py-3 px-4">Filing Date</th>
                <th className="py-3 px-4">Aircraft Type</th>
                <th className="py-3 px-4">Headline</th>
                <th className="py-3 px-4">Safety Evaluation Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submittedOccurrences.map((occ) => (
                <tr
                  key={occ.operatorControlNumber}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 text-xs">
                    {occ.authorityReport?.eccairsReference}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 text-xs">
                    {occ.operatorControlNumber}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-xs">
                    {occ.authorityReport?.submissionDate}
                  </td>
                  <td className="py-3 px-4 text-slate-700 text-xs">
                    {occ.aircraft.acModel}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 text-xs">
                    {occ.headline}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-xs leading-relaxed max-w-sm">
                    {occ.authorityReport?.safetyEvaluationNotes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
