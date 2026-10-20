import { useOccurrence } from "../../context";
import { CaseQueue } from "./CaseQueue";
import { CaseBanner } from "./CaseBanner";
import { WorkflowStepper } from "./WorkflowStepper";
import { WorkspaceTabs } from "./WorkspaceTabs";
import { ContextualActionPanel } from "./actions/ContextualActionPanel";
import { OverviewTab } from "./tabs/OverviewTab";
import { OemSupportTab } from "./tabs/OemSupportTab";
import { SfhaBaselineTab } from "./tabs/SfhaBaselineTab";
import { ComplianceTab } from "./tabs/ComplianceTab";

export function OccurrenceWorkspace() {
  const { activeTab } = useOccurrence();

  return (
    <div className="workspace-split">
      {/* INCIDENT LIST COLUMN */}
      <CaseQueue />

      {/* INCIDENT DETAIL WORKBENCH */}
      <div className="incident-detail-col">
        {/* CASE HEADER */}
        <div className="case-banner">
          <CaseBanner />
          <WorkflowStepper />
          <WorkspaceTabs />
        </div>

        {/* CONTEXTUAL ACTION BAR BASED ON LOGGED-IN ROLE */}
        <ContextualActionPanel />

        {/* TAB CONTENTS */}
        {activeTab === "OVERVIEW" && <OverviewTab />}
        {activeTab === "OEM_SUPPORT" && <OemSupportTab />}
        {activeTab === "SFHA_BASELINE" && <SfhaBaselineTab />}
        {activeTab === "COMPLIANCE" && <ComplianceTab />}
      </div>
    </div>
  );
}
