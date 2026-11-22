import type React from "react";
import type {
  OperationalOccurrence,
  StakeholderRole,
  OEMClassification,
  TechnicalAssessment,
  SafetyBaselineComparison,
  Persona,
  NavSection,
  WorkspaceTab,
  EccairsTaxonomy,
  StpaInvestigation,
} from "../types";

export interface NewOccurrenceFormData {
  headline: string;
  eventDate: string;
  ataChapter: string;
  operatorName: string;
  registration: string;
  acMake: string;
  acModel: string;
  acSeries: string;
  engineMake: string;
  engineModel: string;
  component: string;
  flightPhase: string;
  discrepancy: string;
  eccairsTaxonomy: EccairsTaxonomy;
  reportToCaa?: boolean;
  notifyOem?: boolean;
}

export interface OemDirectUpdateData {
  investigationDetails: string;
  correctiveAction: string;
  airworthinessImpact: string;
}

export interface OccurrenceContextType {
  occurrences: OperationalOccurrence[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  activeRole: StakeholderRole;
  setActiveRole: (role: StakeholderRole) => void;
  activeNav: NavSection;
  setActiveNav: (nav: NavSection) => void;
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Form states
  safetyNotes: string;
  setSafetyNotes: (notes: string) => void;
  camoNotes: string;
  setCamoNotes: (notes: string) => void;
  classificationForm: OEMClassification;
  setClassificationForm: React.Dispatch<
    React.SetStateAction<OEMClassification>
  >;
  assessmentForm: TechnicalAssessment;
  setAssessmentForm: React.Dispatch<React.SetStateAction<TechnicalAssessment>>;

  // Derived values
  currentPersona: Persona;
  selectedOcc: OperationalOccurrence;
  baseline: SafetyBaselineComparison;
  isExternalPartner: boolean;
  filteredOccurrences: OperationalOccurrence[];

  // Action handlers
  handleSafetyReportDecision: (isReportable: boolean, targetOcn?: string) => void;
  handleCamoSubmitToOem: (targetOcn?: string) => void;
  handleOemAcknowledge: () => void;
  handleOemScreenAndAssign: () => void;
  handleOemDoAssessment: () => void;
  handleOemCsSendResponse: () => void;
  handleOperatorApplyFix: (targetOcn?: string) => void;
  handleCreateOccurrence: (data: NewOccurrenceFormData) => void;
  handleUpdateInvestigation: (
    ocn: string,
    investigation: StpaInvestigation,
  ) => void;
  handleUpdateOemFields: (ocn: string, data: OemDirectUpdateData) => void;
}
