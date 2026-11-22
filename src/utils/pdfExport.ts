import type { OperationalOccurrence } from "../types";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Opens a clean, print-ready occurrence & investigation PDF report window
 * and invokes the browser's Print / Save as PDF dialog.
 */
export function exportOccurrencePdf(
  occ: OperationalOccurrence,
  isAnonymized = false,
): void {
  const opName = isAnonymized ? "Anonymized Operator" : occ.aircraft.operatorName;
  const registration = isAnonymized ? "MASKED" : occ.aircraft.registration;
  const msn = isAnonymized ? "MASKED" : occ.aircraft.msn;
  const reportedToCaa = occ.regulatoryState === "SUBMITTED_TO_CAA" ? "YES" : "NO";
  const investigationText =
    occ.technicalRequest?.assessment?.investigationDetails ||
    occ.investigation.summary;
  const correctiveActionText =
    occ.appliedCorrectiveAction ||
    occ.technicalRequest?.assessment?.correctiveAction ||
    "Pending corrective action";
  const airworthinessImpactText =
    occ.technicalRequest?.assessment?.airworthinessImpact ||
    "Pending OEM airworthiness impact assessment";

  const methodDetailsHtml =
    occ.investigation.methodology === "Hazard Analysis"
      ? `<div class="grid" style="margin-top:8px; grid-template-columns: 1fr 1fr;">
      <div><span class="field-label">Functional Failure Condition</span><div class="block-text">${escapeHtml(occ.investigation.hazardAnalysis?.failureCondition || occ.functionalEffect)}</div></div>
      <div><span class="field-label">Operational &amp; Safety Effect</span><div class="block-text">${escapeHtml(occ.investigation.hazardAnalysis?.safetyEffect || occ.safetyEffect)}</div></div>
      <div><span class="field-label">Severity &amp; Probability</span><div class="block-text">${escapeHtml(occ.investigation.hazardAnalysis?.severityClassification || "Major (MAJ ≤ 10⁻⁵)")}</div></div>
      <div><span class="field-label">Design Barriers &amp; Mitigations</span><div class="block-text">${escapeHtml(occ.investigation.hazardAnalysis?.barriersAndMitigation || "N/A")}</div></div>
    </div>`
      : occ.investigation.methodology === "Root Cause Analysis"
        ? `<div class="grid" style="margin-top:8px; grid-template-columns: 1fr 1fr;">
      <div><span class="field-label">Problem Statement</span><div class="block-text">${escapeHtml(occ.investigation.rootCause?.problemStatement || occ.failureMode)}</div></div>
      <div><span class="field-label">5-Why Chain</span><div class="block-text">${escapeHtml(occ.investigation.rootCause?.fiveWhyChain || "N/A")}</div></div>
      <div><span class="field-label">Fishbone Factors</span><div class="block-text">${escapeHtml(occ.investigation.rootCause?.fishboneFactors || "N/A")}</div></div>
      <div><span class="field-label">Verified Root Cause</span><div class="block-text">${escapeHtml(occ.investigation.rootCause?.verifiedRootCause || "N/A")}</div></div>
    </div>`
        : `<div class="grid" style="margin-top:8px; grid-template-columns: 1fr 1fr;">
      <div><span class="field-label">Control Structure</span><div class="block-text">${escapeHtml(occ.investigation.controlStructure || "N/A")}</div></div>
      <div><span class="field-label">Unsafe Control Action (UCA)</span><div class="block-text">${escapeHtml(occ.investigation.unsafeControlAction || "N/A")}</div></div>
      <div><span class="field-label">Loss Scenario</span><div class="block-text">${escapeHtml(occ.investigation.lossScenario || "N/A")}</div></div>
      <div><span class="field-label">Causal Factors &amp; Hazard Ref</span><div class="block-text">${escapeHtml(occ.investigation.causalFactors || "N/A")} (${escapeHtml(occ.investigation.hazardReference || "N/A")})</div></div>
    </div>`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Occurrence Report — ${escapeHtml(occ.operatorControlNumber)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 28px; font-size: 12px; line-height: 1.5; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; }
    .title { font-size: 18px; font-weight: 700; margin: 0; }
    .subtitle { font-size: 11px; color: #475569; margin-top: 2px; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; background: #e2e8f0; color: #0f172a; }
    .section { margin-bottom: 16px; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; page-break-inside: avoid; }
    .section h2 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.06em; color: #1e293b; margin: 0 0 8px 0; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px 16px; }
    .field-label { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: 600; display: block; }
    .field-value { font-size: 12px; font-weight: 600; color: #0f172a; }
    .block-text { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px; margin-top: 4px; white-space: pre-wrap; }
    .footer { margin-top: 20px; border-top: 1px solid #cbd5e1; padding-top: 8px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
    @media print { body { padding: 12px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="title">AeroFed — Operational Occurrence &amp; Safety Report</h1>
      <div class="subtitle">Control ID: ${escapeHtml(occ.operatorControlNumber)} • Event Date: ${escapeHtml(occ.eventDate)} • ATA ${escapeHtml(occ.ataChapter)}</div>
    </div>
    <div>
      <span class="badge">${escapeHtml(occ.oemState === "CLOSED_APPLIED" ? "CLOSED" : "OPEN OCC")}</span>
      <span class="badge" style="margin-left:6px;">CAA Reported: ${reportedToCaa}</span>
    </div>
  </div>

  <div class="section">
    <h2>1. Aircraft, Engine &amp; Operator Identification</h2>
    <div class="grid">
      <div><span class="field-label">Operator (OP)</span><span class="field-value">${escapeHtml(opName)}</span></div>
      <div><span class="field-label">Event Date</span><span class="field-value">${escapeHtml(occ.eventDate)}</span></div>
      <div><span class="field-label">ATA Chapter</span><span class="field-value">${escapeHtml(occ.ataChapter)}</span></div>
      <div><span class="field-label">A/C Registration</span><span class="field-value">${escapeHtml(registration)}</span></div>
      <div><span class="field-label">A/C Make</span><span class="field-value">${escapeHtml(occ.aircraft.acMake)}</span></div>
      <div><span class="field-label">A/C Model / Series</span><span class="field-value">${escapeHtml(occ.aircraft.acModel)}-${escapeHtml(occ.aircraft.acSeries)} (${escapeHtml(msn)})</span></div>
      <div><span class="field-label">Engine Make</span><span class="field-value">${escapeHtml(occ.aircraft.engineMake)}</span></div>
      <div><span class="field-label">Engine Model</span><span class="field-value">${escapeHtml(occ.aircraft.engineModel)}</span></div>
      <div><span class="field-label">Flight Phase / Area</span><span class="field-value">${escapeHtml(occ.flightPhase)} • ${escapeHtml(occ.eventArea)}</span></div>
    </div>
  </div>

  <div class="section">
    <h2>2. ECCAIRS Taxonomy &amp; Discrepancy</h2>
    <div class="grid" style="margin-bottom:8px;">
      <div><span class="field-label">Reporting Capacity</span><span class="field-value">${escapeHtml(occ.eccairsTaxonomy.reportingCapacity)}</span></div>
      <div><span class="field-label">State / Region</span><span class="field-value">${escapeHtml(occ.eccairsTaxonomy.stateOfOccurrence)}</span></div>
      <div><span class="field-label">Occurrence Class</span><span class="field-value">${escapeHtml(occ.eccairsTaxonomy.occurrenceClass)}</span></div>
      <div><span class="field-label">ECCAIRS Category</span><span class="field-value">${escapeHtml(occ.eccairsTaxonomy.occurrenceCategory)}</span></div>
      <div><span class="field-label">Technical Subcategory</span><span class="field-value">${escapeHtml(occ.eccairsTaxonomy.technicalSubcategory)}</span></div>
      <div><span class="field-label">AMM Reference</span><span class="field-value">${escapeHtml(occ.eccairsTaxonomy.ammReference)}</span></div>
    </div>
    <span class="field-label">Headline</span>
    <div class="field-value" style="margin-bottom:6px;">${escapeHtml(occ.headline)}</div>
    <span class="field-label">Discrepancy</span>
    <div class="block-text">${escapeHtml(occ.discrepancy)}</div>
  </div>

  <div class="section">
    <h2>3. Technical Investigation (${escapeHtml(occ.investigation.methodology)} — ${escapeHtml(occ.investigation.status)})</h2>
    <div class="block-text"><strong>Summary:</strong> ${escapeHtml(investigationText)}</div>
    ${methodDetailsHtml}
  </div>

  <div class="section">
    <h2>4. OEM Disposition, Corrective Action &amp; Airworthiness Impact</h2>
    <span class="field-label">Corrective Action</span>
    <div class="block-text" style="margin-bottom:8px;">${escapeHtml(correctiveActionText)}</div>
    <span class="field-label">Impact on Airworthiness</span>
    <div class="block-text">${escapeHtml(airworthinessImpactText)}</div>
  </div>

  <div class="footer">
    <span>Generated by AeroFed Safety Data Exchange • EASA / Reg (EU) 376/2014</span>
    <span>Exported: ${new Date().toISOString().replace("T", " ").substring(0, 16)} UTC</span>
  </div>
</body>
</html>`;

  const printWin = window.open("", "_blank", "width=960,height=780");
  if (printWin) {
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
    printWin.focus();
    setTimeout(() => {
      printWin.print();
    }, 250);
  }
}
