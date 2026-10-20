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
} from "../types";

export interface NewOccurrenceFormData {
  headline: string;
  component: string;
  flightPhase: string;
  discrepancy: string;
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
  showNewModal: boolean;
  setShowNewModal: (show: boolean) => void;

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
  handleSafetyReportDecision: (isReportable: boolean) => void;
  handleCamoSubmitToOem: () => void;
  handleOemAcknowledge: () => void;
  handleOemScreenAndAssign: () => void;
  handleOemDoAssessment: () => void;
  handleOemCsSendResponse: () => void;
  handleOperatorApplyFix: () => void;
  handleCreateOccurrence: (data: NewOccurrenceFormData) => void;
}
