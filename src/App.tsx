import React, { useState } from "react";
import type {
  OperationalOccurrence,
  StakeholderRole,
  OEMClassification,
  TechnicalAssessment,
} from "./types";
import { INITIAL_OCCURRENCES, SAFETY_BASELINES } from "./mockData";
import "./App.css";

interface Persona {
  role: StakeholderRole;
  orgName: string;
  department: string;
  userTitle: string;
  themeColor: string;
}

const PERSONAS: Persona[] = [
  {
    role: "OPERATOR_OPS",
    orgName: "Alpha Air",
    department: "Flight Operations & MCC",
    userTitle: "Capt. M. Dvořák (Fleet Ops)",
    themeColor: "#0ea5e9",
  },
  {
    role: "OPERATOR_CAMO",
    orgName: "Alpha Air",
    department: "Continuing Airworthiness (CAMO)",
    userTitle: "Ing. P. Svoboda (CAMO Lead)",
    themeColor: "#2563eb",
  },
  {
    role: "OPERATOR_SAFETY",
    orgName: "Alpha Air",
    department: "Safety Management System (SMS)",
    userTitle: "Ing. L. Černá (Safety Manager)",
    themeColor: "#f59e0b",
  },
  {
    role: "OEM_CS",
    orgName: "Airframe OEM",
    department: "Customer Support & TechRequest",
    userTitle: "M. Laurent (OEM Support Desk)",
    themeColor: "#10b981",
  },
  {
    role: "OEM_DO",
    orgName: "Airframe OEM",
    department: "Design Organisation (ATA 27)",
    userTitle: "Ing. J. Novák (Chief Engineer)",
    themeColor: "#059669",
  },
  {
    role: "REGULATOR_CAA",
    orgName: "Czech CAA",
    department: "State Safety Oversight & ECCAIRS",
    userTitle: "Inspector R. Kučera (CAA)",
    themeColor: "#e11d48",
  },
  {
    role: "EXTERNAL_OPERATOR",
    orgName: "Beta Airlines",
    department: "Partner Fleet Operator (A320 Family)",
    userTitle: "H. Weber (Fleet Reliability)",
    themeColor: "#7c3aed",
  },
];

type NavSection = "DASHBOARD" | "INCIDENTS" | "FEDERATED_RADAR" | "ECCAIRS";
type WorkspaceTab = "OVERVIEW" | "OEM_SUPPORT" | "SFHA_BASELINE" | "COMPLIANCE";

export function App() {
  const [occurrences, setOccurrences] =
    useState<OperationalOccurrence[]>(INITIAL_OCCURRENCES);
  const [selectedId, setSelectedId] = useState<string>(
    INITIAL_OCCURRENCES[0].operatorControlNumber,
  );
  const [activeRole, setActiveRole] =
    useState<StakeholderRole>("OPERATOR_CAMO");
  const [activeNav, setActiveNav] = useState<NavSection>("INCIDENTS");
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("OVERVIEW");
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [safetyNotes, setSafetyNotes] = useState(
    "Flight control surface lock during takeoff phase. Reportable under Reg (EU) 376/2014.",
  );
  const [camoNotes, setCamoNotes] = useState(
    "Actuator 6085CM torque limiter found tripped during flap/slat retraction. Requesting OEM engineering disposition and root-cause analysis.",
  );

  const [classificationForm, setClassificationForm] =
    useState<OEMClassification>({
      referenceNumber: "TR-2026-ATA27-771",
      occIssue: "ATA 27 Slat Torque Limiter Trip",
      etopsFlag: false,
      occClassification: "Major Airworthiness Significant",
      screeningDate: "2026-04-23",
      screeningComment:
        "Matches emerging fleet pattern on Actuator 6085CM. Escalated to ATA 27 Design Office.",
      garaTargetClosureDate: "2026-06-15",
      occStatus: "Under Engineering Investigation",
      lastUpdateDate: "2026-04-23",
      sourceType: "Operator Technical Request",
      occLeaderFocalPoint: "Ing. J. Novák (ATA 27 High-Lift Systems)",
    });

  const [assessmentForm, setAssessmentForm] = useState<TechnicalAssessment>({
    eventFindingDescription:
      "Internal friction spike within Actuator Type B FIN 6085CM triggered station torque limiter.",
    shortTermAction:
      "Perform Slat System BITE & Drive Station Check IAW AMM 27-84-00-210-001.",
    technicalBackground:
      "Downstream station torque limiter tripped as designed, engaging Wing Tip Brake to prevent slat asymmetry.",
    investigationDetails:
      "Teardown of returned units confirmed lubricant degradation in Actuator 6085CM manufacturing batch #22B.",
    inServiceExperience:
      "2 confirmed events across 26,000+ fleet flight hours.",
    airworthinessImpact:
      "Within SFHA S-02.01.01.B envelope (MAJ ≤ 10⁻⁵). Protection barriers functioned properly.",
    correctiveAction:
      "Replace Actuator Type B FIN 6085CM IAW AMM 27-84-49-000-001A. Apply Service Bulletin SB-27-1098.",
    conclusion: "Root cause isolated to actuator batch; fleet advisory issued.",
    roLeaderSignature: "Ing. J. Novák, Lead Design Engineer",
  });

  // New Occurrence Modal
  const [showNewModal, setShowNewModal] = useState(false);
  const [newHeadline, setNewHeadline] = useState("");
  const [newComponent, setNewComponent] = useState(
    "Actuator Type B FIN 6085CM",
  );
  const [newFlightPhase, setNewFlightPhase] = useState("Takeoff");
  const [newDiscrepancy, setNewDiscrepancy] = useState("");

  const currentPersona =
    PERSONAS.find((p) => p.role === activeRole) || PERSONAS[0];
  const selectedOcc =
    occurrences.find((o) => o.operatorControlNumber === selectedId) ||
    occurrences[0];
  const baseline =
    SAFETY_BASELINES.find((b) => b.id === selectedOcc.baselineRefId) ||
    SAFETY_BASELINES[0];

  const isExternalPartner = activeRole === "EXTERNAL_OPERATOR";

  const nowStr = () =>
    new Date().toISOString().replace("T", " ").substring(0, 16);

  const updateOccurrence = (
    ocn: string,
    updater: (prev: OperationalOccurrence) => OperationalOccurrence,
  ) => {
    setOccurrences((prev) =>
      prev.map((item) =>
        item.operatorControlNumber === ocn ? updater(item) : item,
      ),
    );
  };

  // --- BUSINESS WORKFLOW ACTIONS ---

  const handleSafetyReportDecision = (isReportable: boolean) => {
    updateOccurrence(selectedOcc.operatorControlNumber, (occ) => ({
      ...occ,
      regulatoryState: isReportable ? "SUBMITTED_TO_CAA" : "NOT_REPORTABLE",
      authorityReport: {
        reportID: `MOR-${Math.floor(1000 + Math.random() * 9000)}`,
        eccairsReference: isReportable
          ? `ECCAIRS-CZ-2026-${Math.floor(1000 + Math.random() * 9000)}`
          : "Internal SMS Only",
        isReportable,
        submissionDate: nowStr(),
        safetyEvaluationNotes: safetyNotes,
      },
      auditTrail: [
        ...occ.auditTrail,
        {
          timestamp: nowStr(),
          actorRole: "OPERATOR_SAFETY",
          organizationName: "Alpha Air SMS",
          action: isReportable
            ? "Submitted Mandatory Occurrence Report to Czech CAA via ECCAIRS."
            : "Closed regulatory evaluation as internal SMS occurrence.",
          requirementRef: "ECCAIRS-FILING",
        },
      ],
    }));
  };

  const handleCamoSubmitToOem = () => {
    const reqId = `TR-${Math.floor(10000 + Math.random() * 90000)}`;
    updateOccurrence(selectedOcc.operatorControlNumber, (occ) => ({
      ...occ,
      oemState: "SUBMITTED_TO_OEM_CS",
      eventState: "Awaiting OEM Receipt",
      technicalRequest: {
        requestID: reqId,
        submissionDate: nowStr(),
        currentStatus: "SUBMITTED_TO_OEM_CS",
        originatingEntity: "Alpha Air CAMO",
        camoNotes,
      },
      auditTrail: [
        ...occ.auditTrail,
        {
          timestamp: nowStr(),
          actorRole: "OPERATOR_CAMO",
          organizationName: "Alpha Air CAMO",
          action: `Opened Technical Request ${reqId} with OEM Customer Support.`,
          requirementRef: "OEM-TECH-REQ",
        },
      ],
    }));
  };

  const handleOemAcknowledge = () => {
    updateOccurrence(selectedOcc.operatorControlNumber, (occ) => {
      if (!occ.technicalRequest) return occ;
      return {
        ...occ,
        oemState: "ACKNOWLEDGED_BY_OEM",
        eventState: "In OEM Screening",
        technicalRequest: {
          ...occ.technicalRequest,
          ackReceiptTimestamp: nowStr(),
          currentStatus: "ACKNOWLEDGED_BY_OEM",
        },
        auditTrail: [
          ...occ.auditTrail,
          {
            timestamp: nowStr(),
            actorRole: "OEM_CS",
            organizationName: "OEM Customer Support",
            action: `Acknowledged Technical Request ${occ.technicalRequest.requestID}.`,
            requirementRef: "CS-ACK",
          },
        ],
      };
    });
  };

  const handleOemScreenAndAssign = () => {
    updateOccurrence(selectedOcc.operatorControlNumber, (occ) => {
      if (!occ.technicalRequest) return occ;
      return {
        ...occ,
        oemState: "SCREENED_AND_ASSIGNED",
        eventState: "OEM Engineering Investigation",
        technicalRequest: {
          ...occ.technicalRequest,
          currentStatus: "SCREENED_AND_ASSIGNED",
          classification: classificationForm,
        },
        auditTrail: [
          ...occ.auditTrail,
          {
            timestamp: nowStr(),
            actorRole: "OEM_CS",
            organizationName: "OEM Customer Support",
            action: `Classified as "${classificationForm.occClassification}" and assigned to ${classificationForm.occLeaderFocalPoint}.`,
            requirementRef: "OEM-SCREENING",
          },
        ],
      };
    });
  };

  const handleOemDoAssessment = () => {
    updateOccurrence(selectedOcc.operatorControlNumber, (occ) => {
      if (!occ.technicalRequest) return occ;
      return {
        ...occ,
        oemState: "ASSESSED_BY_DO",
        eventState: "Engineering Disposition Ready",
        technicalRequest: {
          ...occ.technicalRequest,
          currentStatus: "ASSESSED_BY_DO",
          assessment: assessmentForm,
        },
        auditTrail: [
          ...occ.auditTrail,
          {
            timestamp: nowStr(),
            actorRole: "OEM_DO",
            organizationName: "OEM Design Organisation",
            action:
              "Published engineering root-cause analysis and corrective action.",
            requirementRef: "DO-DISPOSITION",
          },
        ],
      };
    });
  };

  const handleOemCsSendResponse = () => {
    updateOccurrence(selectedOcc.operatorControlNumber, (occ) => {
      if (!occ.technicalRequest) return occ;
      return {
        ...occ,
        oemState: "RESPONSE_SENT_TO_CAMO",
        eventState: "Corrective Action Issued",
        technicalRequest: {
          ...occ.technicalRequest,
          currentStatus: "RESPONSE_SENT_TO_CAMO",
        },
        auditTrail: [
          ...occ.auditTrail,
          {
            timestamp: nowStr(),
            actorRole: "OEM_CS",
            organizationName: "OEM Customer Support",
            action: `Transmitted official OEM Technical Response to Operator CAMO.`,
            requirementRef: "CS-RESPONSE",
          },
        ],
      };
    });
  };

  const handleOperatorApplyFix = () => {
    updateOccurrence(selectedOcc.operatorControlNumber, (occ) => ({
      ...occ,
      oemState: "CLOSED_APPLIED",
      eventState: "Resolved & Closed",
      appliedCorrectiveAction:
        occ.technicalRequest?.assessment?.correctiveAction ||
        "Actuator 6085CM replaced and operational check passed IAW AMM.",
      auditTrail: [
        ...occ.auditTrail,
        {
          timestamp: nowStr(),
          actorRole: activeRole,
          organizationName: "Alpha Air Maintenance / Ops",
          action:
            "Executed maintenance disposition on aircraft and closed case.",
          requirementRef: "MAINT-CLOSURE",
        },
      ],
    }));
  };

  const handleCreateOccurrence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHeadline.trim()) return;
    const newOcn = `ANCF202606${Math.floor(10000 + Math.random() * 90000)}`;
    const created: OperationalOccurrence = {
      operatorControlNumber: newOcn,
      headline: newHeadline,
      eventDate: new Date().toISOString().substring(0, 10),
      eventState: "New Occurrence",
      eventArea: "PRG / LKPR",
      flightPhase: newFlightPhase,
      component: newComponent,
      discrepancy:
        newDiscrepancy || "Crew reported system fault during normal operation.",
      failureMode: "Under Investigation",
      detectionMethod: "ECAM Alert / Flight Deck Indication",
      functionalEffect: "System redundancy degraded",
      safetyEffect: "Safety margin assessment pending",
      aircraft: {
        msn: "MSN-1042",
        program: "Single-Aisle Programme",
        acModel: "A320-214",
        operatorName: "Alpha Air",
        flightCycles: 14315,
        flightHours: 26472.0,
      },
      regulatoryState: "PENDING_SAFETY_REVIEW",
      oemState: "PENDING_CAMO_REVIEW",
      baselineRefId: "SFHA-27-SLAT-01",
      auditTrail: [
        {
          timestamp: nowStr(),
          actorRole: "OPERATOR_OPS",
          organizationName: "Alpha Air Flight Ops",
          action:
            "Logged operational occurrence from flight deck / maintenance logbook.",
          requirementRef: "INITIAL-LOG",
        },
      ],
    };
    setOccurrences([created, ...occurrences]);
    setSelectedId(newOcn);
    setShowNewModal(false);
    setNewHeadline("");
    setNewDiscrepancy("");
  };

  const filteredOccurrences = occurrences.filter(
    (o) =>
      o.operatorControlNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      o.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.component.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="app-shell">
      {/* LEFT ENTERPRISE SIDEBAR */}
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

      {/* MAIN PORTAL AREA */}
      <div className="portal-main">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="topbar-left">
            <input
              type="text"
              className="search-input"
              placeholder="Search occurrences by ID, ATA chapter, component (e.g. 6085CM)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="topbar-right">
            <button
              className="btn-create"
              onClick={() => setShowNewModal(true)}
            >
              + Report Occurrence
            </button>

            <div className="persona-selector">
              <div
                className="persona-indicator"
                style={{ backgroundColor: currentPersona.themeColor }}
              />
              <div className="persona-details">
                <span className="persona-label">
                  Logged in Organization / Role:
                </span>
                <select
                  value={activeRole}
                  onChange={(e) =>
                    setActiveRole(e.target.value as StakeholderRole)
                  }
                  className="persona-dropdown"
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

        {/* VIEW 1: FLEET DASHBOARD */}
        {activeNav === "DASHBOARD" && (
          <div className="page-content">
            <div className="page-header">
              <h2>Fleet Safety &amp; Airworthiness Intelligence</h2>
              <p>
                Real-time federated monitoring across A320-214 operators, OEM
                design offices, and Czech CAA
              </p>
            </div>

            <div className="kpi-grid">
              <div className="kpi-card">
                <span className="kpi-label">Active Fleet Occurrences</span>
                <div className="kpi-value">{occurrences.length}</div>
                <span className="kpi-trend">
                  ATA 27 Slat System Cluster Detected
                </span>
              </div>
              <div className="kpi-card">
                <span className="kpi-label">Open OEM TechRequests</span>
                <div className="kpi-value">
                  {
                    occurrences.filter((o) => o.oemState !== "CLOSED_APPLIED")
                      .length
                  }
                </div>
                <span className="kpi-trend positive">
                  Avg OEM Ack Time: 17 mins
                </span>
              </div>
              <div className="kpi-card">
                <span className="kpi-label">ECCAIRS Mandatory Filings</span>
                <div className="kpi-value">
                  {
                    occurrences.filter(
                      (o) => o.regulatoryState === "SUBMITTED_TO_CAA",
                    ).length
                  }
                </div>
                <span className="kpi-trend">Synced with Czech CAA</span>
              </div>
              <div className="kpi-card">
                <span className="kpi-label">
                  SFHA Design Baseline Alignment
                </span>
                <div className="kpi-value">100%</div>
                <span className="kpi-trend positive">
                  Within S-02.01.01.B (MAJ ≤ 10⁻⁵)
                </span>
              </div>
            </div>

            <div className="card mt-20">
              <div className="card-header-row">
                <h3>Recent Fleet Occurrences &amp; Collaborative Status</h3>
                <button
                  className="btn-link"
                  onClick={() => setActiveNav("INCIDENTS")}
                >
                  Open Investigation Workspace →
                </button>
              </div>
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Control ID</th>
                    <th>Event Date</th>
                    <th>Operator / Aircraft</th>
                    <th>Headline &amp; Component</th>
                    <th>Flight Phase</th>
                    <th>OEM Support Status</th>
                    <th>CAA / ECCAIRS</th>
                  </tr>
                </thead>
                <tbody>
                  {occurrences.map((occ) => (
                    <tr
                      key={occ.operatorControlNumber}
                      onClick={() => {
                        setSelectedId(occ.operatorControlNumber);
                        setActiveNav("INCIDENTS");
                      }}
                      className="clickable-row"
                    >
                      <td className="font-mono">{occ.operatorControlNumber}</td>
                      <td>{occ.eventDate}</td>
                      <td>
                        {isExternalPartner ? (
                          <span className="badge-masked">
                            Anonymized Operator
                          </span>
                        ) : (
                          `${occ.aircraft.operatorName} (${occ.aircraft.msn})`
                        )}
                      </td>
                      <td>
                        <strong>{occ.headline}</strong>
                        <div className="sub-text">{occ.component}</div>
                      </td>
                      <td>{occ.flightPhase}</td>
                      <td>
                        <span className="status-chip oem">
                          {occ.eventState}
                        </span>
                      </td>
                      <td>
                        <span className="status-chip reg">
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
        )}

        {/* VIEW 2: OCCURRENCE INVESTIGATION WORKSPACE */}
        {activeNav === "INCIDENTS" && (
          <div className="workspace-split">
            {/* INCIDENT LIST COLUMN */}
            <div className="incident-list-col">
              <div className="list-col-header">
                <h3>Case Queue ({filteredOccurrences.length})</h3>
              </div>
              <div className="incident-cards">
                {filteredOccurrences.map((occ) => (
                  <div
                    key={occ.operatorControlNumber}
                    className={`incident-item ${
                      occ.operatorControlNumber ===
                      selectedOcc.operatorControlNumber
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setSelectedId(occ.operatorControlNumber)}
                  >
                    <div className="incident-item-top">
                      <span className="incident-id">
                        {occ.operatorControlNumber}
                      </span>
                      <span className="incident-date">{occ.eventDate}</span>
                    </div>
                    <div className="incident-title">{occ.headline}</div>
                    <div className="incident-sub">
                      {isExternalPartner
                        ? "Partner A320-214"
                        : `${occ.aircraft.operatorName} • ${occ.aircraft.msn}`}
                    </div>
                    <div className="incident-badges">
                      <span className="mini-badge">{occ.eventState}</span>
                      {occ.regulatoryState === "SUBMITTED_TO_CAA" && (
                        <span className="mini-badge caa">ECCAIRS Filed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INCIDENT DETAIL WORKBENCH */}
            <div className="incident-detail-col">
              {/* CASE HEADER */}
              <div className="case-banner">
                <div className="case-banner-top">
                  <div>
                    <div className="breadcrumb">
                      {selectedOcc.aircraft.program} /{" "}
                      {selectedOcc.aircraft.acModel} /{" "}
                      {selectedOcc.operatorControlNumber}
                    </div>
                    <h2>{selectedOcc.headline}</h2>
                  </div>
                  <div className="case-status-box">
                    <span className="state-pill">{selectedOcc.eventState}</span>
                  </div>
                </div>

                {/* PROGRESS STEPPER */}
                <div className="workflow-stepper">
                  <div className="step completed">
                    <div className="step-circle">✓</div>
                    <span>Ops Logged</span>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step ${
                      selectedOcc.oemState !== "PENDING_CAMO_REVIEW"
                        ? "completed"
                        : "active"
                    }`}
                  >
                    <div className="step-circle">2</div>
                    <span>CAMO TechRequest</span>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step ${
                      [
                        "ACKNOWLEDGED_BY_OEM",
                        "SCREENED_AND_ASSIGNED",
                        "ASSESSED_BY_DO",
                        "RESPONSE_SENT_TO_CAMO",
                        "CLOSED_APPLIED",
                      ].includes(selectedOcc.oemState)
                        ? "completed"
                        : selectedOcc.oemState === "SUBMITTED_TO_OEM_CS"
                          ? "active"
                          : ""
                    }`}
                  >
                    <div className="step-circle">3</div>
                    <span>OEM Ack &amp; Screening</span>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step ${
                      [
                        "ASSESSED_BY_DO",
                        "RESPONSE_SENT_TO_CAMO",
                        "CLOSED_APPLIED",
                      ].includes(selectedOcc.oemState)
                        ? "completed"
                        : selectedOcc.oemState === "SCREENED_AND_ASSIGNED"
                          ? "active"
                          : ""
                    }`}
                  >
                    <div className="step-circle">4</div>
                    <span>Design Office Disposition</span>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step ${
                      selectedOcc.oemState === "CLOSED_APPLIED"
                        ? "completed"
                        : selectedOcc.oemState === "RESPONSE_SENT_TO_CAMO"
                          ? "active"
                          : ""
                    }`}
                  >
                    <div className="step-circle">5</div>
                    <span>Fleet Resolution</span>
                  </div>
                </div>

                {/* WORKSPACE TABS */}
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
              </div>

              {/* CONTEXTUAL ACTION BAR BASED ON LOGGED-IN ROLE */}
              <div className="contextual-action-panel">
                <div className="action-panel-header">
                  <strong>
                    Active Workspace: {currentPersona.orgName} —{" "}
                    {currentPersona.department}
                  </strong>
                  <span>{currentPersona.userTitle}</span>
                </div>

                {/* CAMO ACTIONS */}
                {activeRole === "OPERATOR_CAMO" &&
                  selectedOcc.oemState === "PENDING_CAMO_REVIEW" && (
                    <div className="action-form">
                      <label>Escalate to Airframe OEM Customer Support:</label>
                      <textarea
                        rows={2}
                        value={camoNotes}
                        onChange={(e) => setCamoNotes(e.target.value)}
                      />
                      <button
                        className="btn-action primary"
                        onClick={handleCamoSubmitToOem}
                      >
                        Transmit Technical Request to OEM
                      </button>
                    </div>
                  )}

                {(activeRole === "OPERATOR_CAMO" ||
                  activeRole === "OPERATOR_OPS") &&
                  selectedOcc.oemState === "RESPONSE_SENT_TO_CAMO" && (
                    <div className="action-form highlight-box">
                      <div>
                        <strong>OEM Engineering Disposition Received:</strong>
                        <p>
                          {
                            selectedOcc.technicalRequest?.assessment
                              ?.correctiveAction
                          }
                        </p>
                      </div>
                      <button
                        className="btn-action success"
                        onClick={handleOperatorApplyFix}
                      >
                        Execute Maintenance Action &amp; Close Case
                      </button>
                    </div>
                  )}

                {/* SAFETY DEPT ACTIONS */}
                {activeRole === "OPERATOR_SAFETY" &&
                  selectedOcc.regulatoryState === "PENDING_SAFETY_REVIEW" && (
                    <div className="action-form">
                      <label>
                        Safety Management System (SMS) Reportability Evaluation:
                      </label>
                      <textarea
                        rows={2}
                        value={safetyNotes}
                        onChange={(e) => setSafetyNotes(e.target.value)}
                      />
                      <div className="button-group">
                        <button
                          className="btn-action danger"
                          onClick={() => handleSafetyReportDecision(true)}
                        >
                          Submit Mandatory Report to Czech CAA (ECCAIRS)
                        </button>
                        <button
                          className="btn-action secondary"
                          onClick={() => handleSafetyReportDecision(false)}
                        >
                          Log as Internal SMS Event Only
                        </button>
                      </div>
                    </div>
                  )}

                {/* OEM CUSTOMER SUPPORT ACTIONS */}
                {activeRole === "OEM_CS" &&
                  selectedOcc.oemState === "SUBMITTED_TO_OEM_CS" && (
                    <div className="action-form highlight-box">
                      <div>
                        <strong>
                          Incoming TechRequest (
                          {selectedOcc.technicalRequest?.requestID}):
                        </strong>
                        <p>"{selectedOcc.technicalRequest?.camoNotes}"</p>
                      </div>
                      <button
                        className="btn-action success"
                        onClick={handleOemAcknowledge}
                      >
                        Acknowledge Receipt to Operator CAMO
                      </button>
                    </div>
                  )}

                {activeRole === "OEM_CS" &&
                  selectedOcc.oemState === "ACKNOWLEDGED_BY_OEM" && (
                    <div className="action-form">
                      <div className="form-row-3">
                        <div>
                          <label>Classification Severity:</label>
                          <input
                            value={classificationForm.occClassification}
                            onChange={(e) =>
                              setClassificationForm({
                                ...classificationForm,
                                occClassification: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label>Assign Design Office Lead:</label>
                          <input
                            value={classificationForm.occLeaderFocalPoint}
                            onChange={(e) =>
                              setClassificationForm({
                                ...classificationForm,
                                occLeaderFocalPoint: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label>Target Closure Date:</label>
                          <input
                            type="date"
                            value={classificationForm.garaTargetClosureDate}
                            onChange={(e) =>
                              setClassificationForm({
                                ...classificationForm,
                                garaTargetClosureDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn-action primary"
                        onClick={handleOemScreenAndAssign}
                      >
                        Complete Screening &amp; Route to Design Office
                      </button>
                    </div>
                  )}

                {activeRole === "OEM_CS" &&
                  selectedOcc.oemState === "ASSESSED_BY_DO" && (
                    <div className="action-form highlight-box">
                      <div>
                        <strong>
                          Design Office Disposition Ready for Release:
                        </strong>
                        <p>
                          {
                            selectedOcc.technicalRequest?.assessment
                              ?.correctiveAction
                          }
                        </p>
                      </div>
                      <button
                        className="btn-action primary"
                        onClick={handleOemCsSendResponse}
                      >
                        Release Official Technical Response to Operator
                      </button>
                    </div>
                  )}

                {/* OEM DESIGN OFFICE ACTIONS */}
                {activeRole === "OEM_DO" &&
                  selectedOcc.oemState === "SCREENED_AND_ASSIGNED" && (
                    <div className="action-form">
                      <div className="form-row-2">
                        <div>
                          <label>Root-Cause Investigation Findings:</label>
                          <textarea
                            rows={2}
                            value={assessmentForm.investigationDetails}
                            onChange={(e) =>
                              setAssessmentForm({
                                ...assessmentForm,
                                investigationDetails: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label>Mandatory Corrective Action / SB:</label>
                          <textarea
                            rows={2}
                            value={assessmentForm.correctiveAction}
                            onChange={(e) =>
                              setAssessmentForm({
                                ...assessmentForm,
                                correctiveAction: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <button
                        className="btn-action success"
                        onClick={handleOemDoAssessment}
                      >
                        Sign &amp; Publish Engineering Disposition
                      </button>
                    </div>
                  )}
              </div>

              {/* TAB CONTENT 1: OVERVIEW */}
              {activeTab === "OVERVIEW" && (
                <div className="tab-body">
                  <div className="detail-grid">
                    <div className="card">
                      <h3>Aircraft &amp; Operational Context</h3>
                      <div className="kv-list">
                        <div className="kv-row">
                          <span>Operator</span>
                          <strong>
                            {isExternalPartner ? (
                              <span className="badge-masked">
                                Protected Partner Identity
                              </span>
                            ) : (
                              selectedOcc.aircraft.operatorName
                            )}
                          </strong>
                        </div>
                        <div className="kv-row">
                          <span>Aircraft MSN / Model</span>
                          <strong>
                            {isExternalPartner
                              ? `Anonymized (${selectedOcc.aircraft.acModel})`
                              : `${selectedOcc.aircraft.msn} (${selectedOcc.aircraft.acModel})`}
                          </strong>
                        </div>
                        <div className="kv-row">
                          <span>Airframe Hours / Cycles</span>
                          <strong>
                            {isExternalPartner
                              ? "Masked"
                              : `${selectedOcc.aircraft.flightHours} FH / ${selectedOcc.aircraft.flightCycles} FC`}
                          </strong>
                        </div>
                        <div className="kv-row">
                          <span>Flight Phase &amp; Location</span>
                          <strong>
                            {selectedOcc.flightPhase} • {selectedOcc.eventArea}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <h3>System &amp; Failure Signature</h3>
                      <div className="kv-list">
                        <div className="kv-row">
                          <span>Affected Components</span>
                          <strong>{selectedOcc.component}</strong>
                        </div>
                        <div className="kv-row">
                          <span>Observed Failure Mode</span>
                          <strong>{selectedOcc.failureMode}</strong>
                        </div>
                        <div className="kv-row">
                          <span>Flight Deck Detection</span>
                          <strong className="ecam-warning">
                            {selectedOcc.detectionMethod}
                          </strong>
                        </div>
                        <div className="kv-row">
                          <span>Functional Effect</span>
                          <strong>{selectedOcc.functionalEffect}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-16">
                    <h3>Maintenance &amp; Operational Discrepancy Log</h3>
                    <pre className="logbook-box">{selectedOcc.discrepancy}</pre>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: OEM SUPPORT */}
              {activeTab === "OEM_SUPPORT" && (
                <div className="tab-body">
                  {selectedOcc.technicalRequest ? (
                    <div className="detail-grid">
                      <div className="card">
                        <h3>TechRequest &amp; Screening Summary</h3>
                        <div className="kv-list">
                          <div className="kv-row">
                            <span>Request Reference</span>
                            <strong>
                              {selectedOcc.technicalRequest.requestID}
                            </strong>
                          </div>
                          <div className="kv-row">
                            <span>Submitted By</span>
                            <strong>
                              {isExternalPartner
                                ? "Partner CAMO"
                                : selectedOcc.technicalRequest
                                    .originatingEntity}{" "}
                              ({selectedOcc.technicalRequest.submissionDate})
                            </strong>
                          </div>
                          <div className="kv-row">
                            <span>OEM Receipt Acknowledgement</span>
                            <strong className="text-success">
                              {selectedOcc.technicalRequest
                                .ackReceiptTimestamp ||
                                "Pending Acknowledgement"}
                            </strong>
                          </div>
                          {selectedOcc.technicalRequest.classification && (
                            <>
                              <div className="kv-row">
                                <span>Classification Severity</span>
                                <strong>
                                  {
                                    selectedOcc.technicalRequest.classification
                                      .occClassification
                                  }
                                </strong>
                              </div>
                              <div className="kv-row">
                                <span>Assigned Design Lead</span>
                                <strong>
                                  {
                                    selectedOcc.technicalRequest.classification
                                      .occLeaderFocalPoint
                                  }
                                </strong>
                              </div>
                              <div className="kv-row">
                                <span>Target Closure Date</span>
                                <strong>
                                  {
                                    selectedOcc.technicalRequest.classification
                                      .garaTargetClosureDate
                                  }
                                </strong>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="card">
                        <h3>OEM Design Office Engineering Disposition</h3>
                        {selectedOcc.technicalRequest.assessment ? (
                          <div className="kv-list">
                            <div className="kv-row">
                              <span>Investigation Findings</span>
                              <strong>
                                {
                                  selectedOcc.technicalRequest.assessment
                                    .investigationDetails
                                }
                              </strong>
                            </div>
                            <div className="kv-row">
                              <span>Short-Term Operational Action</span>
                              <strong>
                                {
                                  selectedOcc.technicalRequest.assessment
                                    .shortTermAction
                                }
                              </strong>
                            </div>
                            <div className="kv-row">
                              <span>Airworthiness Impact</span>
                              <strong>
                                {
                                  selectedOcc.technicalRequest.assessment
                                    .airworthinessImpact
                                }
                              </strong>
                            </div>
                            <div className="kv-row">
                              <span>Recommended Corrective Action</span>
                              <strong className="text-success">
                                {
                                  selectedOcc.technicalRequest.assessment
                                    .correctiveAction
                                }
                              </strong>
                            </div>
                            <div className="kv-row">
                              <span>Sign-Off</span>
                              <strong>
                                {
                                  selectedOcc.technicalRequest.assessment
                                    .roLeaderSignature
                                }
                              </strong>
                            </div>
                          </div>
                        ) : (
                          <p className="empty-state-text">
                            Engineering investigation is currently in progress.
                            Switch to OEM Customer Support or Design Office
                            persona to complete disposition.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <p className="empty-state-text">
                        No OEM Technical Request has been initiated for this
                        occurrence yet. Switch to the CAMO role to escalate to
                        the manufacturer.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT 3: SFHA BASELINE */}
              {activeTab === "SFHA_BASELINE" && (
                <div className="tab-body">
                  <div className="card">
                    <div className="card-header-row">
                      <h3>
                        System Functional Hazard Assessment (SFHA) Alignment
                      </h3>
                      <span className="status-chip valid">
                        ✓ Design Safety Assumptions Validated
                      </span>
                    </div>
                    <p className="sub-text mb-16">
                      Automated cross-check comparing in-service occurrence
                      signature against certification safety baseline (
                      {baseline.id}).
                    </p>

                    <div className="comparison-columns">
                      <div className="comp-box">
                        <h4>In-Service Occurrence Signature</h4>
                        <div className="kv-list">
                          <div className="kv-row">
                            <span>Affected Hardware</span>
                            <strong>{selectedOcc.component}</strong>
                          </div>
                          <div className="kv-row">
                            <span>Failure Mode</span>
                            <strong>{selectedOcc.failureMode}</strong>
                          </div>
                          <div className="kv-row">
                            <span>Crew Annunciation</span>
                            <strong>{selectedOcc.detectionMethod}</strong>
                          </div>
                          <div className="kv-row">
                            <span>System Response</span>
                            <strong>{selectedOcc.functionalEffect}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="comp-box baseline">
                        <h4>
                          Certification SFHA Baseline ({baseline.systemName})
                        </h4>
                        <div className="kv-list">
                          <div className="kv-row">
                            <span>Failure Condition Ref</span>
                            <strong>{baseline.sfhaFailureCondition}</strong>
                          </div>
                          <div className="kv-row">
                            <span>Hazard Severity Classification</span>
                            <strong>{baseline.sfhaSeverity}</strong>
                          </div>
                          <div className="kv-row">
                            <span>Expected Safety Effect</span>
                            <strong>{baseline.sfhaSafetyEffect}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 4: COMPLIANCE & AUDIT LOG */}
              {activeTab === "COMPLIANCE" && (
                <div className="tab-body">
                  <div className="card mb-16">
                    <h3>Regulation (EU) 376/2014 &amp; Czech CAA Status</h3>
                    {selectedOcc.authorityReport ? (
                      <div className="kv-list">
                        <div className="kv-row">
                          <span>ECCAIRS Filing ID</span>
                          <strong>
                            {selectedOcc.authorityReport.eccairsReference}
                          </strong>
                        </div>
                        <div className="kv-row">
                          <span>Submission Timestamp</span>
                          <strong>
                            {selectedOcc.authorityReport.submissionDate}
                          </strong>
                        </div>
                        <div className="kv-row">
                          <span>Safety Manager Assessment</span>
                          <strong>
                            {selectedOcc.authorityReport.safetyEvaluationNotes}
                          </strong>
                        </div>
                      </div>
                    ) : (
                      <p className="empty-state-text">
                        Pending Safety Management System (SMS) reportability
                        decision.
                      </p>
                    )}
                  </div>

                  <div className="card">
                    <h3>Cross-Organization Activity &amp; Custody Timeline</h3>
                    <div className="timeline">
                      {selectedOcc.auditTrail.map((item, idx) => (
                        <div key={idx} className="timeline-row">
                          <div className="timeline-time">{item.timestamp}</div>
                          <div className="timeline-dot" />
                          <div className="timeline-content">
                            <strong>
                              {isExternalPartner &&
                              item.organizationName.includes("Alpha Air")
                                ? "Partner Airline"
                                : item.organizationName}
                            </strong>
                            <p>{item.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: CROSS-FLEET HAZARD RADAR */}
        {activeNav === "FEDERATED_RADAR" && (
          <div className="page-content">
            <div className="page-header">
              <h2>Federated Cross-Fleet Hazard Radar</h2>
              <p>
                Shared anomaly detection across all participating A320-214
                operators with zero-trust commercial anonymization
              </p>
            </div>

            <div className="card">
              <h3>Active Fleet-Wide Technical Clusters</h3>
              <p className="sub-text mb-16">
                Aggregated automatically from federated operator nodes and OEM
                engineering dispositions.
              </p>
              <div className="cluster-alert">
                <div className="cluster-header">
                  <strong>
                    ⚠️ Emerging Cluster: ATA 27 Slat System — Actuator Type B
                    FIN 6085CM Torque Limiter Trips
                  </strong>
                  <span className="status-chip oem">
                    2 Fleet Occurrences Matched
                  </span>
                </div>
                <p>
                  Multiple occurrences of <code>F/CTL SLATS LOCKED</code> /{" "}
                  <code>SLATS FAULT</code> linked to station torque limiter
                  tripping on Actuator 6085CM. SFHA S-02.01.01.B barrier (Wing
                  Tip Brake) functioned as designed, but proactive inspection of
                  Actuator 6085CM batch #22B is recommended across all
                  operators.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: REGULATORY & ECCAIRS */}
        {activeNav === "ECCAIRS" && (
          <div className="page-content">
            <div className="page-header">
              <h2>Czech CAA — Mandatory Occurrence Reporting (ECCAIRS)</h2>
              <p>
                Regulatory oversight feed compliant with Regulation (EU)
                376/2014
              </p>
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
                  {occurrences
                    .filter((o) => o.regulatoryState === "SUBMITTED_TO_CAA")
                    .map((occ) => (
                      <tr key={occ.operatorControlNumber}>
                        <td className="font-mono">
                          <strong>
                            {occ.authorityReport?.eccairsReference}
                          </strong>
                        </td>
                        <td className="font-mono">
                          {occ.operatorControlNumber}
                        </td>
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
        )}
      </div>

      {/* NEW OCCURRENCE MODAL */}
      {showNewModal && (
        <div className="modal-overlay" onClick={() => setShowNewModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Report Operational Occurrence</h3>
            <form onSubmit={handleCreateOccurrence} className="modal-form">
              <label>Occurrence Headline</label>
              <input
                required
                placeholder="e.g., F/CTL SLATS FAULT during approach extension"
                value={newHeadline}
                onChange={(e) => setNewHeadline(e.target.value)}
              />
              <div className="form-row-2">
                <div>
                  <label>Primary Affected Component (FIN / Part)</label>
                  <input
                    value={newComponent}
                    onChange={(e) => setNewComponent(e.target.value)}
                  />
                </div>
                <div>
                  <label>Flight Phase</label>
                  <select
                    value={newFlightPhase}
                    onChange={(e) => setNewFlightPhase(e.target.value)}
                  >
                    <option>Takeoff</option>
                    <option>Climb</option>
                    <option>Cruise</option>
                    <option>Approach</option>
                    <option>Landing</option>
                  </select>
                </div>
              </div>
              <label>Technical Discrepancy &amp; AMM References</label>
              <textarea
                rows={3}
                placeholder="Enter flight deck effects and maintenance troubleshooting steps..."
                value={newDiscrepancy}
                onChange={(e) => setNewDiscrepancy(e.target.value)}
              />
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-action secondary"
                  onClick={() => setShowNewModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-action primary">
                  Submit Occurrence Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
