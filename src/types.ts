// Swimlane Roles (Requirement R13)
export type StakeholderRole =
  | "OPERATOR_OPS"
  | "OPERATOR_SAFETY"
  | "OPERATOR_CAMO"
  | "OEM_CS"
  | "OEM_DO"
  | "REGULATOR_CAA"
  | "EXTERNAL_OPERATOR"; // Demonstrates federated anonymization

export type RegulatoryTrackState =
  | "PENDING_SAFETY_REVIEW"
  | "NOT_REPORTABLE"
  | "SUBMITTED_TO_CAA";

export type OemTrackState =
  | "PENDING_CAMO_REVIEW"
  | "NO_OEM_SUPPORT_NEEDED"
  | "SUBMITTED_TO_OEM_CS"
  | "ACKNOWLEDGED_BY_OEM"
  | "SCREENED_AND_ASSIGNED"
  | "ASSESSED_BY_DO"
  | "RESPONSE_SENT_TO_CAMO"
  | "CLOSED_APPLIED";

// Class 8: StakeholderEntity (R11, R13)
export interface AuditEntry {
  timestamp: string;
  actorRole: StakeholderRole;
  organizationName: string;
  action: string;
  requirementRef: string;
}

// Class 1: AircraftContext (WHERE/WHEN)
export interface AircraftContext {
  msn: string;
  registration: string;
  program: string;
  acMake: string;
  acModel: string;
  acSeries: string;
  engineMake: string;
  engineModel: string;
  operatorName: string;
  flightCycles: number;
  flightHours: number;
}

// ECCAIRS Taxonomy metadata (Operator Reporting)
export interface EccairsTaxonomy {
  reportingCapacity: "Organization / Operator" | "Personal / Individual";
  stateOfOccurrence: string;
  occurrenceClass:
    | "Accident"
    | "Serious Incident"
    | "Major Incident"
    | "Significant Incident"
    | "Occurrence without Safety Effect";
  occurrenceCategory: string;
  technicalSubcategory: string;
  ammReference: string;
}

// Technical Investigation (STPA / Hazard Analysis / Root Cause Analysis)
export interface HazardAnalysisFields {
  failureCondition: string;
  safetyEffect: string;
  severityClassification: string;
  barriersAndMitigation: string;
}

export interface RootCauseFields {
  problemStatement: string;
  fiveWhyChain: string;
  fishboneFactors: string;
  verifiedRootCause: string;
}

export interface StpaInvestigation {
  methodology: "STPA" | "Hazard Analysis" | "Root Cause Analysis";
  status: "Not Started" | "In Progress" | "Completed";
  // STPA fields
  controlStructure: string;
  unsafeControlAction: string;
  lossScenario: string;
  causalFactors: string;
  // Hazard Analysis (FHA / SFHA) fields
  hazardAnalysis?: HazardAnalysisFields;
  // Root Cause Analysis (5-Why / Fishbone) fields
  rootCause?: RootCauseFields;
  hazardReference: string;
  summary: string;
}

// Class 4: AuthorityReport (R9, R14)
export interface AuthorityReport {
  reportID: string;
  eccairsReference: string;
  isReportable: boolean;
  submissionDate: string;
  safetyEvaluationNotes: string;
}

// Class 5: OEMClassification (R4, R5, R6)
export interface OEMClassification {
  referenceNumber: string;
  occIssue: string;
  etopsFlag: boolean;
  occClassification: string;
  screeningDate: string;
  screeningComment: string;
  garaTargetClosureDate: string;
  occStatus: string;
  lastUpdateDate: string;
  sourceType: string;
  occLeaderFocalPoint: string;
}

// Class 6: TechnicalAssessment (R7, R12)
export interface TechnicalAssessment {
  eventFindingDescription: string;
  shortTermAction: string;
  technicalBackground: string;
  investigationDetails: string;
  inServiceExperience: string;
  airworthinessImpact: string;
  correctiveAction: string;
  conclusion: string;
  roLeaderSignature: string;
}

// Class 3: TechnicalRequest (R1, R2, R3, R5, R10)
export interface TechnicalRequest {
  requestID: string;
  submissionDate: string;
  ackReceiptTimestamp?: string;
  currentStatus: OemTrackState;
  originatingEntity: string;
  camoNotes: string;
  classification?: OEMClassification;
  assessment?: TechnicalAssessment;
}

// Class 7: SafetyBaselineComparison (DATA.csv Link)
export interface SafetyBaselineComparison {
  id: string;
  systemName: string;
  fhaValue: string;
  sfhaFailureCondition: string;
  sfhaSafetyEffect: string;
  sfhaInformationElement: string;
  sfhaSeverity: string;
  fhaVsOccAssumptionMatch: boolean;
}

// Class 2: OperationalOccurrence (Core Artifact)
export interface OperationalOccurrence {
  operatorControlNumber: string;
  headline: string;
  eventDate: string;
  ataChapter: string;
  eventState: string;
  eventArea: string;
  flightPhase: string;
  component: string;
  discrepancy: string;
  failureMode: string;
  detectionMethod: string;
  functionalEffect: string;
  safetyEffect: string;
  appliedCorrectiveAction?: string;

  // Composition & Associations
  aircraft: AircraftContext; // 1..* occurs on 1
  eccairsTaxonomy: EccairsTaxonomy;
  investigation: StpaInvestigation;
  regulatoryState: RegulatoryTrackState;
  oemState: OemTrackState;
  authorityReport?: AuthorityReport; // 0..1
  technicalRequest?: TechnicalRequest; // 0..1
  baselineRefId: string; // 0..* evaluated against 1
  auditTrail: AuditEntry[]; // R11, R13
}

export interface Persona {
  role: StakeholderRole;
  orgName: string;
  department: string;
  userTitle: string;
  themeColor: string;
}

export type NavSection = "DASHBOARD" | "REPORT" | "INVESTIGATION";

export type WorkspaceTab =
  | "INVESTIGATION"
  | "OVERVIEW"
  | "OEM_SUPPORT"
  | "SFHA_BASELINE"
  | "COMPLIANCE";
