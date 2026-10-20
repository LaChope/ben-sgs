import React, { useState } from "react";
import type {
  OperationalOccurrence,
  StakeholderRole,
  OEMClassification,
  TechnicalAssessment,
  NavSection,
  WorkspaceTab,
} from "../types";
import { INITIAL_OCCURRENCES, SAFETY_BASELINES } from "../mockData";
import { PERSONAS } from "../constants/personas";
import { OccurrenceContext } from "./OccurrenceContext";
import type { NewOccurrenceFormData } from "./occurrenceTypes";

const nowStr = () =>
  new Date().toISOString().replace("T", " ").substring(0, 16);

export function OccurrenceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
  const [showNewModal, setShowNewModal] = useState(false);

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

  const currentPersona =
    PERSONAS.find((p) => p.role === activeRole) || PERSONAS[0];
  const selectedOcc =
    occurrences.find((o) => o.operatorControlNumber === selectedId) ||
    occurrences[0];
  const baseline =
    SAFETY_BASELINES.find((b) => b.id === selectedOcc.baselineRefId) ||
    SAFETY_BASELINES[0];
  const isExternalPartner = activeRole === "EXTERNAL_OPERATOR";

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

  const handleCreateOccurrence = (data: NewOccurrenceFormData) => {
    if (!data.headline.trim()) return;
    const newOcn = `ANCF202606${Math.floor(10000 + Math.random() * 90000)}`;
    const created: OperationalOccurrence = {
      operatorControlNumber: newOcn,
      headline: data.headline,
      eventDate: new Date().toISOString().substring(0, 10),
      eventState: "New Occurrence",
      eventArea: "PRG / LKPR",
      flightPhase: data.flightPhase,
      component: data.component,
      discrepancy:
        data.discrepancy ||
        "Crew reported system fault during normal operation.",
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
    <OccurrenceContext.Provider
      value={{
        occurrences,
        selectedId,
        setSelectedId,
        activeRole,
        setActiveRole,
        activeNav,
        setActiveNav,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        showNewModal,
        setShowNewModal,
        safetyNotes,
        setSafetyNotes,
        camoNotes,
        setCamoNotes,
        classificationForm,
        setClassificationForm,
        assessmentForm,
        setAssessmentForm,
        currentPersona,
        selectedOcc,
        baseline,
        isExternalPartner,
        filteredOccurrences,
        handleSafetyReportDecision,
        handleCamoSubmitToOem,
        handleOemAcknowledge,
        handleOemScreenAndAssign,
        handleOemDoAssessment,
        handleOemCsSendResponse,
        handleOperatorApplyFix,
        handleCreateOccurrence,
      }}
    >
      {children}
    </OccurrenceContext.Provider>
  );
}
