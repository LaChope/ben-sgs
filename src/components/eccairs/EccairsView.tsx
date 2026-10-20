import { useOccurrence } from "../../context";

export function EccairsView() {
  const { occurrences } = useOccurrence();

  const submittedOccurrences = occurrences.filter(
    (o) => o.regulatoryState === "SUBMITTED_TO_CAA",
  );

  return (
    <div className="page-content">
      <div className="page-header">
        <h2>Czech CAA — Mandatory Occurrence Reporting (ECCAIRS)</h2>
        <p>Regulatory oversight feed compliant with Regulation (EU) 376/2014</p>
      </div>
      <div className="card">
        <table className="modern-table">
          <thead>
            <tr>
              <th>ECCAIRS Reference</th>
              <th>Operator Control ID</th>
              <th>Filing Date</th>
              <th>Aircraft Type</th>
              <th>Headline</th>
              <th>Safety Evaluation Summary</th>
            </tr>
          </thead>
          <tbody>
            {submittedOccurrences.map((occ) => (
              <tr key={occ.operatorControlNumber}>
                <td className="font-mono">
                  <strong>{occ.authorityReport?.eccairsReference}</strong>
                </td>
                <td className="font-mono">{occ.operatorControlNumber}</td>
                <td>{occ.authorityReport?.submissionDate}</td>
                <td>{occ.aircraft.acModel}</td>
                <td>{occ.headline}</td>
                <td>{occ.authorityReport?.safetyEvaluationNotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
