export function FederatedRadarView() {
  return (
    <div className="p-6 sm:p-8 overflow-y-auto flex-1">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Federated Cross-Fleet Hazard Radar
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Shared anomaly detection across all participating A320-214 operators
          with zero-trust commercial anonymization
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-base font-semibold text-slate-900 mb-1">
          Active Fleet-Wide Technical Clusters
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Aggregated automatically from federated operator nodes and OEM
          engineering dispositions.
        </p>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
            <strong className="text-sm font-bold text-amber-900">
              ⚠️ Emerging Cluster: ATA 27 Slat System — Actuator Type B FIN
              6085CM Torque Limiter Trips
            </strong>
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              2 Fleet Occurrences Matched
            </span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed m-0">
            Multiple occurrences of{" "}
            <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">
              F/CTL SLATS LOCKED
            </code>{" "}
            /{" "}
            <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">
              SLATS FAULT
            </code>{" "}
            linked to station torque limiter tripping on Actuator 6085CM. SFHA
            S-02.01.01.B barrier (Wing Tip Brake) functioned as designed, but
            proactive inspection of Actuator 6085CM batch #22B is recommended
            across all operators.
          </p>
        </div>
      </div>
    </div>
  );
}
