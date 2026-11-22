import type { OperationalOccurrence, SafetyBaselineComparison } from "./types";

export const SAFETY_BASELINES: SafetyBaselineComparison[] = [
  {
    id: "SFHA-27-SLAT-01",
    systemName: "ATA 27 - High Lift / Slat System",
    fhaValue: "High",
    sfhaFailureCondition:
      "S-02.01.01.B – Total loss of Slat movement (Scenario 03 – System jam / torque limiter application: MAJ) | S-01.01.01.D – Total loss of Slat command (In flight: MAJ)",
    sfhaSafetyEffect:
      "A jam of the slat system can be caused by transmission jam, actuator jam, or untimely station torque limiter application. Slats are stopped while moving. If located downstream a station torque limiter, it trips and protects downstream components. PCU increases torque until stall. Non-movement is recognised via ECAM slat position.",
    sfhaInformationElement:
      "Component: Slat system (actuator / transmission / station torque limiter / PCU) | Detection: F/CTL SLATS LOCKED or F/CTL SLATS FAULT alert on ECAM",
    sfhaSeverity:
      "≤ 10⁻⁵ MAJ (Failure conditions that significantly reduce safety margins)",
    fhaVsOccAssumptionMatch: true,
  },
];

export const INITIAL_OCCURRENCES: OperationalOccurrence[] = [
  {
    operatorControlNumber: "ANCF20260422010",
    headline: "F/CTL SLATS LOCKED & Wing Tip Brake Activation at Takeoff",
    eventDate: "2026-04-22",
    ataChapter: "27-84",
    eventState: "In-Service Investigation",
    eventArea: "PRG / LKPR",
    flightPhase: "Takeoff",
    component:
      "Torque Limiter (Actuator 6085CM), Actuator Type B FIN 6085CM, SFCC 22CV, Wing Tip Brake",
    discrepancy:
      "DURING FLAP/SLAT RETRACTION AT TAKEOFF F/CTL SLATS LOCKED WING TIP BRK IAW AMM 27-51-34. SFCC 22CV REPLACED. TORQUE LIMITERS OF ACTUATOR 6085CM FOUND TRIPPED. BY MCC REQUEST NECESSARY TO REPLACE ACTUATOR 6085CM IAW AMM 27-84-49.",
    failureMode: "Torque limiter of actuator 6085CM found tripped",
    detectionMethod: "F/CTL SLATS LOCKED warning on ECAM",
    functionalEffect: "Slats locked; Wing Tip Brake activated",
    safetyEffect:
      "Reduced high-lift redundancy during takeoff retraction; crew aware via ECAM",
    aircraft: {
      msn: "MSN-1042",
      registration: "OK-NEO",
      program: "Single-Aisle Programme",
      acMake: "Airbus",
      acModel: "A320",
      acSeries: "214",
      engineMake: "CFM International",
      engineModel: "CFM56-5B4/P",
      operatorName: "Alpha Air (OP-A)",
      flightCycles: 14280,
      flightHours: 26410.5,
    },
    eccairsTaxonomy: {
      reportingCapacity: "Organization / Operator",
      stateOfOccurrence: "Czech Republic",
      occurrenceClass: "Major Incident",
      occurrenceCategory: "SCF-NP: System/Component Failure (Non-Powerplant)",
      technicalSubcategory: "ATA 27 - High Lift / Slat Drive System",
      ammReference: "AMM 27-51-34 / AMM 27-84-49",
    },
    investigation: {
      methodology: "STPA",
      status: "In Progress",
      controlStructure:
        "SFCC (Controller) → PCU & Transmission Shaft → Station Torque Limiter & Actuator 6085CM (Controlled Process) → Wing Tip Brake (Safety Barrier)",
      unsafeControlAction:
        "UCA-27-01: Slat retraction command applied while actuator 6085CM exhibits excessive internal friction, triggering station torque limiter.",
      lossScenario:
        "Lubricant degradation under cold-soak conditions increases friction torque beyond threshold during takeoff retraction.",
      causalFactors:
        "Actuator 6085CM batch #22B internal grease degradation; SFCC command timing.",
      hazardReference: "SFHA S-02.01.01.B (MAJ ≤ 10⁻⁵)",
      summary:
        "STPA analysis ongoing; initial teardown points to Actuator 6085CM torque limiter trip.",
    },
    regulatoryState: "PENDING_SAFETY_REVIEW",
    oemState: "PENDING_CAMO_REVIEW",
    baselineRefId: "SFHA-27-SLAT-01",
    auditTrail: [
      {
        timestamp: "2026-04-22 08:15",
        actorRole: "OPERATOR_OPS",
        organizationName: "Alpha Air - Flight Ops",
        action:
          "Logged Operational Occurrence & initiated Parallel Split to Safety Dept and CAMO.",
        requirementRef: "R8, R13, R14",
      },
    ],
  },
  {
    operatorControlNumber: "ANCF20260510004",
    headline:
      "Secondary Slat Drive Station Torque Limiter Trip during Approach",
    eventDate: "2026-05-10",
    ataChapter: "27-81",
    eventState: "OEM Screening",
    eventArea: "BRQ / LKTB",
    flightPhase: "Approach",
    component: "Actuator Type B FIN 6085CM, Slat Power Transmission",
    discrepancy:
      "ECAM F/CTL SLATS FAULT DISPLAYED DURING SLAT EXTENSION. INSPECTION REVEALED TORQUE LIMITER TRIP ON ACTUATOR 6085CM.",
    failureMode: "Untimely station torque limiter application",
    detectionMethod: "F/CTL SLATS FAULT alert on ECAM",
    functionalEffect: "Slats stopped while moving; protection tripped",
    safetyEffect:
      "Approach continued with reduced slat extension; higher approach speed applied",
    aircraft: {
      msn: "MSN-1189",
      registration: "OK-SWI",
      program: "Single-Aisle Programme",
      acMake: "Airbus",
      acModel: "A320",
      acSeries: "214",
      engineMake: "CFM International",
      engineModel: "CFM56-5B4/P",
      operatorName: "Alpha Air (OP-A)",
      flightCycles: 9820,
      flightHours: 18100.0,
    },
    eccairsTaxonomy: {
      reportingCapacity: "Organization / Operator",
      stateOfOccurrence: "Czech Republic",
      occurrenceClass: "Significant Incident",
      occurrenceCategory: "SCF-NP: System/Component Failure (Non-Powerplant)",
      technicalSubcategory: "ATA 27 - Slat Power Transmission & Torque Limiter",
      ammReference: "AMM 27-81-00 / AMM 27-84-49",
    },
    investigation: {
      methodology: "STPA",
      status: "In Progress",
      controlStructure:
        "Flight Crew / Flap-Slat Lever → SFCC → Slat PCU → Station Torque Limiter",
      unsafeControlAction:
        "UCA-27-02: Slat extension commanded on approach with degraded torque limiter spring preload.",
      lossScenario:
        "Untimely torque limiter trip arrests slat extension mid-travel, requiring abnormal approach configuration.",
      causalFactors:
        "Recurring Actuator 6085CM friction anomaly; correlated with MSN-1042 event.",
      hazardReference: "SFHA S-02.01.01.B (MAJ ≤ 10⁻⁵)",
      summary:
        "Escalated to OEM under TR-OEM-2026-441; correlated with fleet ATA 27 cluster.",
    },
    regulatoryState: "SUBMITTED_TO_CAA",
    oemState: "ACKNOWLEDGED_BY_OEM",
    authorityReport: {
      reportID: "CAA-REP-2026-089",
      eccairsReference: "ECCAIRS-CZ-2026-9941",
      isReportable: true,
      submissionDate: "2026-05-10 14:20",
      safetyEvaluationNotes:
        "Mandatory occurrence under Reg (EU) 376/2014 due to flight control lock.",
    },
    technicalRequest: {
      requestID: "TR-OEM-2026-441",
      submissionDate: "2026-05-10 13:45",
      ackReceiptTimestamp: "2026-05-10 14:02",
      currentStatus: "ACKNOWLEDGED_BY_OEM",
      originatingEntity: "Alpha Air CAMO",
      camoNotes:
        "Second occurrence on fleet involving Actuator 6085CM torque limiter. Requesting OEM root-cause support.",
    },
    baselineRefId: "SFHA-27-SLAT-01",
    auditTrail: [
      {
        timestamp: "2026-05-10 11:30",
        actorRole: "OPERATOR_OPS",
        organizationName: "Alpha Air - Flight Ops",
        action: "Logged Operational Occurrence & triggered Parallel Split.",
        requirementRef: "R8, R14",
      },
      {
        timestamp: "2026-05-10 13:45",
        actorRole: "OPERATOR_CAMO",
        organizationName: "Alpha Air - CAMO",
        action:
          "Submitted Technical Request TR-OEM-2026-441 to OEM Customer Service.",
        requirementRef: "R1, R3, R10",
      },
      {
        timestamp: "2026-05-10 14:02",
        actorRole: "OEM_CS",
        organizationName: "OEM Customer Service",
        action: "Acknowledged receipt of Technical Request TR-OEM-2026-441.",
        requirementRef: "R2, R5",
      },
      {
        timestamp: "2026-05-10 14:20",
        actorRole: "OPERATOR_SAFETY",
        organizationName: "Alpha Air - Safety Dept",
        action:
          "Evaluated as reportable and transmitted to Czech CAA (ECCAIRS-CZ-2026-9941).",
        requirementRef: "R9, R13",
      },
    ],
  },
  {
    operatorControlNumber: "ANCF20260318002",
    headline:
      "Slat PCU Hydraulic Valve Sticking Resolved via Service Bulletin SB-27-1098",
    eventDate: "2026-03-18",
    ataChapter: "27-82",
    eventState: "Resolved & Closed",
    eventArea: "FRA / EDDF",
    flightPhase: "Climb",
    component: "Slat Power Control Unit (PCU) FIN 6012CM, Actuator 6085CM",
    discrepancy:
      "SLAT RETRACTION DELAY OBSERVED AFTER TAKEOFF FROM EDDF. ECAM F/CTL SLATS SYS 1 FAULT INTERMITTENT. BITE CHECK IDENTIFIED PCU VALVE STICKING & ACTUATOR 6085CM DRAG.",
    failureMode: "PCU hydraulic control valve sticking / elevated actuator drag",
    detectionMethod: "F/CTL SLATS SYS 1 FAULT on ECAM",
    functionalEffect: "Delayed slat retraction; System 2 maintained control",
    safetyEffect: "Minor crew workload increase; full redundancy preserved",
    appliedCorrectiveAction:
      "Replaced Actuator 6085CM and flushed Slat PCU IAW AMM 27-84-49-000-001A. Applied OEM Service Bulletin SB-27-1098; operational BITE test passed.",
    aircraft: {
      msn: "MSN-0975",
      registration: "D-AIZK",
      program: "Single-Aisle Programme",
      acMake: "Airbus",
      acModel: "A320",
      acSeries: "214",
      engineMake: "CFM International",
      engineModel: "CFM56-5B4/P",
      operatorName: "EuroWings Ops (OP-B)",
      flightCycles: 16450,
      flightHours: 31200.0,
    },
    eccairsTaxonomy: {
      reportingCapacity: "Organization / Operator",
      stateOfOccurrence: "Germany",
      occurrenceClass: "Significant Incident",
      occurrenceCategory: "SCF-NP: System/Component Failure (Non-Powerplant)",
      technicalSubcategory: "ATA 27 - Slat Power Control Unit (PCU)",
      ammReference: "AMM 27-84-49-000-001A / SB-27-1098",
    },
    investigation: {
      methodology: "STPA",
      status: "Completed",
      controlStructure:
        "SFCC 1 → Slat PCU Hydraulic Valve → Mechanical Drive Shaft → Slat Actuators",
      unsafeControlAction:
        "UCA-27-03: Retraction command delayed beyond nominal response window due to hydraulic valve stiction.",
      lossScenario:
        "Particulate contamination combined with actuator drag triggered Sys 1 fault monitoring.",
      causalFactors:
        "Batch #22B actuator grease degradation + hydraulic filter nearing interval.",
      hazardReference: "SFHA S-02.01.01.B (MAJ ≤ 10⁻⁵)",
      summary:
        "STPA & OEM teardown completed. Root cause isolated to actuator batch #22B; SB-27-1098 verified effective.",
    },
    regulatoryState: "SUBMITTED_TO_CAA",
    oemState: "CLOSED_APPLIED",
    authorityReport: {
      reportID: "CAA-REP-2026-041",
      eccairsReference: "ECCAIRS-DE-2026-4412",
      isReportable: true,
      submissionDate: "2026-03-19 09:10",
      safetyEvaluationNotes:
        "Reported under Reg (EU) 376/2014; closed following verified OEM SB-27-1098 embodiment.",
    },
    technicalRequest: {
      requestID: "TR-OEM-2026-219",
      submissionDate: "2026-03-18 16:00",
      ackReceiptTimestamp: "2026-03-18 16:14",
      currentStatus: "CLOSED_APPLIED",
      originatingEntity: "EuroWings Ops CAMO",
      camoNotes:
        "Intermittent SLATS SYS 1 FAULT during climb. Requesting OEM engineering disposition.",
      classification: {
        referenceNumber: "TR-2026-ATA27-219",
        occIssue: "ATA 27 Slat PCU / Actuator Drag",
        etopsFlag: false,
        occClassification: "Major Airworthiness Significant",
        screeningDate: "2026-03-19",
        screeningComment: "Assigned to ATA 27 High-Lift Design Office.",
        garaTargetClosureDate: "2026-04-15",
        occStatus: "Closed",
        lastUpdateDate: "2026-03-28",
        sourceType: "Operator Technical Request",
        occLeaderFocalPoint: "Ing. J. Novák (ATA 27 High-Lift Systems)",
      },
      assessment: {
        eventFindingDescription:
          "Elevated friction in Actuator 6085CM batch #22B combined with PCU valve stiction.",
        shortTermAction:
          "Perform Slat System BITE & Drive Station Check IAW AMM 27-84-00-210-001.",
        technicalBackground:
          "SFCC 1 detected slat asymmetry/delay threshold and isolated Channel 1 while Channel 2 maintained control.",
        investigationDetails:
          "OEM teardown confirmed lubricant degradation in Actuator 6085CM batch #22B; STPA confirmed protection barriers operated within design limits.",
        inServiceExperience:
          "3 events across fleet; targeted inspection advisory released.",
        airworthinessImpact:
          "Low — Within SFHA S-02.01.01.B envelope (MAJ ≤ 10⁻⁵). No unsafe condition after SB-27-1098 embodiment.",
        correctiveAction:
          "Replace Actuator Type B FIN 6085CM IAW AMM 27-84-49-000-001A and embody Service Bulletin SB-27-1098.",
        conclusion:
          "Root cause resolved; corrective action verified on aircraft D-AIZK.",
        roLeaderSignature: "Ing. J. Novák, Lead Design Engineer",
      },
    },
    baselineRefId: "SFHA-27-SLAT-01",
    auditTrail: [
      {
        timestamp: "2026-03-18 14:20",
        actorRole: "OPERATOR_OPS",
        organizationName: "EuroWings Ops - Flight Ops",
        action: "Logged Operational Occurrence after EDDF climb slat delay.",
        requirementRef: "R8, R14",
      },
      {
        timestamp: "2026-03-25 11:00",
        actorRole: "OEM_DO",
        organizationName: "OEM Design Organisation",
        action:
          "Published engineering root-cause analysis and Service Bulletin SB-27-1098.",
        requirementRef: "DO-DISPOSITION",
      },
      {
        timestamp: "2026-03-28 17:45",
        actorRole: "OPERATOR_CAMO",
        organizationName: "EuroWings Ops - CAMO",
        action:
          "Applied SB-27-1098 and Actuator 6085CM replacement; closed occurrence.",
        requirementRef: "MAINT-CLOSURE",
      },
    ],
  },
];
