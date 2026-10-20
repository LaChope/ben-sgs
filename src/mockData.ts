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
      program: "Single-Aisle Programme",
      acModel: "A320-214",
      operatorName: "Alpha Air (Operator A)",
      flightCycles: 14280,
      flightHours: 26410.5,
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
      program: "Single-Aisle Programme",
      acModel: "A320-214",
      operatorName: "Alpha Air (Operator A)",
      flightCycles: 9820,
      flightHours: 18100.0,
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
];
